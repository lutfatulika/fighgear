import { View, Text, Image, TouchableOpacity } from "react-native";
import { ChevronRight } from "lucide-react-native";
import { stylesVertical } from "./styles";

export default function CardVertical({ item, onPress }) {
  return (
    <TouchableOpacity 
      style={stylesVertical.cardItem} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      
      {/* 🔥 GAMBAR KIRI */}
      <Image 
        style={stylesVertical.cardImage} 
        source={item.image}
        resizeMode="cover"
      />

      {/* 🔥 TEXT */}
      <View style={stylesVertical.cardContent}>
        <Text style={stylesVertical.cardTitle}>
          {item.title}
        </Text>

        <Text style={stylesVertical.cardDesc}>
          Lihat detail produk
        </Text>
      </View>

      {/* 🔥 PANAH */}
      <ChevronRight size={20} />

    </TouchableOpacity>
  );
}