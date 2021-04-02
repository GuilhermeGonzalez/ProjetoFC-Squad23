import React from 'react';

import Header from '../../../components/Header';
import Footer from '../../../components/Footer';

import './style.css';
import CirculoVazio from '../.././../assets/circuloVazio.png';
import CaixaVazia from '../.././../assets/caixaVazia.png';
import CaixaGrandeVazia from '../.././../assets/caixaGrandeVazia.png';
import BooksHomeImage from '../.././../assets/booksHome.png'

import CoinImage from '../.././../assets/coin.png'
import HeartImage from '../.././../assets/heart.png'
import FolhaImage from '../.././../assets/folha.png'

export default function Home() {
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
              <button>Preciso de doações</button>
              <button>Quero doar</button>
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
          </div>
          <div className="search-filterBox">
            <select onChange="" name="tipo" id="tipo">
              <option value="" disabled selected hidden>Tipo de usuário</option>
              <option value={"Professor(a)"}>Professor(a)</option>
              <option value={"Pais ou responsáveis"}>Pais ou responsáveis</option>
              <option value={"Estudante Universitário"}>Estudante Universitário</option>
              <option value={"Estudante Curso Preparatório"}>Estudante Curso Preparatório</option>
            </select>

            <select name="uf">
              <option value="" disabled selected hidden>Região</option>
              <option value="BH">Bahia</option>
              <option value="RJ">Rio de Janeiro</option>
              <option value="SP">São Paulo</option>
            </select>

            <select name="valor">
              <option value="" disabled selected hidden>Valor máximo</option>
              <option value={250}>Até R$250,00</option>
              <option value={500}>Até R$500,00</option>
              <option value={750}>Até R$750,00</option>
              <option value={1000}>Até R$1000,00</option>
              <option value={1001}>Maior que R$1000,00</option>
            </select>
          </div>

          <div className="search-displayBox">
            <div className="search-cardReceptor">
              <p>Maria José</p>
              <div className="search-infoReceptor">
                <img src={CirculoVazio} alt="" />
                <div className="info">
                  <p>Professora de Educação Infantil</p>
                  <p>Escola Pública</p>
                  <p>São Paulo, Sp</p>
                  <p>Doação em dinheiro Disponível</p>
                </div>
              </div>
              <div className="search-porcentContainer">
                <p>X %</p>
                <div className="porcentageBar">
                  <div className="concludedBar"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

