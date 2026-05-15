import { supabase } from './supabase';

export const getReports = async () => {
    let resposta = await supabase.from('denuncias').select('*').order('created_at', { ascending: false });
    
    if (resposta.error != null) {
        console.log('erro ao buscar dados');
        return [];
    }

    let listaBanco = resposta.data;
    let novaLista = [];

    // passa por todos os itens que vieram do banco
    for (let i = 0; i < listaBanco.length; i++) {
        let itemAtual = listaBanco[i];
        
        let n = "Anônimo";
        let c = "";
        let d = itemAtual.descricao;
        
        // tenta separar os dados que salvamos todos juntos
        try {
            let dadosSeparados = JSON.parse(itemAtual.descricao);
            n = dadosSeparados.nome;
            c = dadosSeparados.cell;
            d = dadosSeparados.desc;
        } catch (e) {
            // se der erro não faz nada
        }

        let denunciaPronta = {
            id: String(itemAtual.id), 
            nome: n,
            cell: c,
            endereco: itemAtual.referencia,
            descricao: d,
            cidade: itemAtual.cidade,
            imagem: itemAtual.foto,
            data: new Date(itemAtual.created_at).toLocaleDateString()
        };
        
        novaLista.push(denunciaPronta);
    }

    return novaLista;
};

export const saveReport = async (item) => {
    // junta nome e celular na descrição pra caber na tabela
    let textoJunto = JSON.stringify({
        nome: item.nome,
        cell: item.cell,
        desc: item.descricao
    });

    let dadosParaBanco = {
        descricao: textoJunto,
        cidade: item.cidade,
        referencia: item.endereco,
        foto: item.imagem
    };

    let resposta = await supabase.from('denuncias').insert([dadosParaBanco]);

    if (resposta.error != null) {
        console.log('erro ao salvar');
    }
};

export const deleteReport = async (id) => {
    let resposta = await supabase.from('denuncias').delete().eq('id', id);

    if (resposta.error != null) {
        console.log('erro ao apagar');
    }
};

export const updateReport = async (id, item) => {
    // junta nome e celular na descrição pra caber na tabela
    let textoJunto = JSON.stringify({
        nome: item.nome,
        cell: item.cell,
        desc: item.descricao
    });

    let dadosParaBanco = {
        descricao: textoJunto,
        cidade: item.cidade,
        referencia: item.endereco,
        foto: item.imagem
    };

    let resposta = await supabase.from('denuncias').update(dadosParaBanco).eq('id', id);

    if (resposta.error != null) {
        console.log('erro ao atualizar');
    }
};
