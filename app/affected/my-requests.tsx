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

const formatDate = (value: string) =>
  new Date(value).toLocaleString([], { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });

export default function MyRequestsScreen() {
  const router = useRouter();
  const { helpRequests } = useAppContext();

  return (
    <Screen>
      <Stack.Screen options={{ title: "My Requests" }} />
      <SectionTitle
        title="My Requests"
        subtitle="Each request shows its latest Pending, Active, or Resolved status."
      />

      {helpRequests.length === 0 ? (
        <EmptyState
          icon="📋"
          title="No requests yet"
          message="When you submit a help request, it will appear here with its current status."
          actionTitle="Request Help"
          onAction={() => router.push("/affected/submit-help")}
        />
      ) : (
        helpRequests.map((request) => (
          <Card key={request.id} accentColor={request.priority === "Urgent" ? COLORS.emergency : COLORS.primary}>
            <View style={styles.headerRow}>
              <View style={styles.titleWrap}>
                <Text style={styles.title}>{request.type} Request</Text>
                <Text style={styles.updated}>Updated {formatDate(request.updatedAt)}</Text>
              </View>
              <StatusBadge label={request.status} />
            </View>

            <View style={styles.badgeRow}>
              <StatusBadge label={request.priority} />
              {request.assignedVolunteerName ? (
                <Text style={styles.assignment}>Volunteer: {request.assignedVolunteerName}</Text>
              ) : (
                <Text style={styles.assignment}>Waiting for assignment</Text>
              )}
            </View>

            <Text style={styles.label}>Location</Text>
            <Text style={styles.value}>{request.location}</Text>
            <Text style={styles.label}>Description</Text>
            <Text style={styles.value}>{request.description}</Text>
          </Card>
        ))
      )}

      <AppButton title="Submit Another Request" onPress={() => router.push("/affected/submit-help")} variant="secondary" />
    </Screen>
  );
}

const styles = StyleSheet.create({
  headerRow: { flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", gap: SPACING.sm },
  titleWrap: { flex: 1 },
  title: { color: COLORS.text, fontSize: FONT_SIZE.lg, fontWeight: "900" },
  updated: { color: COLORS.textMuted, fontSize: FONT_SIZE.xs, marginTop: 2 },
  badgeRow: { flexDirection: "row", alignItems: "center", gap: SPACING.sm, marginVertical: SPACING.md },
  assignment: { flex: 1, color: COLORS.textSecondary, fontSize: FONT_SIZE.xs },
  label: { color: COLORS.textMuted, fontSize: FONT_SIZE.xs, fontWeight: "800", textTransform: "uppercase", marginTop: SPACING.sm },
  value: { color: COLORS.text, fontSize: FONT_SIZE.sm, lineHeight: 20, marginTop: 3 },
});
