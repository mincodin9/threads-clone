import NotFound from "@/app/+not-found";
import { AuthContext } from "@/app/_layout";
import SideMenu from "@/components/SideMenu";
import { Ionicons } from "@expo/vector-icons";
import { usePathname, useRouter } from "expo-router";
import { useContext, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Index() {
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const isLoggedIn = !!user;

  if(
    ![
      "/activity", 
      "/activity/follows", 
      "/activity/replies", 
      "/activity/mentions", 
      "/activity/quotes", 
      "/activity/reposts", 
      "/activity/verified"
    ].includes(pathname)
  ) {
    return <NotFound />
  }

  return (
    <View
      style ={[
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
      </View>
      <View style={styles.tabBar}>
        <View>
          <TouchableOpacity onPress={() => router.push(`/activity`)}>
            <Text style={{ color: pathname === "/activity" ? "skyblue" : "black"}}>All</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={() => router.push(`/activity/follows`)}>
            <Text style={{ color: pathname === "/activity/follows" ? "skyblue" : "black"}}>Follows</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={() => router.push(`/activity/replies`)}>
            <Text style={{ color: pathname === "/activity/replies" ? "skyblue" : "black"}}>Replies</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={() => router.push(`/activity/mentions`)}>
            <Text style={{ color: pathname === "/activity/mentions" ? "skyblue" : "black"}}>Mentions</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={() => router.push(`/activity/quotes`)}>
            <Text style={{ color: pathname === "/activity/quotes" ? "skyblue" : "black"}}>Quotes</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={() => router.push(`/activity/reposts`)}>
            <Text style={{ color: pathname === "/activity/reposts" ? "skyblue" : "black"}}>Reposts</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={() => router.push(`/activity/verified`)}>
            <Text style={{ color: pathname === "/activity/verified" ? "skyblue" : "black"}}>Verified</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 50,
  },
  menuButton: {
    position: "absolute",
    left: 20,
    top: 10,
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-between",
  }
});