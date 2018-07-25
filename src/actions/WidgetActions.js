import {ADD_WIDGET, FIND_ALL_WIDGETS, SAVE_WIDGETS,
     MOVE_UP, MOVE_DOWN, DELETE_WIDGET, TOGGLE_PREVIEW,
     SELECT_WIDGET_TYPE, UPDATE_WIDGET_NAME, UPDATE_IMAGE_URL}
      from '../constants/WidgetConstants'

export const findAllWidgets = (dispatch, id) => {
    fetch('http://localhost:8080/api/lesson/' + id + '/widget') //TODO no localhosts
        .then(response => (response.json()))
        .then(widgets => dispatch({
            type: FIND_ALL_WIDGETS,
            widgets: widgets
        }))
}

export const addWidget = dispatch => {
    dispatch({type: ADD_WIDGET})
}

export const save = (dispatch, id) => {
    dispatch({type: SAVE_WIDGETS, id: id})
}

export const moveUp = (dispatch, widget) => {
    dispatch({type: MOVE_UP, widget: widget})
}

export const moveDown = (dispatch, widget) => {
    dispatch({type: MOVE_DOWN, widget: widget})
}

export const deleteWidget = (dispatch, widget) => {
    dispatch({type: DELETE_WIDGET, id: widget.id})
}  

export const togglePreview = (dispatch) => {
    dispatch({type: TOGGLE_PREVIEW})
}

export const selectWidgetType = (dispatch, id, selectElement) => {
    dispatch({ type: SELECT_WIDGET_TYPE, id: id, className: selectElement })
}


export const updateWidgetName = (dispatch, id, name) => {
    dispatch({ type: UPDATE_WIDGET_NAME, id: id, name: name })
}

export const updateImageURL = (dispatch, id, src) => {
    dispatch({ type: UPDATE_IMAGE_URL, id: id, src: src })
}
   