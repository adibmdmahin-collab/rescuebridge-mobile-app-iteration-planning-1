import { Stack, useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text } from "react-native";
import AppButton from "../../components/AppButton";
import Card from "../../components/Card";
import FormInput from "../../components/FormInput";
import Screen from "../../components/Screen";
import SectionTitle from "../../components/SectionTitle";
import { COLORS, FONT_SIZE, SPACING } from "../../constants/theme";
import { useAppContext } from "../../context/AppContext";

export default function UpdateResourcesScreen() {
  const router = useRouter();
  const { resources, resourceDraft, updateResources } = useAppContext();
  const starting = resourceDraft ?? resources;
  const [beds, setBeds] = useState(String(starting.beds));
  const [food, setFood] = useState(String(starting.food));
  const [water, setWater] = useState(String(starting.water));
  const [blanketsSupplies, setBlanketsSupplies] = useState(starting.blanketsSupplies);
  const [medicalSupport, setMedicalSupport] = useState(starting.medicalSupport);
  const [contactNumber, setContactNumber] = useState(starting.contactNumber);
  const [operatingHours, setOperatingHours] = useState(starting.operatingHours);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const continueToReview = () => {
    const nextErrors: Record<string, string> = {};
    const parsedBeds = Number(beds);
    const parsedFood = Number(food);
    const parsedWater = Number(water);

    if (!beds.trim() || Number.isNaN(parsedBeds) || parsedBeds < 0) nextErrors.beds = "Enter zero or a positive number.";
    if (!food.trim() || Number.isNaN(parsedFood) || parsedFood < 0) nextErrors.food = "Enter zero or a positive number.";
    if (!water.trim() || Number.isNaN(parsedWater) || parsedWater < 0) nextErrors.water = "Enter zero or a positive number.";
    if (!blanketsSupplies.trim()) nextErrors.blanketsSupplies = "Describe the available blankets and supplies.";
    if (!medicalSupport.trim()) nextErrors.medicalSupport = "Describe the available medical support or enter None.";
    if (!contactNumber.trim()) nextErrors.contactNumber = "Enter an organization contact number.";
    if (!operatingHours.trim()) nextErrors.operatingHours = "Enter current operating hours.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    updateResources({
      beds: parsedBeds,
      food: parsedFood,
      water: parsedWater,
      blanketsSupplies: blanketsSupplies.trim(),
      medicalSupport: medicalSupport.trim(),
      contactNumber: contactNumber.trim(),
      operatingHours: operatingHours.trim(),
      updatedAt: new Date().toISOString(),
    });
    router.push("/organization/review-save-resources");
  };

  return (
    <Screen>
      <Stack.Screen options={{ title: "Update Resources" }} />
      <SectionTitle
        title="Update Resource Availability"
        subtitle="Enter the latest supply and contact information. Changes are staged for review before publishing."
      />

      <Card accentColor={COLORS.primary} style={styles.helpCard}>
        <Text style={styles.helpTitle}>Use current available quantities</Text>
        <Text style={styles.helpText}>Enter 0 when an item is unavailable. Do not leave required fields blank.</Text>
      </Card>

      <FormInput label="Available beds" required keyboardType="number-pad" value={beds} onChangeText={setBeds} error={errors.beds} />
      <FormInput label="Prepared meals / food units" required keyboardType="number-pad" value={food} onChangeText={setFood} error={errors.food} />
      <FormInput label="Water bottles / units" required keyboardType="number-pad" value={water} onChangeText={setWater} error={errors.water} />
      <FormInput label="Blankets and supplies" required value={blanketsSupplies} onChangeText={setBlanketsSupplies} multiline error={errors.blanketsSupplies} />
      <FormInput label="Medical support" required value={medicalSupport} onChangeText={setMedicalSupport} multiline error={errors.medicalSupport} />
      <FormInput label="Contact number" required keyboardType="phone-pad" value={contactNumber} onChangeText={setContactNumber} error={errors.contactNumber} />
      <FormInput label="Operating hours" required placeholder="Example: 24 hours or 8:00 AM–10:00 PM" value={operatingHours} onChangeText={setOperatingHours} error={errors.operatingHours} />

      <AppButton title="Continue to Review" onPress={continueToReview} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  helpCard: { backgroundColor: COLORS.primaryLight },
  helpTitle: { color: COLORS.primaryDark, fontSize: FONT_SIZE.sm, fontWeight: "800" },
  helpText: { color: COLORS.textSecondary, fontSize: FONT_SIZE.xs, lineHeight: 18, marginTop: SPACING.xs },
});
