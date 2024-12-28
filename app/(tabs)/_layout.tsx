import { SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";

const TabLayout = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" hidden={false} />
      <Tabs screenOptions={{ headerShown: false }}>
        <Tabs.Screen name="MyTrip" />
        <Tabs.Screen name="Discover" />
        <Tabs.Screen name="Profile" />
      </Tabs>
    </SafeAreaView>
  );
};

export default TabLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
