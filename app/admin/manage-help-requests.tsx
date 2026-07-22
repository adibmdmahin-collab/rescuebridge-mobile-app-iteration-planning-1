import { Stack } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import AppButton from "../../components/AppButton";
import Card from "../../components/Card";
import EmptyState from "../../components/EmptyState";
import Screen from "../../components/Screen";
import SectionTitle from "../../components/SectionTitle";
import SelectOption from "../../components/SelectOption";
import StatusBadge from "../../components/StatusBadge";
import { COLORS, FONT_SIZE, SPACING } from "../../constants/theme";
import { useAppContext } from "../../context/AppContext";
import type { HelpRequest, HelpRequestStatus } from "../../types";

const requestStatuses: HelpRequestStatus[] = ["Pending", "Active", "Resolved"];

export default function ManageHelpRequestsScreen() {
  const {
    helpRequests,
    volunteers,
    updateHelpRequestStatus,
    assignVolunteerToRequest,
  } = useAppContext();
  const [expandedId, setExpandedId] = useState<string | null>(helpRequests[0]?.id ?? null);
  const [feedback, setFeedback] = useState("");
  const verifiedVolunteers = volunteers.filter((volunteer) => volunteer.status === "Verified");

  const updateStatus = (request: HelpRequest, status: HelpRequestStatus) => {
    updateHelpRequestStatus(request.id, status);
    setFeedback(`${request.type} request was updated to ${status}.`);
  };

  const assign = (request: HelpRequest, volunteerId: string) => {
    const volunteer = verifiedVolunteers.find((item) => item.id === volunteerId);
    assignVolunteerToRequest(request.id, volunteerId);
    setFeedback(`${volunteer?.name ?? "Volunteer"} was assigned to the ${request.type.toLowerCase()} request.`);
  };

  return (
    <Screen>
      <Stack.Screen options={{ title: "Manage Help Requests" }} />
      <SectionTitle
        title="Manage Help Requests"
        subtitle="Review urgency, inspect details, update status, assign a verified volunteer, or resolve a request."
      />

      {feedback ? (
        <Card accentColor={COLORS.success} style={styles.feedbackCard}>
          <Text style={styles.feedbackText}>{feedback}</Text>
        </Card>
      ) : null}

      {helpRequests.length === 0 ? (
        <EmptyState icon="🆘" title="No help requests" message="New requests submitted by affected individuals will appear here." />
      ) : (
        helpRequests.map((request) => {
          const expanded = expandedId === request.id;
          return (
            <Card key={request.id} accentColor={request.priority === "Urgent" ? COLORS.emergency : COLORS.primary}>
              <View style={styles.headerRow}>
                <View style={styles.titleWrap}>
                  <Text style={styles.title}>{request.type} Request</Text>
                  <Text style={styles.location}>{request.location}</Text>
                </View>
                <View style={styles.badges}>
                  <StatusBadge label={request.priority} />
                  <StatusBadge label={request.status} />
                </View>
              </View>

              <AppButton
                title={expanded ? "Hide Details" : "Open Request Details"}
                onPress={() => setExpandedId(expanded ? null : request.id)}
                variant="outline"
              />

              {expanded ? (
                <View style={styles.details}>
                  <Detail label="Description" value={request.description} />
                  <Detail label="Assigned volunteer" value={request.assignedVolunteerName ?? "None assigned"} />

                  <Text style={styles.sectionLabel}>Update request status</Text>
                  <View style={styles.buttonRow}>
                    {requestStatuses.map((status) => (
                      <AppButton
                        key={status}
                        title={status}
                        onPress={() => updateStatus(request, status)}
                        variant={
                          status === "Resolved"
                            ? "success"
                            : request.status === status
                              ? "primary"
                              : "outline"
                        }
                        style={styles.flex}
                      />
                    ))}
                  </View>

                  <Text style={styles.sectionLabel}>Assign verified volunteer</Text>
                  {verifiedVolunteers.length === 0 ? (
                    <Text style={styles.noVolunteer}>No verified volunteers are currently available.</Text>
                  ) : (
                    verifiedVolunteers.map((volunteer) => (
                      <SelectOption
                        key={volunteer.id}
                        label={volunteer.name}
                        description={volunteer.email}
                        selected={request.assignedVolunteerId === volunteer.id}
                        onPress={() => assign(request, volunteer.id)}
                      />
                    ))
                  )}

                  <AppButton
                    title="Resolve Request"
                    onPress={() => updateStatus(request, "Resolved")}
                    variant="success"
                    disabled={request.status === "Resolved"}
                  />
                </View>
              ) : null}
            </Card>
          );
        })
      )}
    </Screen>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  feedbackCard: { backgroundColor: COLORS.successLight },
  feedbackText: { color: COLORS.success, fontSize: FONT_SIZE.sm, fontWeight: "800" },
  headerRow: { flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", gap: SPACING.sm },
  titleWrap: { flex: 1 },
  title: { color: COLORS.text, fontSize: FONT_SIZE.lg, fontWeight: "900" },
  location: { color: COLORS.textSecondary, fontSize: FONT_SIZE.xs, lineHeight: 17, marginTop: 2 },
  badges: { alignItems: "flex-end", gap: SPACING.xs },
  details: { borderTopColor: COLORS.border, borderTopWidth: 1, marginTop: SPACING.md, paddingTop: SPACING.md },
  detailRow: { marginBottom: SPACING.md },
  detailLabel: { color: COLORS.textMuted, fontSize: FONT_SIZE.xs, fontWeight: "800", textTransform: "uppercase" },
  detailValue: { color: COLORS.text, fontSize: FONT_SIZE.sm, lineHeight: 20, marginTop: SPACING.xs },
  sectionLabel: { color: COLORS.text, fontSize: FONT_SIZE.sm, fontWeight: "900", marginTop: SPACING.sm, marginBottom: SPACING.sm },
  buttonRow: { flexDirection: "row", gap: SPACING.xs, marginBottom: SPACING.md },
  flex: { flex: 1, paddingHorizontal: SPACING.xs },
  noVolunteer: { color: COLORS.textMuted, fontSize: FONT_SIZE.sm, marginBottom: SPACING.md },
});
