import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ControleSecagemScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Controle de Secagem</Text>
            {/* Implement drying control features here */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default ControleSecagemScreen;
