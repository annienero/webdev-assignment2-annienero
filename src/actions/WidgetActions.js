import {ADD_WIDGET, FIND_ALL_WIDGETS, SAVE_WIDGETS, MOVE_UP, MOVE_DOWN, DELETE_WIDGET, TOGGLE_PREVIEW} from '../constants/WidgetConstants'

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

//TODO should i try to move all to here (never actually use these, its just done right in widget)
export const moveUp = (dispatch, widget) => {
    dispatch({type: MOVE_UP, widget: widget})
}

export const moveDown = (dispatch, widget) => {
      dispatch({type: MOVE_DOWN, widget: widget})
}

export const deleteWidget = (dispatch, widget) => {
    dispatch({type: DELETE_WIDGET, id: widget.id})
}
 //TODO should i try to move all to here (never actually use these, its just done right in widget)
  

export const togglePreview = (dispatch) => {
    dispatch({type: TOGGLE_PREVIEW})
}
   