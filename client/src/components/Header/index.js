import React from 'react';
import imagemAuxiliar from '.././../assets/caixaVazia.png'
import './style.css';

export default function Header(){
    
    return(
        <div className="header-container">
            <div>
                <img src={imagemAuxiliar} alt="Logo"/>
                <p>Logo</p>
            </div>
            <div>
                <a href="/cadastro">Cadastre-se</a>
                <button>Login</button>
            </div>
        </div>    
    );
}