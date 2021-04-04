import React, { useEffect, useState, useContext } from 'react';
import api from '../../../services/api';

import Header from '../../../components/Header';
import Footer from '../../../components/Footer';

import { ModalContext } from "../../../hooks/useModal/modalContext";
import CadastroModal from '../../../components/CadastroModal';

import './style.css';
import CirculoVazio from '../.././../assets/circuloVazio.png';
import BooksHomeImage from '../.././../assets/booksHome.png'

import CoinImage from '../.././../assets/coin.png'
import HeartImage from '../.././../assets/heart.png'
import FolhaImage from '../.././../assets/folha.png'

export default function Home() {
  let { handleModal } = useContext(ModalContext);
  const [doacao, setDoacao] = useState([{}]);
  const [tipo_rcpt, setTipo] = useState("");
  const [uf_rcpt, setUf] = useState("");
  const [valor_rcpt, setValor] = useState(0);

  useEffect(() => {
    findAndGenerate();
  }, [])

  useEffect(() => {
    findAndGenerate();
  }, [tipo_rcpt, uf_rcpt, valor_rcpt])

  async function findAndGenerate() {
    // const { data: receptores } = await api.get('/api/receptor.findReceptor/', data)
    // await setDoacao(receptores);
    // console.log(doacao);
    await api.get('/api/receptor.findReceptor', {
      params: {
        tipo: tipo_rcpt,
        uf: uf_rcpt,
        valor: valor_rcpt
      }
    }).then(res => {
      setDoacao(res.data);
    })
  }

  function handleDoacao(id) {
    window.location.href = `/Doacao/${id}`;
  }

  return (
    <div>
      <Header />
      <div className="content">
        <div className="principal-infoContainer">

          <div className="principal-leftbox">
            <div className="principal-textBoxContainer">
              <p>
                Encontre alguem para lhe ajudar
                com a sua lista de materiais
                ou contribua com alguém que
                precisa da sua ajuda!
              </p>
            </div>
            <div className="principal-buttonBoxContainer">
              <button onClick={() => handleModal(<CadastroModal />)} >Preciso de doações</button>
              <button><a href="#doacoes">Quero doar</a></button>
            </div>
          </div>
          <div className="principal-rigthbox">
            <img src={BooksHomeImage} alt="imagem" />
          </div>
        </div>

        <div className="secondary-infoContainer">
          <div className="secondary-infoBox">
            <div className="secondary-imageBox">
              <img src={FolhaImage} alt="imagem" />
            </div>
            <p>Cadastre sua lista de material
  escolar ou universitário</p>
          </div>

          <div className="secondary-infoBox">
            <div className="secondary-imageBox">
              <img src={CoinImage} alt="imagem" />
            </div>
            <p>Estipule um valor para um financiamento
  coletivo (vaquinha) da sua lista</p>
          </div>

          <div className="secondary-infoBox">
            <div className="secondary-imageBox">
              <img src={HeartImage} alt="imagem" />
            </div>
            <p>Ajude estudantes e professores
            conhecendo a sua história, e com
            o tipo de doação mais confortável
  para você </p>
          </div>
        </div>

        <div className="search-infoContainer">
          <div className="search-titleBox">
            <h1>Buscar doações</h1>
            <a name="doacoes" ></a>
          </div>
          <div className="search-filterBox">
            <select value={tipo_rcpt} onChange={e => setTipo(e.target.value)} name="tipo" id="tipo">
              <option value="" disabled selected hidden>Tipo de usuário</option>
              <option value={"Professor(a)"}>Professor(a)</option>
              <option value={"Pais ou responsáveis"}>Pais ou responsáveis</option>
              <option value={"Estudante Universitário"}>Estudante Universitário</option>
              <option value={"Estudante Curso Preparatório"}>Estudante Curso Preparatório</option>
            </select>

            <select value={uf_rcpt} onChange={e => setUf(e.target.value)} name="uf">
              <option value="" disabled selected hidden>Região</option>
              <option value="BH">Bahia</option>
              <option value="RJ">Rio de Janeiro</option>
              <option value="SP">São Paulo</option>
            </select>

            <select value={valor_rcpt} onChange={e => setValor(e.target.value)} name="valor">
              <option value={0} disabled selected hidden>Valor máximo</option>
              <option value={250}>Até R$250,00</option>
              <option value={500}>Até R$500,00</option>
              <option value={750}>Até R$750,00</option>
              <option value={1000}>Até R$1000,00</option>
              <option value={1001}>Maior que R$1000,00</option>
            </select>
          </div>
          {doacao.length > 0 ? <div className="search-displayBox">
            {doacao.map(item => {
              //debugger
              let porcentage = 0;
              if (item != {} && item.lista_materiais != undefined) {
                porcentage = parseFloat(((item.lista_materiais.valorArrecadado / item.lista_materiais.meta) * 100).toFixed(2));
              }
              return (
                <div onClick={e => handleDoacao(item._id)} id={item._id} className="search-cardReceptor">
                  <p>{item.nome_rcpt}</p>
                  <div className="search-infoReceptor">
                    <img src={CirculoVazio} alt="" />
                    <div className="info">
                      <p>{item.tipo_rcpt}</p>
                      <p>{item.nivel_rcpt}</p>
                      <p>{item.cidade_rcpt}, {item.uf_rcpt}</p>
                      <p>Doação em dinheiro Disponível</p>
                    </div>
                  </div>
                  <div className="search-porcentContainer">
                    <p>{porcentage} %</p>
                    <div className="porcentageBar">
                      <div className="concludedBar"></div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div> :
            <div className="doacaoDivIndisponivel">
              <p id="doacaoIndisponivel">Não doações disponíveis !</p>
            </div>
          }

        </div>
      </div>
      <Footer />
    </div>
  );
}

