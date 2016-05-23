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
    loadPokemonId(id) {
        let current;
        id = parseInt(id,10);
        let url = [];
        let nextId;
        let prevId;

        // паралельная асинхроная загрузка 3 id с проверкой наличия
        if( id in this.pokemon) {
            nextId = this.pokemon[id].nextId;
            prevId =  this.pokemon[id].prevId;

            if(!('stats' in this.pokemon[id].params)) {
                url.push(this.url.base + id);
            }
            if(!this.pokemon[nextId]) {
                url.push(this.url.base + nextId);
            } else {
                this.pokemon.next = this.pokemon[nextId];
            }
            if(!this.pokemon[prevId]) {
                url.push(this.url.base + prevId);
            } else {
                this.pokemon.prev = this.pokemon[prevId];
            }
        } else {
            nextId =  id + 1;
            prevId =  id - 1;
            url.push(this.url.base + id);
            url.push(this.url.base + nextId);
            url.push(this.url.base + prevId);
        }

        if( url.length > 0 ) {
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
                    });
                    console.log('well done!!!')
                    this.trigger('changeDetails', this.pokemon, this.pokemon[id]);
                });
        } else {
            this.trigger('changeDetails', this.pokemon, this.pokemon[id]);
        }
        // последовательная асинхроная загрузка 3 id без проверки наличия
        //HTTP.getPokemonData(this.url.base + id)
        //    .then( json => {
        //        console.log("Res current: ");
        //        return current = new PokemonItem(json);
        //    })
        //    .then(current => {
        //        let nextId = current.nextId;
        //        return HTTP.getPokemonData(this.url.base + nextId)
        //    })
        //    .then( json => {
        //        console.log("Res next: ");
        //        return next = new PokemonItem(json);
        //    })
        //    .then( next => {
        //        let prevId = current.prevId;
        //        return HTTP.getPokemonData(this.url.base + prevId)
        //    })
        //    .then( json => {
        //        console.log("Res prev ");
        //        return prev = new PokemonItem(json);
        //    })
        //    .then( prev => {
        //        if(current&&next&&prev) {
        //            this.pokemon.next = next;
        //            this.pokemon.prev = prev;
        //            this.pokemon[id] = current;
        //            this.trigger('changeDetails', this.pokemon, this.pokemon[id]);
        //            console.log('All cool done')
        //        }
        //    })
        //    .catch( err => {
        //        console.log('Error :' + err)
        //    });
    },

    loadPokemonList(limit,offset) {
        let urlLimit = '?limit=' + limit + '&offset=' + offset;
        let url = limit ? (this.url.base + urlLimit) : this.url.next;
        console.log('URL : ' + url);
        HTTP.getPokemonData(url)
            .then(function(json) {
                json.results.forEach((resultItem) => {
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