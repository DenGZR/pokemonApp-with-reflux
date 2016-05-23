// Class PokemonItem
// нужен для добавленея методов и необходимых свойств

export default class PokemonItem {

    constructor({name, url, id, ...arg}) {
        let maxNum = 710;
        this.name = name;
        this.url = url;
        this.params = arg;
        this.id = id ? id : this.addId(); // id type is number
        this.imgSrc = this.addImgSrc();
        this.nextId = (parseInt(this.id,10) + 1) > maxNum ? 1 : parseInt(this.id,10) + 1;
        this.prevId = (parseInt(this.id,10) - 1) < 1 ? maxNum : parseInt(this.id,10) - 1;
    }

    addId() {
        let id;
        let arr = this.url.split('/');
        let arrLength = arr.length;
        id  = arr[arrLength-2];
        return parseInt(id,10);
    }

    addImgSrc() {

        let imgBaseSrc = "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/";
        let id = this.id.toString();

        switch (id.length) {
            case 1:
                return  imgBaseSrc + '00' + id  + '.png';
                break;
            case 2:
                return  imgBaseSrc + '0' + id  + '.png';
                break;
            case 3:
                return  imgBaseSrc +  id  + '.png';
                break;
        }
    }

}



