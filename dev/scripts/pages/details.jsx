import React, { Component, PropTypes } from 'react';
import lodash from 'lodash';
import DetailsPageLayout from '../components/details/DetailsPageLayout.jsx';
import PokemonStore from '../stores/PokemonStore';
import PokemonActions from '../actions/PokemonActions';

class Details extends React.Component {

   constructor(props){
        super(props);
        this.state = {
            currentPokemon: {},
            pokemons: {},
            loaded: false

        };
   }
    componentWillReceiveProps(nextProps) {
        let pokemonId = nextProps.params.pokemonId;

        if( pokemonId !== this.state.currentPokemon.id ) {
            PokemonActions.loadPokemon( pokemonId );
            return this.setState({ currentPokemon: {}, loaded: false});
        }
    }

   componentWillMount() {
        this.setState({ loaded: false});
        this.unsubscribe = PokemonStore.listen(this.onLoad.bind(this));
        PokemonActions.loadPokemon(this.props.params.pokemonId);
   }

    componentWillUnmount() {
        this.unsubscribe();
    }

    onLoad(event, allPokemons, current) {
        if( current  ) {
            this.setState({currentPokemon: current, pokemons: allPokemons, loaded: true});
        } else {
            let path = `/notFound`;
            this.context.router.push(path);
            console.log("Pokemon not Found !!!" );
        }
    }

    render() {

        console.log("Details");
        
        return (
            <div className="details">
                <DetailsPageLayout
                    currentPokemon={this.state.currentPokemon}
                    pokemons={this.state.pokemons}
                    loaded={this.state.loaded}>
                </DetailsPageLayout>
            </div>
        )
    }
}

Details.contextTypes = {
    router: PropTypes.object.isRequired
};


export default Details;