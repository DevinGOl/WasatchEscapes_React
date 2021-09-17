import React, { Component } from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Directory from './DirectoryComponent';
import ResortInfo from './ResortInfoComponent';
import Contact from './ContactComponent';
import Home from './HomeComponent';
import AboutComponent from './AboutComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        resorts: state.resorts,
        comments: state.comments,
        partners: state.partners,
        promotions: state.promotions
    };
};

class Main extends Component {
   

    render() {

        const HomePage = () => {
            return (
                <Home
                resort={this.props.resorts.filter(resort => resort.featured)[0]}
                promotion={this.props.promotions.filter(promotion => promotion.featured)[0]}
                partner={this.props.partners.filter(partner => partner.featured)[0]} />
            );
        };

        const ResortWithId = ({match}) => {
            return (
                <ResortInfo 
                    resort={this.props.resorts.filter(resort => resort.id === +match.params.resortId)[0]}
                    comments={this.props.comments.filter(comment => comment.resortId === +match.params.resortId)}
                />
            );
        }; 

        return (
            <div>
                <Header />
                <Switch>
                    <Route path='/home' component={HomePage} />
                    <Route exact path='/directory' render={() => <Directory resorts={this.props.resorts} />} />
                    <Route exact path='/aboutus' render={() => <AboutComponent partners={this.props.partners} />} />
                    <Route path='/directory/:resortId' component={ResortWithId} />
                    <Route exact path='/contactus' component={Contact} />
                    <Redirect to='/home' />
                </Switch>
                <Footer />
            </div>
        );
    };
}

export default withRouter(connect(mapStateToProps)(Main));