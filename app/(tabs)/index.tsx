import { useFonts } from 'expo-font';
import { Bell } from 'lucide-react-native';
import { useState } from "react"; // ✅ TAMBAHAN STATE
import { Image, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, fontType } from '../../assets/theme';
import ListBlog from '../../src/components/ListBlog';

export default function App() {

  const [loaded] = useFonts(fontType);

  // ✅ STATE: menyimpan kategori yang dipilih
  const [selectedCategory, setSelectedCategory] = useState("Boxing");

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

      {/* 🔥 KATEGORI (SUDAH DINAMIS + STATE) */}
      <View style={styles.listCategory}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>

          {/* ✅ LOOP CATEGORY + INTERAKSI */}
          {["Boxing", "Karate", "Taekwondo"].map((item, index) => {
            const isActive = item === selectedCategory; // cek aktif

            return (
              <Text
                key={index}
                onPress={() => setSelectedCategory(item)} // ✅ UBAH STATE
                style={{
                  marginLeft: index === 0 ? 24 : 10,
                  paddingVertical: 8,
                  paddingHorizontal: 16,
                  backgroundColor: isActive ? colors.blue() : colors.grey(0.2),
                  borderRadius: 20,
                  color: isActive ? "white" : "black",
                }}
              >
                {item}
              </Text>
            );
          })}

        </ScrollView>
      </View>

      {/* 🔥 BANNER */}
      <View style={styles.bannerContainer}>
        <Image
          source={{ uri: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed" }}
          style={styles.bannerImage}
        />

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

      {/* ✅ PROPS DIKIRIM KE ListBlog */}
      <ListBlog
        styles={styles}
        category={selectedCategory} // ✅ FIX BUG KOSONG
      />

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

  // 🔥 STYLE BANNER
  bannerContainer: {
    marginHorizontal: 24,
    marginTop: 15,
    borderRadius: 15,
    overflow: "hidden",
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
    backgroundColor: "rgba(0,0,0,0.4)",
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