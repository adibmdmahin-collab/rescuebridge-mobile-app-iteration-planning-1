import { Stack, useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import Card from "../../components/Card";
import Screen from "../../components/Screen";
import SectionTitle from "../../components/SectionTitle";
import StatusBadge from "../../components/StatusBadge";
import { COLORS, FONT_SIZE, ROLE_COLORS, SPACING } from "../../constants/theme";
import { useAppContext } from "../../context/AppContext";

export default function AffectedDashboard() {
  const router = useRouter();
  const { helpRequests, alerts } = useAppContext();
  const openCount = helpRequests.filter((item) => item.status !== "Resolved").length;
  const resolvedCount = helpRequests.filter((item) => item.status === "Resolved").length;

  const links = [
    ["Request Help", "Submit shelter, food, water, medical, or transportation needs.", "/affected/submit-help", "🆘"],
    ["My Requests", "Track pending, active, and resolved requests.", "/affected/my-requests", "📋"],
    ["Nearby Resources", "Demo shelters, food, water, and medical resources.", "/affected/nearby-resources", "🗺️"],
    ["Alerts", "View emergency warnings and changing conditions.", "/affected/alerts", "⚠️"],
  ] as const;

  return (
    <Screen>
      <Stack.Screen options={{ title: "Affected Individual" }} />
      <SectionTitle
        title="Affected Individual Dashboard"
        subtitle="Fast, simple actions for people seeking help during an emergency."
      />

      <View style={styles.summaryRow}>
        <Card style={styles.summaryCard}>
          <Text style={styles.summaryNumber}>{openCount}</Text>
          <Text style={styles.summaryLabel}>Open requests</Text>
        </Card>
        <Card style={styles.summaryCard}>
          <Text style={styles.summaryNumber}>{resolvedCount}</Text>
          <Text style={styles.summaryLabel}>Resolved</Text>
        </Card>
        <Card style={styles.summaryCard}>
          <Text style={styles.summaryNumber}>{alerts.length}</Text>
          <Text style={styles.summaryLabel}>Alerts</Text>
        </Card>
      </View>

      <Card accentColor={COLORS.emergency} style={styles.priorityCard}>
        <View style={styles.inline}>
          <StatusBadge label="Urgent" />
          <Text style={styles.priorityText}>Use Request Help when support is needed now.</Text>
        </View>
      </Card>

      {links.map(([title, description, route, icon]) => (
        <Card
          key={route}
          onPress={() => router.push(route)}
          accentColor={ROLE_COLORS.affected.main}
        >
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
  summaryNumber: { color: ROLE_COLORS.affected.main, fontSize: FONT_SIZE.xl, fontWeight: "900" },
  summaryLabel: { color: COLORS.textSecondary, fontSize: FONT_SIZE.xs, textAlign: "center", marginTop: 2 },
  priorityCard: { backgroundColor: COLORS.emergencyLight },
  inline: { flexDirection: "row", alignItems: "center", gap: SPACING.sm },
  priorityText: { color: COLORS.text, flex: 1, fontSize: FONT_SIZE.sm, lineHeight: 19 },
  linkRow: { flexDirection: "row", alignItems: "center" },
  icon: { fontSize: 28, marginRight: SPACING.md },
  linkText: { flex: 1 },
  linkTitle: { color: COLORS.text, fontSize: FONT_SIZE.lg, fontWeight: "800" },
  linkDescription: { color: COLORS.textSecondary, fontSize: FONT_SIZE.sm, lineHeight: 20, marginTop: 2 },
  arrow: { color: ROLE_COLORS.affected.main, fontSize: 32 },
});
