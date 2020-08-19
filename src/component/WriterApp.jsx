//const { Component } = require("react")
import React, {Component} from 'react';
import ListReviewsComponent from './ListReviewsComponent';
import ReviewComponent from './ReviewComponent';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'; //in that order else bad

class WriterApp extends Component {
    render(){
        return (
            <Router><>
            <h1>Puppet Ghost</h1>
            <Switch>
                <Route path="/" exact component={ListReviewsComponent} />
                <Route path="/reviews" exact component={ListReviewsComponent} />
                <Route path="/reviews/:id" component={ReviewComponent} />
                <Route path="/categories/:category" component={ListReviewsComponent} />
            </Switch></>
            </Router>
        );
    }
} 

export default WriterApp;
