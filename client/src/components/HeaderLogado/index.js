import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ModalContext } from "../../hooks/useModal/modalContext";
import './style.css';

import Logo from '../../assets/logo.png';

import SairModal from '../MensagensPopUp/TemCertezaSair';

export default function Header() {
    let { handleModal } = useContext(ModalContext);
    const { idReceptor } = useParams();
    let url = window.location.href.toString();

    let clickedLista = url.includes("listaMateriais") ? "clicked" : "";
    let clickedReceptor = url.includes("receptor") ? "clicked" : "";


    return (
        <div className="headerLog-container">
            <div>
                <img src={Logo} alt="Logo" />
                <p>Donate It!</p>
            </div>
            <div>
                <a href={`/login/${idReceptor}/admin/listaMateriais`} id="listaMateriais" className={clickedLista}>Lista de Materiais</a>
                <a href={`/login/${idReceptor}/admin/receptor`} id="perfil" className={clickedReceptor}>Perfil</a>
            </div>
            <div>
                <button onClick={() => handleModal(<SairModal />)}>Sair</button>
            </div>
        </div>
    );
}