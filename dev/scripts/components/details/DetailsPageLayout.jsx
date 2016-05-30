import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import Loader from 'react-loader';
import Header from './Header.jsx';
import PokemonFigure from './PokemonFigure.jsx';
import PokemonStatsInfo from './PokemonStatsInfo.jsx';
import PokemonDescriptions from './PokemonDescriptions.jsx';
import PokemonAbilityInfo from './PokemonAbilityInfo.jsx';
import PokemonAttributes from './PokemonAttributes.jsx';

export default class DetailsPageLayout extends React.Component {

    static propTypes = {
        pokemons: React.PropTypes.objectOf(React.PropTypes.object),
        loaded: React.PropTypes.bool.isRequired
    };

    constructor(props) {
        super(props);
    }

    render() {
        console.log("DetailsPageLayout");

        return (
            <div className="details-content">
                <Row className="details-header">
                    <Col xs={12} md={12}>
                        <Header
                            current={this.props.currentPokemon}
                            pokemons={this.props.pokemons}>
                        </Header>
                    </Col>
                </Row>
                <Loader loaded={this.props.loaded}>
                    <Row className="details-info">
                        <Col xs={12} sm={6} md={6}>
                            <PokemonFigure {...this.props.currentPokemon}/>
                            <PokemonStatsInfo {...this.props.currentPokemon.params}/>
                        </Col>
                        <Col xs={12} sm={6} md={6}>
                            <PokemonDescriptions/>
                            <PokemonAbilityInfo {...this.props.currentPokemon}/>
                            <PokemonAttributes />
                        </Col>
                    </Row>
                </Loader>
            </div>
        )
    }
};

