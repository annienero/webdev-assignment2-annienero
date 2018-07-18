import React, {Component} from 'react'
import { Link } from 'react-router-dom'

export default class CourseRow extends Component {
    constructor(props) { super(props); }
    render() {
        return(
            <tr>
                <td><Link to={`/course/${this.props.course.id}/edit`}>
                    {this.props.course.title}
                </Link></td>
                <td>{this.props.course.created}</td>
                <td>{this.props.course.modified}</td>
                <td><button onClick={() => { 
                    this.props.delete(this.props.course.id)
                    }}>Delete</button>
                </td>
            </tr>)
    }
}