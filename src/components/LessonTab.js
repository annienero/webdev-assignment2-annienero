import React from 'react';

export default class LessonTab extends React.Component {
    constructor(props) {
        this.state = {
            lessonId: '',
            module: {title: ''},
            course: {title: ''}
        };
     }
     
    render() {
        return (
            <h4>lessonId</h4>
        )
    }
}      
