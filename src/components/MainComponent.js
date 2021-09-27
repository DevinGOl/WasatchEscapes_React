import React, { Component } from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Directory from './DirectoryComponent';
import ResortInfo from './ResortInfoComponent';
import Contact from './ContactComponent';
import Home from './HomeComponent';
import AboutComponent from './AboutComponent';
import { actions } from 'react-redux-form';
import { postComment, fetchResorts, fetchComments,fetchPromotions, fetchPartners, postFeedback } from '../redux/ActionCreators';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        resorts: state.resorts,
        comments: state.comments,
        partners: state.partners,
        promotions: state.promotions
    };
};

const mapDispatchToProps = {
    postComment: (resortId, rating, author, text) => (postComment(resortId, rating, author, text)),
    fetchResorts: () => (fetchResorts()),
    resetFeedbackForm: () => (actions.reset('feedbackForm')),
    fetchComments: () => (fetchComments()),
    fetchPromotions: () => (fetchPromotions()),
    fetchPartners: () => (fetchPartners()),
    postFeedback:(feedback) => (postFeedback(feedback))

};

class Main extends Component {
   
    componentDidMount() {
        this.props.fetchResorts();
        this.props.fetchComments();
        this.props.fetchPromotions();
        this.props.fetchPartners();
    }

    render() {

        const HomePage = () => {
            return (
                <Home
                resort={this.props.resorts.resorts.filter(resort => resort.featured)[0]}
                resortsLoading={this.props.resorts.isLoading}
                resortsErrMess={this.props.resorts.errMess}
                promotion={this.props.promotions.promotions.filter(promotion => promotion.featured)[0]}
                promotionLoading={this.props.promotions.isLoading}
                promotionErrMess={this.props.promotions.errMess}
                partner={this.props.partners.partners.filter(partner => partner.featured)[0]}
                partnersLoading={this.props.partners.isLoading}
                partnersErrMess={this.props.partners.errMess} />
            );
        };

        const ResortWithId = ({match}) => {
            return (
                <ResortInfo 
                    resort={this.props.resorts.resorts.filter(resort => resort.id === +match.params.resortId)[0]}
                    isLoading={this.props.resorts.isLoading}
                    errMess={this.props.resorts.errMess}
                    comments={this.props.comments.comments.filter(comment => comment.resortId === +match.params.resortId)}
                    commentsErrMess={this.props.comments.errMess}
                    postComment={this.props.postComment}
                />
            );
        }; 

        return (
            <div>
                <Header />
                <TransitionGroup>
                    <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
                <Switch>
                    <Route path='/home' component={HomePage} />
                    <Route exact path='/directory' render={() => <Directory resorts={this.props.resorts} />} />
                    <Route exact path='/aboutus' render={() => <AboutComponent partners={this.props.partners} />} />
                    <Route path='/directory/:resortId' component={ResortWithId} />
                    <Route exact path='/contactus' render={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} />} />
                    <Redirect to='/home' />
                </Switch>
                </CSSTransition>
                </TransitionGroup>
                <Footer />
            </div>
        );
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));