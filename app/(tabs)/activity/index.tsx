import NotFound from "@/app/+not-found";
import { usePathname, useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const router = useRouter();
  const pathname = usePathname();

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
      style ={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
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
  )
}