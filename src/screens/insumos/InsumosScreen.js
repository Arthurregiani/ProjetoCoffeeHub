import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const InsumosScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Gestão de Insumos</Text>
            <Button title="Adicionar Novo Insumo" onPress={() => {}} />
            {/* Lista de insumos */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        marginBottom: 16,
    },
});

export default InsumosScreen;
