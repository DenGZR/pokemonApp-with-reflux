import React, { Component, PropTypes } from 'react';
import {Grid, Row, Col, Button, Form, FormGroup, FormControl } from 'react-bootstrap';

export default class Search extends Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault();
        let inputValue = document.getElementById('formInputSearch').value.toLowerCase();
        let path = `/details/${inputValue}`;
        this.context.router.push(path);
        console.log("Do search!!!" + inputValue);
    }

    render() {
        return (
            <section className="pokedex-search">
                <Row>
                    <Col xs={10} sm={6} md={5} xsOffset={1} mdOffset={2}>
                        <div className="pokedex-main-search">
                            <span className="main-title">Name or Number</span>
                            <Form onSubmit={this.handleSubmit}>
                                <FormGroup controlId="formInputSearch">
                                    <FormControl type="text" className="search-input"/>
                                    {' '}
                                    <Button type='submit' bsStyle="warning" className="search-submit"></Button>
                                </FormGroup>
                            </Form>

                            <p className="sub-title">Use the Advanced Search to explore Pokemon by type, weakness,
                                Ability, and more!</p>
                        </div>
                    </Col>
                </Row>
            </section>
        )
    }
}

Search.contextTypes = {
    router: PropTypes.object.isRequired
};