import React from "react";
import "./pagination.css";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const visiblePages = 10; // Number of pagination buttons to show
  const halfVisiblePages = Math.floor(visiblePages / 2);

  const renderPageButtons = (prevPage = 2) => {
    const pages = [];

    let startPage = 1;
    let endPage = totalPages;

    if (totalPages > visiblePages) {
      if (currentPage < visiblePages || prevPage == visiblePages - 1) {
        endPage = visiblePages;
      } else if (currentPage > totalPages - halfVisiblePages) {
        startPage = totalPages - visiblePages + 2;
      } else {
        startPage = currentPage - halfVisiblePages + 1;
        endPage = currentPage + halfVisiblePages - 1;
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={i === currentPage ? "active-page" : ""}
        >
          {i}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="pagination">
      {currentPage > 1 && (
        <button
          className="previous"
          onClick={() => onPageChange(currentPage - 1)}
        >
          Previous
        </button>
      )}
      {currentPage > visiblePages - 1 && (
        <>
          <button onClick={() => onPageChange(1)}>1</button>
          {currentPage > halfVisiblePages + 2 && <span>...</span>}
        </>
      )}
      {renderPageButtons(currentPage)}
      {/* optional which gives you to navigate to last page */}
      {/* {currentPage < totalPages - halfVisiblePages + 1 && (
        <>
          {currentPage < totalPages - halfVisiblePages && <span>...</span>}
          <button onClick={() => onPageChange(totalPages)}>{totalPages}</button>
        </>
      )} */}
      {currentPage < totalPages && (
        <button className="next" onClick={() => onPageChange(currentPage + 1)}>
          Next
        </button>
      )}
    </div>
  );
};

export default Pagination;
