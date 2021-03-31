import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../../services/api'
import HeaderLogado from '../../../components/HeaderLogado';
import Footer from '../../../components/Footer';


export default function ListasMateriais() {
  const [nome_rcpt, setNome] = useState('');
  const [cidade_rcpt, setCidade] = useState('');
  const [uf_rcpt, setUf] = useState('');
  const [email_rcpt, setEmail] = useState('');
  const [senha_rcpt, setSenha] = useState('');
  const [cpf_rcpt, setCpf] = useState('');
  const [nome_inst, setNomeInst] = useState('');
  const [lista_materiais, setListaMateriais] = useState([]);

  const { idReceptor } = useParams();

  const [rows, setRows] = useState([]);
  const [receptorConectado, setReceptorConectado] = useState({});

  useEffect(() => {
    async function findAndGenerateRows() {
      setRows([]);
      let auxRow = [];
      const { data: receptor } = await api.get(`/api/receptor.details/${idReceptor}`);
      setReceptorConectado(receptor);
      if (receptor.lista_materiais.length !== 0) {
        receptor.lista_materiais.map(item => {
          if (item.status_listaM == true) {//lista está ativa
            auxRow.push(item);
          }
        })
        setRows(auxRow);
      }
    }
    findAndGenerateRows();
  }, [])


  async function handleSubmit() {

    const data = {
      nome_rcpt,
      cidade_rcpt,
      uf_rcpt,
      email_rcpt,
      senha_rcpt,
      cpf_rcpt,
      nome_inst,
      lista_materiais
    }
    if (nome_rcpt !== '' && cidade_rcpt !== '' && uf_rcpt !== '' && email_rcpt !== '' && senha_rcpt !== '' && cpf_rcpt !== '' && nome_inst !== '') {
      const response = await api.post('/api/receptor', data);

      if (response.status === 200) {
        window.location.href = '/login'
      }
      else {
        alert('Erro ao cadastrar o usuário!')
      }
    }
    else {
      alert('Por favor, preencha todos os dados!');
    }

  }

  //findAndGenerateRows();
  return (
    <div>
      <HeaderLogado />
      <h2>Listas de materiais disponíveis do {receptorConectado.nome_rcpt}</h2>
      <Footer />
    </div>
  );
}
