import React, { useContext } from "react";
import { ModalContext } from "../../../hooks/useModal/modalContext";

import './style.css';
import Fechar from '../../../assets/close.png';

export default function PreenchaTodosCamposModal() {
    let { handleModal } = useContext(ModalContext);



    return (
        <>
            <div id="modal" className="modal-overlayPopUp active">
                <div className="modalPopUp">
                    <div className="closeModalPopUp">
                        <img onClick={handleModal} src={Fechar} alt="Botão de fechar" />
                    </div>
                    <div className="popUpMessage">
                        <p>Ops, preencha todos os campos!</p>
                    </div>
                    <div className="popUpButton">
                        <button onClick={handleModal}>Ok</button>
                    </div>

                </div>
            </div>
        </>
    );
}