import React, { useContext, useState } from "react";
import { ModalContext } from "../../hooks/useModal/modalContext";

import './style.css';
import Fechar from '../../assets/close.png';

export default function LoginModal() {
    let { handleModal } = useContext(ModalContext);
    return (
        <>
            <div id="modal" className="modal-overlayLogin active">
                <div className="modalLogin">
                    <div className="closeModalLogin">
                        <img onClick={handleModal} src={Fechar} alt="Botão de fechar" />
                    </div>
                    <div className="formLogin">
                        <h2>Login</h2>
                        <form action="" onSubmit="">
                            <label htmlFor="">E-mail</label>
                            <input type="email" placeholder="Digite seu e-mail" />
                            <label htmlFor="">Senha</label>
                            <input type="password" placeholder="Digite sua senha" />

                            <button>Entrar</button>
                        </form>

                        <p>Ainda não tem uma conta? <a href="/cadastro">Cadastra-se</a></p>
                    </div>
                </div>
            </div>
        </>
    );
}