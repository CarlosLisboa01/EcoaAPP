import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { saveReport } from '../services/storage';

export default function NewReportScreen() {
    const [foto, setFoto] = useState(null);
    const [n, setN] = useState('');
    const [telefone, setTelefone] = useState('');
    const [end, setEnd] = useState('');
    const [desc, setDesc] = useState('');
    const [cid, setCid] = useState('');

    const pegarImagem = async () => {
        let permissao = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissao.granted == false) {
            alert('precisa de permissao');
            return;
        }

        let res = await ImagePicker.launchImageLibraryAsync();

        if (res.canceled == false) {
            setFoto(res.assets[0].uri);
        }
    };

    const botaoSalvar = async () => {
        if (desc == '' || cid == '') {
            alert('preencha os campos descrição e cidade');
            return;
        }

        let obj = {
            id: Math.random().toString(),
            nome: n,
            cell: telefone,
            endereco: end,
            descricao: desc,
            cidade: cid,
            imagem: foto,
            data: new Date().toLocaleDateString()
        };

        await saveReport(obj);
        alert('salvou!');

        setN('');
        setTelefone('');
        setEnd('');
        setDesc('');
        setCid('');
        setFoto(null);
    };

    return (
        <ScrollView style={{ padding: 20 }}>
            <TouchableOpacity onPress={pegarImagem} style={{ backgroundColor: 'gray', padding: 10, borderRadius: 8, alignItems: 'center', width: 150 }}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Carregar Foto </Text>
            </TouchableOpacity>

            {foto != null ? (
                <Image source={{ uri: foto }} style={{ width: 100, height: 100, marginTop: 10 }} />
            ) : null}

            <Text style={{ marginTop: 15 }}>Nome:</Text>
            <TextInput
                value={n}
                onChangeText={(texto) => setN(texto)}
                style={{ borderWidth: 1, padding: 5 }}
            />

            <Text style={{ marginTop: 10 }}>Celular:</Text>
            <TextInput
                value={telefone}
                onChangeText={(texto) => setTelefone(texto)}
                keyboardType="numeric"
                style={{ borderWidth: 1, padding: 5 }}
            />

            <Text style={{ marginTop: 10 }}>Endereço:</Text>
            <TextInput
                value={end}
                onChangeText={(texto) => setEnd(texto)}
                style={{ borderWidth: 1, padding: 5 }}
            />

            <Text style={{ marginTop: 10 }}>Descrição:</Text>
            <TextInput
                value={desc}
                onChangeText={(texto) => setDesc(texto)}
                style={{ borderWidth: 1, padding: 5, height: 80 }}
                multiline={true}
            />

            <Text style={{ marginTop: 10 }}>Cidade:</Text>
            <View style={{ borderWidth: 1 }}>
                <Picker
                    selectedValue={cid}
                    onValueChange={(item) => setCid(item)}
                >
                    <Picker.Item label="selecione" value="" />
                    <Picker.Item label="São Paulo" value="São Paulo" />
                    <Picker.Item label="Rio de Janeiro" value="Rio de Janeiro" />
                    <Picker.Item label="Belo Horizonte" value="Belo Horizonte" />
                    <Picker.Item label="Curitiba" value="Curitiba" />
                    <Picker.Item label="Salvador" value="Salvador" />
                </Picker>
            </View>

            <View style={{ marginTop: 30, marginBottom: 50 }}>
                <TouchableOpacity onPress={botaoSalvar} style={{ backgroundColor: '#007BFF', padding: 15, borderRadius: 8, alignItems: 'center' }}>
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Salvar Denuncia</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}