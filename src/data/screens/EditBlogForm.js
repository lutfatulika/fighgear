import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { supabase } from '../../libs/supabase';
import { colors } from '../../../assets/theme';

export default function EditBlogForm() {
    const navigation = useNavigation();
    const route = useRoute();
    const { productId } = route.params;

    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [priceRange, setPriceRange] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(true);
    const [updateLoading, setUpdateLoading] = useState(false);

    // SELECT by ID untuk isi form
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data, error } = await supabase
                    .from('products')
                    .select('*')
                    .eq('id', productId)
                    .single();
                if (error) throw error;
                setName(data.name || '');
                setCategory(data.category || '');
                setPriceRange(data.priceRange || '');
                setDescription(data.description || '');
            } catch (error) {
                Alert.alert('Error!', 'Gagal mengambil data produk.');
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [productId]);

    // UPDATE ke Supabase
    const handleUpdate = async () => {
        if (!name || !category || !priceRange || !description) {
            Alert.alert('Oops!', 'Semua field wajib diisi!');
            return;
        }
        setUpdateLoading(true);
        try {
            const { error } = await supabase
                .from('products')
                .update({ name, category, priceRange, description })
                .eq('id', productId);
            if (error) throw error;
            Alert.alert('Sukses! ✅', `Produk "${name}" berhasil diupdate!`, [
                { text: 'OK', onPress: () => navigation.goBack() }
            ]);
        } catch (error) {
            console.error('UPDATE Error:', error);
            Alert.alert('Error!', 'Gagal mengupdate produk. Coba lagi!');
        } finally {
            setUpdateLoading(false);
        }
    };

    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <ActivityIndicator size="large" color={colors.secondary} style={{ flex: 1 }} />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Ionicons name="arrow-back" size={24} color={colors.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Edit Produk</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView>
                <View style={styles.form}>

                    <Text style={styles.label}>Nama Produk *</Text>
                    <TextInput style={styles.input} placeholderTextColor="#555" value={name} onChangeText={setName} />

                    <Text style={styles.label}>Kategori *</Text>
                    <TextInput style={styles.input} placeholderTextColor="#555" value={category} onChangeText={setCategory} />

                    <Text style={styles.label}>Harga *</Text>
                    <TextInput style={styles.input} placeholderTextColor="#555" value={priceRange} onChangeText={setPriceRange} />

                    <Text style={styles.label}>Deskripsi *</Text>
                    <TextInput style={[styles.input, styles.multiline]} placeholderTextColor="#555" value={description} onChangeText={setDescription} multiline numberOfLines={3} />

                    <TouchableOpacity style={styles.updateButton} onPress={handleUpdate} disabled={updateLoading}>
                        {updateLoading ? <ActivityIndicator color={colors.primary} /> : (
                            <><Ionicons name="save-outline" size={20} color={colors.primary} /><Text style={styles.updateText}>Update Produk</Text></>
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
    updateButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: colors.secondary, paddingVertical: 15, borderRadius: 12, marginTop: 30, marginBottom: 40 },
    updateText: { color: colors.primary, fontSize: 16, fontWeight: 'bold' },
});