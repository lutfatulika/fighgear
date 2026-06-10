import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../../libs/supabase';
import { colors } from '../../../assets/theme';

export default function AddBlogForm() {
    const navigation = useNavigation();

    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [priceRange, setPriceRange] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);

    // INSERT ke Supabase
    const handleSubmit = async () => {
        if (!name || !category || !priceRange || !description) {
            Alert.alert('Oops!', 'Semua field wajib diisi!');
            return;
        }
        setLoading(true);
        try {
            const { error } = await supabase
                .from('products')
                .insert({ name, category, priceRange, description });

            if (error) throw error;

            Alert.alert('Sukses! ✅', `Produk "${name}" berhasil ditambahkan!`, [
                { text: 'OK', onPress: () => navigation.goBack() }
            ]);
            setName(''); setCategory(''); setPriceRange(''); setDescription('');
        } catch (error) {
            console.error('INSERT Error:', error);
            Alert.alert('Error!', 'Gagal menambahkan produk. Coba lagi!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Ionicons name="arrow-back" size={24} color={colors.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Tambah Produk</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView>
                <View style={styles.form}>

                    <Text style={styles.label}>Nama Produk *</Text>
                    <TextInput style={styles.input} placeholder="Contoh: Sarung Tinju Professional" placeholderTextColor="#555" value={name} onChangeText={setName} />

                    <Text style={styles.label}>Kategori *</Text>
                    <TextInput style={styles.input} placeholder="Contoh: Pelindung / Latihan / Seragam" placeholderTextColor="#555" value={category} onChangeText={setCategory} />

                    <Text style={styles.label}>Harga *</Text>
                    <TextInput style={styles.input} placeholder="Contoh: Rp 350.000 - Rp 550.000" placeholderTextColor="#555" value={priceRange} onChangeText={setPriceRange} />

                    <Text style={styles.label}>Deskripsi *</Text>
                    <TextInput style={[styles.input, styles.multiline]} placeholder="Deskripsi produk..." placeholderTextColor="#555" value={description} onChangeText={setDescription} multiline numberOfLines={3} />

                    <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} disabled={loading}>
                        {loading ? <ActivityIndicator color={colors.primary} /> : (
                            <><Ionicons name="add-circle-outline" size={20} color={colors.primary} /><Text style={styles.submitText}>Tambah Produk</Text></>
                        )}
                    </TouchableOpacity>

                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: colors.secondary + '20' },
    backBtn: { padding: 8, backgroundColor: '#2a2a2a', borderRadius: 20 },
    headerTitle: { fontSize: 18, fontWeight: 'bold', color: colors.text },
    form: { padding: 20 },
    label: { color: '#aaa', fontSize: 13, marginBottom: 6, marginTop: 14 },
    input: { backgroundColor: '#2a2a2a', borderRadius: 10, padding: 14, color: '#fff', fontSize: 14, borderWidth: 1, borderColor: colors.secondary + '30' },
    multiline: { height: 90, textAlignVertical: 'top' },
    submitButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: colors.secondary, paddingVertical: 15, borderRadius: 12, marginTop: 30, marginBottom: 40 },
    submitText: { color: colors.primary, fontSize: 16, fontWeight: 'bold' },
});