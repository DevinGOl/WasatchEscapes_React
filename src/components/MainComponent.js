import React, { Component } from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Directory from './DirectoryComponent';
import ResortInfo from './ResortInfoComponent';
import Contact from './ContactComponent';
import Home from './HomeComponent';
import AboutComponent from './AboutComponent';
import { Switch, Route, Redirect } from 'react-router-dom';
import { RESORTS } from '../shared/resorts';
import { COMMENTS } from '../shared/comments';
import { PARTNERS } from '../shared/partners';
import { PROMOTIONS } from '../shared/promotions';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            resorts: RESORTS,
            comments: COMMENTS,
            partners: PARTNERS,
            promotions: PROMOTIONS
        };
    }

    render() {

        const HomePage = () => {
            return (
                <Home
                resort={this.state.resorts.filter(resort => resort.featured)[0]}
                promotion={this.state.promotions.filter(promotion => promotion.featured)[0]}
                partner={this.state.partners.filter(partner => partner.featured)[0]} />
            );
        };

        const ResortWithId = ({match}) => {
            return (
                <ResortInfo 
                    resort={this.state.resorts.filter(resort => resort.id === +match.params.resortId)[0]}
                    comments={this.state.comments.filter(comment => comment.resortId === +match.params.resortId)}
                />
            );
        }; 

        return (
            <div>
                <Header />
                <Switch>
                    <Route path='/home' component={HomePage} />
                    <Route exact path='/directory' render={() => <Directory resorts={this.state.resorts} />} />
                    <Route exact path='/aboutus' render={() => <AboutComponent partners={this.state.partners} />} />
                    <Route path='/directory/:resortId' component={ResortWithId} />
                    <Route exact path='/contactus' component={Contact} />
                    <Redirect to='/home' />
                </Switch>
                <Footer />
            </div>
        );
    };
}

export default Main;