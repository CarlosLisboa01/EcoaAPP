import React, { useEffect, useState } from 'react';
import { View, Text, Image, Button, FlatList, Linking, TouchableOpacity } from 'react-native';
import { getReports, deleteReport } from '../services/storage';

export default function ReportsScreen({ navigation }) {
    const [lista, setLista] = useState([]);

    const carregar = async () => {
        let dados = await getReports();
        setLista(dados);
    };

    useEffect(() => {
        carregar();
    }, []);

    const apagar = async (id) => {
        await deleteReport(id);
        carregar();
    };

    const chamarZap = (item) => {
        let numero = "5511900000000";
        let c = item.cidade;


        if (c == "são paulo" || c == "São Paulo") {
            numero = "5511911111111";
        } else if (c == "rio de janeiro" || c == "Rio de Janeiro") {
            numero = "5521922222222";
        } else if (c == "belo horizonte" || c == "Belo Horizonte") {
            numero = "5531933333333";
        } else if (c == "curitiba" || c == "Curitiba") {
            numero = "5541944444444";
        } else if (c == "salvador" || c == "Salvador") {
            numero = "5571955555555";
        }

        let texto = "Nova Denúncia - Nome: " + item.nome + " / Descricao: " + item.descricao;

        Linking.openURL("whatsapp://send?phone=" + numero + "&text=" + texto);
    };

    return (
        <View style={{ flex: 1, padding: 10 }}>
            <TouchableOpacity onPress={carregar} style={{ backgroundColor: '#007BFF', padding: 12, borderRadius: 8, alignItems: 'center' }}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>ATUALIZAR LISTA</Text>
            </TouchableOpacity>

            <View style={{ marginTop: 10 }} />

            {lista.length == 0 ? (
                <Text>nada salvo</Text>
            ) : (
                <FlatList
                    data={lista}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={{ borderBottomWidth: 1, paddingBottom: 10, marginBottom: 10 }}>
                            {item.imagem != null ? (
                                <Image source={{ uri: item.imagem }} style={{ width: 100, height: 100, marginBottom: 10 }} />
                            ) : null}
                            <Text>nome: {item.nome}</Text>
                            <Text>celular: {item.cell}</Text>
                            <Text>endereco: {item.endereco}</Text>
                            <Text>descrição: {item.descricao}</Text>
                            <Text>cidade: {item.cidade}</Text>
                            <Text>criado em: {item.data}</Text>

                            <View style={{ marginTop: 10 }}>
                                <TouchableOpacity onPress={() => apagar(item.id)} style={{ backgroundColor: 'red', padding: 10, borderRadius: 8, alignItems: 'center' }}>
                                    <Text style={{ color: 'white', fontWeight: 'bold' }}>APAGAR</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ marginTop: 5 }}>
                                <TouchableOpacity onPress={() => navigation.navigate('Editar Denúncia', { report: item })} style={{ backgroundColor: '#FFD700', padding: 10, borderRadius: 8, alignItems: 'center' }}>
                                    <Text style={{ color: 'black', fontWeight: 'bold' }}>EDITAR</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ marginTop: 5 }}>
                                <TouchableOpacity onPress={() => chamarZap(item)} style={{ backgroundColor: 'green', padding: 10, borderRadius: 8, alignItems: 'center' }}>
                                    <Text style={{ color: 'white', fontWeight: 'bold' }}>WHATSAPP</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                />
            )}
        </View>
    );
}