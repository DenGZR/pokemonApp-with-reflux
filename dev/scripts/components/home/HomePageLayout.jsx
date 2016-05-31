import React from 'react';
import {Grid, Row, Col, Button} from 'react-bootstrap';
import Loader from 'react-loader';

import Header from './Header.jsx';
import Search from './Search.jsx';
import SearchAdvanced from './SearchAdvanced.jsx';
import PokemonList from './PokemonList.jsx';

class DetailsPageLayout extends React.Component {

    //static propTypes = {
    //    pokemon: React.PropTypes.object.isRequired,
    //    loaded: React.PropTypes.bool.isRequired
    //};

    constructor(props) {
        super(props);
    }

    render() {
        console.log("HomePageLayout");

        return (
            <div className="home-content">
                <Row>
                    <Col xs={12}>
                        <div className="home-header">
                            <Header/>
                            <Search {...this.props}/>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Loader loaded={this.props.loaded}>
                        <PokemonList {...this.props}/>
                        <Button className="load-next-list" bsStyle="danger" bsSize="large"
                                onClick={this.props.nextList}>Load more Pokemon</Button>
                    </Loader>
                </Row>
            </div>
        )
    }
}

export default DetailsPageLayout;