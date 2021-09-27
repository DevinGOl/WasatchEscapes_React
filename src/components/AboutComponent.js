import React from 'react';
import { Breadcrumb, BreadcrumbItem, Card, CardBody, CardHeader, Media } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { Fade, Stagger } from 'react-animation-components';

function RenderPartner({ partner }) {
    if (partner) {
        return (
            < >
                <Media
                    object
                    src={baseUrl + partner.image}
                    alt={partner.name}
                    width="150" />
                <Media
                    body
                    className="ml-5 mb-4">
                    <Media
                        heading>
                        {partner.name}
                    </Media>
                    {partner.description}
                </Media>
            </>
        );
    }
    return < div />;
}

function PartnerList(props) {

    const partners = props.partners.partners.map(partner => {
        return (
            <Fade in key={partner.id}>
                <Media tag="li">
                    <RenderPartner partner={partner} />
                </Media>
            </Fade>
        );
    });
    if (props.partners.isLoading) {
        return (<Loading />
        )
    }
    if (props.partners.errMess) {
        return (<div className="col">
            <h4>{props.partners.errMess}</h4>
        </div>
        )
    }
    return (
        <div className="col mt-4">

            <Media list>
                <Stagger in>
                    {partners}
                </Stagger>

            </Media>

        </div>
    )
}

function About(props) {

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>About Us</BreadcrumbItem>
                    </Breadcrumb>
                    <h2>About Us</h2>
                    <hr />
                </div>
            </div>
            <div className="row row-content">
                <div className="col-sm-6">
                    <h3>Our Mission</h3>
                    <p>We promote and provide information on the ski resorts of Utah, and help you to experience the best of the Wasatch! From current conditions to an interactive mobile app, visit us for all of your winter information needs!</p>
                </div>
                <div className="col-sm-6">
                    <Card>
                        <CardHeader className="bg-dark text-white"><h3>Facts At a Glance</h3></CardHeader>
                        <CardBody>
                            <dl className="row">
                                <dt className="col-6">Founded</dt>
                                <dd className="col-6">March 28, 2019</dd>
                                <dt className="col-6">No. of Resorts in 2019</dt>
                                <dd className="col-6">8</dd>
                                <dt className="col-6">No. of Reviews in 2019</dt>
                                <dd className="col-6">3234</dd>
                                <dt className="col-6">Employees</dt>
                                <dd className="col-6">19</dd>
                            </dl>
                        </CardBody>
                    </Card>
                </div>
                <div className="col">
                    <Card className="bg-light mt-3">
                        <CardBody>
                            <blockquote className="blockquote">
                                <p className="mb-0">"Well, if you find yourself falling apart, Well, I am sure I could steer, The Great Salt Lake."</p>
                                <footer className="blockquote-footer">Band of Horses{' '}
                                
                                </footer>
                            </blockquote>
                        </CardBody>
                    </Card>
                </div>
            </div>
            <div className="row row-content">
                <div className="col-12">
                    <h3>Community Partners</h3>
                </div>
                <PartnerList partners={props.partners} />
                </div>
            </div>
    );
}

export default About;