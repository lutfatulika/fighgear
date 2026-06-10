import React, { useState, useCallback } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../../assets/theme';
import { supabase } from '../../libs/supabase';

export default function ProfileScreen() {
    const navigation = useNavigation();
    const [apiProducts, setApiProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    // SELECT dari Supabase
    const getDataProducts = async () => {
        try {
            const { data, error } = await supabase
                .from('products')
                .select('*');
            if (error) throw error;
            setApiProducts(data);
        } catch (error) {
            console.error('SELECT Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => { getDataProducts(); setRefreshing(false); }, 1500);
    }, []);

    useFocusEffect(useCallback(() => { getDataProducts(); }, []));

    const menuItems = [
        { icon: 'heart-outline', title: 'Favorite Saya', value: '3 alat', route: 'Bookmark' },
        { icon: 'bookmark-outline', title: 'Koleksi Tersimpan', value: '8 alat', route: null },
        { icon: 'information-circle-outline', title: 'Tentang Aplikasi', value: 'Versi 1.0', route: null },
        { icon: 'settings-outline', title: 'Pengaturan', value: null, route: null },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={colors.background} />
            <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>

                <View style={styles.header}><Text style={styles.headerTitle}>Profil Saya</Text></View>

                <View style={styles.profileSection}>
                    <View style={styles.avatarContainer}><Text style={styles.avatarEmoji}>🥋</Text></View>
                    <Text style={styles.userName}>Petarung Handal</Text>
                    <Text style={styles.userSince}>Member sejak 2024</Text>
                </View>

                <View style={styles.statsContainer}>
                    <View style={styles.statItem}><Text style={styles.statNumber}>12</Text><Text style={styles.statLabel}>Koleksi</Text></View>
                    <View style={styles.statDivider} />
                    <View style={styles.statItem}><Text style={styles.statNumber}>3</Text><Text style={styles.statLabel}>Favorite</Text></View>
                    <View style={styles.statDivider} />
                    <View style={styles.statItem}><Text style={styles.statNumber}>5</Text><Text style={styles.statLabel}>Kategori</Text></View>
                </View>

                {/* SELECT Supabase */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>📦 Produk dari Supabase</Text>
                    <Text style={styles.sectionCount}>{apiProducts.length} produk</Text>
                </View>

                {loading ? (
                    <ActivityIndicator size="large" color={colors.secondary} style={{ marginVertical: 20 }} />
                ) : apiProducts.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <Ionicons name="cube-outline" size={40} color="#444" />
                        <Text style={styles.emptyText}>Belum ada produk</Text>
                        <Text style={styles.emptySubText}>Tambah produk dulu via tombol +</Text>
                    </View>
                ) : (
                    apiProducts.map((item, index) => (
                        <View key={index} style={styles.apiProductItem}>
                            <View style={styles.apiProductLeft}>
                                <Ionicons name="shield-outline" size={20} color={colors.secondary} />
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.apiProductName}>{item.name}</Text>
                                    <Text style={styles.apiProductCategory}>{item.category}</Text>
                                    <Text style={styles.apiProductPrice}>{item.priceRange}</Text>
                                </View>
                            </View>
                            <TouchableOpacity style={styles.editBtn} onPress={() => navigation.navigate('EditBlogForm', { productId: item.id })}>
                                <Ionicons name="create-outline" size={16} color={colors.primary} />
                                <Text style={styles.editBtnText}>Edit</Text>
                            </TouchableOpacity>
                        </View>
                    ))
                )}

                <View style={styles.menuContainer}>
                    {menuItems.map((item, index) => (
                        <TouchableOpacity key={index} style={styles.menuItem} onPress={() => { if (item.route) navigation.navigate(item.route); }}>
                            <View style={styles.menuLeft}>
                                <Ionicons name={item.icon} size={24} color={colors.secondary} />
                                <Text style={styles.menuTitle}>{item.title}</Text>
                            </View>
                            <View style={styles.menuRight}>
                                {item.value && <Text style={styles.menuValue}>{item.value}</Text>}
                                <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>

                <TouchableOpacity style={styles.logoutButton}>
                    <Ionicons name="log-out-outline" size={20} color={colors.secondary} />
                    <Text style={styles.logoutText}>Keluar</Text>
                </TouchableOpacity>

                <Text style={styles.versionText}>FightGear v1.0.0</Text>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    header: { paddingHorizontal: 24, paddingTop: 20, paddingBottom: 10 },
    headerTitle: { fontSize: 28, fontWeight: 'bold', color: colors.secondary },
    profileSection: { alignItems: 'center', marginTop: 20, marginBottom: 24 },
    avatarContainer: { width: 100, height: 100, backgroundColor: colors.secondary + '20', borderRadius: 50, alignItems: 'center', justifyContent: 'center', marginBottom: 12, borderWidth: 1, borderColor: colors.secondary },
    avatarEmoji: { fontSize: 50 },
    userName: { fontSize: 20, fontWeight: 'bold', color: colors.text },
    userSince: { fontSize: 12, color: colors.textSecondary, marginTop: 4 },
    statsContainer: { flexDirection: 'row', justifyContent: 'space-around', backgroundColor: colors.card, marginHorizontal: 24, borderRadius: 16, paddingVertical: 20, marginBottom: 24, borderWidth: 1, borderColor: colors.secondary + '20' },
    statItem: { alignItems: 'center', flex: 1 },
    statNumber: { fontSize: 22, fontWeight: 'bold', color: colors.secondary },
    statLabel: { fontSize: 12, color: colors.textSecondary, marginTop: 4 },
    statDivider: { width: 1, backgroundColor: colors.secondary + '30' },
    sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, marginBottom: 12 },
    sectionTitle: { fontSize: 16, fontWeight: 'bold', color: colors.text },
    sectionCount: { fontSize: 12, color: colors.secondary },
    emptyContainer: { alignItems: 'center', paddingVertical: 24, marginHorizontal: 24, backgroundColor: colors.card, borderRadius: 16, marginBottom: 24 },
    emptyText: { color: '#666', marginTop: 10, fontSize: 14 },
    emptySubText: { color: '#444', fontSize: 12, marginTop: 4 },
    apiProductItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: colors.card, marginHorizontal: 24, marginBottom: 8, borderRadius: 12, padding: 14, borderWidth: 1, borderColor: colors.secondary + '20' },
    apiProductLeft: { flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1 },
    apiProductName: { fontSize: 14, fontWeight: 'bold', color: colors.text },
    apiProductCategory: { fontSize: 11, color: colors.textSecondary, marginTop: 2 },
    apiProductPrice: { fontSize: 11, color: colors.secondary, fontWeight: '600', marginTop: 2 },
    editBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: colors.secondary, paddingHorizontal: 12, paddingVertical: 7, borderRadius: 8 },
    editBtnText: { color: colors.primary, fontSize: 12, fontWeight: 'bold' },
    menuContainer: { marginHorizontal: 24, backgroundColor: colors.card, borderRadius: 16, borderWidth: 1, borderColor: colors.secondary + '20', overflow: 'hidden', marginTop: 8 },
    menuItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: colors.secondary + '10' },
    menuLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    menuTitle: { fontSize: 16, color: colors.text },
    menuRight: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    menuValue: { fontSize: 14, color: colors.textSecondary },
    logoutButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, marginHorizontal: 24, marginTop: 30, paddingVertical: 14, backgroundColor: 'transparent', borderWidth: 1, borderColor: colors.secondary, borderRadius: 12 },
    logoutText: { color: colors.secondary, fontSize: 16, fontWeight: '600' },
    versionText: { textAlign: 'center', color: colors.textSecondary, fontSize: 12, marginTop: 30, marginBottom: 20 },
});