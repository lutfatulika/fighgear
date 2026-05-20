import React, { useContext, useRef, useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
    Animated, Image, ScrollView, StatusBar, StyleSheet,
    Text, TextInput, TouchableOpacity, View, Alert, ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../../assets/theme';
import products from '../products';
import { SavedContext } from '../../context/SavedContext';
import axios from 'axios';

const BASE_URL = 'https://6a09dba3e7e3f433d48382fb.mockapi.io';

export default function DetailScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const { id } = route.params;
    const { savedItems, toggleSave } = useContext(SavedContext);

    const product = products.find((item) => item.id.toString() === id.toString());
    const isBookmarked = savedItems.find(i => i.id.toString() === id.toString());

    // ─── State ─────────────────────────────────────────────────────────────────
    const [komentar, setKomentar] = useState('');
    const [daftarKomentar, setDaftarKomentar] = useState([]);
    const [deleteLoading, setDeleteLoading] = useState(false);

    // Animasi
    const imageOpacity = useRef(new Animated.Value(0)).current;
    const contentSlide = useRef(new Animated.Value(80)).current;
    const contentOpacity = useRef(new Animated.Value(0)).current;
    const bookmarkScale = useRef(new Animated.Value(1)).current;
    const buyScale = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        Animated.timing(imageOpacity, { toValue: 1, duration: 500, useNativeDriver: true }).start();
        Animated.parallel([
            Animated.timing(contentSlide, { toValue: 0, duration: 500, delay: 200, useNativeDriver: true }),
            Animated.timing(contentOpacity, { toValue: 1, duration: 500, delay: 200, useNativeDriver: true }),
        ]).start();
    }, []);

    const handleBookmarkPress = () => {
        Animated.sequence([
            Animated.spring(bookmarkScale, { toValue: 1.4, friction: 3, useNativeDriver: true }),
            Animated.spring(bookmarkScale, { toValue: 1, friction: 3, useNativeDriver: true }),
        ]).start();
        toggleSave(product);
    };

    const handleBuyPressIn = () => {
        Animated.spring(buyScale, { toValue: 0.95, useNativeDriver: true }).start();
    };

    const handleBuyPressOut = () => {
        Animated.spring(buyScale, { toValue: 1, friction: 3, useNativeDriver: true }).start();
    };

    // ─── Simpan Komentar ───────────────────────────────────────────────────────
    const handleSimpanKomentar = () => {
        if (!komentar.trim()) {
            Alert.alert('Oops!', 'Komentar tidak boleh kosong.');
            return;
        }
        const komentarBaru = {
            id: Date.now(),
            teks: komentar.trim(),
            waktu: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        };
        setDaftarKomentar(prev => [komentarBaru, ...prev]);
        setKomentar('');
    };

    // ─── DELETE: Hapus produk dari MockAPI ─────────────────────────────────────
    const handleDelete = () => {
        Alert.alert(
            'Hapus Produk',
            `Yakin ingin menghapus "${product.name}" dari API?`,
            [
                { text: 'Batal', style: 'cancel' },
                {
                    text: 'Hapus',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            setDeleteLoading(true);
                            await axios.delete(`${BASE_URL}/products/${id}`);
                            Alert.alert('Berhasil! ✅', 'Produk berhasil dihapus dari API!', [
                                { text: 'OK', onPress: () => navigation.goBack() }
                            ]);
                        } catch (error) {
                            console.error('DELETE Error:', error);
                            Alert.alert('Error!', 'Gagal menghapus produk. Coba lagi!');
                        } finally {
                            setDeleteLoading(false);
                        }
                    },
                },
            ],
            { cancelable: true }
        );
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
                {/* Gambar */}
                <Animated.View style={[styles.imageContainer, { opacity: imageOpacity }]}>
                    <Image source={product.image} style={styles.image} />
                    <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={24} color={colors.text} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.bookmarkIcon} onPress={handleBookmarkPress} activeOpacity={1}>
                        <Animated.View style={{ transform: [{ scale: bookmarkScale }] }}>
                            <Ionicons
                                name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
                                size={24}
                                color={colors.secondary}
                            />
                        </Animated.View>
                    </TouchableOpacity>
                </Animated.View>

                {/* Konten */}
                <Animated.View
                    style={[styles.content, { opacity: contentOpacity, transform: [{ translateY: contentSlide }] }]}
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

                    {/* Tombol Buy */}
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

                    {/* ─── TOMBOL DELETE ──────────────────────────────────────── */}
                    <TouchableOpacity
                        style={styles.deleteButton}
                        onPress={handleDelete}
                        disabled={deleteLoading}
                    >
                        {deleteLoading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <>
                                <Ionicons name="trash-outline" size={18} color="#fff" />
                                <Text style={styles.deleteButtonText}>Hapus dari API</Text>
                            </>
                        )}
                    </TouchableOpacity>
                    {/* ─────────────────────────────────────────────────────────── */}

                    {/* Form Komentar */}
                    <View style={styles.divider} />

                    <Text style={styles.sectionTitle}>Komentar Anda:</Text>
                    <TextInput
                        style={styles.commentInput}
                        placeholder={`Tulis komentar tentang ${product.name}...`}
                        placeholderTextColor="#666"
                        value={komentar}
                        onChangeText={setKomentar}
                        multiline={true}
                        numberOfLines={4}
                    />
                    <TouchableOpacity style={styles.commentButton} onPress={handleSimpanKomentar}>
                        <Ionicons name="chatbubble-outline" size={18} color={colors.primary} />
                        <Text style={styles.commentButtonText}>Simpan Komentar</Text>
                    </TouchableOpacity>

                    {daftarKomentar.length > 0 && (
                        <View style={styles.komentarList}>
                            <Text style={styles.sectionTitle}>💬 Komentar ({daftarKomentar.length})</Text>
                            {daftarKomentar.map((item) => (
                                <View key={item.id} style={styles.komentarItem}>
                                    <View style={styles.komentarHeader}>
                                        <Ionicons name="person-circle-outline" size={20} color={colors.secondary} />
                                        <Text style={styles.komentarUser}>Pengguna</Text>
                                        <Text style={styles.komentarWaktu}>{item.waktu}</Text>
                                    </View>
                                    <Text style={styles.komentarTeks}>{item.teks}</Text>
                                </View>
                            ))}
                        </View>
                    )}

                </Animated.View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    imageContainer: { position: 'relative' },
    image: { width: '100%', height: 300, backgroundColor: '#1A1A1A' },
    backIcon: {
        position: 'absolute', top: 16, left: 16,
        backgroundColor: 'rgba(0,0,0,0.5)', padding: 8, borderRadius: 30,
    },
    bookmarkIcon: {
        position: 'absolute', top: 16, right: 16,
        backgroundColor: 'rgba(0,0,0,0.5)', padding: 8, borderRadius: 30,
    },
    content: { padding: 20 },
    name: { fontSize: 22, fontWeight: 'bold', color: colors.text },
    category: { fontSize: 14, color: colors.textSecondary, marginTop: 4 },
    price: { fontSize: 18, color: colors.secondary, fontWeight: 'bold', marginTop: 8 },
    ratingContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 8, gap: 8 },
    rating: { fontSize: 14, color: colors.text },
    reviews: { fontSize: 12, color: colors.textSecondary },
    divider: { height: 1, backgroundColor: colors.secondary + '20', marginVertical: 16 },
    sectionTitle: { fontSize: 16, fontWeight: 'bold', color: colors.text, marginBottom: 8, marginTop: 8 },
    description: { fontSize: 14, color: colors.textSecondary, lineHeight: 20 },
    material: { fontSize: 14, color: colors.textSecondary },
    recommended: { fontSize: 14, color: colors.textSecondary },
    brand: { fontSize: 14, color: colors.textSecondary },
    buyButton: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
        gap: 10, backgroundColor: colors.secondary, paddingVertical: 14,
        borderRadius: 12, marginTop: 24, marginBottom: 10,
    },
    buyButtonText: { color: colors.primary, fontSize: 16, fontWeight: 'bold' },

    // ─── Delete Button ─────────────────────────────────────────────────────────
    deleteButton: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
        gap: 8, backgroundColor: '#cc2222', paddingVertical: 13,
        borderRadius: 12, marginBottom: 10,
    },
    deleteButtonText: { color: '#fff', fontSize: 15, fontWeight: 'bold' },
    // ──────────────────────────────────────────────────────────────────────────

    commentInput: {
        backgroundColor: '#2a2a2a', borderRadius: 12, padding: 14,
        color: '#fff', fontSize: 14, borderWidth: 1,
        borderColor: colors.secondary + '40', textAlignVertical: 'top',
        minHeight: 100, marginBottom: 12,
    },
    commentButton: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
        gap: 8, backgroundColor: colors.secondary, paddingVertical: 13,
        borderRadius: 12, marginBottom: 16,
    },
    commentButtonText: { color: colors.primary, fontSize: 15, fontWeight: 'bold' },
    komentarList: { marginTop: 8, marginBottom: 30 },
    komentarItem: {
        backgroundColor: '#2a2a2a', borderRadius: 12, padding: 14,
        marginBottom: 10, borderWidth: 1, borderColor: colors.secondary + '20',
    },
    komentarHeader: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 8 },
    komentarUser: { fontSize: 13, fontWeight: 'bold', color: colors.text, flex: 1 },
    komentarWaktu: { fontSize: 11, color: '#666' },
    komentarTeks: { fontSize: 13, color: colors.textSecondary, lineHeight: 20 },
    notFound: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    notFoundText: { color: colors.text, fontSize: 18 },
    backButton: {
        marginTop: 20, backgroundColor: colors.secondary,
        paddingHorizontal: 24, paddingVertical: 12, borderRadius: 25,
    },
    backButtonText: { color: colors.primary, fontWeight: 'bold' },
});