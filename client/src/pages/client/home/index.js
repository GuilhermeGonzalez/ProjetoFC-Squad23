import React from 'react';

import Header from '../../../components/Header';
import Footer from '../../../components/Footer';

import './style.css';
import CirculoVazio from '../.././../assets/circuloVazio.png';
import CaixaVazia from '../.././../assets/caixaVazia.png';
import CaixaGrandeVazia from '../.././../assets/caixaGrandeVazia.png';

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
            <img src={CaixaGrandeVazia} alt="imagem" />
          </div>
        </div>

        <div className="secondary-infoContainer">
          <div className="secondary-infoBox">
            <div className="secondary-imageBox">
              <img src={CaixaVazia} alt="imagem" />
            </div>
            <p>Cadastre sua lista de material
  escolar ou universitário</p>
          </div>

          <div className="secondary-infoBox">
            <div className="secondary-imageBox">
              <img src={CaixaVazia} alt="imagem" />
            </div>
            <p>Estipule um valor para um financiamento
  coletivo (vaquinha) da sua lista</p>
          </div>

          <div className="secondary-infoBox">
            <div className="secondary-imageBox">
              <img src={CaixaVazia} alt="imagem" />
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
            <input placeholder="Filtro" />
            <input placeholder="Filtro" />
            <input placeholder="Filtro" />
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

