import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import HeaderLogado from '../../../components/HeaderLogado';
import Footer from '../../../components/Footer';
import { ModalContext } from "../../../hooks/useModal/modalContext";
import IconesPerfilModal from '../../../components/IconesPerfilModal';
import circuloVazio from '../../../assets/circuloVazio.png';
import pencilImage from '../../../assets/pencil.png';
import api from '../../../services/api'

import './style.css'

export default function ReceptorListagem() {
  let { handleModal } = useContext(ModalContext);
  const { idReceptor } = useParams();
  const [receptorConectado, setReceptorConectado] = useState({});
  const [instituicao, setInstituicao] = useState("");
  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState("");
  const [cidade, setCidade] = useState("");
  const [uf, setUf] = useState("");
  const [historia, setHistoria] = useState("");
  const [dadosBancarios, setDadosBancarios] = useState({});

  useEffect(() => {
    async function findInfo() {
      const { data: receptor } = await api.get(`/api/receptor.details/${idReceptor}`);
      await setReceptorConectado(receptor);

      await setInstituicao(receptor.instituicao_rcpt);
      await setNome(receptor.nome_rcpt);
      await setTipo(receptor.tipo_rcpt);
      await setCidade(receptor.cidade_rcpt);
      await setUf(receptor.uf_rcpt);
      await setHistoria(receptor.historia_rcpt);
      await setDadosBancarios(receptor.dados_bancarios_rcpt);
    }
    findInfo();
  }, [])

  return (
    <div>
      <HeaderLogado />
      <div className="contentPagePerfil">
        <h2>Perfil</h2>
        <div className="contentPerfil">
          <div className="cardPerfil">
            <div className="tituloCardPerfil">
              <h2>{nome}</h2>
              <div className="editarPerfil">
                <img src={pencilImage} alt="imagem editar" />
                <p>Editar</p>
              </div>
            </div>

            <div className="infoCard">
              <div className="imageReceptor">
                <img src={circuloVazio} alt="foto perfil" />
                <div className="editarPerfil">
                  <img src={pencilImage} alt="imagem editar" />
                  <p onClick={() => handleModal(<IconesPerfilModal />)}>Editar</p>
                </div>
              </div>
              <div className="infoReceptor">
                <p>{tipo}</p>
                <p>{instituicao}</p>
                <p>{cidade}, {uf}</p>
              </div>
            </div>
          </div>


          <div className="cardPerfil">
            <div className="tituloCardPerfil">
              <h2>Minha História</h2>
              <div className="editarPerfil">
                <img src={pencilImage} alt="imagem editar" />
                <p>Editar</p>
              </div>
            </div>
            <p>"{historia}"</p>


          </div>


          <div className="cardPerfil">
            <div className="tituloCardPerfil">
              <h2>Dados Bancários</h2>
              <div className="editarPerfil">
                <img src={pencilImage} alt="imagem editar" />
                <p>Editar</p>
              </div>
            </div>
            <div className="infoBanco">
              <p>Banco {dadosBancarios.banco}</p>
              <p>Agencia {dadosBancarios.agencia}</p>
              <p>Conta corrente {dadosBancarios.conta_corrente}</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

