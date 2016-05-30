import React from 'react';

const pokemonFigure = ({imgSrc, name})=> {

console.log("pokemonFigure");

    return (
        <div className="pokemon-images">
            <img src={imgSrc} alt={name}/>
        </div>
    )
};

export default pokemonFigure;