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
import type { Volunteer } from "../../types";

export default function VolunteerApprovalScreen() {
  const { volunteers, approveVolunteer, rejectVolunteer } = useAppContext();
  const [feedback, setFeedback] = useState("");
  const pendingVolunteers = volunteers.filter((volunteer) => volunteer.status === "Pending");

  const approve = (volunteer: Volunteer) => {
    approveVolunteer(volunteer.id);
    setFeedback(`${volunteer.name} was approved. Task access is now enabled.`);
  };

  const reject = (volunteer: Volunteer) => {
    rejectVolunteer(volunteer.id);
    setFeedback(`${volunteer.name} was rejected. The verification result was updated.`);
  };

  return (
    <Screen>
      <Stack.Screen options={{ title: "Volunteer Approval" }} />
      <SectionTitle
        title="Review Pending Volunteers"
        subtitle="Review the submitted information, then approve or reject the application."
      />

      {feedback ? (
        <Card accentColor={COLORS.success} style={styles.feedbackCard}>
          <Text style={styles.feedbackText}>{feedback}</Text>
        </Card>
      ) : null}

      {pendingVolunteers.length === 0 ? (
        <EmptyState
          icon="✅"
          title="No pending volunteers"
          message="All submitted volunteer applications have been reviewed."
        />
      ) : (
        pendingVolunteers.map((volunteer) => (
          <Card key={volunteer.id} accentColor={COLORS.warning}>
            <View style={styles.headerRow}>
              <View style={styles.titleWrap}>
                <Text style={styles.name}>{volunteer.name}</Text>
                <Text style={styles.email}>{volunteer.email}</Text>
              </View>
              <StatusBadge label={volunteer.status} />
            </View>

            <Detail label="ID document" value={volunteer.idDocument || "Missing"} />
            <Detail label="Police check" value={volunteer.policeCheck || "Missing"} />
            <Detail label="Emergency contact" value={volunteer.emergencyContact || "Missing"} />
            <Detail label="Safety agreement" value={volunteer.safetyAgreement ? "Accepted" : "Not accepted"} />

            <View style={styles.buttonRow}>
              <AppButton title="Approve" onPress={() => approve(volunteer)} variant="success" style={styles.flex} />
              <AppButton title="Reject" onPress={() => reject(volunteer)} variant="danger" style={styles.flex} />
            </View>
          </Card>
        ))
      )}

      <Card accentColor={COLORS.primary} style={styles.demoCard}>
        <Text style={styles.demoTitle}>End-to-end demo</Text>
        <Text style={styles.demoText}>
          Approving Alex Morgan immediately unlocks the Available Tasks screen for the current volunteer demo profile.
        </Text>
      </Card>
    </Screen>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  feedbackCard: { backgroundColor: COLORS.successLight },
  feedbackText: { color: COLORS.success, fontSize: FONT_SIZE.sm, fontWeight: "800" },
  headerRow: { flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", gap: SPACING.sm },
  titleWrap: { flex: 1 },
  name: { color: COLORS.text, fontSize: FONT_SIZE.lg, fontWeight: "900" },
  email: { color: COLORS.textSecondary, fontSize: FONT_SIZE.xs, marginTop: 2 },
  detailRow: { borderTopColor: COLORS.border, borderTopWidth: 1, paddingTop: SPACING.md, marginTop: SPACING.md },
  detailLabel: { color: COLORS.textMuted, fontSize: FONT_SIZE.xs, fontWeight: "800", textTransform: "uppercase" },
  detailValue: { color: COLORS.text, fontSize: FONT_SIZE.sm, lineHeight: 20, marginTop: SPACING.xs },
  buttonRow: { flexDirection: "row", gap: SPACING.sm, marginTop: SPACING.md },
  flex: { flex: 1 },
  demoCard: { backgroundColor: COLORS.primaryLight, marginTop: SPACING.md },
  demoTitle: { color: COLORS.primaryDark, fontSize: FONT_SIZE.sm, fontWeight: "900" },
  demoText: { color: COLORS.textSecondary, fontSize: FONT_SIZE.xs, lineHeight: 18, marginTop: SPACING.xs },
});
