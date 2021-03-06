let _singleton = Symbol();

const MODULE_API_URL = 'https://cs4550-summer2-2018-annienero.herokuapp.com/api/course/CID/module'; 

export default class ModuleServiceClient {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Singleton!!!');
    }
 
   static get instance() {
        if(!this[_singleton]) this[_singleton] = new ModuleServiceClient(_singleton);
        return this[_singleton]
    } 

    createModule(cid, moduleObjStr) {
        return fetch(MODULE_API_URL.replace('CID', cid), {
            method: 'post',
            body: moduleObjStr,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (response) { 
            return response.json(); 
        })
    }

    deleteModule(id) {
        return fetch('https://cs4550-summer2-2018-annienero.herokuapp.com/api/module/' + id, {
            method: 'delete'
        })
    }

    findAllModules() {
        return fetch(MODULE_API_URL)
            .then(function(response){
                return response.json();
            });
    }

    findAllModulesForCourse(courseId) {
        return fetch(MODULE_API_URL.replace('CID', courseId))
            .then(function (response) {
                return response.json();
            })
    }


    findModuleById(id) {
        return fetch('https://cs4550-summer2-2018-annienero.herokuapp.com/api/module/' + id, { 
            method: 'get'
        }).then(function(response) {
            return response.json()
        })
    }

    updateModule(id, moduleObjStr) {
        return fetch('https://cs4550-summer2-2018-annienero.herokuapp.com/api/module/' + id, { 
            method: 'put',
            body: moduleObjStr,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function(response) {
            return response.json();
        })
    }
}