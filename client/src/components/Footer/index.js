import React from 'react';
import imagemAuxiliar from '.././../assets/caixaVazia.png'
import './style.css';

export default function Footer(){
    
    return(
        <div className="footer-container">
            <div>
                <a href="#">Quem somos nós?</a>
                <a href="#">Dúvidas Frequentes</a>
                <a href="#">Fale Conosco</a>
            </div>
        </div>
    );
}