import React, { useContext, useState } from "react";
import { ModalContext } from "../../hooks/useModal/modalContext";

import './style.css';
import Fechar from '../../assets/close.png';
import CadastroModal from '../CadastroModal';
import api from "../../services/api";

export default function LoginModal() {
    let { handleModal } = useContext(ModalContext);
    const [email_rcpt, setEmail] = useState('');
    const [senha_rcpt, setSenha] = useState('');

    function changeModal() {
        handleModal();
        handleModal(<CadastroModal />);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const data = { email_rcpt, senha_rcpt }
        await api.post(`/api/receptor.login/`, data).then(res => {
            window.location.href = `/login/${res.data.id}/admin/receptor`;
        }).catch(err => {
            alert("Senha ou email invalido!")
        });
    }

    return (
        <>
            <div id="modal" className="modal-overlayLogin active">
                <div className="modalLogin">
                    <div className="closeModalLogin">
                        <img onClick={handleModal} src={Fechar} alt="Botão de fechar" />
                    </div>
                    <div className="formLogin">
                        <h2>Login</h2>
                        <form>
                            <label htmlFor="">E-mail</label>
                            <input value={email_rcpt} onChange={e => setEmail(e.target.value)} type="email" placeholder="Digite seu e-mail" />
                            <label htmlFor="">Senha</label>
                            <input value={senha_rcpt} onChange={e => setSenha(e.target.value)} type="password" placeholder="Digite sua senha" />

                            <button onClick={handleSubmit}>Entrar</button>
                        </form>

                        <p>Ainda não tem uma conta? <a onClick={changeModal}>Cadastra-se</a></p>
                    </div>
                </div>
            </div>
        </>
    );
}