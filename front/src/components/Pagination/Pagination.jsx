import React from 'react';
import './Pagination.css'

const Pagination = (props) => {

    const paginCreator = () => {
        let pagin = [];
        for (let i = 1; i <= props.pageNumbers; i++) {
            pagin.push(<li key={i} className="page-item pagin">
            <a onClick={() => {return props.changeCurrentPage(i)}} href="!#" className="page-link">
                {i}
            </a>
        </li>)
        }
        return pagin;
    }
    const pagin = paginCreator();
    return (
        <div className="pagination">
            {pagin}
        </div>
    )
}

export default Pagination;