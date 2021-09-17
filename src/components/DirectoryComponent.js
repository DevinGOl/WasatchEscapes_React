import React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';


function RenderDirectoryItem({resort, onClick}) {
    return (
        <Card>
            <Link to={`/directory/${resort.id}`}>
            <CardImg width="100%" src={resort.image} alt={resort.name} />
            <CardImgOverlay>
                <CardTitle>{resort.name}</CardTitle>
            </CardImgOverlay>
            </Link>
        </Card>
    );
}


function Directory(props) {

        const directory = props.resorts.map(resort => {
            return (
                <div key={resort.id} className = "col-md-5 m-1">
                 <RenderDirectoryItem resort={resort} />
                </div>
            );
        });

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