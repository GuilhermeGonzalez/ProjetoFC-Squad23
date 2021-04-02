import React, { useContext, useState } from "react";
import { ModalContext } from "../../hooks/useModal/modalContext";

import './style.css';
import Fechar from '../../assets/close.png';
import circuloVazio from '../../assets/circuloVazio.png';

export default function IconesPerfilModal() {
    let { handleModal } = useContext(ModalContext);


    return (
        <>
            <div id="modal" className="modal-overlayIconesPerfil active">
                <div className="modalIconesPerfil">
                    <div className="closeModalIconesPerfil">
                        <img onClick={handleModal} src={Fechar} alt="Botão de fechar" />
                    </div>

                    <div className="formIconesPerfil">
                        <h2>Icones de Perfil</h2>
                        <form action="" onSubmit="">
                            <div className="iconsBox">
                                <img src={circuloVazio} alt="imagem icone de perfil" />
                                <img src={circuloVazio} alt="imagem icone de perfil" />
                                <img src={circuloVazio} alt="imagem icone de perfil" />
                                <img src={circuloVazio} alt="imagem icone de perfil" />
                                <img src={circuloVazio} alt="imagem icone de perfil" />
                                <img src={circuloVazio} alt="imagem icone de perfil" />
                            </div>
                            <div className="botaoSalvar">
                                <button onClick={handleModal}>Salvar</button>
                            </div>
                        </form>

                    </div>

                </div>
            </div>
        </>
    );
}