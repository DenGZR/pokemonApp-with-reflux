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
    console.log(current);
    console.log(pokemons);

    return (
        <header className="">
            <div className="header-pagination clearfix">
                <Link to={`/details/${prev.id}`} className="previous">
                    <div className="header-pagination-wrapper">
                        <span className="icon icon_arrow_sm_left"></span>
                        <span className="pokemon-number">{'#' + prev.id}</span>
                        <span className="pokemon-name">{prev.name}</span>
                    </div>
                </Link>
                <Link to={`/details/${next.id}`} className="next">
                    <div className="header-pagination-wrapper">
                        <span className="icon icon_arrow_sm_right"></span>
                        <span className="pokemon-number">{'#' + next.id}</span>
                        <span className="pokemon-name">{next.name}</span>
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