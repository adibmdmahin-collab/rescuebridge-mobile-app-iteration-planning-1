import { Stack } from "expo-router";
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

export default function ManageIncidentsScreen() {
  const { incidentReports, updateIncidentReportStatus } = useAppContext();
  const [feedback, setFeedback] = useState("");

  return (
    <Screen>
      <Stack.Screen options={{ title: "Incident Reports" }} />
      <SectionTitle title="Manage Incident Reports" subtitle="Iteration 2 demo: verify or reject community-submitted incidents and update response status." />

      <Card accentColor={COLORS.warning} style={styles.iterationCard}>
        <Text style={styles.iterationLabel}>ITERATION 2 FEATURE</Text>
        <Text style={styles.iterationText}>Future version: map position, evidence review, responder assignment, and incident audit trail.</Text>
      </Card>

      {feedback ? (
        <Card accentColor={COLORS.success} style={styles.feedbackCard}>
          <Text style={styles.feedback}>{feedback}</Text>
        </Card>
      ) : null}

      {incidentReports.length === 0 ? (
        <EmptyState icon="📍" title="No incident reports" message="Community reports will appear here for verification." />
      ) : (
        incidentReports.map((incident) => (
          <Card key={incident.id} accentColor={incident.urgency === "Urgent" ? COLORS.emergency : COLORS.primary}>
            <View style={styles.headerRow}>
              <View style={styles.flex}>
                <Text style={styles.title}>{incident.type}</Text>
                <Text style={styles.location}>{incident.location}</Text>
              </View>
              <StatusBadge label={incident.status} />
            </View>
            <View style={styles.badgeRow}><StatusBadge label={incident.urgency} /></View>
            <Text style={styles.description}>{incident.description}</Text>
            {incident.photoName ? <Text style={styles.photo}>Photo placeholder: {incident.photoName}</Text> : null}
            <View style={styles.buttonRow}>
              <AppButton
                title="Verify"
                onPress={() => {
                  updateIncidentReportStatus(incident.id, "Verified");
                  setFeedback(`${incident.type} was verified.`);
                }}
                variant="success"
                style={styles.flex}
              />
              <AppButton
                title="Reject"
                onPress={() => {
                  updateIncidentReportStatus(incident.id, "Rejected");
                  setFeedback(`${incident.type} was rejected.`);
                }}
                variant="danger"
                style={styles.flex}
              />
            </View>
            {incident.status === "Verified" ? (
              <AppButton title="Mark Responding" onPress={() => updateIncidentReportStatus(incident.id, "Responding")} />
            ) : incident.status === "Responding" ? (
              <AppButton title="Mark Resolved" onPress={() => updateIncidentReportStatus(incident.id, "Resolved")} variant="success" />
            ) : null}
          </Card>
        ))
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  iterationCard: { backgroundColor: COLORS.warningLight },
  iterationLabel: { color: COLORS.warning, fontSize: FONT_SIZE.xs, fontWeight: "900" },
  iterationText: { color: COLORS.textSecondary, fontSize: FONT_SIZE.sm, lineHeight: 20, marginTop: SPACING.xs },
  feedbackCard: { backgroundColor: COLORS.successLight },
  feedback: { color: COLORS.success, fontSize: FONT_SIZE.sm, fontWeight: "800" },
  headerRow: { flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", gap: SPACING.sm },
  flex: { flex: 1 },
  title: { color: COLORS.text, fontSize: FONT_SIZE.lg, fontWeight: "900" },
  location: { color: COLORS.textSecondary, fontSize: FONT_SIZE.xs, marginTop: 2 },
  badgeRow: { marginTop: SPACING.md },
  description: { color: COLORS.text, fontSize: FONT_SIZE.sm, lineHeight: 20, marginTop: SPACING.md },
  photo: { color: COLORS.primaryDark, fontSize: FONT_SIZE.xs, marginTop: SPACING.sm },
  buttonRow: { flexDirection: "row", gap: SPACING.sm, marginTop: SPACING.md },
});
