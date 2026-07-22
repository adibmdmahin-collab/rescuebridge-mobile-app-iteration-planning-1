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
import type { HelpType, Priority } from "../../types";

const helpTypes: HelpType[] = ["Shelter", "Food", "Water", "Medical", "Transportation"];
const priorities: Priority[] = ["Low", "Medium", "High", "Urgent"];

export default function SubmitHelpScreen() {
  const router = useRouter();
  const { addHelpRequest } = useAppContext();
  const [helpType, setHelpType] = useState<HelpType | null>(null);
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Priority | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [confirmation, setConfirmation] = useState("");

  const submit = () => {
    const nextErrors: Record<string, string> = {};
    if (!helpType) nextErrors.helpType = "Choose the type of help needed.";
    if (!location.trim()) nextErrors.location = "Enter your current location or a nearby landmark.";
    if (!description.trim()) nextErrors.description = "Add a short description so responders understand the need.";
    if (!priority) nextErrors.priority = "Choose a priority level.";

    setErrors(nextErrors);
    setConfirmation("");
    if (Object.keys(nextErrors).length > 0 || !helpType || !priority) return;

    const requestId = addHelpRequest({
      type: helpType,
      location: location.trim(),
      description: description.trim(),
      priority,
    });

    setConfirmation(`Request ${requestId.split("-").slice(-2).join("-")} was saved with Pending status.`);
    setHelpType(null);
    setLocation("");
    setDescription("");
    setPriority(null);
    setErrors({});
  };

  return (
    <Screen>
      <Stack.Screen options={{ title: "Request Help" }} />
      <SectionTitle
        title="Request Help"
        subtitle="Complete the shortest possible form. Required fields are marked with an asterisk."
      />

      <Text style={styles.label}>Help type *</Text>
      <View style={styles.grid}>
        {helpTypes.map((item) => (
          <View key={item} style={styles.half}>
            <SelectOption
              label={item}
              selected={helpType === item}
              onPress={() => {
                setHelpType(item);
                setErrors((current) => ({ ...current, helpType: "" }));
              }}
            />
          </View>
        ))}
      </View>
      {errors.helpType ? <Text style={styles.error}>{errors.helpType}</Text> : null}

      <FormInput
        label="Location"
        required
        placeholder="Address, intersection, or nearby landmark"
        value={location}
        onChangeText={(value) => {
          setLocation(value);
          if (value.trim()) setErrors((current) => ({ ...current, location: "" }));
        }}
        error={errors.location}
      />

      <FormInput
        label="Description"
        required
        placeholder="Briefly describe who needs help and what is needed"
        value={description}
        onChangeText={(value) => {
          setDescription(value);
          if (value.trim()) setErrors((current) => ({ ...current, description: "" }));
        }}
        multiline
        maxLength={500}
        error={errors.description}
      />

      <Text style={styles.label}>Priority *</Text>
      <View style={styles.grid}>
        {priorities.map((item) => (
          <View key={item} style={styles.half}>
            <SelectOption
              label={item}
              description={
                item === "Urgent"
                  ? "Immediate community response"
                  : item === "High"
                    ? "Needed soon"
                    : item === "Medium"
                      ? "Important but stable"
                      : "Can safely wait"
              }
              selected={priority === item}
              onPress={() => {
                setPriority(item);
                setErrors((current) => ({ ...current, priority: "" }));
              }}
            />
          </View>
        ))}
      </View>
      {errors.priority ? <Text style={styles.error}>{errors.priority}</Text> : null}

      {confirmation ? (
        <Card accentColor={COLORS.success} style={styles.confirmation}>
          <Text style={styles.confirmationTitle}>Request submitted</Text>
          <Text style={styles.confirmationText}>{confirmation}</Text>
          <AppButton title="View My Requests" onPress={() => router.push("/affected/my-requests")} variant="success" />
        </Card>
      ) : null}

      <AppButton title="Submit Request" onPress={submit} variant="danger" />
    </Screen>
  );
}

const styles = StyleSheet.create({
  label: {
    color: COLORS.text,
    fontSize: FONT_SIZE.sm,
    fontWeight: "800",
    marginBottom: SPACING.sm,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -SPACING.xs,
    marginBottom: SPACING.sm,
  },
  half: {
    width: "50%",
    paddingHorizontal: SPACING.xs,
  },
  error: {
    color: COLORS.emergency,
    fontSize: FONT_SIZE.xs,
    marginTop: -SPACING.sm,
    marginBottom: SPACING.lg,
  },
  confirmation: {
    backgroundColor: COLORS.successLight,
    marginTop: SPACING.sm,
  },
  confirmationTitle: {
    color: COLORS.success,
    fontSize: FONT_SIZE.lg,
    fontWeight: "900",
  },
  confirmationText: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZE.sm,
    lineHeight: 20,
    marginVertical: SPACING.sm,
  },
});
