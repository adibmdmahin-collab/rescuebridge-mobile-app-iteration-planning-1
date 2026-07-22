import { Stack, useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import Card from "../components/Card";
import Screen from "../components/Screen";
import SectionTitle from "../components/SectionTitle";
import { COLORS, FONT_SIZE, ROLE_COLORS, SPACING } from "../constants/theme";

const roles = [
  {
    key: "affected",
    title: "Affected Individual",
    icon: "🆘",
    description: "Request emergency help, track requests, and view nearby support.",
    route: "/affected",
  },
  {
    key: "organization",
    title: "Organization Staff",
    icon: "🏥",
    description: "Update shelter resources, availability, status, and service information.",
    route: "/organization",
  },
  {
    key: "volunteer",
    title: "Volunteer",
    icon: "🤝",
    description: "Submit verification, find nearby tasks, and manage task progress.",
    route: "/volunteer",
  },
  {
    key: "admin",
    title: "Admin / Coordinator",
    icon: "🧭",
    description: "Coordinate requests, volunteers, resources, incidents, and alerts.",
    route: "/admin",
  },
  {
    key: "reporter",
    title: "Community Reporter",
    icon: "📍",
    description: "Report local incidents, track reports, and view safety notices.",
    route: "/reporter",
  },
] as const;

export default function HomeScreen() {
  const router = useRouter();

  return (
    <Screen>
      <Stack.Screen options={{ title: "RescueBridge" }} />

      <View style={styles.hero}>
        <Text style={styles.logo}>RB</Text>
        <View style={styles.heroText}>
          <Text style={styles.appName}>RescueBridge</Text>
          <Text style={styles.tagline}>Emergency support, coordinated clearly.</Text>
        </View>
      </View>

      <Card accentColor={COLORS.emergency} style={styles.emergencyCard}>
        <Text style={styles.emergencyTitle}>For immediate danger, contact emergency services.</Text>
        <Text style={styles.emergencyText}>
          This student prototype supports community coordination and does not replace 911.
        </Text>
      </Card>

      <SectionTitle
        title="Choose a role"
        subtitle="Select a demo role to open its dashboard. All information is stored locally as mock data."
      />

      {roles.map((role) => {
        const palette = ROLE_COLORS[role.key];
        return (
          <Card
            key={role.key}
            onPress={() => router.push(role.route)}
            accentColor={palette.main}
            style={{ backgroundColor: palette.light }}
          >
            <View style={styles.roleRow}>
              <Text style={styles.roleIcon}>{role.icon}</Text>
              <View style={styles.roleContent}>
                <Text style={[styles.roleTitle, { color: palette.main }]}>{role.title}</Text>
                <Text style={styles.roleDescription}>{role.description}</Text>
              </View>
              <Text style={[styles.arrow, { color: palette.main }]}>›</Text>
            </View>
          </Card>
        );
      })}

      <Text style={styles.footer}>T4M26 • COMP231 • Mock-data prototype</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.lg,
  },
  logo: {
    width: 58,
    height: 58,
    borderRadius: 16,
    backgroundColor: COLORS.emergency,
    color: COLORS.white,
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: FONT_SIZE.xl,
    fontWeight: "900",
    lineHeight: 58,
  },
  heroText: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  appName: {
    color: COLORS.text,
    fontSize: FONT_SIZE.xxl,
    fontWeight: "900",
  },
  tagline: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZE.sm,
    marginTop: 2,
  },
  emergencyCard: {
    backgroundColor: COLORS.emergencyLight,
    marginBottom: SPACING.xl,
  },
  emergencyTitle: {
    color: COLORS.emergencyDark,
    fontWeight: "800",
    fontSize: FONT_SIZE.md,
  },
  emergencyText: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZE.sm,
    lineHeight: 20,
    marginTop: SPACING.xs,
  },
  roleRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  roleIcon: {
    fontSize: 30,
    marginRight: SPACING.md,
  },
  roleContent: {
    flex: 1,
  },
  roleTitle: {
    fontSize: FONT_SIZE.lg,
    fontWeight: "900",
  },
  roleDescription: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZE.sm,
    lineHeight: 20,
    marginTop: SPACING.xs,
  },
  arrow: {
    fontSize: 34,
    fontWeight: "300",
    marginLeft: SPACING.sm,
  },
  footer: {
    color: COLORS.textMuted,
    fontSize: FONT_SIZE.xs,
    textAlign: "center",
    marginTop: SPACING.lg,
  },
});
