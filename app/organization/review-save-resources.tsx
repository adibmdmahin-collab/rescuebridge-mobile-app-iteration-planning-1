import { Stack, useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import AppButton from "../../components/AppButton";
import Card from "../../components/Card";
import EmptyState from "../../components/EmptyState";
import Screen from "../../components/Screen";
import SectionTitle from "../../components/SectionTitle";
import { COLORS, FONT_SIZE, SPACING } from "../../constants/theme";
import { useAppContext } from "../../context/AppContext";

export default function ReviewResourcesScreen() {
  const router = useRouter();
  const { resourceDraft, confirmResourceChanges } = useAppContext();
  const [confirmation, setConfirmation] = useState("");

  const confirm = () => {
    const saved = confirmResourceChanges();
    setConfirmation(saved ? "Resource information was confirmed and saved locally." : "There were no staged changes to save.");
  };

  return (
    <Screen>
      <Stack.Screen options={{ title: "Review Resource Changes" }} />
      <SectionTitle
        title="Review & Save"
        subtitle="Check every change before publishing so users do not receive incorrect information."
      />

      {confirmation ? (
        <Card accentColor={COLORS.success} style={styles.successCard}>
          <Text style={styles.successTitle}>Changes saved</Text>
          <Text style={styles.successText}>{confirmation}</Text>
          <AppButton title="Return to Organization Dashboard" onPress={() => router.replace("/organization")} variant="success" />
        </Card>
      ) : resourceDraft ? (
        <>
          <Card accentColor={COLORS.primary}>
            <Text style={styles.cardTitle}>Resource summary</Text>
            <SummaryRow label="Beds" value={String(resourceDraft.beds)} />
            <SummaryRow label="Food units" value={String(resourceDraft.food)} />
            <SummaryRow label="Water units" value={String(resourceDraft.water)} />
            <SummaryRow label="Blankets / supplies" value={resourceDraft.blanketsSupplies} />
            <SummaryRow label="Medical support" value={resourceDraft.medicalSupport} />
            <SummaryRow label="Contact number" value={resourceDraft.contactNumber} />
            <SummaryRow label="Operating hours" value={resourceDraft.operatingHours} />
          </Card>
          <View style={styles.buttonRow}>
            <AppButton title="Edit" onPress={() => router.back()} variant="outline" style={styles.flex} />
            <AppButton title="Confirm & Save" onPress={confirm} variant="success" style={styles.flex} />
          </View>
        </>
      ) : (
        <EmptyState
          icon="✅"
          title="No changes waiting"
          message="Open Update Resources to create a new resource update for review."
          actionTitle="Update Resources"
          onAction={() => router.push("/organization/update-resources")}
        />
      )}
    </Screen>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.summaryRow}>
      <Text style={styles.summaryLabel}>{label}</Text>
      <Text style={styles.summaryValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  cardTitle: { color: COLORS.text, fontSize: FONT_SIZE.lg, fontWeight: "900", marginBottom: SPACING.md },
  summaryRow: { borderTopColor: COLORS.border, borderTopWidth: 1, paddingVertical: SPACING.md },
  summaryLabel: { color: COLORS.textMuted, fontSize: FONT_SIZE.xs, fontWeight: "800", textTransform: "uppercase" },
  summaryValue: { color: COLORS.text, fontSize: FONT_SIZE.sm, lineHeight: 20, marginTop: SPACING.xs },
  buttonRow: { flexDirection: "row", gap: SPACING.sm },
  flex: { flex: 1 },
  successCard: { backgroundColor: COLORS.successLight },
  successTitle: { color: COLORS.success, fontSize: FONT_SIZE.lg, fontWeight: "900" },
  successText: { color: COLORS.textSecondary, fontSize: FONT_SIZE.sm, marginVertical: SPACING.sm },
});
