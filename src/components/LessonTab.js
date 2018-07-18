import React from 'react';

export default class LessonTab extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            lesson: {title: 'title', id: 2}, //TODO remove defaults and set lol
            module: {title: ''},
            course: {title: ''},
            bgColor: 'white'
        };
        this.onTabClicked = this.onTabClicked.bind(this)
     }

     //TODO this is bad
     onTabClicked() {
        this.setState({
            bgColor: 'blue'
        })
     }
     
    render() {
        return (
            <li className="nav-item" onClick={this.onTabClicked}>
            <a class="nav-link active" style={{backgroundColor:this.state.bgColor}}>
                    {this.state.lesson.title}<button onClick={() => 
                        {this.props.delete(this.props.lesson.id)}}>DELETE</button>
             </a></li>
        )
    }
}      
