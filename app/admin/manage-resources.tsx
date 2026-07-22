import { Stack, useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import AppButton from "../../components/AppButton";
import Card from "../../components/Card";
import Screen from "../../components/Screen";
import SectionTitle from "../../components/SectionTitle";
import StatusBadge from "../../components/StatusBadge";
import { COLORS, FONT_SIZE, SPACING } from "../../constants/theme";
import { useAppContext } from "../../context/AppContext";

export default function ManageResourcesScreen() {
  const router = useRouter();
  const { resources, organizationStatus, nearbyResources } = useAppContext();

  return (
    <Screen>
      <Stack.Screen options={{ title: "Resources & Shelters" }} />
      <SectionTitle title="Manage Resources & Shelters" subtitle="Iteration 2 demo: coordinator view of resource records and availability." />

      <Card accentColor={COLORS.warning} style={styles.iterationCard}>
        <Text style={styles.iterationLabel}>ITERATION 2 FEATURE</Text>
        <Text style={styles.iterationText}>Future version: admin editing, organization ownership, audit history, and Supabase synchronization.</Text>
      </Card>

      <Card accentColor={COLORS.success}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>Progress Shelter Summary</Text>
          <StatusBadge label={organizationStatus.status} />
        </View>
        <Summary label="Beds" value={String(resources.beds)} />
        <Summary label="Food units" value={String(resources.food)} />
        <Summary label="Water units" value={String(resources.water)} />
        <Summary label="Operating hours" value={resources.operatingHours} />
        <Summary label="Contact" value={resources.contactNumber} />
        <AppButton title="Open Organization Resource Form" onPress={() => router.push("/organization/update-resources")} variant="secondary" />
      </Card>

      <Text style={styles.listTitle}>Resource directory</Text>
      {nearbyResources.map((resource) => (
        <Card key={resource.id}>
          <View style={styles.headerRow}>
            <View style={styles.flex}>
              <Text style={styles.resourceName}>{resource.name}</Text>
              <Text style={styles.resourceMeta}>{resource.category} • {resource.address}</Text>
            </View>
            <StatusBadge label={resource.status} />
          </View>
          <Text style={styles.availability}>{resource.availability}</Text>
        </Card>
      ))}
    </Screen>
  );
}

function Summary({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.summaryRow}>
      <Text style={styles.summaryLabel}>{label}</Text>
      <Text style={styles.summaryValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  iterationCard: { backgroundColor: COLORS.warningLight },
  iterationLabel: { color: COLORS.warning, fontSize: FONT_SIZE.xs, fontWeight: "900" },
  iterationText: { color: COLORS.textSecondary, fontSize: FONT_SIZE.sm, lineHeight: 20, marginTop: SPACING.xs },
  headerRow: { flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", gap: SPACING.sm },
  flex: { flex: 1 },
  title: { color: COLORS.text, fontSize: FONT_SIZE.lg, fontWeight: "900" },
  summaryRow: { flexDirection: "row", justifyContent: "space-between", borderTopColor: COLORS.border, borderTopWidth: 1, paddingVertical: SPACING.md, gap: SPACING.md },
  summaryLabel: { color: COLORS.textSecondary, fontSize: FONT_SIZE.sm },
  summaryValue: { flex: 1, color: COLORS.text, fontSize: FONT_SIZE.sm, fontWeight: "700", textAlign: "right" },
  listTitle: { color: COLORS.text, fontSize: FONT_SIZE.lg, fontWeight: "900", marginVertical: SPACING.md },
  resourceName: { color: COLORS.text, fontSize: FONT_SIZE.md, fontWeight: "900" },
  resourceMeta: { color: COLORS.textSecondary, fontSize: FONT_SIZE.xs, lineHeight: 17, marginTop: 2 },
  availability: { color: COLORS.text, fontSize: FONT_SIZE.sm, marginTop: SPACING.md },
});
