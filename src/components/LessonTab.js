import React from 'react';

export default class LessonTab extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            bgColor: 'white'
        };
        this.onTabClicked = this.onTabClicked.bind(this)
     }

    onTabClicked() {
        this.setState({
            bgColor: 'blue'
        })
    }
     
    render() {
        return (
            <li className="nav-item" onClick={this.onTabClicked}>
            <a className="nav-link active" style={{backgroundColor:this.state.bgColor}}>
                    {this.props.lesson.title}<button onClick={() => 
                        {this.props.delete(this.props.lesson.id)}}>DELETE</button>
             </a></li>
        )
    }
}      
