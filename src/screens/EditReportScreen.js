import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { updateReport } from '../services/storage';

export default function EditReportScreen({ route, navigation }) {
    // Recebe os dados da denúncia pela navegação
    const { report } = route.params;

    const [n, setN] = useState(report.nome);
    const [telefone, setTelefone] = useState(report.cell);
    const [end, setEnd] = useState(report.endereco);
    const [desc, setDesc] = useState(report.descricao);
    const [cid, setCid] = useState(report.cidade);

    const botaoAtualizar = async () => {
        if (desc == '' || cid == '') {
            alert('preencha os campos descrição e cidade');
            return;
        }

        let objAtualizado = {
            id: report.id,
            nome: n,
            cell: telefone,
            endereco: end,
            descricao: desc,
            cidade: cid,
            imagem: report.imagem,
        };

        await updateReport(report.id, objAtualizado);
        alert('atualizou!');
        navigation.goBack();
    };

    return (
        <ScrollView style={{ padding: 20 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>
                Editar Denúncia
            </Text>

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
                <TouchableOpacity onPress={botaoAtualizar} style={{ backgroundColor: '#FFD700', padding: 15, borderRadius: 8, alignItems: 'center' }}>
                    <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}>Atualizar Denuncia</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}
