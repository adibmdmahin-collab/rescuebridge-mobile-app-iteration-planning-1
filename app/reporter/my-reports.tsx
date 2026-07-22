import { Stack, useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import AppButton from "../../components/AppButton";
import Card from "../../components/Card";
import EmptyState from "../../components/EmptyState";
import Screen from "../../components/Screen";
import SectionTitle from "../../components/SectionTitle";
import StatusBadge from "../../components/StatusBadge";
import { COLORS, FONT_SIZE, SPACING } from "../../constants/theme";
import { useAppContext } from "../../context/AppContext";

export default function MyReportsScreen() {
  const router = useRouter();
  const { incidentReports } = useAppContext();

  return (
    <Screen>
      <Stack.Screen options={{ title: "My Reports" }} />
      <SectionTitle title="My Incident Reports" subtitle="Iteration 2 demo: each report shows its latest coordinator status." />

      <Card accentColor={COLORS.warning} style={styles.iterationCard}>
        <Text style={styles.iterationLabel}>ITERATION 2 FEATURE</Text>
        <Text style={styles.iterationText}>Future version: reporter-specific records, live updates, comments, and Supabase subscriptions.</Text>
      </Card>

      {incidentReports.length === 0 ? (
        <EmptyState
          icon="📋"
          title="No reports"
          message="Submitted incident reports will appear here."
          actionTitle="Create Incident"
          onAction={() => router.push("/reporter/create-incident")}
        />
      ) : (
        incidentReports.map((report) => (
          <Card key={report.id} accentColor={report.status === "Resolved" ? COLORS.success : report.urgency === "Urgent" ? COLORS.emergency : COLORS.primary}>
            <View style={styles.headerRow}>
              <View style={styles.flex}>
                <Text style={styles.title}>{report.type}</Text>
                <Text style={styles.location}>{report.location}</Text>
              </View>
              <StatusBadge label={report.status} />
            </View>
            <View style={styles.priority}><StatusBadge label={report.urgency} /></View>
            <Text style={styles.description}>{report.description}</Text>
          </Card>
        ))
      )}

      <AppButton title="Create New Incident" onPress={() => router.push("/reporter/create-incident")} variant="secondary" />
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
  location: { color: COLORS.textSecondary, fontSize: FONT_SIZE.xs, marginTop: 2 },
  priority: { marginTop: SPACING.md },
  description: { color: COLORS.text, fontSize: FONT_SIZE.sm, lineHeight: 20, marginTop: SPACING.md },
});
