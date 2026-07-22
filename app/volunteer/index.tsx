import { Stack, useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import Card from "../../components/Card";
import Screen from "../../components/Screen";
import SectionTitle from "../../components/SectionTitle";
import StatusBadge from "../../components/StatusBadge";
import { COLORS, FONT_SIZE, ROLE_COLORS, SPACING } from "../../constants/theme";
import { useAppContext } from "../../context/AppContext";

export default function VolunteerDashboard() {
  const router = useRouter();
  const { currentVolunteer, tasks } = useAppContext();
  const availableCount = tasks.filter((task) => task.status === "Available").length;
  const myTaskCount = tasks.filter((task) => task.assignedVolunteerId === currentVolunteer.id).length;

  const links = [
    ["Submit Verification", "Provide ID, police-check reference, emergency contact, and agreement.", "/volunteer/verification-form", "🪪"],
    ["Verification Status", "Check Pending, Verified, Rejected, or Expired status.", "/volunteer/verification-status", "🔐"],
    ["Available Tasks", "View nearby tasks with priority and general location.", "/volunteer/available-tasks", "📌"],
    ["My Tasks", "Move accepted tasks through Active and Completed states.", "/volunteer/my-tasks", "🧰"],
  ] as const;

  return (
    <Screen>
      <Stack.Screen options={{ title: "Volunteer" }} />
      <SectionTitle
        title="Volunteer Dashboard"
        subtitle="Verified volunteers can accept clear, location-based emergency support tasks."
      />

      <Card accentColor={ROLE_COLORS.volunteer.main}>
        <Text style={styles.name}>{currentVolunteer.name}</Text>
        <View style={styles.statusRow}>
          <StatusBadge label={currentVolunteer.status} />
          <Text style={styles.statusText}>{currentVolunteer.resultMessage}</Text>
        </View>
      </Card>

      <View style={styles.summaryRow}>
        <Card style={styles.summaryCard}>
          <Text style={styles.summaryNumber}>{availableCount}</Text>
          <Text style={styles.summaryLabel}>Available tasks</Text>
        </Card>
        <Card style={styles.summaryCard}>
          <Text style={styles.summaryNumber}>{myTaskCount}</Text>
          <Text style={styles.summaryLabel}>My tasks</Text>
        </Card>
      </View>

      {currentVolunteer.status !== "Verified" ? (
        <Card accentColor={COLORS.warning} style={styles.notice}>
          <Text style={styles.noticeTitle}>Task access is restricted.</Text>
          <Text style={styles.noticeText}>
            Open the Admin dashboard and approve {currentVolunteer.name} to test the full volunteer flow.
          </Text>
        </Card>
      ) : null}

      {links.map(([title, description, route, icon]) => (
        <Card key={route} onPress={() => router.push(route)} accentColor={ROLE_COLORS.volunteer.main}>
          <View style={styles.linkRow}>
            <Text style={styles.icon}>{icon}</Text>
            <View style={styles.linkText}>
              <Text style={styles.linkTitle}>{title}</Text>
              <Text style={styles.linkDescription}>{description}</Text>
            </View>
            <Text style={styles.arrow}>›</Text>
          </View>
        </Card>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  name: { color: COLORS.text, fontSize: FONT_SIZE.xl, fontWeight: "900" },
  statusRow: { flexDirection: "row", alignItems: "center", gap: SPACING.sm, marginTop: SPACING.md },
  statusText: { flex: 1, color: COLORS.textSecondary, fontSize: FONT_SIZE.sm, lineHeight: 19 },
  summaryRow: { flexDirection: "row", gap: SPACING.sm },
  summaryCard: { flex: 1, alignItems: "center" },
  summaryNumber: { color: ROLE_COLORS.volunteer.main, fontSize: FONT_SIZE.xl, fontWeight: "900" },
  summaryLabel: { color: COLORS.textSecondary, fontSize: FONT_SIZE.xs, marginTop: 2 },
  notice: { backgroundColor: COLORS.warningLight },
  noticeTitle: { color: COLORS.text, fontWeight: "800", fontSize: FONT_SIZE.sm },
  noticeText: { color: COLORS.textSecondary, fontSize: FONT_SIZE.xs, lineHeight: 18, marginTop: SPACING.xs },
  linkRow: { flexDirection: "row", alignItems: "center" },
  icon: { fontSize: 28, marginRight: SPACING.md },
  linkText: { flex: 1 },
  linkTitle: { color: COLORS.text, fontSize: FONT_SIZE.lg, fontWeight: "800" },
  linkDescription: { color: COLORS.textSecondary, fontSize: FONT_SIZE.sm, lineHeight: 20, marginTop: 2 },
  arrow: { color: ROLE_COLORS.volunteer.main, fontSize: 32 },
});
