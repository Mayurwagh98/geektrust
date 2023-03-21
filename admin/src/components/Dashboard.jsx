import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";
import { EditModal } from "./EditModal";
import { NewModal } from "./NewModal";
import ReactPaginate from "react-paginate";

const Dashboard = () => {
  // https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json

  let [users, setUsers] = useState();
  const [currPage, setCurrPage] = useState(0);
  let [search, setSearch] = useState("");

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

  // ---------------- delete
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
  const perpage = 10;
  let handleFetch = ({ selected: selectedPage }) => {
    setCurrPage(selectedPage);
  };

  const pageCount = Math.ceil(users?.length / perpage);
  const offset = currPage * perpage; //offset = 0, 10, 20......
  return (
    <>
      <div>
        <h5>Admin Dashboard</h5>
        <input
          type="text"
          placeholder="Search by name"
          onChange={(e) => setSearch(e.target.value)}
        />
        <table>
          <thead>
            <tr>
              <th>name</th>
              <th>email</th>
              <th>role</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>
            {users
              ?.filter((el) => {
                return el.name.toLowerCase().includes(search.toLowerCase());
              })
              .slice(offset, offset + perpage)
              .map((item, index) => {
                return (
                  <>
                    <tr key={index}>
                      <input type="checkbox" />
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.role}</td>
                      <div className="edit_delete_div">
                        <p>
                          <EditModal item={item} getData={getData} />

                          {/* <NewModal item={item} /> */}
                        </p>
                        <p onClick={() => handleDelete(item)}>❌</p>
                      </div>
                    </tr>
                  </>
                );
              })}
          </tbody>
        </table>
        <ReactPaginate
          previousLabel={"<- Prev"}
          nextLabel={"Next ->"}
          pageCount={pageCount}
          onPageChange={handleFetch}
          containerClassName={"pagination"}
          previousLinkClassName={"pagination__link"}
          nextLinkClassName={"pagination__link"}
          disabledClassName={"pagination_link_disabled"}
          activeClassName={"pagination_link_active"}
        />
      </div>
    </>
  );
};

export { Dashboard };
