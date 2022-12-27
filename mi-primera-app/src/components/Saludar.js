import React from "react";

export default function Saludar(props){
    const NN = "Anonimo"
    const {saludarFn, user} = props;

    const {nombre2 = NN, nombre1 = NN} = user;

    return (
        <>
            <button onClick={_=>{saludarFn(nombre2, nombre1)}}>Saludar</button>
        </>
    )
}