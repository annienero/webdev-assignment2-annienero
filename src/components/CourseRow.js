import React, {Component} from 'react';

export default class CourseRow extends Component {
    render() {
        return(
            <div className="card" styles={{width: '18rem'}}>
                <img className="card-img-top"
                    src="https://picsum.photos/300/200"/>
                <div className="card-body">
                    <h5>{this.props.title}</h5>
                    <p>{this.props.description}</p>
                    <a href="#" className="btn btn-primary">More...</a>
                </div>
            </div>)
    }
}