import React from 'react';
//Show the Pokemon's:
//Height
//Weight
//Type
//Weaknesses
//Description

const PokemonAbilityInfo = ({params})=> {
    console.log("PokemonAbilityInfo" );
    //console.log("props" + JSON.stringify(props));
    console.log( params );

    return (
        <div className="pokemon-ability-info">
            <ul>
                <li>
                    <p className="attribute-title">Height</p>
                    <span className="attribute-value">{params.height}</span>
                </li>
                <li>
                    <p className="attribute-title">Weight</p>
                    <span className="attribute-value">{params.weight}</span>
                </li>
                <li>
                    <p className="attribute-title">Gender</p>
                    <span className="attribute-value">
                        <span className="gender gender-male"></span>
                        <span className="gender gender-female"></span>
                    </span>
                </li>
            </ul>
        </div>
    )
};

export default PokemonAbilityInfo;