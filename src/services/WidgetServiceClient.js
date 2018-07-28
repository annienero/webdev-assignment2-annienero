let _singleton = Symbol();

export default class WidgetServiceClient {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Singleton!!!');
    }

    static get instance() {
        if (!this[_singleton]) this[_singleton] = new WidgetServiceClient(_singleton);
        return this[_singleton]
    }

    saveWidgets(lessonId, widgets) {
        return fetch('https://cs4550-summer2-2018-annienero.herokuapp.com/api/esson/' + lessonId + '/widget/save', { 
            method: 'post',
            body: JSON.stringify(widgets),
            headers: {
                'content-type': 'application/json'
            }
        })
    }

    findAllWidgetsForLesson(lessonId) {
        return fetch('https://cs4550-summer2-2018-annienero.herokuapp.com/api/lesson/' + lessonId + '/widget') 
            .then(function (response) {
                return response.json()
            })
    }
}