import { Stack, useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import Card from "../../components/Card";
import Screen from "../../components/Screen";
import SectionTitle from "../../components/SectionTitle";
import { COLORS, FONT_SIZE, ROLE_COLORS, SPACING } from "../../constants/theme";
import { useAppContext } from "../../context/AppContext";

export default function ReporterDashboard() {
  const router = useRouter();
  const { incidentReports, alerts, reportDraft } = useAppContext();
  const pending = incidentReports.filter((item) => item.status === "Pending Verification").length;
  const hasDraft = Boolean(reportDraft.type || reportDraft.description || reportDraft.location);

  const links = [
    ["Create Incident", "Enter incident type, description, location, and urgency.", "/reporter/create-incident", "📍"],
    ["Attach Photo", "Optional photo placeholder for the report flow.", "/reporter/attach-photo", "📷"],
    ["Submit Incident", "Review the draft and submit it for verification.", "/reporter/submit-incident", "📤"],
    ["My Reports", "Track Pending Verification, Verified, Responding, Resolved, or Rejected.", "/reporter/my-reports", "📋"],
    ["Community Alerts", "View affected areas and safety instructions.", "/reporter/community-alerts", "⚠️"],
  ] as const;

  return (
    <Screen>
      <Stack.Screen options={{ title: "Community Reporter" }} />
      <SectionTitle
        title="Community Reporter Dashboard"
        subtitle="Quickly report local floods, fires, outages, blocked roads, and unsafe conditions."
      />

      <View style={styles.summaryRow}>
        <Card style={styles.summaryCard}>
          <Text style={styles.summaryNumber}>{incidentReports.length}</Text>
          <Text style={styles.summaryLabel}>Reports</Text>
        </Card>
        <Card style={styles.summaryCard}>
          <Text style={styles.summaryNumber}>{pending}</Text>
          <Text style={styles.summaryLabel}>Pending</Text>
        </Card>
        <Card style={styles.summaryCard}>
          <Text style={styles.summaryNumber}>{alerts.length}</Text>
          <Text style={styles.summaryLabel}>Alerts</Text>
        </Card>
      </View>

      {hasDraft ? (
        <Card accentColor={COLORS.warning} style={styles.draftCard}>
          <Text style={styles.draftTitle}>An incident draft is in progress.</Text>
          <Text style={styles.draftText}>Continue to Attach Photo or Submit Incident.</Text>
        </Card>
      ) : null}

      {links.map(([title, description, route, icon]) => (
        <Card key={route} onPress={() => router.push(route)} accentColor={ROLE_COLORS.reporter.main}>
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
  summaryNumber: { color: ROLE_COLORS.reporter.main, fontSize: FONT_SIZE.xl, fontWeight: "900" },
  summaryLabel: { color: COLORS.textSecondary, fontSize: FONT_SIZE.xs, marginTop: 2 },
  draftCard: { backgroundColor: COLORS.warningLight },
  draftTitle: { color: COLORS.text, fontWeight: "800", fontSize: FONT_SIZE.sm },
  draftText: { color: COLORS.textSecondary, fontSize: FONT_SIZE.xs, marginTop: SPACING.xs },
  linkRow: { flexDirection: "row", alignItems: "center" },
  icon: { fontSize: 28, marginRight: SPACING.md },
  linkText: { flex: 1 },
  linkTitle: { color: COLORS.text, fontSize: FONT_SIZE.lg, fontWeight: "800" },
  linkDescription: { color: COLORS.textSecondary, fontSize: FONT_SIZE.sm, lineHeight: 20, marginTop: 2 },
  arrow: { color: ROLE_COLORS.reporter.main, fontSize: 32 },
});
