import { AuthContext } from "@/app/_layout";
import SideMenu from "@/components/SideMenu";
import { Ionicons } from "@expo/vector-icons";
import {
  createMaterialTopTabNavigator
} from "@react-navigation/material-top-tabs";
import { router, Slot, withLayoutContext } from "expo-router";
import { useContext, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext(Navigator);

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const isLoggedIn = !!user;
  
  return (
    <SafeAreaView 
      style={[
        styles.container, 
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
    >
      <View style={styles.header}>
        {isLoggedIn && (
          <TouchableOpacity 
            style={styles.menuButton}
            onPress={() => {
              setIsSideMenuOpen(true)
            }}
         >
          <Ionicons name="menu" size={24} color="black" />
        </TouchableOpacity>
        )}
        <SideMenu
          isVisible={isSideMenuOpen}
          onClose={() => setIsSideMenuOpen(false)}
        />
        <Image 
          source={require("@/assets/images/react-logo.png")}
          style={styles.headerLogo} 
        />
        {!isLoggedIn && (
          <TouchableOpacity
            style={[
              styles.loginButton,
              colorScheme === "dark"
                ? styles.loginButtonDark
                : styles.loginButtonLight,
            ]}
            onPress={() => {
              console.log("loginButton onPress");
              router.navigate(`/login`);
            }}
          >
            <Text 
              style={
                colorScheme === "dark"
                  ? styles.loginButtonTextDark
                  : styles.loginButtonTextLight  
              }
            >
              로그인
            </Text>
          </TouchableOpacity>
        )}
      </View>
      {isLoggedIn ? (
        <MaterialTopTabs
          screenOptions={{
            lazy: true,
            tabBarStyle: {
              backgroundColor: "white",
              shadowColor: "transparent",
              position: "relative",
            },
            tabBarPressColor: "transparent",
            tabBarActiveTintColor: "#555",
            tabBarIndicatorStyle: {
              backgroundColor: "black",
              height: 1,
            },
            tabBarIndicatorContainerStyle: {
              backgroundColor: "#aaa",
              position: "absolute",
              top: 49,
              height: 1,
            },
          }}
        >
          <MaterialTopTabs.Screen name="index" options={{ title: "For you" }} />
          <MaterialTopTabs.Screen name="following" options={{ title: "Following" }} />
        </MaterialTopTabs>
      ) : (
        <Slot />
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  menuButton: {
    padding: 8,
    position: "absolute",
    left: 16,
  },
  headerLogo: {
    width: 32,
    height: 32,
  },
  loginButton: {
    padding: 8,
    backgroundColor: "black",
    borderRadius: 4,
    position: "absolute",
    right: 16,
  },
  loginButtonLight: {
    backgroundColor: "black",
  },
  loginButtonDark: {
    backgroundColor: "white",
  },
  loginButtonTextLight: {
    color: "white",
  },
  loginButtonTextDark: {
    color: "black"
  }
});