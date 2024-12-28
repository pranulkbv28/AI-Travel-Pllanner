import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import OutfitRegular from "../assets/fonts/Outfit-Regular.ttf";
import OutfitMedium from "../assets/fonts/Outfit-Medium.ttf";
import OutfitBold from "../assets/fonts/Outfit-Bold.ttf";
// import { StatusBar } from "react-native";

export default function RootLayout() {
  const [fonstLoaded] = useFonts({
    outfit: OutfitRegular,
    "outfit-medium": OutfitMedium,
    "outfit-bold": OutfitBold,
  });

  if (!fonstLoaded) return null;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* <StatusBar hidden={true} /> */}
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
