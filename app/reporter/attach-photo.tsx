import { Stack, useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import AppButton from "../../components/AppButton";
import Card from "../../components/Card";
import FormInput from "../../components/FormInput";
import Screen from "../../components/Screen";
import SectionTitle from "../../components/SectionTitle";
import { COLORS, FONT_SIZE, RADIUS, SPACING } from "../../constants/theme";
import { useAppContext } from "../../context/AppContext";

export default function AttachPhotoScreen() {
  const router = useRouter();
  const { reportDraft, updateReportDraft } = useAppContext();

  return (
    <Screen>
      <Stack.Screen options={{ title: "Optional Photo" }} />
      <SectionTitle title="Attach Optional Photo" subtitle="Iteration 2 placeholder: enter a demo filename or skip this step." />

      <Card accentColor={COLORS.warning} style={styles.iterationCard}>
        <Text style={styles.iterationLabel}>ITERATION 2 FEATURE</Text>
        <Text style={styles.iterationText}>Supabase Storage or Expo Image Picker can be connected later. No real photo is uploaded now.</Text>
      </Card>

      <View style={styles.photoBox}>
        <Text style={styles.photoIcon}>📷</Text>
        <Text style={styles.photoTitle}>{reportDraft.photoName || "Photo preview box"}</Text>
        <Text style={styles.photoText}>Use a filename only for the current mock demonstration.</Text>
      </View>

      <FormInput
        label="Demo photo filename"
        placeholder="Example: flooded-road.jpg"
        value={reportDraft.photoName}
        onChangeText={(photoName) => updateReportDraft({ photoName })}
      />

      <AppButton title="Continue with Photo" onPress={() => router.push("/reporter/submit-incident")} />
      <AppButton
        title="Skip and Continue"
        onPress={() => {
          updateReportDraft({ photoName: "" });
          router.push("/reporter/submit-incident");
        }}
        variant="outline"
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  iterationCard: { backgroundColor: COLORS.warningLight },
  iterationLabel: { color: COLORS.warning, fontSize: FONT_SIZE.xs, fontWeight: "900" },
  iterationText: { color: COLORS.textSecondary, fontSize: FONT_SIZE.sm, lineHeight: 20, marginTop: SPACING.xs },
  photoBox: {
    minHeight: 210,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.surface,
    borderColor: COLORS.borderStrong,
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  photoIcon: { fontSize: 44 },
  photoTitle: { color: COLORS.text, fontSize: FONT_SIZE.lg, fontWeight: "900", marginTop: SPACING.sm },
  photoText: { color: COLORS.textSecondary, fontSize: FONT_SIZE.sm, textAlign: "center", marginTop: SPACING.xs },
});
