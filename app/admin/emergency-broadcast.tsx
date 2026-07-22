import { Stack } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import AppButton from "../../components/AppButton";
import Card from "../../components/Card";
import FormInput from "../../components/FormInput";
import Screen from "../../components/Screen";
import SectionTitle from "../../components/SectionTitle";
import SelectOption from "../../components/SelectOption";
import StatusBadge from "../../components/StatusBadge";
import { COLORS, FONT_SIZE, SPACING } from "../../constants/theme";
import { useAppContext } from "../../context/AppContext";
import type { Priority } from "../../types";

const priorities: Priority[] = ["Low", "Medium", "High", "Urgent"];

export default function EmergencyBroadcastScreen() {
  const { addAlert } = useAppContext();
  const [message, setMessage] = useState("Warming centre now open");
  const [targetArea, setTargetArea] = useState("Scarborough / 5 km");
  const [priority, setPriority] = useState<Priority>("High");
  const [instructions, setInstructions] = useState("Proceed to the centre and follow staff directions.");
  const [error, setError] = useState("");
  const [confirmation, setConfirmation] = useState("");

  const send = () => {
    if (!message.trim() || !targetArea.trim()) {
      setError("Message and target area are required.");
      setConfirmation("");
      return;
    }
    addAlert({
      title: message.trim(),
      message: message.trim(),
      area: targetArea.trim(),
      priority,
      type: "Emergency",
      instructions: instructions.trim() || undefined,
    });
    setError("");
    setConfirmation("Demo broadcast was added to local Alerts state.");
  };

  return (
    <Screen>
      <Stack.Screen options={{ title: "Emergency Broadcast" }} />
      <SectionTitle title="Create Emergency Broadcast" subtitle="Iteration 2 demo: enter a message, area, and priority, then preview before sending." />

      <Card accentColor={COLORS.warning} style={styles.iterationCard}>
        <Text style={styles.iterationLabel}>ITERATION 2 FEATURE</Text>
        <Text style={styles.iterationText}>This demo updates local state only. It does not send a real notification.</Text>
      </Card>

      <FormInput label="Message" required value={message} onChangeText={setMessage} error={error && !message.trim() ? error : undefined} />
      <FormInput label="Target area" required value={targetArea} onChangeText={setTargetArea} error={error && !targetArea.trim() ? error : undefined} />
      <FormInput label="Instructions" value={instructions} onChangeText={setInstructions} multiline />

      <Text style={styles.label}>Priority</Text>
      <View style={styles.grid}>
        {priorities.map((item) => (
          <View key={item} style={styles.half}>
            <SelectOption label={item} selected={priority === item} onPress={() => setPriority(item)} />
          </View>
        ))}
      </View>

      <Card accentColor={priority === "Urgent" ? COLORS.emergency : COLORS.primary}>
        <Text style={styles.previewLabel}>Preview</Text>
        <View style={styles.previewHeader}>
          <Text style={styles.previewTitle}>{message || "Broadcast message"}</Text>
          <StatusBadge label={priority} />
        </View>
        <Text style={styles.previewArea}>{targetArea || "Target area"}</Text>
        <Text style={styles.previewText}>{instructions || "No additional instructions."}</Text>
      </Card>

      {confirmation ? (
        <Card accentColor={COLORS.success} style={styles.successCard}>
          <Text style={styles.successText}>{confirmation}</Text>
        </Card>
      ) : null}

      <AppButton title="Send Demo Alert" onPress={send} variant="danger" />
    </Screen>
  );
}

const styles = StyleSheet.create({
  iterationCard: { backgroundColor: COLORS.warningLight },
  iterationLabel: { color: COLORS.warning, fontSize: FONT_SIZE.xs, fontWeight: "900" },
  iterationText: { color: COLORS.textSecondary, fontSize: FONT_SIZE.sm, lineHeight: 20, marginTop: SPACING.xs },
  label: { color: COLORS.text, fontSize: FONT_SIZE.sm, fontWeight: "800", marginBottom: SPACING.sm },
  grid: { flexDirection: "row", flexWrap: "wrap", marginHorizontal: -SPACING.xs, marginBottom: SPACING.md },
  half: { width: "50%", paddingHorizontal: SPACING.xs },
  previewLabel: { color: COLORS.textMuted, fontSize: FONT_SIZE.xs, fontWeight: "900", textTransform: "uppercase" },
  previewHeader: { flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", gap: SPACING.sm, marginTop: SPACING.sm },
  previewTitle: { flex: 1, color: COLORS.text, fontSize: FONT_SIZE.lg, fontWeight: "900" },
  previewArea: { color: COLORS.primaryDark, fontSize: FONT_SIZE.sm, fontWeight: "700", marginTop: SPACING.sm },
  previewText: { color: COLORS.textSecondary, fontSize: FONT_SIZE.sm, lineHeight: 20, marginTop: SPACING.sm },
  successCard: { backgroundColor: COLORS.successLight },
  successText: { color: COLORS.success, fontSize: FONT_SIZE.sm, fontWeight: "800" },
});
