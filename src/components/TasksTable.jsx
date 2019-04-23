import React, {Component, Fragment} from 'react';
import { connect } from "react-redux";

import { fetchTasks } from "../actions/tasksActions";
import TasksPaginationBar from "./TasksPaginationBar";
import TaskModal from "./TaskModal";
import SortingArrows from "./SortingArrows";


class TasksTable extends Component{
    constructor() {
        super();

        this.state = {
            sortType: '',
            sortBy: ''
        };
    }

    componentDidMount() {
        this.props.dispatch(fetchTasks());
    }

    handleSortChange = (sortBy, sortType) => {
        this.props.dispatch(fetchTasks(
           this.props.page,
           sortBy,
           sortType
        ));
        this.setState({
            sortBy,
            sortType
        });
    };

    render() {
        const { loading, tasksList, error, logined } = this.props;
        const { sortBy, sortType } = this.state;

        return(
            <div>
                <TasksPaginationBar sortType={sortType}
                                    sortBy={sortBy}
                />
                { loading ? (
                    <div className="task_list-loader"></div>
                ) : error ? (
                    <h1>{error}</h1>
                ) : (
                    <Fragment>
                        <div className="tasks_list">
                            <div className="task_list-item header">
                                <div className={`header-sort ${sortBy === 'id' && 'active'}`}>
                                    ID
                                    <SortingArrows sortBy="id"
                                                   currentType={sortBy}
                                                   currentSort={sortType}
                                                   handleSortChange={this.handleSortChange}
                                    />
                                </div>
                                <div className={`header-sort ${sortBy === 'username' && 'active'}`}>
                                    Username
                                   <SortingArrows sortBy="username"
                                                  currentType={sortBy}
                                                  currentSort={sortType}
                                                  handleSortChange={this.handleSortChange}
                                   />
                                </div>
                                <div className={`header-sort ${sortBy === 'email' && 'active'}`}>
                                    E-mail
                                    <SortingArrows sortBy="email"
                                                   currentType={sortBy}
                                                   currentSort={sortType}
                                                   handleSortChange={this.handleSortChange}
                                    />
                                </div>
                                <div className={`header-sort ${sortBy === 'text' && 'active'}`}>
                                    Text
                                    <SortingArrows sortBy="text"
                                                   currentType={sortBy}
                                                   currentSort={sortType}
                                                   handleSortChange={this.handleSortChange}
                                    />
                                </div>
                                <div className={`header-sort ${sortBy === 'status' && 'active'}`}>
                                    Status
                                    <SortingArrows sortBy="status"
                                                   currentType={sortBy}
                                                   currentSort={sortType}
                                                   handleSortChange={this.handleSortChange}
                                    />
                                </div>
                                { logined && <div className="header-sort"> Edit </div> }
                            </div>
                            {
                                tasksList.map((task, key) => (
                                    <div key={key} className="task_list-item">
                                        <div>{task.id}</div>
                                        <div>{task.username}</div>
                                        <div>{task.email}</div>
                                        <div>{task.text}</div>
                                        <div>
                                            <input type="checkbox" readOnly checked={task.status} disabled/>
                                        </div>
                                        {
                                            logined && (
                                                <div>
                                                    <TaskModal forEdit
                                                               task={task}
                                                    />
                                                </div>
                                            )
                                        }
                                        <br/>
                                    </div>
                                ))
                            }
                        </div>
                        <TaskModal/>
                    </Fragment>
                )}

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        tasksList: state.tasks.tasksList,
        loading: state.tasks.loading,
        error: state.tasks.error,
        page: state.tasks.page,
        logined: state.login.logined
    };
};

export default connect(mapStateToProps)(TasksTable)