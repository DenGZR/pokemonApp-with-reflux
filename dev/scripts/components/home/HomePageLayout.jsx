import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
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
        //console.log(this.props);
        return (
            <div className="home-content">
                <Row className="home-header">
                    <Col xs={12} md={12}>
                        <Header/>
                        <Search/>
                        <SearchAdvanced/>
                    </Col>
                </Row>
                <Row>
                    <Loader loaded={this.props.loaded}>
                        <PokemonList {...this.props}/>
                    </Loader>
                    <button type="button" className="btn btn-danger" onClick={this.props.onLoadList} > next </button>
                </Row>
            </div>
        )
    }
};

export default DetailsPageLayout;