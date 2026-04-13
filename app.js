import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, StatusBar, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bell } from 'lucide-react-native';
import { colors, fontType } from './assets/theme';
import ListBlog from './src/components/ListBlog';
import { useFonts } from 'expo-font';

export default function App() {

  const [loaded] = useFonts(fontType);

  // STATE CATEGORY
  const [category, setCategory] = useState("Boxing");

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white()} />

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>FIGHTGEAR</Text>
        <Bell color={colors.black()} size={24} />
      </View>

      {/* CATEGORY */}
      <View style={styles.listCategory}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>

          <TouchableOpacity
            style={{ ...categoryStyle.item, marginLeft: 24 }}
            onPress={() => setCategory("Boxing")}
          >
            <Text
              style={{
                ...categoryStyle.title,
                color: category === "Boxing"
                  ? colors.blue()
                  : colors.black(),
              }}
            >
              Boxing
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={categoryStyle.item}
            onPress={() => setCategory("Karate")}
          >
            <Text
              style={{
                ...categoryStyle.title,
                color: category === "Karate"
                  ? colors.blue()
                  : colors.black(),
              }}
            >
              Karate
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={categoryStyle.item}
            onPress={() => setCategory("Taekwondo")}
          >
            <Text
              style={{
                ...categoryStyle.title,
                color: category === "Taekwondo"
                  ? colors.blue()
                  : colors.black(),
              }}
            >
              Taekwondo
            </Text>
          </TouchableOpacity>

        </ScrollView>
      </View>

      {/* LIST */}
      <ListBlog
        styles={styles}
        category={category}
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white(),
  },

  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: 24,
    fontFamily: fontType['Pjs-Bold'],
  },

  listCategory: {
    marginTop: 10,
  },
});

const categoryStyle = StyleSheet.create({
  item: {
    marginRight: 24,
  },

  title: {
    fontSize: 16,
    fontFamily: fontType['Pjs-Regular'],
  },
});
