import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';

const PokemonNotFound  = () => {
  console.log("PokemonNotFound");

  return(
      <div className="pokemon-not-found" >
        <Row>
          <Col xs={12}>
            <div className="alert alert-danger" role="alert">
              <h1>Pokemon Not Found!</h1>
              <hr></hr>
              <h4>Try searching for something that exists.</h4>
            </div>
          </Col>
        </Row>
      </div>
  );
};

export default PokemonNotFound;