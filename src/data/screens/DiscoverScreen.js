import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
    Animated,
    FlatList,
    Image,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../../assets/theme';
import products from '../products';

// Komponen card produk dengan animasi slide from bottom
const AnimatedProductItem = ({ item, index, navigation }) => {
    const slideAnim = useRef(new Animated.Value(60)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 400,
                delay: index * 80, // staggered per item
                useNativeDriver: true,
            }),
            Animated.timing(opacityAnim, {
                toValue: 1,
                duration: 400,
                delay: index * 80,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    const handlePressIn = () => {
        Animated.spring(scaleAnim, {
            toValue: 0.95,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 3,
            useNativeDriver: true,
        }).start();
    };

    return (
        <Animated.View
            style={{
                width: '48%',
                opacity: opacityAnim,
                transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
            }}
        >
            <TouchableOpacity
                style={styles.productItem}
                onPress={() => navigation.navigate('Detail', { id: item.id })}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                activeOpacity={1}
            >
                <Image source={item.image} style={styles.productItemImage} />
                <View style={styles.productItemInfo}>
                    <Text style={styles.productItemName}>{item.name}</Text>
                    <Text style={styles.productItemSub}>{item.subCategory}</Text>
                    <Text style={styles.productItemPrice}>{item.priceRange}</Text>
                    <View style={styles.bookmarkRow}>
                        <Ionicons name="bookmark-outline" size={16} color={colors.secondary} />
                        <Text style={styles.bookmarkText}>Simpan Link</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </Animated.View>
    );
};

// Komponen chip kategori dengan animasi scale
const AnimatedChip = ({ cat, isSelected, onPress }) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const handlePress = () => {
        Animated.sequence([
            Animated.spring(scaleAnim, {
                toValue: 0.88,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 3,
                useNativeDriver: true,
            }),
        ]).start();
        onPress(cat.id);
    };

    return (
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <TouchableOpacity
                style={[styles.chip, isSelected && styles.chipActive]}
                onPress={handlePress}
                activeOpacity={1}
            >
                <Ionicons
                    name={cat.icon}
                    size={16}
                    color={isSelected ? colors.primary : colors.secondary}
                />
                <Text style={[styles.chipText, isSelected && styles.chipTextActive]}>
                    {cat.name}
                </Text>
            </TouchableOpacity>
        </Animated.View>
    );
};

export default function DiscoverScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const [selectedCategory, setSelectedCategory] = useState('Semua');

    // Animasi fade in header
    const headerOpacity = useRef(new Animated.Value(0)).current;
    const headerSlide = useRef(new Animated.Value(-20)).current;

    useEffect(() => {
        if (route.params?.cat) {
            setSelectedCategory(route.params.cat);
        }

        // Fade in + slide header saat screen dibuka
        Animated.parallel([
            Animated.timing(headerOpacity, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.timing(headerSlide, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    const categories = [
        { id: 'Semua', name: 'Semua', icon: 'grid-outline', desc: 'All items' },
        { id: 'Pelindung', name: 'Pelindung', icon: 'shield-outline', desc: 'Protective Gear' },
        { id: 'Latihan', name: 'Latihan', icon: 'fitness-outline', desc: 'Training Equipment' },
        { id: 'Seragam', name: 'Seragam', icon: 'shirt-outline', desc: 'Apparel' },
    ];

    const filteredProducts = selectedCategory === 'Semua'
        ? products
        : products.filter(p => p.category === selectedCategory);

    const renderProductItem = useCallback(({ item, index }) => (
        <AnimatedProductItem item={item} index={index} navigation={navigation} />
    ), [navigation]);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={colors.background} />

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header dengan fade in + slide from top */}
                <Animated.View
                    style={[
                        styles.header,
                        {
                            opacity: headerOpacity,
                            transform: [{ translateY: headerSlide }],
                        },
                    ]}
                >
                    <Text style={styles.headerTitle}>Discover 🔍</Text>
                    <Text style={styles.headerSubtitle}>Temukan Peralatan Terbaik</Text>
                </Animated.View>

                {/* Chip filter dengan scale bounce */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.chipsContainer}
                >
                    {categories.map((cat) => (
                        <AnimatedChip
                            key={cat.id}
                            cat={cat}
                            isSelected={selectedCategory === cat.id}
                            onPress={setSelectedCategory}
                        />
                    ))}
                </ScrollView>

                <View style={styles.resultCount}>
                    <Text style={styles.resultCountText}>
                        {filteredProducts.length} item ditemukan
                    </Text>
                </View>

                {/* Product grid dengan slide from bottom staggered */}
                <FlatList
                    data={filteredProducts}
                    renderItem={renderProductItem}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={2}
                    columnWrapperStyle={styles.productGrid}
                    scrollEnabled={false}
                    contentContainerStyle={styles.productList}
                />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 20,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: colors.secondary,
    },
    headerSubtitle: {
        fontSize: 12,
        color: colors.textSecondary,
        marginTop: 4,
    },
    chipsContainer: {
        paddingHorizontal: 20,
        paddingBottom: 16,
        gap: 12,
    },
    chip: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.card,
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 25,
        marginRight: 12,
        gap: 8,
        borderWidth: 1,
        borderColor: colors.secondary + '30',
    },
    chipActive: {
        backgroundColor: colors.secondary,
        borderColor: colors.secondary,
    },
    chipText: {
        color: colors.secondary,
        fontSize: 14,
        fontWeight: '500',
    },
    chipTextActive: {
        color: colors.primary,
        fontWeight: 'bold',
    },
    resultCount: {
        paddingHorizontal: 20,
        marginBottom: 12,
    },
    resultCountText: {
        fontSize: 12,
        color: colors.textSecondary,
    },
    productGrid: {
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    productList: {
        paddingBottom: 30,
    },
    productItem: {
        width: '100%',
        backgroundColor: colors.card,
        borderRadius: 16,
        marginBottom: 16,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: colors.secondary + '20',
    },
    productItemImage: {
        width: '100%',
        height: 120,
        backgroundColor: '#1A1A1A',
    },
    productItemInfo: {
        padding: 12,
    },
    productItemName: {
        fontSize: 13,
        fontWeight: 'bold',
        color: colors.text,
    },
    productItemSub: {
        fontSize: 10,
        color: colors.textSecondary,
        marginTop: 2,
    },
    productItemPrice: {
        fontSize: 11,
        color: colors.secondary,
        fontWeight: '600',
        marginTop: 6,
    },
    bookmarkRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginTop: 8,
    },
    bookmarkText: {
        fontSize: 10,
        color: colors.secondary,
    },
});