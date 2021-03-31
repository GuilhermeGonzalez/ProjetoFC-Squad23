import React, { useContext } from "react";
import ReactDOM, { createPortal } from "react-dom";
import { ModalContext } from "./modalContext";

const Modal = () => {
    let { modalContent, handleModal, modal } = useContext(ModalContext);
    if (modal) {
        return createPortal(
            <div
                className="fixed top-0 left-0 h-screen w-full flex items-center justify-center"

            >
                <div className="bg-white relative p-5 shadow-lg rounded flex flex-col items-start text-lg text-gray-800">

                    <p>{modalContent}</p>
                </div>
            </div>,
            document.querySelector("#modal-root")
        );
    } else return null;
};

export default Modal;
