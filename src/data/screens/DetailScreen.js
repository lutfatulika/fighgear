import React, { useContext } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../../assets/theme';
import products from '../products';
import { SavedContext } from '../../context/SavedContext';

export default function DetailScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const { id } = route.params;
    const { savedItems, toggleSave } = useContext(SavedContext);

    const product = products.find((item) => item.id.toString() === id.toString());

    const isBookmarked = savedItems.find(i => i.id.toString() === id.toString());

    if (!product) {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="light-content" backgroundColor={colors.background} />
                <View style={styles.notFound}>
                    <Text style={styles.notFoundText}>Produk tidak ditemukan</Text>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Text style={styles.backButtonText}>Kembali</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={colors.background} />

            <ScrollView>
                <View style={styles.imageContainer}>
                    <Image source={product.image} style={styles.image} />
                    <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={24} color={colors.text} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.bookmarkIcon}
                        onPress={() => toggleSave(product)}
                    >
                        <Ionicons
                            name={isBookmarked ? "bookmark" : "bookmark-outline"}
                            size={24}
                            color={colors.secondary}
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.content}>
                    <Text style={styles.name}>{product.name}</Text>
                    <Text style={styles.category}>{product.category} • {product.subCategory}</Text>
                    <Text style={styles.price}>{product.priceRange}</Text>

                    <View style={styles.ratingContainer}>
                        <Text style={styles.rating}>⭐ {product.rating}</Text>
                        <Text style={styles.reviews}>({product.totalReviews} ulasan)</Text>
                    </View>

                    <View style={styles.divider} />

                    <Text style={styles.sectionTitle}>Deskripsi</Text>
                    <Text style={styles.description}>{product.description}</Text>

                    <Text style={styles.sectionTitle}>Material</Text>
                    <Text style={styles.material}>{product.material}</Text>

                    <Text style={styles.sectionTitle}>Rekomendasi Untuk</Text>
                    <Text style={styles.recommended}>{product.recommendedFor}</Text>

                    {product.brand && (
                        <>
                            <Text style={styles.sectionTitle}>Brand</Text>
                            <Text style={styles.brand}>{product.brand}</Text>
                        </>
                    )}

                    <TouchableOpacity style={styles.buyButton}>
                        <Ionicons name="cart-outline" size={20} color={colors.primary} />
                        <Text style={styles.buyButtonText}>Lihat Link Pembelian</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    imageContainer: {
        position: 'relative',
    },
    image: {
        width: '100%',
        height: 300,
        backgroundColor: '#1A1A1A',
    },
    backIcon: {
        position: 'absolute',
        top: 16,
        left: 16,
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 8,
        borderRadius: 30,
    },
    bookmarkIcon: {
        position: 'absolute',
        top: 16,
        right: 16,
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 8,
        borderRadius: 30,
    },
    content: {
        padding: 20,
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold',
        color: colors.text,
    },
    category: {
        fontSize: 14,
        color: colors.textSecondary,
        marginTop: 4,
    },
    price: {
        fontSize: 18,
        color: colors.secondary,
        fontWeight: 'bold',
        marginTop: 8,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
        gap: 8,
    },
    rating: {
        fontSize: 14,
        color: colors.text,
    },
    reviews: {
        fontSize: 12,
        color: colors.textSecondary,
    },
    divider: {
        height: 1,
        backgroundColor: colors.secondary + '20',
        marginVertical: 16,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.text,
        marginBottom: 8,
        marginTop: 8,
    },
    description: {
        fontSize: 14,
        color: colors.textSecondary,
        lineHeight: 20,
    },
    material: {
        fontSize: 14,
        color: colors.textSecondary,
    },
    recommended: {
        fontSize: 14,
        color: colors.textSecondary,
    },
    brand: {
        fontSize: 14,
        color: colors.textSecondary,
    },
    buyButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        backgroundColor: colors.secondary,
        paddingVertical: 14,
        borderRadius: 12,
        marginTop: 24,
        marginBottom: 30,
    },
    buyButtonText: {
        color: colors.primary,
        fontSize: 16,
        fontWeight: 'bold',
    },
    notFound: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    notFoundText: {
        color: colors.text,
        fontSize: 18,
    },
    backButton: {
        marginTop: 20,
        backgroundColor: colors.secondary,
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 25,
    },
    backButtonText: {
        color: colors.primary,
        fontWeight: 'bold',
    },
});