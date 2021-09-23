import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, Button, Breadcrumb, BreadcrumbItem, Modal, ModalBody, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { Control, LocalForm, Errors } from 'react-redux-form';
import ModalHeader from 'reactstrap/lib/ModalHeader';
import { baseUrl } from '../shared/baseUrl';


const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);

class CommentForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        this.toggleModal();
        this.props.postComment(this.props.resortId, values.rating, values.author, values.text);
 
    }
    render() {
        return (
            <>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <Label htmlFor="rating">Rating</Label>
                                <Control.select className="form-control" name="rating" id="rating" model=".rating">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                            </div>
                            <div className="form-group">
                                <Label htmlFor="author">Your Name</Label>
                                <Control.text className="form-control" model=".author" id="author" name="author" placeholder="Your Name"
                                    validators={{
                                        minLength: minLength(2),
                                        maxLength: maxLength(15)
                                    }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".author"
                                    show="touched"
                                    component="div"
                                    messages={{
                                        required: 'Required',
                                        minLength: 'Must be at least 2 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }}
                                />

                            </div>
                            <div className="form-group">
                                <Label htmlFor="text">Comment</Label>
                                <Control.textarea className="form-control" rows="6" model=".text" id="text" name="text" />
                            </div>
                            <Button color="primary" type="submit">Submit</Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
                <Button onClick={this.toggleModal}><i className="fa-lg fa fa-pencil" /> Submit Comment
                </Button>
            </>
        );
    };
}

    function RenderResort({resort}) {
        return (
            <div className="col-md-5 m-1">
                <Card>
                    <CardImg top src={baseUrl + resort.image} alt={resort.name} />
                    <CardBody>
                        <CardText>{resort.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        );
    }

    function RenderComments({comments, postComment, resortId}) {
        if (comments) {
            return (
                <div className="col-md-5 m-1">
                    <h4>Comments</h4>
                    {
                        comments.map((comment) => (
                            <p key={comment.id}>
                                {comment.text}<br/>
                                --{comment.author} {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}

                            </p>
                        ))
                    }
                    <CommentForm resortId={resortId} postComment={postComment} />
                </div>
            )
        }
        return <div />
    }

    function ResortInfo(props) {
        if (props.isLoading) {
            return (
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        if (props.errMess) {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h4>{props.errMess}</h4>
                        </div>
                    </div>
                </div>
            );
        }
        if (props.resort) {
            return (
                <div className="container">
                <div className="row">
                    <div className="col">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.resort.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <h2>{props.resort.name}</h2>
                        <hr />
                    </div>
                </div>
                <div className="row">
                <RenderResort resort={props.resort} />
                <RenderComments 
                comments={props.comments}
                postComment={props.postComment}
                resortId={props.resort.id}
                />
                </div>
            </div>
            );
        }
        return <div />
    }

export default ResortInfo;