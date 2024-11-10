import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/configs/FirebaseConfig";
import { storeUserData } from "@/utils/AsyncStrorage";

export default function SignUp() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onCreateAccount = async () => {
    // Validate inputs
    if (!fullName || !email || !password) {
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
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;
      console.log("User created:", user);

      await storeUserData(user);

      // Navigate to next screen or reset navigation
      // router.replace("/");

      Alert.alert("Success", "Account created successfully");
    } catch (error: any) {
      // Handle specific Firebase auth errors
      let errorMessage = "An error occurred. Please try again.";

      switch (error.code) {
        case "auth/user-not-found":
          errorMessage = "User not found";
          break;
        case "auth/wrong-password":
          errorMessage = "Incorrect password";
          break;
        case "auth/invalid-email":
          errorMessage = "Invalid email address";
          break;
        case "auth/too-many-requests":
          errorMessage = "Too many requests, try again later";
          break;
      }

      Alert.alert("Sign Up Error", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={{
        padding: 25,
        paddingTop: 50,
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
        Create New Account
      </Text>

      {/* User Full Name */}
      <View style={{ marginTop: 50 }}>
        <Text style={{ fontFamily: "outfit" }}>Full Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Full Name"
          value={fullName}
          onChangeText={setFullName}
        />
      </View>

      {/* Email */}
      <View style={{ marginTop: 20 }}>
        <Text style={{ fontFamily: "outfit" }}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Email"
          keyboardType="email-address"
          autoCapitalize="none"
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

      {/* Create Account Button */}
      <TouchableOpacity
        onPress={onCreateAccount}
        disabled={loading}
        style={{
          marginTop: 50,
          padding: 20,
          backgroundColor: loading ? Colors.GRAY : Colors.PRIMARY,
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
          {loading ? "Creating Account..." : "Create Account"}
        </Text>
      </TouchableOpacity>

      {/* Sign In Button */}
      <TouchableOpacity
        onPress={() => router.replace("/auth/sign-in")}
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
          Sign In
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
    fontFamily: "outfit",
  },
});
