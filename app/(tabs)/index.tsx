import { useFonts } from 'expo-font';
import { Bell } from 'lucide-react-native';
import { Image, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, fontType } from '../../assets/theme';
import ListBlog from '../../src/components/ListBlog';

export default function App() {

  const [loaded] = useFonts(fontType);

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white()} />

      {/* HEADER */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>FIGHTGEAR</Text>
          <Text style={styles.subtitle}>
            Katalog Alat Beladiri 🥊
          </Text>
        </View>

        <Bell color={colors.black()} size={24} />
      </View>

      {/* 🔥 KATEGORI */}
      <View style={styles.listCategory}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>

          <View style={{ ...category.item, marginLeft: 24, backgroundColor: colors.blue() }}>
            <Text style={{ ...category.title, color: colors.white() }}>
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

      {/* 🔥 BANNER WELCOME (INI YANG DITAMBAH) */}
      <View style={styles.bannerContainer}>
        <Image
          source={{ uri: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed" }}
          style={styles.bannerImage}
        />

        {/* OVERLAY TEXT */}
        <View style={styles.bannerOverlay}>
          <Text style={styles.bannerTitle}>
            Selamat Datang 👋
          </Text>
          <Text style={styles.bannerText}>
            Temukan perlengkapan terbaik untuk latihanmu di FightGear!
          </Text>
        </View>
      </View>

      {/* JUDUL */}
      <Text style={styles.sectionTitle}>
        Produk Terpopuler 🔥
      </Text>

      {/* LIST */}
      <ListBlog styles={styles} />

    </SafeAreaView>
  );
}


// ==========================
// 🔽 STYLE UTAMA
// ==========================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white(),
  },

  header: {
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },

  title: {
    fontSize: 20,
    fontFamily: "Pjs-Bold",
    color: colors.black(),
  },

  subtitle: {
    fontSize: 12,
    fontFamily: "Pjs-Medium",
    color: colors.grey(),
  },

  listCategory: {
    marginTop: 15,
  },

  sectionTitle: {
    marginHorizontal: 24,
    marginTop: 20,
    fontWeight: "bold",
    fontSize: 16,
  },

  // 🔥 STYLE BANNER BARU
  bannerContainer: {
    marginHorizontal: 24,
    marginTop: 15,
    borderRadius: 15,
    overflow: "hidden", // biar rounded kena image
  },

  bannerImage: {
    width: "100%",
    height: 150,
  },

  bannerOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.4)", // 🔥 overlay gelap
    justifyContent: "center",
    padding: 15,
  },

  bannerTitle: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Pjs-Bold",
  },

  bannerText: {
    color: "#fff",
    fontSize: 12,
    fontFamily: "Pjs-Medium",
    marginTop: 5,
  },
});


// ==========================
// 🔽 CATEGORY STYLE
// ==========================
const category = StyleSheet.create({
  item: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: colors.grey(0.2),
    borderRadius: 20,
    marginRight: 10,
  },

  title: {
    fontSize: 12,
    fontFamily: "Pjs-SemiBold",
    color: colors.black(),
  },
});