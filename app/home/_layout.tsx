import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
/* import { StyleSheet } from "nativewind";
 */import { View, StyleSheet } from "react-native";
import { useColorScheme } from "~/lib/useColorScheme";

export default function HomeLayout() {
  const { colorScheme } = useColorScheme();

  return (
    <Tabs screenOptions={{
      headerShown: true,
      headerTransparent: true,
      headerStyle: {
        backgroundColor: "transparent",
      },
      headerBackground: () => (
        <View style={styles.headerContainer}>
          <BlurView
            tint={colorScheme === 'dark' ? 'dark' : 'default'}
            intensity={200}
            style={[styles.blurView, { backgroundColor: colorScheme === 'dark' ? "rgba(0, 0, 0, 0.55)" : "rgba(255, 255, 255, 0.5)" }]} />
        </View>
      ),
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Ana Sayfa",
          /*           headerTransparent: true,
           *//*           headerBackground: () => (
           <BlurView
             tint="default"
             intensity={100}
             style={StyleSheet.absoluteFill}
           />
         ), */
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profil",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Ayarlar",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" size={size} color={color} />
          ),

        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    ...StyleSheet.absoluteFillObject,
    overflow: "hidden",
/*     borderBottomWidth: 1, // Hafif bir çerçeve ekler
    borderBottomColor: "rgba(255, 255, 255, 0.05)", // Daha belirgin bir blur efekti için
 */    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderBottomEndRadius: 20,
    borderBottomLeftRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,

  },
  blurView: {
    ...StyleSheet.absoluteFillObject,
/*     borderBottomWidth: 1, // Hafif bir çerçeve ekler
    borderBottomColor: "rgba(255, 255, 255, 0.05)", // Daha belirgin bir blur efekti için
 */    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderBottomEndRadius: 20,
    borderBottomLeftRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
});