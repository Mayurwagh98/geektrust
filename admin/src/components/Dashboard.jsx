import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./Dashboard.css";
import { EditModal } from "./EditModal";
import { NewModal } from "./NewModal";
import ReactPaginate from "react-paginate";
import { Button } from "antd";

const Dashboard = () => {
  // https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json

  let [users, setUsers] = useState();
  // const [currPage, setCurrPage] = useState(0);
  let [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  let getData = async () => {
    await axios
      .get(
        // "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
        "http://localhost:8080/members"
      )
      .then((res) => {
        console.log(res.data);
        setUsers(res.data);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    getData();
  }, []);

  // ---------------- delete ------------------
  let handleDelete = async (item) => {
    // console.log(item);
    await axios
      .delete(`http://localhost:8080/members/${item.id}`)
      .then((res) => {
        // console.log(res.data);
        getData();
      })
      .catch((e) => console.log(e));
  };

  //---------- pagination -----------------
  // const perpage = 10;
  // let handleFetch = ({ selected: selectedPage }) => {
  //   setCurrPage(selectedPage);
  // };

  // const pageCount = Math.ceil(users?.length / perpage);
  // const offset = currPage * perpage; //offset = 0, 10, 20......
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = users?.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(users?.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  let handleNextPrev = (sign) => {
    if (sign == "+") {
      setCurrentPage((prev) => prev + 1);
    } else {
      setCurrentPage((prev) => prev - 1);
    }
  };

  // -------------- checkbox -------------------
  const handleCheckboxChange = (event, item) => {
    if (event.target.checked) {
      setSelectedItems([...selectedItems, item]);
      // selectedItems.push(item)
    } else {
      setSelectedItems(
        selectedItems.filter((selectedItem) => selectedItem !== item)
      );
    }
    console.log(selectedItems);
  };

  // ------------------ selected rows delete -------------------
  let handleDeleteAll = async () => {
    for (let x of selectedItems) {
      await axios
        .delete(`http://localhost:8080/members/${x.id}`)
        .then((res) => {
          // console.log(res.data);
          getData();
        })
        .catch((e) => console.log(e));
    }
  };

  // ----------------------- selected rows grayish ----------------------
  let handleSelectedRows = (index) => {
    if (selectedRows.includes(index)) {
      setSelectedRows(selectedRows.filter((i) => i !== index)); // if clicked the same row again, it will be deselect
    } else {
      setSelectedRows(selectedRows.concat(index));
    }
  };

  return (
    <>
      <div>
        <h5>Admin Dashboard</h5>
        <input
          type="text"
          placeholder="Search by name"
          onChange={(e) => setSearch(e.target.value)}
          className="search"
        />
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems
              ?.filter((el) => {
                return el.name.toLowerCase().includes(search.toLowerCase());
              })
              // .slice(offset, offset + perpage)
              .map((item, index) => {
                return (
                  <>
                    <tr
                      key={index}
                      onClick={() => handleSelectedRows(index)}
                      style={{
                        backgroundColor: selectedRows.includes(index)
                          ? "lightgrey"
                          : null,
                      }}
                    >
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(item)}
                          // onChange={() => handleSelect(item)}
                          onChange={(event) =>
                            handleCheckboxChange(event, item)
                          }
                        />
                      </td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.role}</td>
                      <div className="edit_delete_div">
                        <EditModal item={item} getData={getData} />

                        {/* <NewModal item={item} /> */}

                        <Button onClick={() => handleDelete(item)}>❌</Button>
                      </div>
                    </tr>
                  </>
                );
              })}
          </tbody>
        </table>
        <div className="delete_page_btn_div">
          <Button type="primary" danger onClick={handleDeleteAll}>
            Delete selected
          </Button>
          <div>
            {currentPage != 1 && ( // to hide the button when page == 1
              <button onClick={() => handleNextPrev("-")}>Prev</button>
            )}

            {pageNumbers.map((pageNumber) => (
              <button onClick={() => paginate(pageNumber)}>{pageNumber}</button>
            ))}
            {currentPage != 5 && ( // to hide the button when page == 5
              <button onClick={() => handleNextPrev("+")}>Next</button>
            )}
          </div>
        </div>

        {/* <ReactPaginate
          previousLabel={"<- Prev"}
          nextLabel={"Next ->"}
          pageCount={pageCount}
          onPageChange={handleFetch}
          containerClassName={"pagination"}
          previousLinkClassName={"pagination__link"}
          nextLinkClassName={"pagination__link"}
          disabledClassName={"pagination_link_disabled"}
          activeClassName={"pagination_link_active"}
        /> */}
      </div>
    </>
  );
};

export { Dashboard };
