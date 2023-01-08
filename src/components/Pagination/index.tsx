import React from 'react';
import ReactPaginate from "react-paginate";

import styles from './Pagination.module.scss'
import {useSelector} from "react-redux";
import {pizzaSelector} from "../../redux/slices/pizza/selectors";

type PaginationProps = {
    currentPage: number,
    setCurrentPage: (page: number) => void
}

const Pagination: React.FC <PaginationProps> = ({currentPage, setCurrentPage}) => {
    const {pageCount} = useSelector(pizzaSelector);


    return (
        <div className={styles.root}>
            <ReactPaginate
                breakLabel="..."
                nextLabel=">"
                onPageChange={(e) => setCurrentPage(e.selected + 1)}
                pageRangeDisplayed={3}
                pageCount={pageCount}
                forcePage={currentPage - 1}
                previousLabel="<"
                // renderOnZeroPageCount={null}
            /></div>


    );
};

export default Pagination;

