import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import PokemonListItem from './PokemonListItem.jsx';

const PokemonList = ({pokemon}) => {
    console.log("PokemonList");

    let listItems = [];

    for (let id in pokemon) {
        if( id !== "next" && id !== "prev" ) {
            let item = <PokemonListItem data={pokemon[id]} key={id}/>;
            listItems.push(item);
        }
    }

    return (
        <Row>
            {listItems}
        </Row>
    )
};

export default PokemonList;