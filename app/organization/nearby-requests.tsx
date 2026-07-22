import { Stack } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Card from "../../components/Card";
import EmptyState from "../../components/EmptyState";
import Screen from "../../components/Screen";
import SectionTitle from "../../components/SectionTitle";
import SelectOption from "../../components/SelectOption";
import StatusBadge from "../../components/StatusBadge";
import { COLORS, FONT_SIZE, SPACING } from "../../constants/theme";
import { useAppContext } from "../../context/AppContext";

const filters = ["All", "Urgent", "Shelter"] as const;
type Filter = (typeof filters)[number];

export default function NearbyRequestsScreen() {
  const { helpRequests } = useAppContext();
  const [filter, setFilter] = useState<Filter>("All");
  const visible = helpRequests.filter((request) => {
    if (request.status === "Resolved") return false;
    if (filter === "Urgent") return request.priority === "Urgent";
    if (filter === "Shelter") return request.type === "Shelter";
    return true;
  });

  return (
    <Screen>
      <Stack.Screen options={{ title: "Nearby Requests" }} />
      <SectionTitle
        title="Nearby Requests"
        subtitle="Iteration 2 demo: filter open requests and identify urgent needs quickly."
      />

      <Card accentColor={COLORS.warning} style={styles.iterationCard}>
        <Text style={styles.iterationLabel}>ITERATION 2 FEATURE</Text>
        <Text style={styles.iterationText}>Future version: location radius, organization service matching, and live request updates.</Text>
      </Card>

      <View style={styles.filters}>
        {filters.map((item) => (
          <SelectOption key={item} label={item} compact selected={filter === item} onPress={() => setFilter(item)} />
        ))}
      </View>

      {visible.length === 0 ? (
        <EmptyState icon="📍" title="No matching requests" message="Try another filter or wait for new requests." />
      ) : (
        visible.map((request) => (
          <Card key={request.id} accentColor={request.priority === "Urgent" ? COLORS.emergency : COLORS.primary}>
            <View style={styles.headerRow}>
              <View style={styles.titleWrap}>
                <Text style={styles.title}>{request.type} Request</Text>
                <Text style={styles.location}>{request.location}</Text>
              </View>
              <StatusBadge label={request.priority} />
            </View>
            <Text style={styles.description}>{request.description}</Text>
            <StatusBadge label={request.status} />
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
  filters: { flexDirection: "row", flexWrap: "wrap", marginBottom: SPACING.md },
  headerRow: { flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", gap: SPACING.sm },
  titleWrap: { flex: 1 },
  title: { color: COLORS.text, fontSize: FONT_SIZE.lg, fontWeight: "900" },
  location: { color: COLORS.textSecondary, fontSize: FONT_SIZE.xs, marginTop: 2 },
  description: { color: COLORS.text, fontSize: FONT_SIZE.sm, lineHeight: 20, marginVertical: SPACING.md },
});
