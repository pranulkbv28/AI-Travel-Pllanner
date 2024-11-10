import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import OutfitRegular from "../assets/fonts/Outfit-Regular.ttf";
import OutfitMedium from "../assets/fonts/Outfit-Medium.ttf";
import OutfitBold from "../assets/fonts/Outfit-Bold.ttf";

export default function RootLayout() {
  const [fonstLoaded] = useFonts({
    outfit: OutfitRegular,
    "outfit-medium": OutfitMedium,
    "outfit-bold": OutfitBold,
  });

  if (!fonstLoaded) return null;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
    </Stack>
  );
}
