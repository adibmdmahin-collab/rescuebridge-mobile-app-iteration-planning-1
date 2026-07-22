import { Stack, useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import AppButton from "../../components/AppButton";
import Card from "../../components/Card";
import EmptyState from "../../components/EmptyState";
import Screen from "../../components/Screen";
import SectionTitle from "../../components/SectionTitle";
import StatusBadge from "../../components/StatusBadge";
import { COLORS, FONT_SIZE, SPACING } from "../../constants/theme";
import { useAppContext } from "../../context/AppContext";

export default function AvailableTasksScreen() {
  const router = useRouter();
  const { currentVolunteer, tasks, acceptTask } = useAppContext();
  const [message, setMessage] = useState("");
  const availableTasks = tasks.filter((task) => task.status === "Available");
  const verified = currentVolunteer.status === "Verified";

  const accept = (taskId: string, title: string) => {
    const accepted = acceptTask(taskId);
    setMessage(
      accepted
        ? `${title} was moved to My Tasks with Accepted status.`
        : "The task could not be accepted. Confirm that the volunteer is Verified and the task is still available.",
    );
  };

  return (
    <Screen>
      <Stack.Screen options={{ title: "Available Tasks" }} />
      <SectionTitle
        title="Available & Nearby Tasks"
        subtitle="Task cards show type, priority, location, and urgency before acceptance."
      />

      {!verified ? (
        <Card accentColor={COLORS.emergency} style={styles.lockCard}>
          <Text style={styles.lockTitle}>Task access locked</Text>
          <Text style={styles.lockText}>
            {currentVolunteer.name} is currently {currentVolunteer.status}. Only Verified volunteers can accept tasks.
          </Text>
          <AppButton title="View Verification Status" onPress={() => router.push("/volunteer/verification-status")} variant="danger" />
        </Card>
      ) : null}

      {message ? (
        <Card accentColor={message.includes("moved") ? COLORS.success : COLORS.warning}>
          <Text style={styles.message}>{message}</Text>
          {message.includes("moved") ? (
            <AppButton title="Open My Tasks" onPress={() => router.push("/volunteer/my-tasks")} variant="success" />
          ) : null}
        </Card>
      ) : null}

      {availableTasks.length === 0 ? (
        <EmptyState icon="📌" title="No available tasks" message="New verified tasks will appear here when coordinators publish them." />
      ) : (
        availableTasks.map((task) => (
          <Card key={task.id} accentColor={task.priority === "Urgent" ? COLORS.emergency : COLORS.primary}>
            <View style={styles.headerRow}>
              <View style={styles.titleWrap}>
                <Text style={styles.title}>{task.title}</Text>
                <Text style={styles.type}>{task.type}</Text>
              </View>
              <StatusBadge label={task.priority} />
            </View>
            <Text style={styles.label}>General location</Text>
            <Text style={styles.value}>{task.location}</Text>
            <Text style={styles.label}>Urgency</Text>
            <Text style={styles.value}>{task.urgency}</Text>
            <Text style={styles.description}>{task.description}</Text>
            <View style={styles.buttonRow}>
              <AppButton
                title="View Details"
                onPress={() => router.push({ pathname: "/volunteer/task-details", params: { taskId: task.id } })}
                variant="outline"
                style={styles.flex}
              />
              <AppButton
                title="Accept Task"
                onPress={() => accept(task.id, task.title)}
                variant="success"
                disabled={!verified}
                style={styles.flex}
              />
            </View>
          </Card>
        ))
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  lockCard: { backgroundColor: COLORS.emergencyLight },
  lockTitle: { color: COLORS.emergencyDark, fontSize: FONT_SIZE.lg, fontWeight: "900" },
  lockText: { color: COLORS.textSecondary, fontSize: FONT_SIZE.sm, lineHeight: 20, marginVertical: SPACING.sm },
  message: { color: COLORS.text, fontSize: FONT_SIZE.sm, fontWeight: "700", lineHeight: 20 },
  headerRow: { flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", gap: SPACING.sm },
  titleWrap: { flex: 1 },
  title: { color: COLORS.text, fontSize: FONT_SIZE.lg, fontWeight: "900" },
  type: { color: COLORS.textSecondary, fontSize: FONT_SIZE.xs, marginTop: 2 },
  label: { color: COLORS.textMuted, fontSize: FONT_SIZE.xs, fontWeight: "800", textTransform: "uppercase", marginTop: SPACING.md },
  value: { color: COLORS.text, fontSize: FONT_SIZE.sm, marginTop: 3 },
  description: { color: COLORS.textSecondary, fontSize: FONT_SIZE.sm, lineHeight: 20, marginTop: SPACING.md },
  buttonRow: { flexDirection: "row", gap: SPACING.sm, marginTop: SPACING.md },
  flex: { flex: 1 },
});
