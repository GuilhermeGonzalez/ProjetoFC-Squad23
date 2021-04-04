import React, { useContext, useState } from "react";
import { ModalContext } from "../../../hooks/useModal/modalContext";

import './style.css';
import Fechar from '../../../assets/close.png';
import DoacaoEfetuadaModal from '../DoacaoEfetuada';

import api from '../../../services/api';

export default function ConcluirModal(props) {
    let { handleModal } = useContext(ModalContext);

    async function logout() {
        await api.post('/api/doador', props.info).then(res => {
            alert(res.data.mensagem)
        });
        window.location.href = "/";
    }

    return (
        <>
            <div id="modal" className="modal-overlayPopUp active">
                <div className="modalPopUp">
                    <div className="closeModalPopUp">
                        <img onClick={handleModal} src={Fechar} alt="Botão de fechar" />
                    </div>
                    <div className="popUpMessage">
                        <p>Tem certeza que deseja efetuar essa ação ?</p>
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