import AsyncStorage from "@react-native-async-storage/async-storage";

const storeUserData = async (userData: any) => {
  try {
    await AsyncStorage.setItem("userData", JSON.stringify(userData));
  } catch (error) {
    console.error("Error storing user data:", error);
  }
};

const getUserData = async () => {
  try {
    const userData = await AsyncStorage.getItem("userData");
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error("Error getting user data:", error);
    return null;
  }
};

const clearUserData = async () => {
  try {
    await AsyncStorage.removeItem("userData");
  } catch (error) {
    console.error("Error clearing user data:", error);
  }
};

export { storeUserData, getUserData, clearUserData };
