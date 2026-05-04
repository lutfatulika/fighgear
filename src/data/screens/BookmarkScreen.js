import React, { useContext } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {
    Image,
    ScrollView,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../../assets/theme';
import { SavedContext } from '../../context/SavedContext';

export default function BookmarkScreen() {
    const navigation = useNavigation();
    const { savedItems, toggleSave } = useContext(SavedContext);

    if (savedItems.length === 0) {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
                <StatusBar barStyle="light-content" backgroundColor={colors.background} />
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 20,
                    }}
                >
                    <Ionicons
                        name="bookmark-outline"
                        size={80}
                        color={colors.secondary + '50'}
                    />
                    <Text
                        style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                            color: colors.text,
                            marginTop: 20,
                        }}
                    >
                        Belum Ada Bookmark
                    </Text>
                    <Text
                        style={{
                            fontSize: 14,
                            color: colors.textSecondary,
                            marginTop: 8,
                            textAlign: 'center',
                        }}
                    >
                        Simpan produk favoritmu dengan menekan tombol bookmark
                    </Text>

                    <TouchableOpacity
                        style={{
                            marginTop: 30,
                            backgroundColor: colors.secondary,
                            paddingHorizontal: 24,
                            paddingVertical: 12,
                            borderRadius: 25,
                        }}
                        onPress={() => navigation.navigate('Discover')}
                    >
                        <Text style={{ color: colors.primary, fontWeight: 'bold' }}>
                            Jelajahi Sekarang →
                        </Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
            <StatusBar barStyle="light-content" backgroundColor={colors.background} />

            <View style={{ paddingHorizontal: 20, paddingTop: 10, paddingBottom: 20 }}>
                <Text style={{ fontSize: 28, fontWeight: 'bold', color: colors.secondary }}>
                    Bookmark 📌
                </Text>
                <Text style={{ fontSize: 12, color: colors.textSecondary, marginTop: 4 }}>
                    {savedItems.length} item tersimpan
                </Text>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 30 }}
            >
                {savedItems.map((item) => (
                    <View
                        key={item.id}
                        style={{
                            backgroundColor: colors.card,
                            borderRadius: 16,
                            marginBottom: 16,
                            borderWidth: 1,
                            borderColor: colors.secondary + '20',
                            overflow: 'hidden',
                        }}
                    >
                        <View style={{ flexDirection: 'row' }}>
                            <Image
                                source={item.image}
                                style={{ width: 100, height: 100, backgroundColor: '#1A1A1A' }}
                            />

                            <View style={{ flex: 1, padding: 12 }}>
                                <Text
                                    style={{ fontSize: 14, fontWeight: 'bold', color: colors.text }}
                                    numberOfLines={2}
                                >
                                    {item.name}
                                </Text>

                                <Text
                                    style={{ fontSize: 12, color: colors.secondary, marginTop: 4 }}
                                >
                                    {item.priceRange}
                                </Text>

                                <View style={{ flexDirection: 'row', marginTop: 12, gap: 12 }}>
                                    <TouchableOpacity
                                        style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}
                                        onPress={() => navigation.navigate('Detail', { id: item.id })}
                                    >
                                        <Ionicons name="eye-outline" size={16} color={colors.secondary} />
                                        <Text style={{ fontSize: 12, color: colors.secondary }}>
                                            Detail
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}
                                        onPress={() => toggleSave(item)}
                                    >
                                        <Ionicons name="trash-outline" size={16} color="#FF4444" />
                                        <Text style={{ fontSize: 12, color: '#FF4444' }}>
                                            Hapus
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}