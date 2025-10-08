import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, useColorScheme, View } from "react-native";

export default function Index() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  
  return (
    <View style={colorScheme === "dark" ? styles.containerDark : styles.containerLight}>
      <View>
        <TouchableOpacity onPress={() => router.push(`/@mincodin9/post/1`)}>
          <Text style={colorScheme === "dark" ? styles.textDark : styles.textLight}>게시글1</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={() => router.push(`/@mincodin9/post/2`)}>
          <Text style={colorScheme === "dark" ? styles.textDark : styles.textLight}>게시글2</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={() => router.push(`/@mincodin9/post/3`)}>
          <Text style={colorScheme === "dark" ? styles.textDark : styles.textLight}>게시글3</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create ({
  containerLight: {
    backgroundColor: "white",
  },
  containerDark: {
    backgroundColor: "black",
  },
  textLight:{

  },
  textDark: {

  },
})