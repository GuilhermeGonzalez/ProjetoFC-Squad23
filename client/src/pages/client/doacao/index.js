import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../../services/api'
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import circuloVazio from '../../../assets/circuloVazio.png';
import "./style.css";

export default function ListasMateriaisDoacao() {
  const { idReceptor } = useParams();

  const [rows, setRows] = useState([{}]);
  const [porcentage, setPorcentage] = useState(0);
  const [meta, setMeta] = useState(0);
  const [valorArrecadado, setValorArrecadado] = useState(0);
  const [instituicao, setInstituicao] = useState("");
  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState("");
  const [cidade, setCidade] = useState("");
  const [uf, setUf] = useState("");
  const [historia, setHistoria] = useState("");


  useEffect(() => {
    async function findAndGenerateRows() {
      setRows([]);
      let auxRow = [];
      const { data: receptor } = await api.get(`/api/receptor.details/${idReceptor}`);
      await setValorArrecadado(receptor.lista_materiais.valorArrecadado)
      await setMeta(receptor.lista_materiais.meta)
      await setPorcentage(parseFloat(((receptor.lista_materiais.valorArrecadado / receptor.lista_materiais.meta) * 100).toFixed(2)))
      await setInstituicao(receptor.instituicao_rcpt);
      await setNome(receptor.nome_rcpt);
      await setTipo(receptor.tipo_rcpt);
      await setCidade(receptor.cidade_rcpt);
      await setUf(receptor.uf_rcpt);
      await setHistoria(receptor.historia_rcpt);
      receptor.lista_materiais.material.map(item => {
        auxRow.push(item);
      })
      setRows(auxRow);
    }
    findAndGenerateRows();
  }, [])

  function logout() {
    window.location.href = "/"
  }

  function pagamento() {
    window.location.href = `/Doacao/${idReceptor}/pagamento`
  }

  return (
    <>
      <Header />
      <div className="contentPageDoacao">
        <div className="headerPage">
          <div className="titleDoacao">
            <h2>Doação</h2>
          </div>
          <div className="voltarInicio">
            <button onClick={logout}>Voltar ao inicio</button>
          </div>
        </div>

        <div className="contentDoacao">
          <div className="contentLeft">
            <div className="cardLeft">
              <div className="tituloCard">
                <h2>{nome}</h2>
              </div>
              <div className="infoCardDoacao">
                <div className="imageReceptorDoacao">
                  <img src={circuloVazio} alt="foto perfil" />
                </div>
                <div className="infoReceptorDoacao">
                  <p>{tipo}</p>
                  <p>{instituicao}</p>
                  <p>{cidade}, {uf}</p>
                </div>
              </div>
            </div>

            <div className="cardLeft">
              <div className="tituloCard">
                <h2>Minha História</h2>
              </div>
              <p className="historiaDoacao">"{historia}"</p>
            </div>

            <div className="cardLeft">
              <div className="tituloCard">
                <h2>Lista de Material Escolar</h2>
              </div>
              <ul id="myUL">
                {rows.map(item => (
                  <li key={item._id}>
                    <strong>{item.qtd_material}</strong>
                    <p>{item.desc_material}</p>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          <div className="contentRight">
            <div className="cardRight">
              <div className="tituloCard">
                <h2>Vaquinha</h2>
              </div>
              <div className="textoMeioVaquinhaDoacao">
                <p>Meta:</p>
                <p>R$</p>
                <p>{meta}</p>
              </div>
              <div className="textoMeioVaquinhaDoacao">
                <p>Valor arrecadado:</p>
                <p>R$</p>
                <p>{valorArrecadado}</p>
              </div>
              <div className="vaquinhaDoacaoPorcentage">
                <p>{porcentage} %</p>
                <div className="vaquinhaDoacaoPorcentageBar">
                  <div className="vaquinhaDoacaoConcludedBar"></div>
                </div>
              </div>
              <div className="botaoContribuir">
                <button onClick={pagamento}>Contribuir</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
