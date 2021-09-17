import React from 'react';
import { Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';



    function RenderResort({resort}) {
        return (
            <div className="col-md-5 m-1">
                <Card>
                    <CardImg top src={resort.image} alt={resort.name} />
                    <CardBody>
                        <CardText>{resort.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        );
    }

    function RenderComments({comments}) {
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
                </div>
            )
        }
        return <div />
    }

    function ResortInfo(props) {
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
                <RenderComments comments={props.comments} />
                </div>
            </div>
            );
        }
        return <div />
    }

export default ResortInfo;