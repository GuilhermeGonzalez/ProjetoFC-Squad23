import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../../services/api'
import { ModalContext } from "../../../hooks/useModal/modalContext";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import ConcluirModal from '../../../components/MensagensPopUp/TemCertezaAcao';
import PreenchaTodosCamposModal from '../../../components/MensagensPopUp/PreenchaTodosCampos';
import "./style.css";

import CartaoImage from '../../../assets/cartao.png';
import PixImage from '../../../assets/pix.png';

import BoletoPDF from '../../../assets/boleto.pdf';
import { set } from 'mongoose';

export default function ListasMateriaisDoacao() {
  const { idReceptor } = useParams();
  let { handleModal } = useContext(ModalContext);
  const [receptorConectado, setReceptorConectado] = useState({});
  const [nome, setNome] = useState("");

  const [formaPagamento, setFormaPagamento] = useState("");



  const boleto = `
    <div id="centerInfo"> 
      <a href=${BoletoPDF} download="boleto"> 
        <button>Gerar boleto</button>
      </a>
    </div>
  `;

  const cartaoDeCredito = `
    <div id="cartaoContent">
      <div id="cartaoContentLeft">
        <div className="lineContentCartao">
          <label>Numero do Cartão:</label>
          <input className="inputField" type="text" placeholder="Digite o número do seu cartão." />
        </div>
        <div className="lineContentCartao">
          <label>Nome do titular:</label>
          <input className="inputField" type="text" placeholder="Digite o nome do titular do cartão." />
        </div>
        <div id="ultimaLinhaCartaoInfo">
          <div className="lineContent">
            <label>Validade:</label>
            <input className="inputField" type="text" placeholder="00/0000" />
          </div>
          <div className="lineContent">
            <label>CVV:</label>
            <input className="inputField" type="text" placeholder="000" />
          </div>
        </div>
      </div>

      <div className="cartaoContentRight">
        <img src=${CartaoImage} alt="imagem do cartao"/>
      </div>
    </div>`

  const pix = ` 
    <div id="centerInfo">
      <img src=${PixImage} alt='qr code pix' /> 
    </div>
  `


  function whichModalOpen() {
    if (
      document.getElementById("valueField").value <= 0 ||
      document.getElementById("nameField").value == '' ||
      document.getElementById("emailField").value == ''
    ) {
      handleModal(<PreenchaTodosCamposModal />)
    }
    else {
      let info = {
        nome_doador: document.getElementById("nameField").value,
        email_doador: document.getElementById("emailField").value,
        doacao: {
          valor_doacao: document.getElementById("valueField").value,
          forma_pagamento: formaPagamento,
          id_receptor: idReceptor
        }
      }
      handleModal(<ConcluirModal info={info} />)
    }
  }

  function logout() {
    window.location.href = "/";
  }


  useEffect(() => {
    async function findAndGenerateRows() {
      const { data: receptor } = await api.get(`/api/receptor.details/${idReceptor}`);
      await setReceptorConectado(receptor);
      await setNome(receptor.nome_rcpt);
    }
    findAndGenerateRows();
  }, [])

  function trocaPagamento() {
    const opcao = document.querySelector('input[name="pag"]:checked').value;
    if (opcao == 'boleto') {
      setFormaPagamento('boleto');
      document.getElementById("formaPagamentoSelecionada").innerHTML = boleto;
    }
    else if (opcao == 'pix') {
      setFormaPagamento('pix');
      document.getElementById("formaPagamentoSelecionada").innerHTML = pix;
    }
    else if (opcao == 'cartaoDeCredito') {
      setFormaPagamento('cartao de credito');
      document.getElementById("formaPagamentoSelecionada").innerHTML = cartaoDeCredito;
    }
    else {
      document.getElementById("formaPagamentoSelecionada").innerHTML = " ";
    }
  }


  return (
    <>
      <Header />

      <div className="contentPagePagamento">
        <div className="headerPage">
          <div className="titlePagamento">
            <h2>Doação em dinheiro</h2>
          </div>
          <div className="voltarInicio">
            <button onClick={logout}>Voltar ao inicio</button>
          </div>
        </div>
        <h3>Ambiente de Pagamento</h3>
        <div className="cardContentPagamento">
          <div className="titleContentPagamento">
            <h3>Doação para {nome}</h3>
          </div>
          <div className="contentPagamento">
            <div className="lineContent">
              <label>Valor da contribuição:</label>
              <input id="valueField" className="inputField" type="number" placeholder="Digite o valor da sua contribuição em reais." />
            </div>
            <div className="anonimoOuNao">
              <div className="lineContent">
                <label>Nome completo:</label>
                <input id="nameField" className="inputField" type="text" placeholder="Digite seu nome completo." />
              </div>
              <div className="anonimoContent">
                <input type="radio" className="checkbox" name="anonimo" value="Anonimo" />
                <label for="anonimo">Quero permanecer anônimo</label>
              </div>
            </div>
            <div id=" emailContent" className="lineContent">
              <label>E-mail:</label>
              <input id="emailField" className="inputField" type="email" placeholder="Digite seu e-mail." />
            </div>
            <div className="meioPagamento">
              <p>Meio de pagamento: </p>
              <input onChange={trocaPagamento} type="radio" id="cartaoDeCredito" name="pag" value="cartaoDeCredito" />
              <label for="cartaoDeCredito">Cartão de crédito</label>
              <input onChange={trocaPagamento} type="radio" id="boleto" name="pag" value="boleto" />
              <label for="boleto">Boleto</label>
              <input onChange={trocaPagamento} type="radio" id="pix" name="pag" value="pix" />
              <label for="pix">Pix</label>
            </div>

            <div id="formaPagamentoSelecionada">

            </div>

            <div className="contribuirPagamento">
              <button onClick={whichModalOpen}>Contribuir</button>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </>
  );
}
