import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/configs/FirebaseConfig";
import { storeUserData } from "@/utils/AsyncStrorage";

export default function index() {
  const navigate = useNavigation();
  const router = useRouter();

  // const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    navigate.setOptions({
      headerShown: false,
    });
  }, []);

  const onSignIn = async () => {
    // Validate inputs
    if (!email || !password) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }

    // Password strength check
    // if (password.length < 6) {
    //   Alert.alert("Error", "Password must be at least 6 characters long");
    //   return;
    // }

    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;
      console.log("User created:", user);

      await storeUserData(user);

      // Navigate to next screen or reset navigation
      // router.replace("/");

      Alert.alert("Sign In Success", "You have successfully signed in.");
    } catch (error: any) {
      // Handle specific Firebase auth errors
      let errorMessage = "An error occurred. Please try again.";

      switch (error.code) {
        case "auth/email-already-in-use":
          errorMessage = "Email already in use";
          break;
        case "auth/invalid-email":
          errorMessage = "Invalid email address";
          break;
        case "auth/weak-password":
          errorMessage = "Password is too weak";
          break;
      }

      router.replace("/");

      Alert.alert("Sign Up Error", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={{
        padding: 25,
        paddingTop: 80,
        backgroundColor: Colors.WHITE,
        height: "100%",
      }}
    >
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons
          style={{ marginBottom: 10 }}
          name="arrow-back"
          size={24}
          color="black"
        />
      </TouchableOpacity>
      <Text style={{ fontSize: 30, fontFamily: "outfit-bold" }}>
        Let's sign you in
      </Text>
      <Text
        style={{
          fontSize: 30,
          fontFamily: "outfit",
          color: Colors.GRAY,
          marginTop: 20,
        }}
      >
        Welcome Back
      </Text>
      <Text
        style={{
          fontSize: 30,
          fontFamily: "outfit",
          color: Colors.GRAY,
          marginTop: 20,
        }}
      >
        You've been missed
      </Text>

      {/* Email */}
      <View style={{ marginTop: 50 }}>
        <Text style={{ fontFamily: "outfit" }}>Email</Text>
        <TextInput
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholder="Enter Email"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      {/* Password */}
      <View style={{ marginTop: 20 }}>
        <Text style={{ fontFamily: "outfit" }}>Password</Text>
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          autoCapitalize="none"
          placeholder="Enter Password"
          value={password}
          onChangeText={setPassword}
        />
      </View>

      {/* Sign In Button */}
      <TouchableOpacity
        disabled={loading}
        onPress={onSignIn}
        style={{
          marginTop: 50,
          padding: 20,
          backgroundColor: Colors.PRIMARY,
          borderRadius: 15,
        }}
      >
        <Text
          style={{
            color: Colors.WHITE,
            textAlign: "center",
            fontFamily: "outfit-bold",
          }}
        >
          {loading ? "Signing You In..." : "Sign In"}
        </Text>
      </TouchableOpacity>

      {/* Create Account Button */}
      <TouchableOpacity
        onPress={() => router.replace("/auth/sign-up")}
        style={{
          marginTop: 20,
          padding: 20,
          backgroundColor: Colors.WHITE,
          borderRadius: 15,
          borderWidth: 1,
        }}
      >
        <Text
          style={{
            color: Colors.PRIMARY,
            textAlign: "center",
            fontFamily: "outfit-bold",
          }}
        >
          Create Account
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: Colors.GRAY,
    // marginTop: 10,
    fontFamily: "outfit",
  },
});
