import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { colors } from '../../../assets/theme';

const BASE_URL = 'https://6a09dba3e7e3f433d48382fb.mockapi.io';

export default function AddBlogForm() {
    const navigation = useNavigation();

    // ─── State Form ────────────────────────────────────────────────────────────
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [subCategory, setSubCategory] = useState('');
    const [priceRange, setPriceRange] = useState('');
    const [description, setDescription] = useState('');
    const [material, setMaterial] = useState('');
    const [rating, setRating] = useState('');
    const [totalReviews, setTotalReviews] = useState('');
    const [recommendedFor, setRecommendedFor] = useState('');
    const [brand, setBrand] = useState('');
    const [loading, setLoading] = useState(false);

    // ─── Handler POST ──────────────────────────────────────────────────────────
    const handleSubmit = async () => {
        // Validasi field wajib
        if (!name || !category || !priceRange || !description) {
            Alert.alert('Oops!', 'Nama, Kategori, Harga, dan Deskripsi wajib diisi!');
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(`${BASE_URL}/products`, {
                name,
                category,
                subCategory,
                priceRange,
                description,
                material,
                rating: parseFloat(rating) || 0,
                totalReviews: parseInt(totalReviews) || 0,
                recommendedFor,
                brand,
            });

            console.log('Produk berhasil ditambahkan:', response.data);
            Alert.alert('Sukses! ✅', `Produk "${name}" berhasil ditambahkan!`, [
                { text: 'OK', onPress: () => navigation.goBack() }
            ]);

            // Reset form
            setName(''); setCategory(''); setSubCategory('');
            setPriceRange(''); setDescription(''); setMaterial('');
            setRating(''); setTotalReviews(''); setRecommendedFor('');
            setBrand('');

        } catch (error) {
            console.error('Error:', error);
            Alert.alert('Error!', 'Gagal menambahkan produk. Coba lagi!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Ionicons name="arrow-back" size={24} color={colors.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Tambah Produk</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.form}>

                    {/* Nama Produk */}
                    <Text style={styles.label}>Nama Produk *</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Contoh: Sarung Tinju Professional"
                        placeholderTextColor="#555"
                        value={name}
                        onChangeText={setName}
                    />

                    {/* Kategori */}
                    <Text style={styles.label}>Kategori *</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Contoh: Pelindung / Latihan / Seragam"
                        placeholderTextColor="#555"
                        value={category}
                        onChangeText={setCategory}
                    />

                    {/* Sub Kategori */}
                    <Text style={styles.label}>Sub Kategori</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Contoh: Sarung Tangan / Headgear"
                        placeholderTextColor="#555"
                        value={subCategory}
                        onChangeText={setSubCategory}
                    />

                    {/* Harga */}
                    <Text style={styles.label}>Harga *</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Contoh: Rp 350.000 - Rp 550.000"
                        placeholderTextColor="#555"
                        value={priceRange}
                        onChangeText={setPriceRange}
                    />

                    {/* Deskripsi */}
                    <Text style={styles.label}>Deskripsi *</Text>
                    <TextInput
                        style={[styles.input, styles.multiline]}
                        placeholder="Deskripsi produk..."
                        placeholderTextColor="#555"
                        value={description}
                        onChangeText={setDescription}
                        multiline={true}
                        numberOfLines={3}
                    />

                    {/* Material */}
                    <Text style={styles.label}>Material</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Contoh: Kulit sintetis + busa premium"
                        placeholderTextColor="#555"
                        value={material}
                        onChangeText={setMaterial}
                    />

                    {/* Rating */}
                    <Text style={styles.label}>Rating</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Contoh: 4.8"
                        placeholderTextColor="#555"
                        value={rating}
                        onChangeText={setRating}
                        keyboardType="numeric"
                    />

                    {/* Total Reviews */}
                    <Text style={styles.label}>Total Reviews</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Contoh: 234"
                        placeholderTextColor="#555"
                        value={totalReviews}
                        onChangeText={setTotalReviews}
                        keyboardType="numeric"
                    />

                    {/* Rekomendasi */}
                    <Text style={styles.label}>Rekomendasi Untuk</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Contoh: Pemula hingga profesional"
                        placeholderTextColor="#555"
                        value={recommendedFor}
                        onChangeText={setRecommendedFor}
                    />

                    {/* Brand */}
                    <Text style={styles.label}>Brand</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Contoh: FightGear Pro"
                        placeholderTextColor="#555"
                        value={brand}
                        onChangeText={setBrand}
                    />

                    {/* Tombol Submit */}
                    <TouchableOpacity
                        style={styles.submitButton}
                        onPress={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color={colors.primary} />
                        ) : (
                            <>
                                <Ionicons name="add-circle-outline" size={20} color={colors.primary} />
                                <Text style={styles.submitText}>Tambah Produk</Text>
                            </>
                        )}
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
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: colors.secondary + '20',
    },
    backBtn: {
        padding: 8,
        backgroundColor: '#2a2a2a',
        borderRadius: 20,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.text,
    },
    form: {
        padding: 20,
    },
    label: {
        color: '#aaa',
        fontSize: 13,
        marginBottom: 6,
        marginTop: 14,
    },
    input: {
        backgroundColor: '#2a2a2a',
        borderRadius: 10,
        padding: 14,
        color: '#fff',
        fontSize: 14,
        borderWidth: 1,
        borderColor: colors.secondary + '30',
    },
    multiline: {
        height: 90,
        textAlignVertical: 'top',
    },
    submitButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        backgroundColor: colors.secondary,
        paddingVertical: 15,
        borderRadius: 12,
        marginTop: 30,
        marginBottom: 40,
    },
    submitText: {
        color: colors.primary,
        fontSize: 16,
        fontWeight: 'bold',
    },
});