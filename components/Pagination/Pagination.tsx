import css from "./Pagination.module.css";
import ReactPaginate from "react-paginate";

interface PaginationProps {
  pageCount: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  pageCount,
  currentPage,
  onPageChange,
}: PaginationProps) {
  if (pageCount <= 1) return null;

  return (
    <div>
      <ReactPaginate
        pageCount={pageCount}
        forcePage={currentPage - 1}
        onPageChange={(selectedItem) => onPageChange(selectedItem.selected + 1)}
        marginPagesDisplayed={1}
        pageRangeDisplayed={3}
        previousLabel="←"
        nextLabel="→"
        breakLabel="…"
        containerClassName={css.pagination}
        pageClassName={css.page}
        pageLinkClassName={css.link}
        previousClassName={css.page}
        nextClassName={css.page}
        previousLinkClassName={css.link}
        nextLinkClassName={css.link}
        breakClassName={css.page}
        breakLinkClassName={css.link}
        activeClassName={css.active}
        disabledClassName={css.disabled}
      />
    </div>
  );
}
