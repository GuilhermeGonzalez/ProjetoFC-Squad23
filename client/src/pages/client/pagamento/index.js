import React from "react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import "./style.css";

export default function ListasMateriaisDoacao() {
  return (
    <>
      <Header />

      <section className="container">
        <div className="header_top">
          <div className="header_tistle">
            <h1>Doação em dinheiro</h1>
            <h2>Ambiente de pagamento</h2>
          </div>
          <button>Voltar ao Início</button>
        </div>
      </section>

      <div className="container_menor">
        <div className="container_title">
          <h1> Doação para Maria José</h1>
        </div>

        <div className="input_1">
          <label for="valor" className="">
            Valor da Contribuição
          </label>
          <input id="valor" type="text"></input>
        </div>

        <div className="input_2">
          
          <div>
            <label for="nome">Nome Completo</label>
            <input id="nome" type="text" placeholder="Digite seu nome"></input>
          </div> 

<div class="medico">
  <label for="a">Desejo me manter anônimo</label>
  <input  id="a" type="radio"></input>
</div>


        </div>

        
      </div>

      <div className="margin_conteiner"></div>

      <Footer />
    </>
  );
}
