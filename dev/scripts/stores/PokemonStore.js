import Reflux from 'reflux';
import HTTP from '../services/httpservice';
import PokemonActions from '../actions/PokemonActions';
import PokemonItem from 'pokemonItemClass';

let PokemonListStore = Reflux.createStore({
    listenables: PokemonActions,
    init() {
        this.pokemon = {};
        this.currentPokemon = {};
        this.url = {
            base : 'http://pokeapi.co/api/v2/pokemon/',
            next : 'http://pokeapi.co/api/v2/pokemon/?limit=20&offset=0'
        }
    },
    //Actions metods start
    loadPokemonId(id) {
        let current;
        let next;
        let prev;

        HTTP.getPokemonData(this.url.base + id)
            .then( json => {
                console.log("Res current: ");
                return current = new PokemonItem(json);
            })
            .then(current => {
                let nextId = current.nextId;
                return HTTP.getPokemonData(this.url.base + nextId)
            })
            .then( json => {
                console.log("Res next: ");
                return next = new PokemonItem(json);
            })
            .then(next => {
                let prevId = current.prevId;
                return HTTP.getPokemonData(this.url.base + prevId)
            })
            .then( json => {
                console.log("Res prev ");
                return prev = new PokemonItem(json);
            })
            .then( prev => {
                if(current&&next&&prev) {
                    this.pokemon.next = next;
                    this.pokemon.prev = prev;
                    this.pokemon[id] = current;
                    this.trigger('changeDetails', this.pokemon, this.pokemon[id]);
                    console.log('All cool done')
                }
            })
            .catch( err => {
                console.log('Error :' + err)
            });
    },

    loadPokemonList(limit,offset) {
        let urlLimit = '?limit=' + limit + '&offset=' + offset;
        let url = limit ? (this.url.base + urlLimit) : this.url.next;
        console.log('URL : ' + url);
        HTTP.getPokemonData(url)
            .then(function(json) {
                json.results.forEach((resultItem, index) => {
                    let pokemonItem = new PokemonItem(resultItem);
                    this.pokemon[pokemonItem.id] = pokemonItem;
                });
                this.url.next = json.next;
                this.trigger('changeList', this.pokemon);
            }.bind(this))
    },

    loadPokemonDetails(pokemonName) {
        HTTP.getPokemonData(this.url.base + pokemonName)
            .then(function(json) {
                let pokemonItem = new PokemonItem(json);
                this.pokemon[pokemonItem.id] = pokemonItem;
                console.log("PokemonDetails json: " + this.pokemon[pokemonItem.id]);
                this.trigger('changeDetails', this.pokemon, this.pokemon[pokemonItem.id]);
            }.bind(this));
    }
     // Actions metods end
});

export default PokemonListStore;