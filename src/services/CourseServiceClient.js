let _singleton = Symbol();

const COURSE_API_URL = 'http://localhost:8080/api/course';
export default class CourseServiceClient {
   constructor(singletonToken) {
       if (_singleton !== singletonToken)
           throw new Error('Cannot instantiate directly.');
   }
   static get instance() {
       if(!this[_singleton])
           this[_singleton] = new CourseServiceClient(_singleton);
       return this[_singleton]
   }

    createCourse(courseObjStr) {
        return fetch(COURSE_API_URL, {
            method: 'post',
            body: courseObjStr,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
            return response.json();
        })
    }

    deleteCourse(id) {
        return fetch(COURSE_API_URL + '/' + id, {
            method: 'delete'
        }).then(function (response) {
            return response
        })  
    }

    findAllCourses() {
        return fetch(COURSE_API_URL)
            .then(function(response){
                return response.json();
            });
    }

    findCourseById(id) {
        return fetch(COURSE_API_URL + '/' + id, {
            method: 'get'
        }).then(function(response) {
            response.json()
        })
    }

    updateCourse(id, courseObjStr) {
        return fetch(COURSE_API_URL + '/' + id, {
            method: 'put',
            body: courseObjStr,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function(response) {
            return response.json();
        })
    }
}