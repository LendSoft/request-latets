import React from 'react';
import cl from './Pagination.module.css'; 

const Pagination = ({ totalPages, page, changePage }) => {
    const pagesArray = Array.from({ length: totalPages }, (_, index) => index + 1);
    return (
        <div className={cl.myPagination}>
            {pagesArray.map((p) => (
                <span
                    key={p}
                    onClick={() => changePage(p)}
                    className={page === p ? `${cl.page} ${cl.page__current}` : `${cl.page}`}
                >
                    {p}
                </span>
            ))}
        </div>
    );
};

export default Pagination;
