import React, { useContext } from "react";
import { SavedContext } from "../context/SavedContext";
import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import { Bookmark } from "lucide-react-native";
import { colors } from "../../assets/theme";

export default function CardHorizontal({ item, index }) {
    const { savedItems, toggleSave } = useContext(SavedContext);
    const isBookmarked = savedItems.find(i => i.id === item.id);

    return (
        <TouchableOpacity style={{ marginLeft: index === 0 ? 24 : 10, width: 250, marginRight: 16 }}>
            <ImageBackground
                style={{ width: "100%", height: 180, borderRadius: 12, backgroundColor: "#ccc" }}
                source={item.image}
                imageStyle={{ borderRadius: 15 }}
            >
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    padding: 10,
                    position: "absolute",
                    bottom: 0,
                    width: "100%",
                }}>
                    <View style={{ maxWidth: "70%" }}>
                        <Text style={{ color: colors.white, fontSize: 14, fontWeight: "bold" }}>{item.title}</Text>
                        <Text style={{ color: colors.white, fontSize: 12 }}>{item.category}</Text>
                    </View>
                    <TouchableOpacity
                        style={{ backgroundColor: colors.white(0.3), padding: 6, borderRadius: 6 }}
                        onPress={() => toggleSave(item)}
                    >
                        <Bookmark color={colors.white()} size={20} fill={isBookmarked ? "white" : "transparent"} />
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    );
}