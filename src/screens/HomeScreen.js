import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function HomeScreen({ navigation }) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Ecoa Denúncia</Text>
            <Text style={{ marginTop: 5, marginBottom: 20 }}>
                Dando volume à voz da sua cidade.
            </Text>
            <Text style={{ marginTop: 15, marginBottom: 30 }}>
                Denuncie aqui as irregularidades da sua cidade.
            </Text>

            <TouchableOpacity
                onPress={() => navigation.navigate('Nova Denúncia')}
                style={{ backgroundColor: '#007BFF', padding: 15, borderRadius: 10, width: 200, alignItems: 'center' }}
            >
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Nova Denúncia</Text>
            </TouchableOpacity>
        </View>
    );
}