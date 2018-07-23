import {ADD_WIDGET, FIND_ALL_WIDGETS, SAVE_WIDGETS} from '../constants/WidgetConstants'

export const findAllWidgets = dispatch => {
    fetch('http://localhost:8080/api/widget') //TODO eventually do this for each lesson
        .then(response => (response.json()))
        .then(widgets => dispatch({
            type: FIND_ALL_WIDGETS,
            widgets: widgets
        }))
}

export const addWidget = dispatch => {
    dispatch({type: ADD_WIDGET})
}

export const save = dispatch => {
    dispatch({type: SAVE_WIDGETS})
}