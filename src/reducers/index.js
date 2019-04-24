import { combineReducers } from 'redux';

import {
    ADD_TASK_FAILURE,
    ADD_TASK_SUCCESS,
    EDIT_TASK_SUCCESS,
    GET_TASKS_FAILURE,
    GET_TASKS_STARTED,
    GET_TASKS_SUCCESS,
    LOGIN_FAILURE,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS
} from "../actions/types";


export default combineReducers({
    tasks,
    login
})


function tasks(
    state = { loading: true },
    action
) {
    switch (action.type) {
        case GET_TASKS_STARTED: {
            return {
                ...state,
                loading: true
            }
        }
        case GET_TASKS_SUCCESS: {
            return {
                ...state,
                tasksList: action.payload.message.tasks,
                page: action.payload.page,
                totalTasks: action.payload.message.total_task_count,
                loading: false
            };
        }
        case GET_TASKS_FAILURE: {
            return {
                ...state,
                loading: false,
                error: action.payload.message
            }
        }

        case ADD_TASK_SUCCESS: {
            return {
                ...state,
                totalTasks: parseInt(state.totalTasks) + 1,
            }
        }

        case ADD_TASK_FAILURE: {
            return {
                ...state,
                addError: action.payload.message
            }
        }

        case EDIT_TASK_SUCCESS: {
            return {
                ...state,
                tasksList: state.tasksList.map(task => (
                    task.id === action.payload.id ? ({
                        ...task,
                        text: action.payload.task.text,
                        status: action.payload.task.status ? 10 : 0
                    }) : task
                ))
            }
        }

        default: return state;
    }
}

function login(
    state = { logined: false },
    action
) {
    switch (action.type) {
        case LOGIN_SUCCESS: {
            return {
                ...state,
                logined: true,
                error: ''
            }
        }

        case LOGIN_FAILURE: {
            return {
                ...state,
                logined: false,
                error: action.payload.message
            }
        }

        case LOGOUT_SUCCESS: {
            return {
                ...state,
                logined:false
            }
        }

        default: return state
    }
}