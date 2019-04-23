import React, {Component, Fragment} from 'react';
import { connect } from "react-redux";
import { createTask, editTask } from "../actions/tasksActions";


class TaskModal extends Component{
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            formValid: !!props.task,
            formErrors: {
                username: '',
                email: '',
                text: ''
            },
            emailValid: !!props.task,
            usernameValid: !!props.task,
            textValid: !!props.task,
            status: props.task && props.task.status,
            text: props.task ? props.task.text : ''
        };
    }

    handleModalOpen = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    };

    handleCreate = () => {
        if(this.props.forEdit) {
            this.props.dispatch(editTask({
                text: this.state.text,
                status: this.state.status
            }, this.props.task.id))
        } else {
            this.props.dispatch(createTask({
                username: this.state.username,
                email: this.state.email,
                text: this.state.text,
            }));
        }

        this.setState({
            isOpen: false
        })
    };

    handleInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;

        this.setState({
            [name]: value
        }, () => {this.validateField(name, value)})

    };

    validateField = (fieldName, value) => {
        let fieldValidationErrors = this.state.formErrors;

        let emailValid = this.state.emailValid;
        let usernameValid = this.state.usernameValid;
        let textValid = this.state.textValid;

        switch(fieldName) {
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = emailValid ? '' : 'Email is invalid';
                break;
            case 'username':
                usernameValid = value.length >= 3;
                fieldValidationErrors[fieldName] = usernameValid ? '' : 'Username is too short' ;
                break;
            case 'text':
                textValid = value.length >= 3;
                fieldValidationErrors[fieldName] = textValid ? '' : 'Text is too short';
                break;
            default:
                break;
        }

        this.setState({formErrors: fieldValidationErrors,
            emailValid: emailValid,
            usernameValid: usernameValid,
            textValid: textValid
        }, this.validateForm);
    };

    validateForm = () => {
        this.setState({
            formValid: this.state.usernameValid && this.state.emailValid && this.state.textValid
        })
    };


    render() {
        const { isOpen, formValid, formErrors, text, status } = this.state;
        const { forEdit, logined, task } = this.props;
        return(
            <Fragment>
                {
                    forEdit ? (
                        <button className="button_edit-task"
                                onClick={() => this.handleModalOpen()}
                        >
                            &#9998;
                        </button>
                        ) : (
                            <button className="button_new-task"
                                    onClick={() => this.handleModalOpen()}
                            >
                                New task
                            </button>

                        )
                }
                {
                    isOpen && (
                        <div className="new-task_popup">
                            <div className="wrapper">
                                <form>
                                    <input type="text"
                                           className={formErrors.username && 'red'}
                                           placeholder="Username"
                                           name="username"
                                           value={task && task.username}
                                           required
                                           disabled={forEdit}
                                           onChange={this.handleInputChange}
                                    />
                                    <span className="error">{formErrors.username}</span>

                                    <input type="email"
                                           className={formErrors.email && 'red'}
                                           placeholder="E-mail"
                                           value={task && task.email}
                                           name="email"
                                           required
                                           disabled={forEdit}
                                           onChange={this.handleInputChange}
                                    />
                                    <span className="error">{formErrors.email}</span>

                                    <input type="text"
                                           className={formErrors.text && 'red'}
                                           placeholder="Task text"
                                           value={text}
                                           name="text"
                                           required
                                           onChange={this.handleInputChange}
                                    />
                                    {
                                        logined && forEdit && (
                                            <label>
                                                <input type="checkbox"
                                                       checked={status}
                                                       name="status"
                                                       onChange={this.handleInputChange}
                                                />
                                                Status
                                            </label>
                                        )
                                    }
                                    <span className="error">{formErrors.text}</span>
                                    <div>
                                        <button onClick={this.handleModalOpen}
                                                className="cancel"
                                        >
                                            cancel
                                        </button>
                                        <button type="submit"
                                                disabled={!formValid}
                                                onClick={this.handleCreate}
                                        >
                                            save
                                        </button>

                                    </div>
                                </form>

                            </div>
                        </div>
                    )
                }
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        logined: state.login.logined
    };
};

export default connect(mapStateToProps)(TaskModal)