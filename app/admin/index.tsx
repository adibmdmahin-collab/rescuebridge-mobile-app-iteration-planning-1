import { Stack, useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import Card from "../../components/Card";
import Screen from "../../components/Screen";
import SectionTitle from "../../components/SectionTitle";
import { COLORS, FONT_SIZE, ROLE_COLORS, SPACING } from "../../constants/theme";
import { useAppContext } from "../../context/AppContext";

export default function AdminDashboard() {
  const router = useRouter();
  const { helpRequests, volunteers, incidentReports, alerts } = useAppContext();
  const openRequests = helpRequests.filter((item) => item.status !== "Resolved").length;
  const pendingVolunteers = volunteers.filter((item) => item.status === "Pending").length;
  const pendingIncidents = incidentReports.filter((item) => item.status === "Pending Verification").length;

  const links = [
    ["Manage Help Requests", "Review urgency, update status, assign volunteers, and resolve requests.", "/admin/manage-help-requests", "🆘"],
    ["Volunteer Approval", "Review pending volunteer details and approve or reject applications.", "/admin/volunteer-approval", "✅"],
    ["Resources & Shelters", "Iteration 2 resource-management demonstration.", "/admin/manage-resources", "🏠"],
    ["Incident Reports", "Iteration 2 incident verification and status demonstration.", "/admin/manage-incidents", "📍"],
    ["Emergency Broadcast", "Iteration 2 geo-targeted broadcast demonstration.", "/admin/emergency-broadcast", "📢"],
  ] as const;

  return (
    <Screen>
      <Stack.Screen options={{ title: "Admin / Coordinator" }} />
      <SectionTitle
        title="Coordinator Dashboard"
        subtitle="Maintain real-time visibility across requests, volunteers, resources, incidents, and alerts."
      />

      <View style={styles.summaryRow}>
        <Card style={styles.summaryCard}>
          <Text style={styles.summaryNumber}>{openRequests}</Text>
          <Text style={styles.summaryLabel}>Open requests</Text>
        </Card>
        <Card style={styles.summaryCard}>
          <Text style={styles.summaryNumber}>{pendingVolunteers}</Text>
          <Text style={styles.summaryLabel}>Volunteer reviews</Text>
        </Card>
        <Card style={styles.summaryCard}>
          <Text style={styles.summaryNumber}>{pendingIncidents}</Text>
          <Text style={styles.summaryLabel}>Incident reviews</Text>
        </Card>
      </View>

      <Card accentColor={COLORS.primary} style={styles.alertSummary}>
        <Text style={styles.alertSummaryTitle}>{alerts.length} active demo alerts</Text>
        <Text style={styles.alertSummaryText}>All state changes are local and reset when the app reloads.</Text>
      </Card>

      {links.map(([title, description, route, icon]) => (
        <Card key={route} onPress={() => router.push(route)} accentColor={ROLE_COLORS.admin.main}>
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
  summaryRow: { flexDirection: "row", gap: SPACING.sm, marginBottom: SPACING.md },
  summaryCard: { flex: 1, alignItems: "center", padding: SPACING.md },
  summaryNumber: { color: ROLE_COLORS.admin.main, fontSize: FONT_SIZE.xl, fontWeight: "900" },
  summaryLabel: { color: COLORS.textSecondary, fontSize: FONT_SIZE.xs, textAlign: "center", marginTop: 2 },
  alertSummary: { backgroundColor: COLORS.primaryLight },
  alertSummaryTitle: { color: COLORS.primaryDark, fontWeight: "800", fontSize: FONT_SIZE.sm },
  alertSummaryText: { color: COLORS.textSecondary, fontSize: FONT_SIZE.xs, marginTop: SPACING.xs },
  linkRow: { flexDirection: "row", alignItems: "center" },
  icon: { fontSize: 28, marginRight: SPACING.md },
  linkText: { flex: 1 },
  linkTitle: { color: COLORS.text, fontSize: FONT_SIZE.lg, fontWeight: "800" },
  linkDescription: { color: COLORS.textSecondary, fontSize: FONT_SIZE.sm, lineHeight: 20, marginTop: 2 },
  arrow: { color: ROLE_COLORS.admin.main, fontSize: 32 },
});
