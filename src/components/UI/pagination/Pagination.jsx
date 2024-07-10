import React from 'react';

const Pagination = ({ totalPages, page, changePage }) => {
    const pagesArray = Array.from({ length: totalPages }, (_, index) => index + 1);

    return (
        <div className="page__wrapper">
            {pagesArray.length > 1 && (
                <>
                    <span
                        onClick={() => changePage(page - 1)}
                        className={page === 1 ? 'page page__disabled' : 'page'}
                    >
                        Назад
                    </span>
                    {pagesArray.map((p) => (
                        <span
                            onClick={() => changePage(p)}
                            key={p}
                            className={page === p ? 'page page__current' : 'page'}
                        >
                            {p}
                        </span>
                    ))}
                    <span
                        onClick={() => changePage(page + 1)}
                        className={page === totalPages ? 'page page__disabled' : 'page'}
                    >
                        Вперед
                    </span>
                </>
            )}
        </div>
    );
};

export default Pagination;
