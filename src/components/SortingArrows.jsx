import React, {Component} from 'react';

class SortingArrows  extends Component {
    render() {
        const { currentSort, sortBy, currentType } = this.props;

        return(
            <div>
                <span className={`header-sort_icon ${currentSort === 'asc' && currentType === sortBy ? 'selected' : ''}`}
                      onClick={() => this.props.handleSortChange(sortBy, 'asc')}
                >
                    &#x2191;
                </span>
                <span className={`header-sort_icon ${currentSort === 'desc' && currentType === sortBy ? 'selected' : ''}`}
                      onClick={() => this.props.handleSortChange(sortBy, 'desc')}
                >
                    &#x2193;
                </span>
            </div>
        )
    }

};

export default SortingArrows;