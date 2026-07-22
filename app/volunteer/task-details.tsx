import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import AppButton from "../../components/AppButton";
import Card from "../../components/Card";
import EmptyState from "../../components/EmptyState";
import Screen from "../../components/Screen";
import SectionTitle from "../../components/SectionTitle";
import StatusBadge from "../../components/StatusBadge";
import { COLORS, FONT_SIZE, SPACING } from "../../constants/theme";
import { useAppContext } from "../../context/AppContext";

export default function TaskDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ taskId?: string | string[] }>();
  const taskId = Array.isArray(params.taskId) ? params.taskId[0] : params.taskId;
  const { tasks, currentVolunteer, acceptTask } = useAppContext();
  const task = tasks.find((item) => item.id === taskId);

  if (!task) {
    return (
      <Screen>
        <Stack.Screen options={{ title: "Task Details" }} />
        <EmptyState icon="?" title="Task not found" message="The selected task may no longer be available." actionTitle="Back to Tasks" onAction={() => router.replace("/volunteer/available-tasks")} />
      </Screen>
    );
  }

  const assignedToCurrent = task.assignedVolunteerId === currentVolunteer.id;
  const canAccept = currentVolunteer.status === "Verified" && task.status === "Available";

  return (
    <Screen>
      <Stack.Screen options={{ title: "Task Details" }} />
      <SectionTitle title={task.title} subtitle="Confirm that you understand the task before accepting it." />

      <Card accentColor={task.priority === "Urgent" ? COLORS.emergency : COLORS.primary}>
        <View style={styles.badges}>
          <StatusBadge label={task.priority} />
          <StatusBadge label={task.status} />
        </View>
        <Detail label="Task type" value={task.type} />
        <Detail label="General location" value={task.location} />
        <Detail label="Urgency" value={task.urgency} />
        <Detail label="Instructions" value={task.description} />
        {task.assignedVolunteerName ? <Detail label="Assigned volunteer" value={task.assignedVolunteerName} /> : null}
      </Card>

      {canAccept ? (
        <AppButton
          title="Accept Task"
          onPress={() => {
            acceptTask(task.id);
            router.replace("/volunteer/my-tasks");
          }}
          variant="success"
        />
      ) : assignedToCurrent ? (
        <AppButton title="Open My Tasks" onPress={() => router.replace("/volunteer/my-tasks")} />
      ) : (
        <Card accentColor={COLORS.warning}>
          <Text style={styles.notice}>
            {currentVolunteer.status !== "Verified"
              ? "Task acceptance is locked until the volunteer is Verified."
              : "This task is no longer available for acceptance."}
          </Text>
        </Card>
      )}
    </Screen>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.detail}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badges: { flexDirection: "row", gap: SPACING.sm, marginBottom: SPACING.sm },
  detail: { borderTopColor: COLORS.border, borderTopWidth: 1, paddingTop: SPACING.md, marginTop: SPACING.md },
  label: { color: COLORS.textMuted, fontSize: FONT_SIZE.xs, fontWeight: "800", textTransform: "uppercase" },
  value: { color: COLORS.text, fontSize: FONT_SIZE.sm, lineHeight: 20, marginTop: SPACING.xs },
  notice: { color: COLORS.text, fontSize: FONT_SIZE.sm, lineHeight: 20 },
});
