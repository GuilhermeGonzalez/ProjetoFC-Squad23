import React, { useContext } from "react";
import { ModalContext } from "../../../hooks/useModal/modalContext";

import './style.css';
import Fechar from '../../../assets/close.png';

export default function DoacaoEfetuadaModal() {
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
                        <p>Sua doação foi efetuada!</p>
                    </div>
                    <div className="popUpButton">
                        <button onClick={logout}>Ok</button>
                    </div>

                </div>
            </div>
        </>
    );
}