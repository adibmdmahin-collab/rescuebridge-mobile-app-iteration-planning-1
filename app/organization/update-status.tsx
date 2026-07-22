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
import type { OrganizationStatusValue } from "../../types";

const statuses: OrganizationStatusValue[] = ["Open", "Limited", "Full", "Closed"];

export default function UpdateOrganizationStatusScreen() {
  const { organizationStatus, updateOrganizationStatus } = useAppContext();
  const [selectedStatus, setSelectedStatus] = useState<OrganizationStatusValue>(organizationStatus.status);
  const [note, setNote] = useState(organizationStatus.note);
  const [confirmation, setConfirmation] = useState("");

  const save = () => {
    updateOrganizationStatus(selectedStatus, note);
    setConfirmation(`Organization status was updated to ${selectedStatus}.`);
  };

  return (
    <Screen>
      <Stack.Screen options={{ title: "Organization Status" }} />
      <SectionTitle
        title="Set Organization Status"
        subtitle="Choose the status that accurately describes current intake capacity."
      />

      <Card accentColor={COLORS.primary}>
        <Text style={styles.currentLabel}>Current published status</Text>
        <View style={styles.currentRow}>
          <StatusBadge label={organizationStatus.status} />
          <Text style={styles.currentNote}>{organizationStatus.note || "No public note."}</Text>
        </View>
      </Card>

      <View style={styles.grid}>
        {statuses.map((status) => (
          <View key={status} style={styles.half}>
            <SelectOption
              label={status}
              selected={selectedStatus === status}
              onPress={() => {
                setSelectedStatus(status);
                setConfirmation("");
              }}
            />
          </View>
        ))}
      </View>

      <FormInput
        label="Optional public note"
        placeholder="Example: Only families with children accepted tonight"
        value={note}
        onChangeText={(value) => {
          setNote(value);
          setConfirmation("");
        }}
        multiline
        maxLength={250}
      />

      {confirmation ? (
        <Card accentColor={COLORS.success} style={styles.successCard}>
          <Text style={styles.successText}>{confirmation}</Text>
        </Card>
      ) : null}

      <AppButton title="Save Status" onPress={save} variant="success" />
    </Screen>
  );
}

const styles = StyleSheet.create({
  currentLabel: { color: COLORS.textMuted, fontSize: FONT_SIZE.xs, fontWeight: "800", textTransform: "uppercase" },
  currentRow: { flexDirection: "row", alignItems: "center", gap: SPACING.sm, marginTop: SPACING.sm },
  currentNote: { flex: 1, color: COLORS.textSecondary, fontSize: FONT_SIZE.sm, lineHeight: 19 },
  grid: { flexDirection: "row", flexWrap: "wrap", marginHorizontal: -SPACING.xs, marginBottom: SPACING.md },
  half: { width: "50%", paddingHorizontal: SPACING.xs },
  successCard: { backgroundColor: COLORS.successLight },
  successText: { color: COLORS.success, fontSize: FONT_SIZE.sm, fontWeight: "800" },
});
