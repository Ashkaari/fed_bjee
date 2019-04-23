import React, { Component } from 'react';
import {connect} from "react-redux";
import {fetchTasks} from "../actions/tasksActions";

class TasksPaginationBar extends Component{
    render() {
        const { totalTasks, error, currentPage, sortBy, sortType } = this.props;
        return(
            <div>
                {totalTasks && !error && (
                    <div className="task_list-pagination">
                        <strong>Tasks List</strong>
                        <div>
                            <strong>{(currentPage - 1) * 3 } - {currentPage * 3}</strong>
                            of
                            <strong>{totalTasks}</strong>
                            <button onClick={() => this.props.dispatch(fetchTasks(currentPage - 1, sortBy, sortType))}
                                    disabled={currentPage === 1}
                            >
                                &#x2039;
                            </button>
                            <button onClick={() => this.props.dispatch(fetchTasks(currentPage + 1, sortBy, sortType))}
                                    disabled={currentPage === totalTasks / 3}
                            >
                                &#x203A;
                            </button>
                        </div>

                    </div>
                )}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        totalTasks: state.tasks.totalTasks,
        error: state.tasks.error,
        currentPage: state.tasks.page
    };
};

export default connect(mapStateToProps)(TasksPaginationBar)