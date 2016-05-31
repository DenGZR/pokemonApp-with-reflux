import Reflux from 'reflux';
import HTTP from '../services/httpservice';
import PokemonActions from '../actions/PokemonActions';
import PokemonItem from './pokemonItemClass.js';

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
    loadPokemon(name) {
        let currentId;

        this._loadPokemonByName(name)
            .then((current) => {
                if(!current) {
                    throw Error("Error data load!!!");
                }
                currentId = current.id;
                return this._loadPokemonPrevNext(current)
            })
            .then((obj) => {
                console.log('well done!!!' + obj);
                this.trigger('changeDetails', this.pokemon, this.pokemon[currentId]);
            })
            .catch((err) => {
                console.log('Error data load!!!')
                return this.trigger('changeList', null);
            });
    },

    loadPokemonList(toNext) {
        // if pokemon is empty trigger Actions loadPokemonList
        if(!toNext && !this._isEmptyObject(this.pokemon)) {
            return this.trigger('changeList', this.pokemon);
        }
        let url = this.url.next;
        console.log('URL : ' + url);
        HTTP.getPokemonData(url)
            .then((json) => {
                if(!json) {
                    return this.trigger('changeList', null);
                }
                json.results.forEach((resultItem) => {
                    let pokemonItem = new PokemonItem(resultItem);
                    this.pokemon[pokemonItem.id] = pokemonItem;
                });
                this.url.next = json.next;
                this.trigger('changeList', this.pokemon);
            })

    },


    // Actions metods end

    _loadPokemonByName(pokemonName) {
        return (
            HTTP.getPokemonData(this.url.base + pokemonName)
                .then((json) => {
                    if(!json) {
                        return null;
                    }
                    let pokemonItem = new PokemonItem(json);
                    return this.pokemon[pokemonItem.id] = pokemonItem;
                    console.log("loadPokemonByName : " + pokemonName);
                    //this.trigger('changeDetails', this.pokemon, this.pokemon[pokemonItem.id]);
                })
        )
    },

    _loadPokemonPrevNext(pokemon) {
        let nextId;
        let prevId;
        let currentId;
        let url = [];

        currentId = pokemon.id;
        nextId = pokemon.nextId;
        prevId = pokemon.prevId;

        if(this.pokemon[nextId] && this.pokemon[prevId] ) {
            this.pokemon.next = this.pokemon[nextId];
            this.pokemon.prev = this.pokemon[prevId];
            return this.pokemon;
        } else {
            url.push(this.url.base + nextId);
            url.push(this.url.base + prevId);

            return (
                Promise.all( url.map( HTTP.getPokemonData ) )
                    .then(results => {
                        console.log(results);
                        results.forEach((resultItem) => {
                            let pokemonItem = new PokemonItem(resultItem);
                            //debugger;
                            this.pokemon[pokemonItem.id] = pokemonItem;
                            if( pokemonItem.id === nextId ) {
                                this.pokemon.next = pokemonItem;
                            }
                            if( pokemonItem.id === prevId ) {
                                this.pokemon.prev = pokemonItem;
                            }
                            return  this.pokemon;
                        });
                    })
            )
        }
    },

    _isEmptyObject(emptyObject){
        return JSON.stringify(emptyObject) === '{}';
    }

});

export default PokemonListStore;