import { Stack, useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import AppButton from "../../components/AppButton";
import Card from "../../components/Card";
import Screen from "../../components/Screen";
import SectionTitle from "../../components/SectionTitle";
import StatusBadge from "../../components/StatusBadge";
import { COLORS, FONT_SIZE, SPACING } from "../../constants/theme";
import { useAppContext } from "../../context/AppContext";

export default function VerificationStatusScreen() {
  const router = useRouter();
  const { currentVolunteer } = useAppContext();
  const hasAccess = currentVolunteer.status === "Verified";

  return (
    <Screen>
      <Stack.Screen options={{ title: "Verification Status" }} />
      <SectionTitle
        title="Verification Status"
        subtitle="Task access depends on the administrator's verification decision."
      />

      <Card accentColor={hasAccess ? COLORS.success : COLORS.warning}>
        <Text style={styles.name}>{currentVolunteer.name}</Text>
        <View style={styles.statusRow}>
          <StatusBadge label={currentVolunteer.status} />
          <Text style={styles.result}>{currentVolunteer.resultMessage}</Text>
        </View>
        <Detail label="ID information" value={currentVolunteer.idDocument || "Not submitted"} />
        <Detail label="Police check" value={currentVolunteer.policeCheck || "Not submitted"} />
        <Detail label="Emergency contact" value={currentVolunteer.emergencyContact || "Not submitted"} />
      </Card>

      <Card accentColor={hasAccess ? COLORS.success : COLORS.emergency} style={hasAccess ? styles.accessCard : styles.lockedCard}>
        <Text style={styles.accessTitle}>{hasAccess ? "Task access enabled" : "Task access locked"}</Text>
        <Text style={styles.accessText}>
          {hasAccess
            ? "You can now view, accept, and manage volunteer tasks."
            : "Only a Verified volunteer can accept tasks. Open the Admin dashboard to approve this demo volunteer."}
        </Text>
        <AppButton
          title={hasAccess ? "View Available Tasks" : "Update Verification Form"}
          onPress={() => router.push(hasAccess ? "/volunteer/available-tasks" : "/volunteer/verification-form")}
          variant={hasAccess ? "success" : "secondary"}
        />
      </Card>
    </Screen>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.detail}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  name: { color: COLORS.text, fontSize: FONT_SIZE.xl, fontWeight: "900" },
  statusRow: { flexDirection: "row", alignItems: "center", gap: SPACING.sm, marginVertical: SPACING.md },
  result: { flex: 1, color: COLORS.textSecondary, fontSize: FONT_SIZE.sm, lineHeight: 20 },
  detail: { borderTopColor: COLORS.border, borderTopWidth: 1, paddingTop: SPACING.md, marginTop: SPACING.md },
  detailLabel: { color: COLORS.textMuted, fontSize: FONT_SIZE.xs, fontWeight: "800", textTransform: "uppercase" },
  detailValue: { color: COLORS.text, fontSize: FONT_SIZE.sm, marginTop: SPACING.xs },
  accessCard: { backgroundColor: COLORS.successLight },
  lockedCard: { backgroundColor: COLORS.emergencyLight },
  accessTitle: { color: COLORS.text, fontSize: FONT_SIZE.lg, fontWeight: "900" },
  accessText: { color: COLORS.textSecondary, fontSize: FONT_SIZE.sm, lineHeight: 20, marginVertical: SPACING.sm },
});
