import { Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import Card from "../../components/Card";
import EmptyState from "../../components/EmptyState";
import Screen from "../../components/Screen";
import SectionTitle from "../../components/SectionTitle";
import StatusBadge from "../../components/StatusBadge";
import { COLORS, FONT_SIZE, SPACING } from "../../constants/theme";
import { useAppContext } from "../../context/AppContext";

export default function CommunityAlertsScreen() {
  const { alerts } = useAppContext();

  return (
    <Screen>
      <Stack.Screen options={{ title: "Community Alerts" }} />
      <SectionTitle title="Community Alerts" subtitle="Iteration 2 demo: safety notices, incident updates, affected areas, and instructions." />

      <Card accentColor={COLORS.warning} style={styles.iterationCard}>
        <Text style={styles.iterationLabel}>ITERATION 2 FEATURE</Text>
        <Text style={styles.iterationText}>Future version: location-aware alert filtering and real-time coordinator updates.</Text>
      </Card>

      {alerts.length === 0 ? (
        <EmptyState icon="⚠️" title="No community alerts" message="Safety notices will appear here." />
      ) : (
        alerts.map((alert) => (
          <Card key={alert.id} accentColor={alert.priority === "Urgent" ? COLORS.emergency : COLORS.primary}>
            <View style={styles.headerRow}>
              <View style={styles.flex}>
                <Text style={styles.title}>{alert.title}</Text>
                <Text style={styles.area}>Affected: {alert.area}</Text>
              </View>
              <StatusBadge label={alert.priority} />
            </View>
            <Text style={styles.message}>{alert.message}</Text>
            <View style={styles.detailBox}>
              <Text style={styles.detailLabel}>Instructions</Text>
              <Text style={styles.detailText}>{alert.instructions || "Follow official instructions and avoid unsafe areas."}</Text>
            </View>
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
  headerRow: { flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", gap: SPACING.sm },
  flex: { flex: 1 },
  title: { color: COLORS.text, fontSize: FONT_SIZE.lg, fontWeight: "900" },
  area: { color: COLORS.textSecondary, fontSize: FONT_SIZE.xs, marginTop: 2 },
  message: { color: COLORS.text, fontSize: FONT_SIZE.sm, lineHeight: 20, marginTop: SPACING.md },
  detailBox: { backgroundColor: COLORS.surfaceMuted, borderRadius: 10, padding: SPACING.md, marginTop: SPACING.md },
  detailLabel: { color: COLORS.textMuted, fontSize: FONT_SIZE.xs, fontWeight: "900", textTransform: "uppercase" },
  detailText: { color: COLORS.text, fontSize: FONT_SIZE.sm, lineHeight: 20, marginTop: SPACING.xs },
});
