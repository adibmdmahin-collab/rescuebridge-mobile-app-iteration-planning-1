import { Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import Card from "../../components/Card";
import EmptyState from "../../components/EmptyState";
import Screen from "../../components/Screen";
import SectionTitle from "../../components/SectionTitle";
import StatusBadge from "../../components/StatusBadge";
import { COLORS, FONT_SIZE, SPACING } from "../../constants/theme";
import { useAppContext } from "../../context/AppContext";

export default function AffectedAlertsScreen() {
  const { alerts } = useAppContext();

  return (
    <Screen>
      <Stack.Screen options={{ title: "Emergency Alerts" }} />
      <SectionTitle title="Alerts & Updates" subtitle="Iteration 2 demo notices with affected area and safety instructions." />

      <Card accentColor={COLORS.warning} style={styles.iterationCard}>
        <Text style={styles.iterationLabel}>ITERATION 2 FEATURE</Text>
        <Text style={styles.iterationText}>Future version: push notifications and geo-targeted alerts from Supabase-connected coordinators.</Text>
      </Card>

      {alerts.length === 0 ? (
        <EmptyState icon="🔔" title="No alerts" message="There are no current emergency warnings or updates." />
      ) : (
        alerts.map((alert) => (
          <Card key={alert.id} accentColor={alert.priority === "Urgent" ? COLORS.emergency : COLORS.primary}>
            <View style={styles.headerRow}>
              <View style={styles.titleWrap}>
                <Text style={styles.title}>{alert.title}</Text>
                <Text style={styles.area}>{alert.type} • {alert.area}</Text>
              </View>
              <StatusBadge label={alert.priority} />
            </View>
            <Text style={styles.message}>{alert.message}</Text>
            {alert.instructions ? (
              <View style={styles.instructions}>
                <Text style={styles.instructionsLabel}>What to do</Text>
                <Text style={styles.instructionsText}>{alert.instructions}</Text>
              </View>
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
  headerRow: { flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", gap: SPACING.sm },
  titleWrap: { flex: 1 },
  title: { color: COLORS.text, fontSize: FONT_SIZE.lg, fontWeight: "900" },
  area: { color: COLORS.textSecondary, fontSize: FONT_SIZE.xs, marginTop: 2 },
  message: { color: COLORS.text, fontSize: FONT_SIZE.sm, lineHeight: 20, marginTop: SPACING.md },
  instructions: { backgroundColor: COLORS.surfaceMuted, borderRadius: 10, padding: SPACING.md, marginTop: SPACING.md },
  instructionsLabel: { color: COLORS.textMuted, fontSize: FONT_SIZE.xs, fontWeight: "900", textTransform: "uppercase" },
  instructionsText: { color: COLORS.text, fontSize: FONT_SIZE.sm, lineHeight: 20, marginTop: SPACING.xs },
});
