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
  const [receptorConectado, setReceptorConectado] = useState({});
  const [newItemTitle, setNewItemTitle] = useState('');
  const [newQtdItem, setNewQtdItem] = useState(0);
  const [porcentage, setPorcentage] = useState(0);
  const [meta, setMeta] = useState(0);
  const [valorArrecadado, setValorArrecadado] = useState(0);


  useEffect(() => {
    async function findAndGenerateRows() {
      setRows([]);
      let auxRow = [];
      const { data: receptor } = await api.get(`/api/receptor.details/${idReceptor}`);
      await setReceptorConectado(receptor);
      await setValorArrecadado(receptor.lista_materiais.valorArrecadado)
      await setMeta(receptor.lista_materiais.meta)
      await setPorcentage(Math.round((valorArrecadado / meta) * 100))
      receptor.lista_materiais.material.map(item => {
        auxRow.push(item);
      })
      setRows(auxRow);
    }
    findAndGenerateRows();
  }, [])
  console.log(receptorConectado);

  useEffect(() => {
    //ESSA PARTE ENVOLVE O BACKEND, TODA VEZ QUE MUDAR A ROW ELE FAZ UM UPDATE NO BANCO

  }, [rows])

  console.log(rows)

  function handleRemoveItem(id) {
    let arr = [...rows];
    setRows(arr.filter(elem => elem._id !== id));
  }

  function handleAddItem() {
    if (newItemTitle != '' && newQtdItem != 0) {
      setRows([...rows, {
        desc_material: newItemTitle,
        qtd_material: newQtdItem,
      }])

      setNewItemTitle('')
      setNewQtdItem(0)
    }
  }


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
                <p>Editar</p>
              </div>
            </div>
            <div className="textoMeioVaquinha">
              <p>Meta:</p>
              <p>R$</p>
              <p contentEditable="true" onChange={(e) => setMeta(e.target.value)}>{meta}</p>
            </div>
            <div className="textoMeioVaquinha">
              <p>Valor arrecadado:</p>
              <p>R$</p>
              <p contentEditable="true" onChange={(e) => setValorArrecadado(e.target.value)}>{valorArrecadado}</p>
            </div>
            <div className="vaquinhaPorcentage">
              <p>{porcentage} %</p>
              <div className="vaquinhaPorcentageBar">
                <div className="vaquinhaConcludedBar"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
