//API pokemon call:

let service = {
    getPokemonData(url) {
        console.log('request Url : ' + url);
        return fetch(url)
            .then(function(Response){
                //console.log('res :  ',Response);
                return Response.json();
            })
    }

};

module.exports = service;