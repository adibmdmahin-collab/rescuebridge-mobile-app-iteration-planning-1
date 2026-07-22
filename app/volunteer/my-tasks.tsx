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
import type { TaskStatus, VolunteerTask } from "../../types";

const sections: Exclude<TaskStatus, "Available">[] = ["Accepted", "Active", "Completed"];

export default function MyTasksScreen() {
  const router = useRouter();
  const { tasks, currentVolunteer, updateTaskStatus } = useAppContext();
  const myTasks = tasks.filter((task) => task.assignedVolunteerId === currentVolunteer.id);

  return (
    <Screen>
      <Stack.Screen options={{ title: "My Tasks" }} />
      <SectionTitle
        title="My Tasks"
        subtitle="Move tasks from Accepted to Active, then mark them Completed when the work is finished."
      />

      {myTasks.length === 0 ? (
        <EmptyState
          icon="🧰"
          title="No accepted tasks"
          message="Accept an available task and it will appear here."
          actionTitle="View Available Tasks"
          onAction={() => router.push("/volunteer/available-tasks")}
        />
      ) : (
        sections.map((section) => {
          const items = myTasks.filter((task) => task.status === section);
          return (
            <View key={section} style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>{section}</Text>
                <StatusBadge label={String(items.length)} tone={section === "Completed" ? "completed" : section === "Active" ? "active" : "accepted"} />
              </View>
              {items.length === 0 ? (
                <Text style={styles.emptySection}>No {section.toLowerCase()} tasks.</Text>
              ) : (
                items.map((task) => (
                  <TaskCard key={task.id} task={task} updateTaskStatus={updateTaskStatus} />
                ))
              )}
            </View>
          );
        })
      )}
    </Screen>
  );
}

function TaskCard({
  task,
  updateTaskStatus,
}: {
  task: VolunteerTask;
  updateTaskStatus: (taskId: string, status: "Accepted" | "Active" | "Completed") => void;
}) {
  return (
    <Card accentColor={task.status === "Completed" ? COLORS.success : task.priority === "Urgent" ? COLORS.emergency : COLORS.primary}>
      <View style={styles.taskHeader}>
        <View style={styles.taskTitleWrap}>
          <Text style={styles.taskTitle}>{task.title}</Text>
          <Text style={styles.taskLocation}>{task.location}</Text>
        </View>
        <StatusBadge label={task.status} />
      </View>
      <Text style={styles.taskDescription}>{task.description}</Text>
      {task.status === "Accepted" ? (
        <AppButton title="Mark Active" onPress={() => updateTaskStatus(task.id, "Active")} />
      ) : task.status === "Active" ? (
        <AppButton title="Mark Completed" onPress={() => updateTaskStatus(task.id, "Completed")} variant="success" />
      ) : (
        <Text style={styles.completedText}>Completed task retained for progress history.</Text>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  section: { marginBottom: SPACING.xl },
  sectionHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: SPACING.sm },
  sectionTitle: { color: COLORS.text, fontSize: FONT_SIZE.lg, fontWeight: "900" },
  emptySection: { color: COLORS.textMuted, fontSize: FONT_SIZE.sm, fontStyle: "italic", marginBottom: SPACING.sm },
  taskHeader: { flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", gap: SPACING.sm },
  taskTitleWrap: { flex: 1 },
  taskTitle: { color: COLORS.text, fontSize: FONT_SIZE.lg, fontWeight: "900" },
  taskLocation: { color: COLORS.textSecondary, fontSize: FONT_SIZE.xs, marginTop: 2 },
  taskDescription: { color: COLORS.textSecondary, fontSize: FONT_SIZE.sm, lineHeight: 20, marginVertical: SPACING.md },
  completedText: { color: COLORS.success, fontSize: FONT_SIZE.sm, fontWeight: "700" },
});
