import React from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';

const data = [
    { id: '1', tipo: 'Observação 1', descricao: 'Detalhes da observação 1', data: '2023-10-01' },
    { id: '2', tipo: 'Observação 2', descricao: 'Detalhes da observação 2', data: '2023-10-02' },
];

const MonitoramentoScreen = () => {
    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Text style={styles.title}>{item.tipo}</Text>
            <Text>{item.descricao}</Text>
            <Text>{item.data}</Text>
        </View>
    );

    const handleAddObservation = () => {
        // Lógica para adicionar nova observação
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
            <Button title="Adicionar Observação" onPress={handleAddObservation} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    itemContainer: {
        marginBottom: 16,
        padding: 16,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
});

export default MonitoramentoScreen;

