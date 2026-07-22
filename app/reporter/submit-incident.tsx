import { Stack, useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import AppButton from "../../components/AppButton";
import Card from "../../components/Card";
import EmptyState from "../../components/EmptyState";
import Screen from "../../components/Screen";
import SectionTitle from "../../components/SectionTitle";
import StatusBadge from "../../components/StatusBadge";
import { COLORS, FONT_SIZE, SPACING } from "../../constants/theme";
import { useAppContext } from "../../context/AppContext";

export default function SubmitIncidentScreen() {
  const router = useRouter();
  const { reportDraft, submitIncidentReport, clearReportDraft } = useAppContext();
  const [confirmation, setConfirmation] = useState("");
  const complete = Boolean(reportDraft.type && reportDraft.description && reportDraft.location && reportDraft.urgency);

  const submit = () => {
    const id = submitIncidentReport();
    setConfirmation(id ? "Incident report was saved with Pending Verification status." : "Complete all required incident fields first.");
  };

  return (
    <Screen>
      <Stack.Screen options={{ title: "Submit Incident" }} />
      <SectionTitle title="Review & Submit Incident" subtitle="Review the final summary before submitting it to coordinators." />

      {!complete && !confirmation ? (
        <EmptyState
          icon="📝"
          title="Incident draft is incomplete"
          message="Create an incident report before opening the final submission screen."
          actionTitle="Create Incident"
          onAction={() => router.replace("/reporter/create-incident")}
        />
      ) : confirmation ? (
        <Card accentColor={confirmation.includes("saved") ? COLORS.success : COLORS.emergency} style={confirmation.includes("saved") ? styles.successCard : styles.errorCard}>
          <Text style={styles.confirmationTitle}>{confirmation.includes("saved") ? "Report submitted" : "Submission blocked"}</Text>
          <Text style={styles.confirmationText}>{confirmation}</Text>
          {confirmation.includes("saved") ? (
            <AppButton title="View My Reports" onPress={() => router.replace("/reporter/my-reports")} variant="success" />
          ) : (
            <AppButton title="Return to Create Incident" onPress={() => router.replace("/reporter/create-incident")} />
          )}
        </Card>
      ) : (
        <>
          <Card accentColor={COLORS.primary}>
            <View style={styles.headerRow}>
              <Text style={styles.title}>Report Summary</Text>
              {reportDraft.urgency ? <StatusBadge label={reportDraft.urgency} /> : null}
            </View>
            <Summary label="Type" value={reportDraft.type} />
            <Summary label="Location" value={reportDraft.location} />
            <Summary label="Description" value={reportDraft.description} />
            <Summary label="Photo" value={reportDraft.photoName || "No photo attached"} />
          </Card>
          <AppButton title="Submit Incident Report" onPress={submit} variant="danger" />
          <AppButton
            title="Discard Draft"
            onPress={() => {
              clearReportDraft();
              router.replace("/reporter");
            }}
            variant="outline"
          />
        </>
      )}
    </Screen>
  );
}

function Summary({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.summaryRow}>
      <Text style={styles.summaryLabel}>{label}</Text>
      <Text style={styles.summaryValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", gap: SPACING.sm },
  title: { color: COLORS.text, fontSize: FONT_SIZE.lg, fontWeight: "900" },
  summaryRow: { borderTopColor: COLORS.border, borderTopWidth: 1, paddingTop: SPACING.md, marginTop: SPACING.md },
  summaryLabel: { color: COLORS.textMuted, fontSize: FONT_SIZE.xs, fontWeight: "900", textTransform: "uppercase" },
  summaryValue: { color: COLORS.text, fontSize: FONT_SIZE.sm, lineHeight: 20, marginTop: SPACING.xs },
  successCard: { backgroundColor: COLORS.successLight },
  errorCard: { backgroundColor: COLORS.emergencyLight },
  confirmationTitle: { color: COLORS.text, fontSize: FONT_SIZE.lg, fontWeight: "900" },
  confirmationText: { color: COLORS.textSecondary, fontSize: FONT_SIZE.sm, lineHeight: 20, marginVertical: SPACING.sm },
});
