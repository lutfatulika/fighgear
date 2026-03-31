import { ScrollView, StyleSheet, Text, View, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bell } from 'lucide-react-native';
import { colors, fontType } from './assets/theme';
import ListBlog from './src/components/ListBlog';
import { useFonts } from 'expo-font';

export default function App() {

  // FUNCTION: load font
  const [loaded] = useFonts(fontType);

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

      {/* KATEGORI */}
      <View style={styles.listCategory}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={{ ...category.item, marginLeft: 24 }}>
            <Text style={{ ...category.title, color: colors.blue() }}>
              Boxing
            </Text>
          </View>
          <View style={category.item}>
            <Text style={category.title}>Karate</Text>
          </View>
          <View style={category.item}>
            <Text style={category.title}>Taekwondo</Text>
          </View>
        </ScrollView>
      </View>

      {/* LIST PRODUK */}
      <ListBlog styles={styles} />
    </SafeAreaView>
  );
}