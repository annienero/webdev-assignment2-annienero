import React, {Component} from 'react'
import { Link } from 'react-router-dom'

export default class CourseRow extends Component {
    constructor(props) { super(props); }
    render() {
        return(
            <tr>
                <td>{this.props.course.title}</td>
                <td>{this.props.course.created}</td>
                <td>{this.props.course.modified}</td>
                <td><button onClick={() => { 
                    this.props.delete(this.props.course.id)
                    }}>Delete</button>
                </td>
                <td><Link to={`/course/${this.props.course.id}/edit`}>
                    <button>View Course</button>
                </Link></td>
            </tr>)
    }
}