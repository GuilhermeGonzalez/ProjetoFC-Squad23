import React, { useContext, useState } from "react";
import { ModalContext } from "../../hooks/useModal/modalContext";

import './style.css';
import Fechar from '../../assets/close.png';
import api from '../../services/api'

export default function CadastroModal() {
    let { handleModal } = useContext(ModalContext);
    const [nome_rcpt, setNome] = useState('');
    const [cidade_rcpt, setCidade] = useState('');
    const [uf_rcpt, setUf] = useState('');
    const [email_rcpt, setEmail] = useState('');
    const [senha_rcpt, setSenha] = useState('');
    const [cpf_rcpt, setCpf] = useState('');
    const [data_nasc_rcpt, setDataNasc] = useState(Date);
    const [tipo_rcpt, setTipo] = useState('');
    const [nivel_rcpt, setNivel] = useState('');
    const [instituicao_rcpt, setInstituicao] = useState('');
    const [selectedFormType, setSelectedFormType] = useState(0);


    const Tipo1 = () => (<>
        <label>Nivel Escolar em que leciona:</label>
        <select value={nivel_rcpt} onChange={e => setNivel(e.target.value)} name="nivelEscolar">
            <option value="" disabled selected hidden>Selecione seu nivel</option>
            <option value="Educação Infantil">Educação Infantil e pré escola</option>
            <option value="Fundamental 1">Fundamental 1</option>
            <option value="Fundamental 2">Fundamental 2</option>
            <option value="Ensino Médio">Ensino Médio</option>
            <option value="Curso Preparatório">Curso Preparatório</option>
            <option value="Ensino Superior">Ensino Superior</option>
        </select>

        <label> Instituição em que leciona:</label>
        <select value={instituicao_rcpt} onChange={e => setInstituicao(e.target.value)} name="instituicao">
            <option value="" disabled selected hidden>Selecione o tipo</option>
            <option value="Instituições Públicas">Instituições Públicas</option>
            <option value="Instituições Privadas">Instituições Privadas</option>
            <option value="Instituições filantrópicas">Instituições filantrópicas</option>
        </select>

        <label>Cidade em que leciona:</label>
        <select value={cidade_rcpt} onChange={e => setCidade(e.target.value)} name="cidade">
            <option value="" disabled selected hidden>Selecione a cidade</option>
            <option value="Guaruja">Guaruja</option>
            <option value="Presidente Prudente">Presidente Prudente</option>
            <option value="Santos">Santos</option>
            <option value="São Vicente">São Vicente</option>
            <option value="Salvador">Salvador</option>
        </select>
        <label>UF:</label>
        <select value={uf_rcpt} onChange={e => setUf(e.target.value)} name="uf">
            <option value="" disabled selected hidden>Selecione o estado</option>
            <option value="BH">Bahia</option>
            <option value="RJ">Rio de Janeiro</option>
            <option value="SP">São Paulo</option>
        </select>
    </>)

    const Tipo2 = () => (<>
        <label>Nivel Escolar do estudante:</label>
        <select value={nivel_rcpt} onChange={e => setNivel(e.target.value)} name="nivelEscolar">
            <option value="" disabled selected hidden>Selecione o nivel</option>
            <option value="Educação Infantil">Educação Infantil e pré escola</option>
            <option value="Fundamental 1">Fundamental 1</option>
            <option value="Fundamental 2">Fundamental 2</option>
            <option value="Ensino Médio">Ensino Médio</option>
            <option value="Curso Preparatório">Curso Preparatório</option>
            <option value="Ensino Superior">Ensino Superior</option>
        </select>

        <label> Instituição em que estuda:</label>
        <select value={instituicao_rcpt} onChange={e => setInstituicao(e.target.value)} name="instituicao">
            <option value="" disabled selected hidden>Selecione o tipo</option>
            <option value="Instituições Públicas">Instituições Públicas</option>
            <option value="Instituições Privadas">Instituições Privadas</option>
            <option value="Instituições filantrópicas">Instituições filantrópicas</option>
        </select>
        <label>Cidade em que mora:</label>
        <select value={cidade_rcpt} onChange={e => setCidade(e.target.value)} name="cidade">
            <option value="" disabled selected hidden>Selecione a cidade</option>
            <option value="Guaruja">Guaruja</option>
            <option value="Presidente Prudente">Presidente Prudente</option>
            <option value="Santos">Santos</option>
            <option value="São Vicente">São Vicente</option>
            <option value="Salvador">Salvador</option>
        </select>
        <label>UF:</label>
        <select value={uf_rcpt} onChange={e => setUf(e.target.value)} name="uf">
            <option value="" disabled selected hidden>Selecione o estado</option>
            <option value="BH">Bahia</option>
            <option value="RJ">Rio de Janeiro</option>
            <option value="SP">São Paulo</option>
        </select>
    </>)

    const Tipo3 = () => (<>
        <label> Instituição em que estuda:</label>
        <select value={instituicao_rcpt} onChange={e => setInstituicao(e.target.value)} name="instituicao">
            <option value="" disabled selected hidden>Selecione o tipo</option>
            <option value="Instituições Públicas">Instituições Públicas</option>
            <option value="Instituições Privadas">Instituições Privadas</option>
            <option value="Instituições filantrópicas">Instituições filantrópicas</option>
        </select>
        <label>Cidade em que mora:</label>
        <select value={cidade_rcpt} onChange={e => setCidade(e.target.value)} name="cidade">
            <option value="" disabled selected hidden>Selecione a cidade</option>
            <option value="Guaruja">Guaruja</option>
            <option value="Presidente Prudente">Presidente Prudente</option>
            <option value="Santos">Santos</option>
            <option value="São Vicente">São Vicente</option>
            <option value="Salvador">Salvador</option>
        </select>
        <label>UF:</label>
        <select value={uf_rcpt} onChange={e => setUf(e.target.value)} name="uf">
            <option value="" disabled selected hidden>Selecione o estado</option>
            <option value="BH">Bahia</option>
            <option value="RJ">Rio de Janeiro</option>
            <option value="SP">São Paulo</option>
        </select>
    </>)


    function trocaInputsLeft() {
        let ddl = document.getElementById("tipo");
        let selectedValue = ddl.options[ddl.selectedIndex].value;
        setTipo(selectedValue);
        if (parseInt(selectedValue) === 0) {
            setSelectedFormType(0);
        }
        else if (selectedValue === "Professor(a)") {
            setSelectedFormType(1);
        }
        else if (selectedValue === "Pais ou responsáveis") {
            setSelectedFormType(2);
        }
        else if (selectedValue === "Estudante Curso Preparatório" || selectedValue === "Estudante Universitário") {
            setSelectedFormType(3);
        }
    }


    async function handleSubmit(event) {
        event.preventDefault();

        let dados_bancarios_rcpt = {
            banco: '',
            agencia: 0,
            conta_corrente: '',
        }
        let lista_materiais = {
            status: false,
            meta: 0,
            valorArrecadado: 0,
            material: [{
                desc_material: '',
                qtd_material: 0,
            }]
        }
        let historia_rcpt = '';
        const data = {
            nome_rcpt,
            cidade_rcpt,
            uf_rcpt,
            email_rcpt,
            senha_rcpt,
            cpf_rcpt,
            historia_rcpt,
            data_nasc_rcpt,
            tipo_rcpt,
            nivel_rcpt,
            instituicao_rcpt,
            dados_bancarios_rcpt,
            lista_materiais
        }



        if (nome_rcpt !== '' && email_rcpt !== '' && senha_rcpt !== '' && cpf_rcpt !== '') {

            await api.post('/api/receptor', data).then(res => {
                alert(res.data.msg);
                window.location.href = `/login/${res.data.id}/admin/receptor`;
            }).catch(err => {
                alert("Email já cadastrado!");
            })
        }
        else {
            alert('Por favor, preencha todos os dados!');
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
                        <form >
                            <div className="formInputs">
                                <div className="formInputsLeft">
                                    <label>Nome completo:</label>
                                    <input value={nome_rcpt} onChange={e => setNome(e.target.value)} type="text" placeholder="Digite seu nome completo" />
                                    <label>CPF:</label>
                                    <input value={cpf_rcpt} onChange={e => setCpf(e.target.value)} type="text" placeholder="Digite seu CPF" />
                                    <label>Data de Nascimento:</label>
                                    <input value={data_nasc_rcpt} onChange={e => setDataNasc(e.target.value)} type="date" placeholder="XX/XX/XXXX" />
                                    <label>Email:</label>
                                    <input value={email_rcpt} onChange={e => setEmail(e.target.value)} type="email" placeholder="Digite seu Email" />
                                    <label>Senha:</label>
                                    <input value={senha_rcpt} onChange={e => setSenha(e.target.value)} type="text" placeholder="Digite sua senha" />

                                    <label>Tipo de usuário:</label>
                                    <select defaultValue="" onChange={trocaInputsLeft} name="tipo" id="tipo">
                                        <option value="" disabled selected hidden>Selecione seu tipo de usuário</option>
                                        <option value={"Professor(a)"}>Professor(a)</option>
                                        <option value={"Pais ou responsáveis"}>Pais ou responsáveis</option>
                                        <option value={"Estudante Universitário"}>Estudante Universitário</option>
                                        <option value={"Estudante Curso Preparatório"}>Estudante Curso Preparatório</option>
                                    </select>

                                </div>
                                <div id="inputHere" className="formInputsRight">
                                    {
                                        selectedFormType === 0 ? '' :
                                            selectedFormType === 1 ? <Tipo1 /> :
                                                selectedFormType === 2 ? <Tipo2 /> :
                                                    selectedFormType === 3 ? <Tipo3 /> : ''
                                    }
                                </div>
                            </div>

                            <div className="formButtons">
                                <button onClick={handleSubmit}>Cadastrar-se</button>
                                <button onClick={handleModal}>Cancelar</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    );
}