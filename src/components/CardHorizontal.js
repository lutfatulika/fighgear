import { View, Text, ImageBackground } from "react-native";
import { Bookmark } from "lucide-react-native";
import { colors } from "../../assets/theme";
import { stylesHorizontal } from "./styles";

export default function CardHorizontal({ item, index }) {

  // FUNCTION: card horizontal
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
          <View style={stylesHorizontal.cardIcon}>
            <Bookmark color={colors.white()} size={20} />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}