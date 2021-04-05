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
  const [instituicao, setInstituicao] = useState("");
  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState("");
  const [cidade, setCidade] = useState("");
  const [uf, setUf] = useState("");
  const [historia, setHistoria] = useState("");

  const [banco, setBanco] = useState("");
  const [agencia, setAgencia] = useState(0);
  const [conta_corrente, setContaCorrente] = useState("");


  const [edicaoHistoria, setEdicaoHistoria] = useState(false);
  const [edicaoBanco, setEdicaoBanco] = useState(false);
  const [destaqueEdicaoHistoria, setDestaqueEdicaoHistoria] = useState({})
  const [destaqueEdicaoBanco, setDestaqueEdicaoBanco] = useState({})

  useEffect(() => {
    async function findInfo() {
      const { data: receptor } = await api.get(`/api/receptor.details/${idReceptor}`);

      await setInstituicao(receptor.instituicao_rcpt);
      await setNome(receptor.nome_rcpt);
      await setTipo(receptor.tipo_rcpt);
      await setCidade(receptor.cidade_rcpt);
      await setUf(receptor.uf_rcpt);
      await setHistoria(receptor.historia_rcpt);
      await setBanco(receptor.dados_bancarios_rcpt.banco);
      await setAgencia(receptor.dados_bancarios_rcpt.agencia);
      await setContaCorrente(receptor.dados_bancarios_rcpt.conta_corrente);
    }
    findInfo();
  }, [])


  function habilitaEdicaoHistoria() {
    setEdicaoHistoria(true);
    setDestaqueEdicaoHistoria({ border: "2px #000 solid" });
  }

  function habilitaEdicaoBanco() {
    setEdicaoBanco(true);
    setDestaqueEdicaoBanco({ border: "2px #000 solid" });
  }

  async function salvarAlteracoesHistoria() {
    setEdicaoHistoria(false);
    let data = {
      _id: idReceptor,
      historia_rcpt: historia
    }
    await api.put('/api/receptor.historia', data);
    setDestaqueEdicaoHistoria({ border: "none" });
  }

  async function salvarAlteracoesBanco() {
    setEdicaoBanco(false);
    let data = {
      _id: idReceptor,
      dados_bancarios_rcpt: {
        banco,
        agencia,
        conta_corrente
      }
    }
    await api.put('/api/receptor.dadosBancarios', data);
    setDestaqueEdicaoBanco({ border: "none" });
  }

  const BotaoSalvarHistoria = () => (
    <button onClick={salvarAlteracoesHistoria} className="botaoSalvar">Salvar</button>
  )

  const BotaoSalvarBanco = () => (
    <button onClick={salvarAlteracoesBanco} className="botaoSalvar">Salvar</button>
  )

  return (
    <div>
      <HeaderLogado />
      <div className="contentPagePerfil">
        <h2>Perfil</h2>
        <div className="contentPerfil">
          <div className="cardPerfil">
            <div className="tituloCardPerfil">
              <h2>{nome}</h2>

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
                <p onClick={habilitaEdicaoHistoria}>Editar</p>
              </div>
            </div>
            <p contentEditable={edicaoHistoria} style={destaqueEdicaoHistoria} onBlur={(e) => setHistoria(e.target.innerText)}>{historia}</p>
            <div className="salvarDiv">
              {edicaoHistoria ? <BotaoSalvarHistoria /> : null}
            </div>
          </div>


          <div className="cardPerfil">
            <div className="tituloCardPerfil">
              <h2>Dados Bancários</h2>
              <div className="editarPerfil">
                <img src={pencilImage} alt="imagem editar" />
                <p onClick={habilitaEdicaoBanco}>Editar</p>
              </div>
            </div>
            <div className="infoBanco">
              <div className="linhaInfoBanco">Banco: <p contentEditable={edicaoBanco} style={destaqueEdicaoBanco} onBlur={(e) => setBanco(e.target.innerText)} >{banco}</p></div>
              <div className="linhaInfoBanco">Agencia: <p contentEditable={edicaoBanco} style={destaqueEdicaoBanco} onBlur={(e) => setAgencia(e.target.innerText)}>{agencia}</p></div>
              <div className="linhaInfoBanco">Conta corrente: <p contentEditable={edicaoBanco} style={destaqueEdicaoBanco} onBlur={(e) => setContaCorrente(e.target.innerText)}>{conta_corrente}</p></div>
            </div>
            <div className="salvarDiv">
              {edicaoBanco ? <BotaoSalvarBanco /> : null}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

