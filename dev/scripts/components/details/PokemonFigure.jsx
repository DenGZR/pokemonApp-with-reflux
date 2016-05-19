import React from 'react';

const pokemonFigure = ({imgSrc, name})=> {

console.log("pokemonFigure");
console.log(imgSrc, name);
    return (
        <div className="pokemon-images">
            <img src={imgSrc} alt={name}/>
        </div>
    )
};

export default pokemonFigure;