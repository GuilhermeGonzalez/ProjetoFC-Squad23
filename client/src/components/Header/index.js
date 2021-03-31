import React, { useContext } from 'react';
import imagemAuxiliar from '.././../assets/caixaVazia.png';
import LoginModal from '../LoginModal';
import { ModalContext } from "../../hooks/useModal/modalContext";
import './style.css';

export default function Header() {
    let { handleModal } = useContext(ModalContext);
    return (
        <div className="header-container">
            <div>
                <img src={imagemAuxiliar} alt="Logo" />
                <p>Logo</p>
            </div>
            <div>
                <a href="/cadastro">Cadastre-se</a>
                <button onClick={() => handleModal(<LoginModal />)}>Login</button>
            </div>
        </div>
    );
}