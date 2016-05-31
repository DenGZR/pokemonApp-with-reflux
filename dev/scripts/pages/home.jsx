import React, { Component, PropTypes } from 'react';
import Reflux from 'reflux';
import HomePageLayout from '../components/home/HomePageLayout.jsx';
import PokemonStore from '../stores/PokemonStore';
import PokemonActions from '../actions/PokemonActions';

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pokemon: {},
            loaded: false
        };
    }

    componentDidMount() {
        this.setState({loaded: false});
        PokemonActions.loadPokemonList();
        this.unsubscribe = PokemonStore.listen(this.onChange.bind(this));
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    onChange(event, data) {
        if(data) {
            this.setState({pokemon: data, loaded: true});
        } else {
            let path = `/notFound`;
            this.context.router.push(path);
            console.log("Pokemon not Found !!!" );
        }

    }

    onLoadNextList() {
        PokemonActions.loadPokemonList("next");
    }

    render() {
        return (
            <div className="home">
                <HomePageLayout
                    pokemon={this.state.pokemon}
                    loaded={this.state.loaded}
                    nextList={this.onLoadNextList}
                    />
            </div>
        )
    }
};

Home.contextTypes = {
    router: PropTypes.object.isRequired
};

export default Home;