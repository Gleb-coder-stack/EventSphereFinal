import React from 'react';
import {getPagesArray} from "../../../utils/pagination.js";


const Pagination = ({totalCount, page, changePage}) => {
    const pagesArray = getPagesArray(totalCount);
    return (
        <div className="page__wrapper">
            {pagesArray.map(p =>
                <span
                    onClick={() => changePage(p)}
                    key={p}
                    className={page === p ? 'page page__current' : 'page'}
                >
                        {p}
                    </span>
            )}
        </div>
    );
};

export default Pagination;