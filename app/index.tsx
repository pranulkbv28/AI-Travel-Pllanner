import Login from "@/components/Login";
import { auth } from "@/configs/FirebaseConfig";
import { getUserData } from "@/utils/AsyncStrorage";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function Index() {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // async function userDetails () {
  //   const userDetails = await getUserData()
  //   setUserData(userDetails)
  // }

  const user = auth.currentUser;
  console.log("This is currentUser: ", user);

  useEffect(() => {
    async function userDetails() {
      const userDetails = await getUserData();
      setUserData(userDetails);
      setLoading(false);
    }

    userDetails();
  }, []);

  useEffect(() => {
    if (userData === null) {
      console.log("User not logged in");
    } else {
      console.log("User logged in.", userData);
    }
  }, [userData]);

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {userData ? <Redirect href={"/MyTrip"} /> : <Login />}
    </View>
  );
}
