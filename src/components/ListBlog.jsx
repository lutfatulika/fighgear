import products from "../data/products";
import { ScrollView, View, Alert } from "react-native";
import CardHorizontal from "./CardHorizontal";
import CardVertical from "./CardVertical";
import { stylesVertical } from "./styles";

export default function ListBlog({ styles, category }) {

  const handlePress = (item) => {
    Alert.alert(item.title, item.description);
  };

  // ✅ PROPS DIPAKAI: filter berdasarkan kategori dari App
  const filteredProducts = products.filter(
    (item) => item.category === category
  );

  const renderHorizontal = () => {
    return filteredProducts.map((item, index) => (
      <CardHorizontal
        key={index}
        item={item} // ✅ PROPS
        index={index}
      />
    ));
  };

  const renderVertical = () => {
    return filteredProducts.map((item, index) => (
      <CardVertical
        key={index}
        item={item} // ✅ PROPS
        onPress={() => handlePress(item)} // ✅ PROPS FUNCTION
      />
    ));
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.listBlog}>

        {/* SLIDER */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {renderHorizontal()}
        </ScrollView>

        {/* LIST */}
        <View style={stylesVertical.listCard}>
          {renderVertical()}
        </View>

      </View>
    </ScrollView>
  );
}