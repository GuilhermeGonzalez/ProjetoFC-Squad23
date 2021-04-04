import React, { useContext } from 'react';
import LoginModal from '../LoginModal';
import CadastroModal from '../CadastroModal';
import { ModalContext } from "../../hooks/useModal/modalContext";
import './style.css';

import Logo from '../../assets/logo.png';

export default function Header() {
    let { handleModal } = useContext(ModalContext);
    return (
        <div className="header-container">
            <div>
                <img src={Logo} alt="Logo" />
                <p>Donate It!</p>
            </div>
            <div>
                <a onClick={() => handleModal(<CadastroModal />)}>Cadastre-se</a>
                <button onClick={() => handleModal(<LoginModal />)}>Login</button>
            </div>
        </div>
    );
}