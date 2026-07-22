import { Stack, useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import AppButton from "../../components/AppButton";
import Card from "../../components/Card";
import FormInput from "../../components/FormInput";
import Screen from "../../components/Screen";
import SectionTitle from "../../components/SectionTitle";
import SelectOption from "../../components/SelectOption";
import { COLORS, FONT_SIZE, SPACING } from "../../constants/theme";
import { useAppContext } from "../../context/AppContext";
import type { Priority } from "../../types";

const incidentTypes = ["Flood", "Fire", "Power Outage", "Blocked Road", "Unsafe Condition"];
const urgencies: Priority[] = ["Low", "Medium", "High", "Urgent"];

export default function CreateIncidentScreen() {
  const router = useRouter();
  const { reportDraft, updateReportDraft } = useAppContext();
  const [type, setType] = useState(reportDraft.type);
  const [description, setDescription] = useState(reportDraft.description);
  const [location, setLocation] = useState(reportDraft.location);
  const [urgency, setUrgency] = useState<Priority | "">(reportDraft.urgency);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const continueFlow = () => {
    const nextErrors: Record<string, string> = {};
    if (!type.trim()) nextErrors.type = "Choose an incident type.";
    if (!description.trim()) nextErrors.description = "Describe what happened.";
    if (!location.trim()) nextErrors.location = "Enter the incident location.";
    if (!urgency) nextErrors.urgency = "Choose an urgency level.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0 || !urgency) return;

    updateReportDraft({
      type: type.trim(),
      description: description.trim(),
      location: location.trim(),
      urgency,
    });
    router.push("/reporter/attach-photo");
  };

  return (
    <Screen>
      <Stack.Screen options={{ title: "Create Incident" }} />
      <SectionTitle title="Create Incident Report" subtitle="Iteration 2 demo: enter clear facts without attempting to coordinate the response yourself." />

      <Card accentColor={COLORS.warning} style={styles.iterationCard}>
        <Text style={styles.iterationLabel}>ITERATION 2 FEATURE</Text>
        <Text style={styles.iterationText}>This flow is locally functional for demonstration but does not upload data to a server.</Text>
      </Card>

      <Text style={styles.label}>Incident type *</Text>
      {incidentTypes.map((item) => (
        <SelectOption key={item} label={item} selected={type === item} onPress={() => setType(item)} />
      ))}
      {errors.type ? <Text style={styles.error}>{errors.type}</Text> : null}

      <FormInput label="Description" required placeholder="What happened?" value={description} onChangeText={setDescription} multiline error={errors.description} />
      <FormInput label="Location" required placeholder="Address, intersection, or nearby landmark" value={location} onChangeText={setLocation} error={errors.location} />

      <Text style={styles.label}>Urgency *</Text>
      <View style={styles.grid}>
        {urgencies.map((item) => (
          <View key={item} style={styles.half}>
            <SelectOption label={item} selected={urgency === item} onPress={() => setUrgency(item)} />
          </View>
        ))}
      </View>
      {errors.urgency ? <Text style={styles.error}>{errors.urgency}</Text> : null}

      <AppButton title="Continue" onPress={continueFlow} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  iterationCard: { backgroundColor: COLORS.warningLight },
  iterationLabel: { color: COLORS.warning, fontSize: FONT_SIZE.xs, fontWeight: "900" },
  iterationText: { color: COLORS.textSecondary, fontSize: FONT_SIZE.sm, lineHeight: 20, marginTop: SPACING.xs },
  label: { color: COLORS.text, fontSize: FONT_SIZE.sm, fontWeight: "800", marginBottom: SPACING.sm },
  grid: { flexDirection: "row", flexWrap: "wrap", marginHorizontal: -SPACING.xs, marginBottom: SPACING.sm },
  half: { width: "50%", paddingHorizontal: SPACING.xs },
  error: { color: COLORS.emergency, fontSize: FONT_SIZE.xs, marginTop: -SPACING.sm, marginBottom: SPACING.lg },
});
