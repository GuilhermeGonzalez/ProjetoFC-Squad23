import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../../services/api'
import HeaderLogado from '../../../components/HeaderLogado';
import Footer from '../../../components/Footer';
import pencilImage from '../../../assets/pencil.png';
import './style.css';

import { FiTrash } from 'react-icons/fi'

export default function ListasMateriais() {
  const { idReceptor } = useParams();
  const [rows, setRows] = useState([{}]);
  const [newItemTitle, setNewItemTitle] = useState('');
  const [newQtdItem, setNewQtdItem] = useState(0);
  const [porcentage, setPorcentage] = useState(0);
  const [meta, setMeta] = useState(0);
  const [valorArrecadado, setValorArrecadado] = useState(0);
  const [edicao, setEdicao] = useState(false);
  const [width, setWidth] = useState({ width: '0%' })
  const [destaqueEdicao, setDestaqueEdicao] = useState({})


  useEffect(() => {
    async function findAndGenerateRows() {
      setRows([]);
      let auxRow = [];
      const { data: receptor } = await api.get(`/api/receptor.details/${idReceptor}`);
      await setValorArrecadado(receptor.lista_materiais.valorArrecadado)
      await setMeta(receptor.lista_materiais.meta)
      await setPorcentage(parseFloat(((receptor.lista_materiais.valorArrecadado / receptor.lista_materiais.meta) * 100).toFixed(2)))
      await setWidth({ width: `${porcentage}%` });//////////////////
      receptor.lista_materiais.material.map(item => {
        auxRow.push(item);
      })
      setRows(auxRow);
    }
    findAndGenerateRows();
  }, [])


  async function handleRemoveItem(id) {
    let arr = rows.filter(elem => elem._id !== id);
    setRows(arr);

    let data = {
      _id: idReceptor,
      material: arr
    }
    console.log(data);
    await api.put('/api/receptor.materiais/', data);
  }

  async function handleAddItem() {
    if (newItemTitle != '' && newQtdItem != 0) {
      let auxRows = [...rows, {
        desc_material: newItemTitle,
        qtd_material: newQtdItem,
      }]
      setRows(auxRows);

      let data = {
        _id: idReceptor,
        material: auxRows
      }
      await api.put('/api/receptor.materiais/', data);
      setNewItemTitle('')
      setNewQtdItem(0)

    }
  }

  function habilitaEdicao() {
    setEdicao(true);
    setDestaqueEdicao({ border: "2px #000 solid" });
  }

  async function salvarAlteracoesVaquinha() {
    setEdicao(false);
    let data = {
      _id: idReceptor,
      meta: meta
    }
    await api.put('/api/receptor.meta', data);
    setPorcentage(((valorArrecadado / meta) * 100).toFixed(2))
    setWidth({ width: `${porcentage}%` });
    setDestaqueEdicao({ border: "none" });
  }

  const BotaoSalvarVaquinha = () => (
    <button onClick={salvarAlteracoesVaquinha} className="botaoSalvarVaquinha">Salvar</button>
  )

  return (
    <div>
      <HeaderLogado />
      <div className="contentPageLista">
        <h2>Lista de Materiais</h2>
        <div className="contentListaMateriais">
          <div className="listaMaterialCard card">
            <div className="tituloCard">
              <h2>Lista de Material Escolar</h2>

            </div>
            <div className="itemsCardLista">
              <div id="myDIV" className="header">
                <input
                  type="number"
                  id="myInputQtde"
                  placeholder="Qtde..."
                  onChange={(e) => setNewQtdItem(e.target.value)}
                  value={newQtdItem}
                />
                <input
                  type="text"
                  id="myInput"
                  placeholder="Material..."
                  onChange={(e) => setNewItemTitle(e.target.value)}
                  value={newItemTitle}
                />
                <button type="submit" data-testid="add-task-button" onClick={handleAddItem} className="addBtn">+</button>
              </div>

              <ul id="myUL">
                {rows.map(item => (
                  <li key={item._id}>
                    <strong>{item.qtd_material}</strong>
                    <p>{item.desc_material}</p>
                    <button id="removeButton" type="button" data-testid="remove-task-button" onClick={() => handleRemoveItem(item._id)}>
                      <FiTrash size={16} />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="vaquinha card">
            <div className="tituloCard">
              <h2>Vaquinha</h2>
              <div className="editarVaquinha">
                <img src={pencilImage} alt="imagem editar" />
                <p onClick={habilitaEdicao}>Editar</p>
              </div>
            </div>
            <div className="textoMeioVaquinha">
              <p>Meta:</p>
              <p>R$</p>
              <p contentEditable={edicao} style={destaqueEdicao} onInput={(e) => setMeta(e.target.innerText)}>{meta}</p>
            </div>
            <div className="textoMeioVaquinha">
              <p>Valor arrecadado:</p>
              <p>R$</p>
              <p >{valorArrecadado}</p>
            </div>
            <div className="vaquinhaPorcentage">
              <p>{porcentage} %</p>
              <div className="vaquinhaPorcentageBar">
                <div className="vaquinhaConcludedBar" style={width}></div>
              </div>
            </div>
            <div className="salvarVaquinhaDiv">
              {edicao ? <BotaoSalvarVaquinha /> : null}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
