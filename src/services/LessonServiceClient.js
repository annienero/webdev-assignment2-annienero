let _singleton = Symbol();

const LESSON_API_URL = 'https://cs4550-summer2-2018-annienero.herokuapp.com/api/course/CID/module/MID/lesson'; 

export default class LessonServiceClient {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Singleton!!!');
    }
 
   static get instance() {
        if(!this[_singleton]) this[_singleton] = new LessonServiceClient(_singleton);
        return this[_singleton]
    } 

    createLesson(cid, mid, lessonObjStr) {
        return fetch(LESSON_API_URL.replace('CID', cid).replace('MID', mid), {
            method: 'post',
            body: lessonObjStr,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (response) { 
            return response.json(); 
        })
    }

    deleteLesson(id) {
        return fetch('https://cs4550-summer2-2018-annienero.herokuapp.com/api/lesson/' + id, { 
            method: 'delete'
        })
    }

    findLessonById(id) {
        return fetch('https://cs4550-summer2-2018-annienero.herokuapp.com/api/lesson/' + id, { 
            method: 'get'
        }).then(function(response) {
            return response.json()
        })
    }

    findAllLessons() {
        return fetch(LESSON_API_URL)
            .then(function(response){
                return response.json();
            });
    }

    findAllLessonsForModule(cid, mid) {
        return fetch(LESSON_API_URL.replace('CID', cid).replace('MID', mid))
        .then(function(response) {
            return response.json()
        })
    }

    updateLesson(id, lessonObjStr) {
        return fetch('https://cs4550-summer2-2018-annienero.herokuapp.com/api/lesson/' + id, {
            method: 'put',
            body: lessonObjStr,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function(response) {
            return response.json();
        })
    }
}