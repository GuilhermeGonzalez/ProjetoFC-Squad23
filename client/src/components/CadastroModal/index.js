import React, { useContext, useState } from "react";
import { ModalContext } from "../../hooks/useModal/modalContext";

import './style.css';
import Fechar from '../../assets/close.png';

export default function CadastroModal() {
    let { handleModal } = useContext(ModalContext);
    const [tipoSelecionado, setTipoSelecionado] = useState('<p>Teucu</p>');

    const tipo1 = `
    <label>Nivel Escolar em que leciona:</label>
    <select name="nivelEscolar">
        <option value="" disabled selected hidden>Selecione seu nivel</option>
        <option value="EI">Educação Infantil e pré escola</option>
        <option value="F1">Fundamental 1</option>
        <option value="F2">Fundamental 2</option>
        <option value="EM">Ensino Médio</option>
        <option value="CP">Curso Preparatório</option>
        <option value="ES">Ensino Superior</option>
    </select>

    <label> Instituição em que leciona:</label>
    <select name="instituicao">
        <option value="" disabled selected hidden>Selecione o tipo</option>
        <option value="IPb">Instituições Públicas</option>
        <option value="IPv">Instituições Privadas</option>
        <option value="IF">Instituições filantrópicas</option>
    </select>

    <label>Cidade em que leciona:</label>
    <input type="text" placeholder="Digite a cidade em que leciona" />
    `

    const tipo2 = `
    <label>Nome completo do estudante:</label>
    <input type="text" placeholder="Digite seu nome completo" />
    <label>Data de Nascimento do estudante:</label>
    <input type="date" placeholder="XX/XX/XXXX" />
    <label>CPF do estudante:</label>
    <input type="text" placeholder="Digite seu CPF" />
    <label>Nivel Escolar do estudante:</label>
    <select name="nivelEscolar">
        <option value="" disabled selected hidden>Selecione o nivel</option>
        <option value="EI">Educação Infantil e pré escola</option>
        <option value="F1">Fundamental 1</option>
        <option value="F2">Fundamental 2</option>
        <option value="EM">Ensino Médio</option>
        <option value="CP">Curso Preparatório</option>
        <option value="ES">Ensino Superior</option>
    </select>

    <label> Instituição em que estuda:</label>
    <select name="instituicao">
        <option value="" disabled selected hidden>Selecione o tipo</option>
        <option value="IPb">Instituições Públicas</option>
        <option value="IPv">Instituições Privadas</option>
        <option value="IF">Instituições filantrópicas</option>
    </select>
    <label>Cidade em que mora:</label>
    <input type="text" placeholder="Digite a cidade em que estuda" />
`

    const tipo3 = `
    <label> Instituição em que estuda:</label>
    <select name="instituicao">
        <option value="" disabled selected hidden>Selecione o tipo</option>
        <option value="IPb">Instituições Públicas</option>
        <option value="IPv">Instituições Privadas</option>
        <option value="IF">Instituições filantrópicas</option>
    </select>
    <label>Cidade em que mora:</label>
    <input type="text" placeholder="Digite a cidade em que estuda" />
    `


    function trocaInputsLeft() {
        let ddl = document.getElementById("tipo");
        let selectedValue = ddl.options[ddl.selectedIndex].value;
        if (parseInt(selectedValue) === 0) {
            document.getElementById("inputHere").innerHTML = "";
        }
        else if (parseInt(selectedValue) === 1) {
            document.getElementById("inputHere").innerHTML = tipo1;
        }
        else if (parseInt(selectedValue) === 2) {
            document.getElementById("inputHere").innerHTML = tipo2;
        }
        else if (parseInt(selectedValue) === 3) {
            document.getElementById("inputHere").innerHTML = tipo3;
        }
    }



    return (
        <div>
            <div id="modal" className="modal-overlayCadastro active">
                <div className="modalCadastro">
                    <div className="closeModalCadastro">
                        <img onClick={handleModal} src={Fechar} alt="Botão de fechar" />
                    </div>
                    <div className="formCadastro">
                        <h2>Cadastre-se</h2>
                        <form action="" onSubmit="">
                            <div className="formInputs">
                                <div className="formInputsLeft">
                                    <label>Nome completo:</label>
                                    <input type="text" placeholder="Digite seu nome completo" />
                                    <label>Data de Nascimento:</label>
                                    <input type="date" placeholder="XX/XX/XXXX" />
                                    <label>CPF:</label>
                                    <input type="text" placeholder="Digite seu CPF" />
                                    <label>Tipo de usuário:</label>
                                    <select onChange={trocaInputsLeft} name="tipo" id="tipo">
                                        <option value="" disabled selected hidden>Selecione seu tipo de usuário</option>
                                        <option value={1}>Professor(a)</option>
                                        <option value={2}>Pais ou responsáveis</option>
                                        <option value={3}>Estudante Universitário</option>
                                        <option value={3}>Estudante Curso Preparatório</option>
                                    </select>

                                </div>
                                <div id="inputHere" className="formInputsRight">

                                </div>
                            </div>

                            <div className="formButtons">
                                <button>Cadastrar-se</button>
                                <button onClick={handleModal}>Cancelar</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    );
}