import React, { useState } from "react";

const Pagination = ({ users, onDataFromChild }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = users?.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    onDataFromChild(currentItems);
  };


  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(users?.length / itemsPerPage); i++) {
    pageNumbers.push(i);

    const handleClick = () => {
    };
  }
  return (
    <div>
      <ul>
        {pageNumbers.map((pageNumber) => (
          <li key={pageNumber}>
            <button onClick={() => paginate(pageNumber)}>{pageNumber}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export { Pagination };
