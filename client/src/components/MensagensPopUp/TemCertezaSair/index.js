import React, { useContext } from "react";
import { ModalContext } from "../../../hooks/useModal/modalContext";

import './style.css';
import Fechar from '../../../assets/close.png';

export default function SairModal() {
    let { handleModal } = useContext(ModalContext);

    function logout() {
        window.location.href = "/"
    }

    return (
        <>
            <div id="modal" className="modal-overlayPopUp active">
                <div className="modalPopUp">
                    <div className="closeModalPopUp">
                        <img onClick={handleModal} src={Fechar} alt="Botão de fechar" />
                    </div>
                    <div className="popUpMessage">
                        <p>Tem certeza que deseja sair ?</p>
                    </div>
                    <div className="popUpButton">
                        <button onClick={logout}>Sim</button>
                        <button onClick={handleModal}>Cancelar</button>
                    </div>

                </div>
            </div>
        </>
    );
}