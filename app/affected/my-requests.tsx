import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import AppButton from "../../components/AppButton";
import Card from "../../components/Card";
import EmptyState from "../../components/EmptyState";
import Screen from "../../components/Screen";
import SectionTitle from "../../components/SectionTitle";
import StatusBadge from "../../components/StatusBadge";
import { COLORS, FONT_SIZE, SPACING } from "../../constants/theme";
import { supabase } from "../../lib/supabase";

type HelpRequestRow = {
  id: string;
  help_type: string;
  location: string;
  description: string;
  priority: string;
  status: string;
  assigned_volunteer_id: string | null;
  created_at: string;
};

const formatDate = (value: string) =>
  new Date(value).toLocaleString([], {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

export default function MyRequestsScreen() {
  const router = useRouter();

  const [helpRequests, setHelpRequests] = useState<HelpRequestRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const loadHelpRequests = async () => {
    setIsLoading(true);
    setErrorMessage("");

    const { data, error } = await supabase
      .from("help_requests")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      setErrorMessage("Could not load help requests from Supabase.");
      setHelpRequests([]);
    } else {
      setHelpRequests(data || []);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    loadHelpRequests();
  }, []);

  return (
    <Screen>
      <Stack.Screen options={{ title: "My Requests" }} />

      <SectionTitle
        title="My Requests"
        subtitle="Requests are loaded from the Supabase help_requests table."
      />

      {isLoading ? (
        <Card>
          <Text style={styles.loadingText}>Loading requests...</Text>
        </Card>
      ) : errorMessage ? (
        <Card accentColor={COLORS.emergency} style={styles.errorCard}>
          <Text style={styles.errorTitle}>Database error</Text>
          <Text style={styles.errorText}>{errorMessage}</Text>
          <AppButton title="Try Again" onPress={loadHelpRequests} variant="danger" />
        </Card>
      ) : helpRequests.length === 0 ? (
        <EmptyState
          icon="📋"
          title="No requests yet"
          message="When you submit a help request, it will appear here from Supabase."
          actionTitle="Request Help"
          onAction={() => router.push("/affected/submit-help" as any)}
        />
      ) : (
        helpRequests.map((request) => (
          <Card
            key={request.id}
            accentColor={request.priority === "Urgent" ? COLORS.emergency : COLORS.primary}
          >
            <View style={styles.headerRow}>
              <View style={styles.titleWrap}>
                <Text style={styles.title}>{request.help_type} Request</Text>
                <Text style={styles.updated}>Created {formatDate(request.created_at)}</Text>
              </View>
              <StatusBadge label={request.status} />
            </View>

            <View style={styles.badgeRow}>
              <StatusBadge label={request.priority} />
              {request.assigned_volunteer_id ? (
                <Text style={styles.assignment}>Volunteer assigned</Text>
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

      <AppButton
        title="Submit Another Request"
        onPress={() => router.push("/affected/submit-help" as any)}
        variant="secondary"
      />

      <AppButton title="Refresh Requests" onPress={loadHelpRequests} variant="primary" />
    </Screen>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: SPACING.sm,
  },
  titleWrap: {
    flex: 1,
  },
  title: {
    color: COLORS.text,
    fontSize: FONT_SIZE.lg,
    fontWeight: "900",
  },
  updated: {
    color: COLORS.textMuted,
    fontSize: FONT_SIZE.xs,
    marginTop: 2,
  },
  badgeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
    marginVertical: SPACING.md,
  },
  assignment: {
    flex: 1,
    color: COLORS.textSecondary,
    fontSize: FONT_SIZE.xs,
  },
  label: {
    color: COLORS.textMuted,
    fontSize: FONT_SIZE.xs,
    fontWeight: "800",
    textTransform: "uppercase",
    marginTop: SPACING.sm,
  },
  value: {
    color: COLORS.text,
    fontSize: FONT_SIZE.sm,
    lineHeight: 20,
    marginTop: 3,
  },
  loadingText: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZE.sm,
  },
  errorCard: {
    backgroundColor: COLORS.emergencyLight,
  },
  errorTitle: {
    color: COLORS.emergencyDark,
    fontSize: FONT_SIZE.lg,
    fontWeight: "900",
  },
  errorText: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZE.sm,
    lineHeight: 20,
    marginVertical: SPACING.sm,
  },
});