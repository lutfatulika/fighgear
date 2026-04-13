import { View, Text, ImageBackground } from "react-native";
import { useState } from "react"; // ✅ TAMBAHAN
import { Bookmark } from "lucide-react-native";
import { colors } from "../../assets/theme";
import { stylesHorizontal } from "./styles";

export default function CardHorizontal({ item, index }) {

  // ✅ STATE: untuk bookmark
  const [isBookmarked, setIsBookmarked] = useState(false);

  return (
    <View style={{ ...stylesHorizontal.cardItem, marginLeft: index === 0 ? 24 : 10 }}>
      <ImageBackground
        style={stylesHorizontal.cardImage}
        source={item.image}
        imageStyle={{ borderRadius: 15 }}
      >
        <View style={stylesHorizontal.cardContent}>
          <View style={stylesHorizontal.cardInfo}>
            <Text style={stylesHorizontal.cardTitle}>{item.title}</Text>
            <Text style={stylesHorizontal.cardText}>{item.category}</Text>
          </View>

          {/* ✅ ICON BOOKMARK SUDAH INTERAKTIF */}
          <View style={stylesHorizontal.cardIcon}>
            <Bookmark 
              color={colors.white()} 
              size={20}
              fill={isBookmarked ? "white" : "transparent"} // isi warna kalau aktif
              onPress={() => setIsBookmarked(!isBookmarked)} // toggle
            />
          </View>

        </View>
      </ImageBackground>
    </View>
  );
}