import axios from "axios";
import md5 from 'md5'
import {
    ADD_TASK_FAILURE,
    ADD_TASK_STARTED, ADD_TASK_SUCCESS,
    GET_TASKS_FAILURE,
    GET_TASKS_STARTED,
    GET_TASKS_SUCCESS,
    EDIT_TASK_SUCCESS,
    API_URL
} from "./types";


let HTTP_HEADERS = {
    headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data'
    }
};

const getTasksStarted = () => ({
    type: GET_TASKS_STARTED
});

const getTasksSuccess = (page, response) => ({
    type: GET_TASKS_SUCCESS,
    payload: {
        page,
        message: response.message
    },
});

const getTasksError = payload => ({
    type: GET_TASKS_FAILURE,
    payload
});


export function fetchTasks(
    page = 1,
    sort_field = 'id',
    sort_direction = 'asc'
) {
    return dispatch => {
        dispatch(getTasksStarted());

        axios
            .get(`${API_URL}?developer=Name&page=${page}&sort_field=${sort_field}&sort_direction=${sort_direction}`)
            .then(response => {
                response.data.status === 'error' ? dispatch(getTasksError(response.data))
                    : dispatch(getTasksSuccess(page, response.data));
            })
            .catch(err => dispatch(getTasksError(err.message)));
    };
}


const addTaskStarted = () => ({
    type: ADD_TASK_STARTED
});

const addTaskSuccess = (payload) => ({
    type: ADD_TASK_SUCCESS,
    payload
});

const addTaskError = (payload) => ({
    type: ADD_TASK_FAILURE,
    payload
});


export function createTask(task) {
    let formData = new FormData();
    formData.set('username', task.username);
    formData.set('email', task.email);
    formData.set('text', task.text);

    return dispatch => {
        dispatch(addTaskStarted());

        axios
            .post(`${API_URL}/create?developer=Name`, formData, HTTP_HEADERS)
            .then(response => {
                response.data.status === 'error' ? dispatch(addTaskError(response.data))
                    : dispatch(addTaskSuccess(response.data));
            })
            .catch(err => dispatch(addTaskError(err.message)));
    }
}

const editTaskSuccess = (task, id) => ({
    type: EDIT_TASK_SUCCESS,
    payload : {
        task,
        id
    }
});


export function editTask(task, id) {
    let params_string = `status=${encodeURIComponent(task.status ? 10 : 0)}&text=${encodeURIComponent(task.text)}&token=beejee`;
    const md5Hash = md5(params_string);

    let HTTP_EDIT_HEADERS = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    };

    let formData = new FormData();
    formData.set('signature', md5Hash);
    formData.set('status', task.status ? 10 : 0);
    formData.set('text', task.text);
    formData.set('token', 'beejee');

    return dispatch => {
        axios
            .post(`${API_URL}edit/${id}?developer=Name`, formData, HTTP_EDIT_HEADERS)
            .then(response => {
                response.data.status === 'ok' && dispatch(editTaskSuccess(task, id))
            })
    }

}