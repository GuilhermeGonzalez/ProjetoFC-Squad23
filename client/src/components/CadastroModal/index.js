import React, { useContext, useState } from "react";
import { ModalContext } from "../../hooks/useModal/modalContext";

import './style.css';
import Fechar from '../../assets/close.png';

export default function CadastroModal() {
    let { handleModal } = useContext(ModalContext);
    const [tipoSelecionado, setTipoSelecionado] = useState('<p> </p>');

    const tipo1 = `
    <label>Nivel Escolar em que leciona:</label>
    <select name="nivelEscolar">
        <option value="" disabled selected hidden>Selecione seu nivel</option>
        <option value="Educação Infantil">Educação Infantil e pré escola</option>
        <option value="Fundamental 1">Fundamental 1</option>
        <option value="Fundamental 2">Fundamental 2</option>
        <option value="Ensino Médio">Ensino Médio</option>
        <option value="Curso Preparatório">Curso Preparatório</option>
        <option value="Ensino Superior">Ensino Superior</option>
    </select>

    <label> Instituição em que leciona:</label>
    <select name="instituicao">
        <option value="" disabled selected hidden>Selecione o tipo</option>
        <option value="Instituições Públicas">Instituições Públicas</option>
        <option value="Instituições Privadas">Instituições Privadas</option>
        <option value="Instituições filantrópicas">Instituições filantrópicas</option>
    </select>

    <label>Cidade em que leciona:</label>
    <select name="cidade">
        <option value="" disabled selected hidden>Selecione a cidade</option>
        <option value="Guaruja">Guaruja</option>
        <option value="Presidente Prudente">Presidente Prudente</option>
        <option value="Santos">Santos</option>
        <option value="São Vicente">São Vicente</option>
        <option value="Salvador">Salvador</option>
    </select>
    <label>UF:</label>
    <select name="uf">
        <option value="" disabled selected hidden>Selecione o estado</option>
        <option value="BH">Bahia</option>
        <option value="RJ">Rio de Janeiro</option>
        <option value="SP">São Paulo</option>
    </select>
    `

    const tipo2 = `
    <label>Nivel Escolar do estudante:</label>
    <select name="nivelEscolar">
        <option value="" disabled selected hidden>Selecione o nivel</option>
        <option value="Educação Infantil">Educação Infantil e pré escola</option>
        <option value="Fundamental 1">Fundamental 1</option>
        <option value="Fundamental 2">Fundamental 2</option>
        <option value="Ensino Médio">Ensino Médio</option>
        <option value="Curso Preparatório">Curso Preparatório</option>
        <option value="Ensino Superior">Ensino Superior</option>
    </select>

    <label> Instituição em que estuda:</label>
    <select name="instituicao">
        <option value="" disabled selected hidden>Selecione o tipo</option>
        <option value="Instituições Públicas">Instituições Públicas</option>
        <option value="Instituições Privadas">Instituições Privadas</option>
        <option value="Instituições filantrópicas">Instituições filantrópicas</option>
    </select>
    <label>Cidade em que mora:</label>
    <select name="cidade">
        <option value="" disabled selected hidden>Selecione a cidade</option>
        <option value="Guaruja">Guaruja</option>
        <option value="Presidente Prudente">Presidente Prudente</option>
        <option value="Santos">Santos</option>
        <option value="São Vicente">São Vicente</option>
        <option value="Salvador">Salvador</option>
    </select>
    <label>UF:</label>
    <select name="uf">
        <option value="" disabled selected hidden>Selecione o estado</option>
        <option value="BH">Bahia</option>
        <option value="RJ">Rio de Janeiro</option>
        <option value="SP">São Paulo</option>
    </select>
`

    const tipo3 = `
    <label> Instituição em que estuda:</label>
    <select name="instituicao">
        <option value="" disabled selected hidden>Selecione o tipo</option>
        <option value="Instituições Públicas">Instituições Públicas</option>
        <option value="Instituições Privadas">Instituições Privadas</option>
        <option value="Instituições filantrópicas">Instituições filantrópicas</option>
    </select>
    <label>Cidade em que mora:</label>
    <select name="cidade">
        <option value="" disabled selected hidden>Selecione a cidade</option>
        <option value="Guaruja">Guaruja</option>
        <option value="Presidente Prudente">Presidente Prudente</option>
        <option value="Santos">Santos</option>
        <option value="São Vicente">São Vicente</option>
        <option value="Salvador">Salvador</option>
    </select>
    <label>UF:</label>
    <select name="uf">
        <option value="" disabled selected hidden>Selecione o estado</option>
        <option value="BH">Bahia</option>
        <option value="RJ">Rio de Janeiro</option>
        <option value="SP">São Paulo</option>
    </select>
    `


    function trocaInputsLeft() {
        let ddl = document.getElementById("tipo");
        let selectedValue = ddl.options[ddl.selectedIndex].value;
        if (parseInt(selectedValue) === 0) {
            document.getElementById("inputHere").innerHTML = "";
        }
        else if (selectedValue === "Professor(a)") {
            document.getElementById("inputHere").innerHTML = tipo1;
        }
        else if (selectedValue === "Pais ou responsáveis") {
            document.getElementById("inputHere").innerHTML = tipo2;
        }
        else if (selectedValue === "Estudante Curso Preparatório" || selectedValue === "Estudante Universitário") {
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
                                    <label>CPF:</label>
                                    <input type="text" placeholder="Digite seu CPF" />
                                    <label>Data de Nascimento:</label>
                                    <input type="date" placeholder="XX/XX/XXXX" />
                                    <label>Email:</label>
                                    <input type="email" placeholder="Digite seu Email" />
                                    <label>Senha:</label>
                                    <input type="text" placeholder="Digite sua senha" />

                                    <label>Tipo de usuário:</label>
                                    <select onChange={trocaInputsLeft} name="tipo" id="tipo">
                                        <option value="" disabled selected hidden>Selecione seu tipo de usuário</option>
                                        <option value={"Professor(a)"}>Professor(a)</option>
                                        <option value={"Pais ou responsáveis"}>Pais ou responsáveis</option>
                                        <option value={"Estudante Universitário"}>Estudante Universitário</option>
                                        <option value={"Estudante Curso Preparatório"}>Estudante Curso Preparatório</option>
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