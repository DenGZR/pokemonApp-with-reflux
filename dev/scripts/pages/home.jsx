import React from 'react';
import Reflux from 'reflux';
import HomePageLayout from '../components/home/HomePageLayout.jsx';
import PokemonStore from '../stores/PokemonStore';
import PokemonActions from '../actions/PokemonActions';

class Home extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      pokemon: {},
      loaded: false
    };
  }

  componentWillMount() {
    this.setState({ loaded: false});
    this.unsubscribe = PokemonStore.listen(this.onChange.bind(this));
    PokemonActions.loadPokemonList();
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onChange(event, data) {
    //    console.log("pokemon : " + data);
    this.setState({pokemon: data, loaded: true});
  }
  onSearch(id) {

      if(id) {
          PokemonActions.loadPokemonId(id);
          //details/2
      }
  }

  onLoadNextList() {
    this.setState({ loaded: false});
    PokemonActions.loadPokemonList();
  }

  render() {
    return (
        <div className="home">
            <HomePageLayout
                pokemon={this.state.pokemon}
                loaded={this.state.loaded}
                loadNextList={this.onLoadList}
                onSearch={this.onSearch}
            />
        </div>
    )
  }
}

export default Home;