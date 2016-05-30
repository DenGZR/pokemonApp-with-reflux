import React from 'react';
import {Link} from 'react-router';
import { Row, Col, Panel, ButtonToolbar, Button } from 'react-bootstrap';

const PokemonListItem = ({data}) => {

    console.log("PokemonListItem");
    //console.log("Data : " +  JSON.stringify(data));

    return (
        <Col xs={6} sm={4} md={3} lg={3}>
            <Panel className="pokemon-item">
                <figure className="pokemon-item-img">
                    <Link to={`/details/${data.id}`}>
                        <img className="pokemon-item-foto" src={data.imgSrc}></img>

                        <p className="pokemon-item-id">
                            <span className="number-prefix">{"#" + data.id}</span>
                        </p>
                    </Link>
                </figure>
                <div className="pokemon-item-info">
                    <h5>{data.name}</h5>
                    <ButtonToolbar>
                        <Button className="grass" bsSize="xsmall">Grass</Button>
                        <Button className="poison" bsSize="xsmall">Poison</Button>
                    </ButtonToolbar>
                </div>
            </Panel>
        </Col>
    )
};

export default PokemonListItem;