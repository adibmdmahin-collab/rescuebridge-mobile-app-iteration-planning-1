import { Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import Card from "../../components/Card";
import EmptyState from "../../components/EmptyState";
import Screen from "../../components/Screen";
import SectionTitle from "../../components/SectionTitle";
import StatusBadge from "../../components/StatusBadge";
import { COLORS, FONT_SIZE, SPACING } from "../../constants/theme";
import { useAppContext } from "../../context/AppContext";

export default function OrganizationAlertsScreen() {
  const { alerts } = useAppContext();

  return (
    <Screen>
      <Stack.Screen options={{ title: "Alerts & Resource Updates" }} />
      <SectionTitle
        title="Alerts & Updates"
        subtitle="Iteration 2 demo: announcements, resource warnings, update times, and required actions."
      />

      <Card accentColor={COLORS.warning} style={styles.iterationCard}>
        <Text style={styles.iterationLabel}>ITERATION 2 FEATURE</Text>
        <Text style={styles.iterationText}>Future version: organization subscriptions, read status, and staff action tracking.</Text>
      </Card>

      {alerts.length === 0 ? (
        <EmptyState icon="🔔" title="No updates" message="Organization announcements will appear here." />
      ) : (
        alerts.map((alert) => (
          <Card key={alert.id} accentColor={alert.type === "Resource" ? COLORS.warning : COLORS.primary}>
            <View style={styles.headerRow}>
              <View style={styles.titleWrap}>
                <Text style={styles.title}>{alert.title}</Text>
                <Text style={styles.meta}>{alert.type} • {alert.area}</Text>
              </View>
              <StatusBadge label={alert.priority} />
            </View>
            <Text style={styles.message}>{alert.message}</Text>
            <Text style={styles.updated}>Updated {new Date(alert.createdAt).toLocaleString()}</Text>
            {alert.instructions ? <Text style={styles.action}>Recommended action: {alert.instructions}</Text> : null}
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
  titleWrap: { flex: 1 },
  title: { color: COLORS.text, fontSize: FONT_SIZE.lg, fontWeight: "900" },
  meta: { color: COLORS.textSecondary, fontSize: FONT_SIZE.xs, marginTop: 2 },
  message: { color: COLORS.text, fontSize: FONT_SIZE.sm, lineHeight: 20, marginTop: SPACING.md },
  updated: { color: COLORS.textMuted, fontSize: FONT_SIZE.xs, marginTop: SPACING.sm },
  action: { color: COLORS.primaryDark, fontSize: FONT_SIZE.sm, lineHeight: 20, fontWeight: "700", marginTop: SPACING.md },
});
