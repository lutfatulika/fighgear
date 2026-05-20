import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { FlatList, Image, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import products from '../products';
import { colors } from '../../../assets/theme';

export default function HomeScreen() {
    const navigation = useNavigation();

    // ─── State Search ──────────────────────────────────────────────────────────
    const [search, setSearch] = useState('');

    const recommendedProducts = [...products].sort((a, b) => b.rating - a.rating).slice(0, 4);

    // Filter produk berdasarkan search
    const filteredProducts = search.trim() === ''
        ? recommendedProducts
        : products.filter(item =>
            item.name.toLowerCase().includes(search.toLowerCase()) ||
            item.category.toLowerCase().includes(search.toLowerCase())
        );

    const renderProductCard = ({ item }) => (
        <TouchableOpacity
            style={styles.productCard}
            onPress={() => navigation.navigate('Detail', { id: item.id })}
            activeOpacity={0.9}
        >
            <Image source={item.image} style={styles.productImage} />
            <View style={styles.productOverlay}>
                <View style={styles.ratingBadge}>
                    <Text style={styles.ratingStar}>⭐</Text>
                    <Text style={styles.ratingText}>{item.rating}</Text>
                </View>
            </View>
            <View style={styles.productInfo}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productCategory}>{item.subCategory}</Text>
                <Text style={styles.productPrice}>{item.priceRange}</Text>
                <View style={styles.linkIconContainer}>
                    <Ionicons name="link-outline" size={14} color={colors.secondary} />
                    <Text style={styles.linkText}>Lihat Rekomendasi</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={colors.background} />

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <View>
                        <Text style={styles.headerTitle}>FIGHTGEAR</Text>
                        <Text style={styles.headerSubtitle}>Katalog Alat Beladiri ⚡</Text>
                    </View>
                    <View style={styles.headerIcon}>
                        <Ionicons name="shield" size={28} color={colors.secondary} />
                    </View>
                </View>

                {/* ─── SEARCH BAR ─────────────────────────────────────────────── */}
                <View style={styles.searchContainer}>
                    <Ionicons name="search-outline" size={18} color="#666" style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Cari produk fighting gear..."
                        placeholderTextColor="#666"
                        value={search}
                        onChangeText={setSearch}
                    />
                    {search.length > 0 && (
                        <TouchableOpacity onPress={() => setSearch('')}>
                            <Ionicons name="close-circle" size={18} color="#666" />
                        </TouchableOpacity>
                    )}
                </View>
                {/* ─────────────────────────────────────────────────────────────── */}

                <View style={styles.bannerContainer}>
                    <View style={styles.banner}>
                        <Text style={styles.bannerTitle}>Champion's Choice</Text>
                        <Text style={styles.bannerSubtitle}>Peralatan Berkualitas</Text>
                        <Text style={styles.bannerDesc}>Untuk Para Juara</Text>
                        <TouchableOpacity style={styles.bannerButton}>
                            <Text style={styles.bannerButtonText}>Jelajahi →</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>
                        {search.trim() === '' ? '💪 Rekomendasi Untukmu' : '🔍 Hasil Pencarian'}
                    </Text>
                    {search.trim() === '' && (
                        <TouchableOpacity onPress={() => navigation.navigate('Discover')}>
                            <Text style={styles.seeAll}>Lihat Semua →</Text>
                        </TouchableOpacity>
                    )}
                </View>

                {filteredProducts.length === 0 ? (
                    <View style={styles.emptySearch}>
                        <Ionicons name="search" size={40} color="#444" />
                        <Text style={styles.emptyText}>Produk tidak ditemukan</Text>
                    </View>
                ) : (
                    <FlatList
                        horizontal
                        data={filteredProducts}
                        renderItem={renderProductCard}
                        keyExtractor={(item) => item.id.toString()}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.recommendedList}
                    />
                )}

                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>🏷️ Kategori Populer</Text>
                </View>

                <View style={styles.categoriesContainer}>
                    <TouchableOpacity
                        style={styles.categoryCard}
                        onPress={() => navigation.navigate('Discover', { cat: 'Pelindung' })}
                    >
                        <Ionicons name="shield-outline" size={32} color={colors.secondary} />
                        <Text style={styles.categoryCardTitle}>Pelindung</Text>
                        <Text style={styles.categoryCardDesc}>Protective Gear</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.categoryCard}
                        onPress={() => navigation.navigate('Discover', { cat: 'Latihan' })}
                    >
                        <Ionicons name="fitness-outline" size={32} color={colors.secondary} />
                        <Text style={styles.categoryCardTitle}>Latihan</Text>
                        <Text style={styles.categoryCardDesc}>Training Equipment</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.categoryCard}
                        onPress={() => navigation.navigate('Discover', { cat: 'Seragam' })}
                    >
                        <Ionicons name="shirt-outline" size={32} color={colors.secondary} />
                        <Text style={styles.categoryCardTitle}>Seragam</Text>
                        <Text style={styles.categoryCardDesc}>Apparel</Text>
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
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 16,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: colors.secondary,
        letterSpacing: 1,
    },
    headerSubtitle: {
        fontSize: 12,
        color: colors.textSecondary,
        marginTop: 2,
    },
    headerIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: colors.card,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: colors.secondary + '30',
    },

    // ─── Search Bar ────────────────────────────────────────────────────────────
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#2a2a2a',
        marginHorizontal: 20,
        marginBottom: 20,
        borderRadius: 12,
        paddingHorizontal: 14,
        borderWidth: 1,
        borderColor: colors.secondary + '30',
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        height: 46,
        color: '#fff',
        fontSize: 14,
    },
    emptySearch: {
        alignItems: 'center',
        paddingVertical: 30,
    },
    emptyText: {
        color: '#555',
        marginTop: 10,
        fontSize: 14,
    },
    // ──────────────────────────────────────────────────────────────────────────

    bannerContainer: {
        paddingHorizontal: 20,
        marginBottom: 24,
    },
    banner: {
        backgroundColor: colors.card,
        borderRadius: 20,
        padding: 24,
        borderWidth: 1,
        borderColor: colors.secondary + '30',
        shadowColor: colors.secondary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
    },
    bannerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.secondary,
    },
    bannerSubtitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: colors.text,
        marginTop: 4,
    },
    bannerDesc: {
        fontSize: 14,
        color: colors.textSecondary,
        marginTop: 8,
    },
    bannerButton: {
        marginTop: 16,
        backgroundColor: colors.secondary,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 25,
        alignSelf: 'flex-start',
    },
    bannerButtonText: {
        color: colors.primary,
        fontWeight: 'bold',
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 12,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.text,
    },
    seeAll: {
        fontSize: 12,
        color: colors.secondary,
    },
    recommendedList: {
        paddingLeft: 20,
        paddingRight: 8,
    },
    productCard: {
        width: 180,
        backgroundColor: colors.card,
        borderRadius: 16,
        marginRight: 16,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: colors.secondary + '20',
    },
    productImage: {
        width: '100%',
        height: 130,
        backgroundColor: '#1A1A1A',
    },
    productOverlay: {
        position: 'absolute',
        top: 8,
        right: 8,
    },
    ratingBadge: {
        flexDirection: 'row',
        backgroundColor: 'rgba(0,0,0,0.7)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        alignItems: 'center',
    },
    ratingStar: {
        fontSize: 10,
        marginRight: 4,
    },
    ratingText: {
        fontSize: 10,
        color: colors.secondary,
        fontWeight: 'bold',
    },
    productInfo: {
        padding: 12,
    },
    productName: {
        fontSize: 14,
        fontWeight: 'bold',
        color: colors.text,
        marginBottom: 2,
    },
    productCategory: {
        fontSize: 11,
        color: colors.textSecondary,
        marginBottom: 4,
    },
    productPrice: {
        fontSize: 11,
        color: colors.secondary,
        fontWeight: '600',
        marginBottom: 6,
    },
    linkIconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    linkText: {
        fontSize: 10,
        color: colors.secondary,
    },
    categoriesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginBottom: 30,
        gap: 12,
    },
    categoryCard: {
        flex: 1,
        backgroundColor: colors.card,
        borderRadius: 16,
        padding: 16,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.secondary + '20',
    },
    categoryCardTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: colors.text,
        marginTop: 10,
    },
    categoryCardDesc: {
        fontSize: 10,
        color: colors.textSecondary,
        marginTop: 4,
    },
});
