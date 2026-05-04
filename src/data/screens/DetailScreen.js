import React, { useContext, useRef, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
    Animated,
    Image,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
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

    // Animasi fade in gambar
    const imageOpacity = useRef(new Animated.Value(0)).current;

    // Animasi slide from bottom untuk konten
    const contentSlide = useRef(new Animated.Value(80)).current;
    const contentOpacity = useRef(new Animated.Value(0)).current;

    // Animasi scale tombol bookmark
    const bookmarkScale = useRef(new Animated.Value(1)).current;

    // Animasi scale tombol buy
    const buyScale = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        // Gambar fade in lebih dulu
        Animated.timing(imageOpacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();

        // Konten slide from bottom setelah gambar
        Animated.parallel([
            Animated.timing(contentSlide, {
                toValue: 0,
                duration: 500,
                delay: 200,
                useNativeDriver: true,
            }),
            Animated.timing(contentOpacity, {
                toValue: 1,
                duration: 500,
                delay: 200,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    // Animasi tombol bookmark saat ditekan
    const handleBookmarkPress = () => {
        Animated.sequence([
            Animated.spring(bookmarkScale, {
                toValue: 1.4,
                friction: 3,
                useNativeDriver: true,
            }),
            Animated.spring(bookmarkScale, {
                toValue: 1,
                friction: 3,
                useNativeDriver: true,
            }),
        ]).start();
        toggleSave(product);
    };

    // Animasi tombol buy saat ditekan
    const handleBuyPressIn = () => {
        Animated.spring(buyScale, {
            toValue: 0.95,
            useNativeDriver: true,
        }).start();
    };

    const handleBuyPressOut = () => {
        Animated.spring(buyScale, {
            toValue: 1,
            friction: 3,
            useNativeDriver: true,
        }).start();
    };

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
                {/* Gambar dengan fade in */}
                <Animated.View style={[styles.imageContainer, { opacity: imageOpacity }]}>
                    <Image source={product.image} style={styles.image} />

                    {/* Tombol back */}
                    <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={24} color={colors.text} />
                    </TouchableOpacity>

                    {/* Tombol bookmark dengan scale bounce */}
                    <TouchableOpacity
                        style={styles.bookmarkIcon}
                        onPress={handleBookmarkPress}
                        activeOpacity={1}
                    >
                        <Animated.View style={{ transform: [{ scale: bookmarkScale }] }}>
                            <Ionicons
                                name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
                                size={24}
                                color={colors.secondary}
                            />
                        </Animated.View>
                    </TouchableOpacity>
                </Animated.View>

                {/* Konten dengan slide from bottom */}
                <Animated.View
                    style={[
                        styles.content,
                        {
                            opacity: contentOpacity,
                            transform: [{ translateY: contentSlide }],
                        },
                    ]}
                >
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

                    {/* Tombol buy dengan scale saat ditekan */}
                    <Animated.View style={{ transform: [{ scale: buyScale }] }}>
                        <TouchableOpacity
                            style={styles.buyButton}
                            onPressIn={handleBuyPressIn}
                            onPressOut={handleBuyPressOut}
                            activeOpacity={1}
                        >
                            <Ionicons name="cart-outline" size={20} color={colors.primary} />
                            <Text style={styles.buyButtonText}>Lihat Link Pembelian</Text>
                        </TouchableOpacity>
                    </Animated.View>
                </Animated.View>
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