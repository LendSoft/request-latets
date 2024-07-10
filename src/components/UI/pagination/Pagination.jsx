import React from 'react';
import cl from './Pagination.module.css'; // Импортируем стили из CSS-модуля

const Pagination = ({ totalPages, page, changePage }) => {
    const pagesArray = Array.from({ length: totalPages }, (_, index) => index + 1);
    return (
        <div className={cl.myPagination}>
            {pagesArray.map((p) => (
                <span
                    key={p}
                    onClick={() => changePage(p)}
                    className={page === p ? `${cl.page} ${cl.page__current}` : `${cl.page}`} /* Заменяем фигурные скобки на обычные */
                >
                    {p}
                </span>
            ))}
        </div>
    );
};

export default Pagination;
