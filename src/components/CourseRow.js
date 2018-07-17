import React, {Component} from 'react';

export default class CourseRow extends Component {
    constructor(props) { super(props); }
    render() {
        return(
            <tr>
                <td>{this.props.course.title}</td>
                <td>{this.props.course.created}</td>
                <td>{this.props.course.modified}</td>
                <td>{this.props.course.owner}</td>
            </tr>)
            //  <tr><td>
            //     <h5>{this.props.title}</h5>
            //     <p>{this.props.description}</p>
            //     {
            //         /* <div className="card" styles={{width: '18rem'}}>
            //         <img className="card-img-top"
            //             src="https://picsum.photos/300/200"/>
            //         <div className="card-body">
            //             <h5>{this.props.title}</h5>
            //             <p>{this.props.description}</p>
            //             <a href="#" className="btn btn-primary">More...</a>
            //         </div>
            //     </div>  */}
            // </td></tr>)
           
    }
}