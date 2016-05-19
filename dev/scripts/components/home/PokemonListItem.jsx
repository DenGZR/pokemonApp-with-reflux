import React from 'react';
import {Link} from 'react-router';
import { Row, Col, Panel} from 'react-bootstrap';

const PokemonListItem = ({data}) => {

    console.log("PokemonListItem");
    //console.log("Data : " +  JSON.stringify(data));

    return (
            <Col xs={12} sm={6} md={3} lg={3}>
                <Panel>
                    <figure>
                        <Link to={`/details/${data.id}`}>
                            <img src={data.imgSrc}></img>
                        </Link>
                    </figure>
                    <div className="notch-collectibles-small">
                        <div className="collectibles-wrapper" data-slug="collectible-bulbasaur">
                            <div className="collectibles-collection"><a href="#" rel="tooltip" title="Add to My Collection" data-collection="have"><span className="icon icon_collection"></span></a></div>
                            <div className="collectibles-wishlist"><a href="#" rel="tooltip" title="Add to My Wish List" data-collection="want"><span className="icon icon_wishlist"></span></a></div>
                            <div className="collectibles-trade"><a href="#" rel="tooltip" title="Add to My Trade List" data-collection="trade"><span className="icon icon_trade"></span></a></div>
                        </div>
                    </div>
                    <div className="pokemon-info">
                        <p className="id">
                            <span className="number-prefix">#</span>{data.id}
                        </p>
                        <h5>{data.name}</h5>
                        <div className="abilities">
                            <span className="pill background-color-grass">Grass</span>
                        </div>
                        <div className="abilities">
                            <span className="pill background-color-poison">Poison</span>
                        </div>
                    </div>
                </Panel>
            </Col>
        )
}

export default PokemonListItem;