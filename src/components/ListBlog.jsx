import { ScrollView, View, Alert } from "react-native";
import CardHorizontal from "./CardHorizontal";
import CardVertical from "./CardVertical";
import { stylesVertical } from "./styles";

// ✅ DUMMY DATA (FIXED IMAGE)
const products = [
  {
    title: "Sarung Tinju",
    category: "Boxing",
    description: "Digunakan untuk latihan dan pertandingan tinju.",
    image: { uri: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed" },
  },
  {
    title: "Head Guard",
    category: "Boxing",
    description: "Pelindung kepala saat sparring.",
    image: { uri: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1" },
  },
  {
    title: "Body Protector",
    category: "Taekwondo",
    description: "Pelindung tubuh untuk pertandingan taekwondo.",
    image: { uri: "https://images.unsplash.com/photo-1599058917765-a780eda07a3e" },
  },
  {
    title: "Baju Karate",
    category: "Karate",
    description: "Seragam resmi latihan karate.",
    image: { uri: "https://images.unsplash.com/photo-1594737625785-c68b3a6b9b38" },
  },
];

export default function ListBlog({ styles }) {

  const handlePress = (item) => {
    Alert.alert(item.title, item.description);
  };

  const renderHorizontal = () => {
    return products.map((item, index) => (
      <CardHorizontal key={index} item={item} index={index} />
    ));
  };

  const renderVertical = () => {
    return products.map((item, index) => (
      <CardVertical
        key={index}
        item={item}
        onPress={() => handlePress(item)}
      />
    ));
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.listBlog}>

        {/* SLIDER ATAS */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {renderHorizontal()}
        </ScrollView>

        {/* LIST BAWAH */}
        <View style={stylesVertical.listCard}>
          {renderVertical()}
        </View>

      </View>
    </ScrollView>
  );
}