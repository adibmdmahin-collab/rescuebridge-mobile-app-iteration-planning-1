import { Stack, useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import Card from "../../components/Card";
import Screen from "../../components/Screen";
import SectionTitle from "../../components/SectionTitle";
import StatusBadge from "../../components/StatusBadge";
import { COLORS, FONT_SIZE, ROLE_COLORS, SPACING } from "../../constants/theme";
import { useAppContext } from "../../context/AppContext";

export default function OrganizationDashboard() {
  const router = useRouter();
  const { resources, organizationStatus, helpRequests, resourceDraft } = useAppContext();
  const nearbyOpen = helpRequests.filter((item) => item.status !== "Resolved").length;

  const links = [
    ["Update Resources", "Enter beds, food, water, supplies, medical support, and hours.", "/organization/update-resources", "📦"],
    ["Review & Save", "Review the latest resource changes before publishing.", "/organization/review-save-resources", "✅"],
    ["Organization Status", "Set Open, Limited, Full, or Closed with an optional note.", "/organization/update-status", "🏢"],
    ["Nearby Requests", "Iteration 2 request-filtering demonstration.", "/organization/nearby-requests", "📍"],
    ["Alerts & Updates", "Iteration 2 announcements and resource updates.", "/organization/alerts-updates", "🔔"],
  ] as const;

  return (
    <Screen>
      <Stack.Screen options={{ title: "Organization Staff" }} />
      <SectionTitle
        title="Organization Staff Dashboard"
        subtitle="Keep resource information accurate so people are not directed to unavailable support."
      />

      <View style={styles.summaryRow}>
        <Card style={styles.summaryCard}>
          <Text style={styles.summaryNumber}>{resources.beds}</Text>
          <Text style={styles.summaryLabel}>Beds</Text>
        </Card>
        <Card style={styles.summaryCard}>
          <StatusBadge label={organizationStatus.status} />
          <Text style={styles.summaryLabel}>Current status</Text>
        </Card>
        <Card style={styles.summaryCard}>
          <Text style={styles.summaryNumber}>{nearbyOpen}</Text>
          <Text style={styles.summaryLabel}>Open requests</Text>
        </Card>
      </View>

      {resourceDraft ? (
        <Card accentColor={COLORS.warning} style={styles.notice}>
          <Text style={styles.noticeTitle}>Resource changes are waiting for confirmation.</Text>
          <Text style={styles.noticeText}>Open Review & Save to publish the staged update.</Text>
        </Card>
      ) : null}

      {links.map(([title, description, route, icon]) => (
        <Card key={route} onPress={() => router.push(route)} accentColor={ROLE_COLORS.organization.main}>
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
  summaryCard: { flex: 1, alignItems: "center", justifyContent: "center", padding: SPACING.md },
  summaryNumber: { color: ROLE_COLORS.organization.main, fontSize: FONT_SIZE.xl, fontWeight: "900" },
  summaryLabel: { color: COLORS.textSecondary, fontSize: FONT_SIZE.xs, textAlign: "center", marginTop: SPACING.xs },
  notice: { backgroundColor: COLORS.warningLight },
  noticeTitle: { color: COLORS.text, fontWeight: "800", fontSize: FONT_SIZE.sm },
  noticeText: { color: COLORS.textSecondary, fontSize: FONT_SIZE.xs, marginTop: SPACING.xs },
  linkRow: { flexDirection: "row", alignItems: "center" },
  icon: { fontSize: 28, marginRight: SPACING.md },
  linkText: { flex: 1 },
  linkTitle: { color: COLORS.text, fontSize: FONT_SIZE.lg, fontWeight: "800" },
  linkDescription: { color: COLORS.textSecondary, fontSize: FONT_SIZE.sm, lineHeight: 20, marginTop: 2 },
  arrow: { color: ROLE_COLORS.organization.main, fontSize: 32 },
});
