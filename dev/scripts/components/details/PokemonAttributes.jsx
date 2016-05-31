import React from 'react';
import {Link} from 'react-router';

const PokemonAttributes = () => {
    console.log("PokemonAttributes");

    return (
        <div className="pokemon-attributes">
            <div className="pokemon-attributes-type">
                <h3>Type</h3>
                <ul>
                    <li className="background-color-grass">
                        <Link to={`/`} >Grass</Link>
                    </li>
                    <li className="background-color-poison">
                        <Link to={`/`} >Poison</Link>
                    </li>
                </ul>
            </div>
            <div className="pokemon-attributes-weaknesses">
                <h3>Weaknesses</h3>
                <ul>
                    <li className="background-color-fire">
                        <Link to={`/`} >
                         <span>Fire</span>
                        </Link>
                    </li>
                    <li className="background-color-flying">
                        <Link to={`/`} >
                            <span>Flying</span>
                        </Link>
                    </li>
                    <li className="background-color-ice">
                        <Link to={`/`} >
                            <span>Ice</span>
                        </Link>
                    </li>
                    <li className="background-color-psychic">
                        <Link to={`/`} >
                            <span>Psychic</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
};

export default PokemonAttributes;