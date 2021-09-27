import React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';




function RenderDirectoryItem({resort}) {
    return (
        <Card>
            <Link to={`/directory/${resort.id}`}>
            <CardImg width="100%" src={baseUrl + resort.image} alt={resort.name} />
            <CardImgOverlay>
                <CardTitle>{resort.name}</CardTitle>
            </CardImgOverlay>
            </Link>
        </Card>
    );
}


function Directory(props) {

        const directory = props.resorts.resorts.map(resort => {
            return (
                <div key={resort.id} className = "col-md-5 m-1">
                 <RenderDirectoryItem resort={resort} />
                </div>
            );
        });
        if (props.resorts.isLoading) {
            return (
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        if (props.resorts.errMess) {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h4>{props.resorts.errMess}</h4>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className="container">
            <div className="row">
                <div className="col">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Directory</BreadcrumbItem>
                    </Breadcrumb>
                    <h2>Directory</h2>
                    <hr />
                </div>
            </div>
            <div className="row">
                {directory}
            </div>
        </div>
        );
    }


export default Directory;