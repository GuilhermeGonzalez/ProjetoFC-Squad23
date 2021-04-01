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
          <h1>Doação</h1>
          <button>Voltar ao Início</button>
        </div>
      </section>

      <div className="container_menor">
        <div className="contaner_1">
          <div className="box_1">
            <div className="box_1_item">
              <h3>Maria José</h3>
              <div id="circulo"></div>
            </div>

            <div className="box_2_item">
              <h3>Professora de Educação Infantil</h3>
              <h3>Escola Pública</h3>
              <h3>São Paulo, sp</h3>
            </div>
          </div>

          <div className="box_2">
            <h3>Minha História</h3>
            <div className="box_2_historia"></div>
          </div>

          <div className="box_3">
            <h3>Lista De Material Escolar</h3>
            <div>
              <h3>15 ITEM 1 </h3>
              <h3>15 ITEM 1 </h3>
              <h3>15 ITEM 1 </h3>
            </div>
          </div>
        </div>

        <div className="box_4">
          <h3>Vaquinha</h3>

              <div>
           <h3> Meta:  R$  XXX </h3>
           <h3> Meta:  R$  XXX </h3>  
            </div>

            <div className="search-porcentContainer">
                <p>X %</p>
                <div className="porcentageBar">
                  <div className="concludedBar"></div>
                </div>
              </div>                

              <button>Contribuir</button>

        </div>
      
      
      
      </div>

      <div className="margin_conteiner"></div>

      <Footer />
    </>
  );
}
