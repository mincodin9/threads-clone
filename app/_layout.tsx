import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { createContext, useState } from "react";
import { Alert } from "react-native";

export const AuthContext = createContext<{
  user?: object;
  login?: () => Promise<void>;
  logout?: () => Promise<void>;
}>({});

export default function RootLayout() {
  const [user, setUser] = useState(null);
  
  const login = () => {
    console.log("login");
    return fetch("/login", {
        method: "POST",
        body: JSON.stringify({
          username: "mincodin9",
          password: "1234",
        }),
      })
        .then((res) => {
          console.log("res", res, res.status);
          if (res.status >= 400) {
            return Alert.alert("Error", "Invalid credentials");
          }
          return res.json();
        })
        .then((data) => {
          console.log(data);
          setUser(data.user);
          return Promise.all([
            SecureStore.setItemAsync("accessToken", data.accessToken),
            SecureStore.setItemAsync("refreshToken", data.refreshToken),
            AsyncStorage.setItem("user", JSON.stringify(data.user)),
          ]);
        })
        .catch(console.error);
    }

  const logout = () => {
    setUser(null);
    return Promise.all([
      SecureStore.deleteItemAsync("accessToken"),
      SecureStore.deleteItemAsync("refreshToken"),
      AsyncStorage.removeItem("user"),
    ]);
  };

  return (
    <AuthContext value={{ user, login, logout }}>
      <Stack screenOptions={{headerShown: false}}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="modal" options={{ presentation: "modal" }} />
      </Stack>
    </AuthContext>
  );
}
