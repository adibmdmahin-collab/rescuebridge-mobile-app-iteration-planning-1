import { Stack, useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import AppButton from "../../components/AppButton";
import Card from "../../components/Card";
import FormInput from "../../components/FormInput";
import Screen from "../../components/Screen";
import SectionTitle from "../../components/SectionTitle";
import { COLORS, FONT_SIZE, RADIUS, SPACING } from "../../constants/theme";
import { useAppContext } from "../../context/AppContext";

export default function VolunteerVerificationFormScreen() {
  const router = useRouter();
  const { currentVolunteer, submitVolunteerVerification } = useAppContext();
  const [idDocument, setIdDocument] = useState(currentVolunteer.idDocument);
  const [policeCheck, setPoliceCheck] = useState(currentVolunteer.policeCheck);
  const [emergencyContact, setEmergencyContact] = useState(currentVolunteer.emergencyContact);
  const [safetyAgreement, setSafetyAgreement] = useState(currentVolunteer.safetyAgreement);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [confirmation, setConfirmation] = useState("");

  const submit = () => {
    const nextErrors: Record<string, string> = {};
    if (!idDocument.trim()) nextErrors.idDocument = "Enter an ID document name or demo reference.";
    if (!policeCheck.trim()) nextErrors.policeCheck = "Enter a police-check reference or placeholder.";
    if (!emergencyContact.trim()) nextErrors.emergencyContact = "Enter an emergency contact name and phone number.";
    if (!safetyAgreement) nextErrors.safetyAgreement = "You must accept the safety agreement.";

    setErrors(nextErrors);
    setConfirmation("");
    if (Object.keys(nextErrors).length > 0) return;

    submitVolunteerVerification({
      idDocument: idDocument.trim(),
      policeCheck: policeCheck.trim(),
      emergencyContact: emergencyContact.trim(),
      safetyAgreement,
    });
    setConfirmation("Verification information was submitted. Status is now Pending.");
  };

  return (
    <Screen>
      <Stack.Screen options={{ title: "Volunteer Verification" }} />
      <SectionTitle
        title="Submit Verification Information"
        subtitle="This prototype stores document names or references only. It does not upload real files."
      />

      <Card accentColor={COLORS.warning} style={styles.noticeCard}>
        <Text style={styles.noticeTitle}>Demo information only</Text>
        <Text style={styles.noticeText}>Do not enter real identity or police-record information in this classroom prototype.</Text>
      </Card>

      <FormInput
        label="ID document placeholder"
        required
        placeholder="Example: Ontario ID - DEMO-1024"
        value={idDocument}
        onChangeText={setIdDocument}
        error={errors.idDocument}
      />
      <FormInput
        label="Police-check placeholder"
        required
        placeholder="Example: Police check reference - PC-4401"
        value={policeCheck}
        onChangeText={setPoliceCheck}
        error={errors.policeCheck}
      />
      <FormInput
        label="Emergency contact"
        required
        placeholder="Name and phone number"
        value={emergencyContact}
        onChangeText={setEmergencyContact}
        error={errors.emergencyContact}
      />

      <Pressable
        accessibilityRole="checkbox"
        accessibilityState={{ checked: safetyAgreement }}
        onPress={() => {
          setSafetyAgreement((value) => !value);
          setErrors((current) => ({ ...current, safetyAgreement: "" }));
        }}
        style={[styles.checkboxRow, safetyAgreement && styles.checkboxRowSelected]}
      >
        <View style={[styles.checkbox, safetyAgreement && styles.checkboxSelected]}>
          {safetyAgreement ? <Text style={styles.checkmark}>✓</Text> : null}
        </View>
        <Text style={styles.checkboxText}>
          I agree to follow coordinator instructions, respect privacy, and complete only tasks I can perform safely.
        </Text>
      </Pressable>
      {errors.safetyAgreement ? <Text style={styles.error}>{errors.safetyAgreement}</Text> : null}

      {confirmation ? (
        <Card accentColor={COLORS.success} style={styles.successCard}>
          <Text style={styles.successTitle}>Submitted successfully</Text>
          <Text style={styles.successText}>{confirmation}</Text>
          <AppButton title="View Verification Status" onPress={() => router.push("/volunteer/verification-status")} variant="success" />
        </Card>
      ) : null}

      <AppButton title="Submit Verification" onPress={submit} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  noticeCard: { backgroundColor: COLORS.warningLight },
  noticeTitle: { color: COLORS.text, fontSize: FONT_SIZE.sm, fontWeight: "800" },
  noticeText: { color: COLORS.textSecondary, fontSize: FONT_SIZE.xs, lineHeight: 18, marginTop: SPACING.xs },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    borderColor: COLORS.border,
    borderWidth: 1,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
  },
  checkboxRowSelected: { borderColor: COLORS.primary, backgroundColor: COLORS.primaryLight },
  checkbox: {
    width: 24,
    height: 24,
    borderColor: COLORS.borderStrong,
    borderWidth: 2,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginRight: SPACING.md,
  },
  checkboxSelected: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  checkmark: { color: COLORS.white, fontWeight: "900" },
  checkboxText: { flex: 1, color: COLORS.text, fontSize: FONT_SIZE.sm, lineHeight: 20 },
  error: { color: COLORS.emergency, fontSize: FONT_SIZE.xs, marginBottom: SPACING.lg },
  successCard: { backgroundColor: COLORS.successLight },
  successTitle: { color: COLORS.success, fontSize: FONT_SIZE.lg, fontWeight: "900" },
  successText: { color: COLORS.textSecondary, fontSize: FONT_SIZE.sm, marginVertical: SPACING.sm },
});
