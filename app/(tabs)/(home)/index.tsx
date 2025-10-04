import { usePathname, useRouter } from "expo-router";
import { Dimensions, Image, PixelRatio, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

export default function Index() {
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();
  const isLoggedIn = false;

  console.log("pathname", pathname);
  console.log("insets", insets);

  const { width, height } = Dimensions.get("window");
  console.log(`화면 너비: ${width}dp, 높이 $${height}dp`);
  console.log(`화면 너비: ${width*PixelRatio.get()}px, 높이: ${height*PixelRatio.get()}px`);

  return (
    <SafeAreaView 
      style={[
        styles.container, 
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
    >
      <View style={styles.header}>
        <Image 
          source={require("@/assets/images/react-logo.png")}
          style={styles.headerLogo} 
        />
        {!isLoggedIn && (
          <TouchableOpacity style={styles.loginButton}
          onPress={() => router.navigate(`/login`)}
        >
          <Text style={styles.loginButtonText}>로그인</Text>
        </TouchableOpacity>
        )}
      </View>
      {isLoggedIn && (
        <View style={styles.tabContainer}>
          <View style={styles.tab}>
            <TouchableOpacity onPress={() => router.push(`/`)}>
              <Text style={{color : pathname === '/' ? 'skyblue' : 'black'}}>For you</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.tab}>
            <TouchableOpacity onPress={() => router.push(`/following`)}>
              <Text style={{color : pathname === '/' ? 'black' : 'skyblue'}}>Following</Text>
            </TouchableOpacity>
          </View>
        </View>
            )}
      <View>
        <TouchableOpacity onPress={() => router.push(`/@mincodin9/post/1`)}>
          <Text>게시글1</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={() => router.push(`/@mincodin9/post/2`)}>
          <Text>게시글2</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={() => router.push(`/@mincodin9/post/3`)}>
          <Text>게시글3</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  tab: {
    flex: 1,
  },
  header: {
    alignItems: "center",
  },
  headerLogo: {
    width: 42,
    height: 42,
  },
  loginButton: {
    position: "absolute",
    right: 20,
    top: 0,
    backgroundColor: "black",
    borderWidth: 1,
    borderColor: "black",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  loginButtonText: {
    color: "white",
  },
});