import React from 'react';
import {Link} from 'react-router';

const Header = ({current,pokemons}) => {
    let defSet = {
        name: '',
        id: ''
    };

    let prev = pokemons.prev || defSet;
    let next = pokemons.next || defSet;
    current = current || defSet;

    console.log("Header");

    return (
        <header >
            <div className="header-pagination clearfix">
                <Link to={`/details/${prev.id}`} className="previous">
                    <div className="header-pagination-wrapper">
                        <span className="glyphicon glyphicon-circle-arrow-left"></span>
                        <span className="pokemon-number">{'#' + prev.id}</span>
                        <span className="pokemon-name hidden-xs">{prev.name}</span>
                    </div>
                </Link>
                <Link to={`/details/${next.id}`} className="next">
                    <div className="header-pagination-wrapper">
                        <span className="glyphicon glyphicon-circle-arrow-right"></span>
                        <span className="pokemon-number">{'#' + next.id}</span>
                        <span className="pokemon-name hidden-xs">{next.name}</span>
                    </div>
                </Link>
            </div>
            <div className="header-pagination-title">
                <div className="title-wrapper">
                    {current.name}
                        <span className="pokemon-number" id="pokemonID">{ current.indexName ? ('#' + current.indexName):' '}</span>
                </div>
            </div>
        </header>
    )
};

export default Header;