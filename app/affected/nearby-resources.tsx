import { Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import Card from "../../components/Card";
import Screen from "../../components/Screen";
import SectionTitle from "../../components/SectionTitle";
import StatusBadge from "../../components/StatusBadge";
import { COLORS, FONT_SIZE, SPACING } from "../../constants/theme";
import { useAppContext } from "../../context/AppContext";

export default function NearbyResourcesScreen() {
  const { nearbyResources } = useAppContext();

  return (
    <Screen>
      <Stack.Screen options={{ title: "Nearby Resources" }} />
      <SectionTitle
        title="Nearby Resources"
        subtitle="Iteration 2 demo: map integration will be added later. This screen currently uses realistic local mock data."
      />

      <Card accentColor={COLORS.warning} style={styles.iterationCard}>
        <Text style={styles.iterationLabel}>ITERATION 2 FEATURE</Text>
        <Text style={styles.iterationText}>Future version: GPS, distance sorting, map markers, and live Supabase resource data.</Text>
      </Card>

      <View style={styles.mapPlaceholder}>
        <Text style={styles.mapIcon}>🗺️</Text>
        <Text style={styles.mapTitle}>Map preview area</Text>
        <Text style={styles.mapText}>Google Maps or another map provider can be connected later.</Text>
      </View>

      {nearbyResources.map((resource) => (
        <Card key={resource.id} accentColor={resource.status === "Open" ? COLORS.success : COLORS.warning}>
          <View style={styles.headerRow}>
            <View style={styles.titleWrap}>
              <Text style={styles.title}>{resource.name}</Text>
              <Text style={styles.category}>{resource.category} • {resource.distance}</Text>
            </View>
            <StatusBadge label={resource.status} />
          </View>
          <Text style={styles.availability}>{resource.availability}</Text>
          <Text style={styles.address}>{resource.address}</Text>
        </Card>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  iterationCard: { backgroundColor: COLORS.warningLight },
  iterationLabel: { color: COLORS.warning, fontSize: FONT_SIZE.xs, fontWeight: "900" },
  iterationText: { color: COLORS.textSecondary, fontSize: FONT_SIZE.sm, lineHeight: 20, marginTop: SPACING.xs },
  mapPlaceholder: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 180,
    backgroundColor: COLORS.surface,
    borderColor: COLORS.borderStrong,
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 14,
    marginBottom: SPACING.lg,
    padding: SPACING.lg,
  },
  mapIcon: { fontSize: 42 },
  mapTitle: { color: COLORS.text, fontSize: FONT_SIZE.lg, fontWeight: "900", marginTop: SPACING.sm },
  mapText: { color: COLORS.textSecondary, fontSize: FONT_SIZE.sm, textAlign: "center", marginTop: SPACING.xs },
  headerRow: { flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", gap: SPACING.sm },
  titleWrap: { flex: 1 },
  title: { color: COLORS.text, fontSize: FONT_SIZE.lg, fontWeight: "900" },
  category: { color: COLORS.textSecondary, fontSize: FONT_SIZE.xs, marginTop: 2 },
  availability: { color: COLORS.text, fontSize: FONT_SIZE.sm, fontWeight: "700", marginTop: SPACING.md },
  address: { color: COLORS.textSecondary, fontSize: FONT_SIZE.sm, marginTop: SPACING.xs },
});
