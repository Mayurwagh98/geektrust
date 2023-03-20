import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";
import { EditModal } from "./EditModal";

const Dashboard = () => {
  // https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json

  let [users, setUsers] = useState();

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

  let handleDelete = async (item) => {
    // console.log(item);
    await axios
      .delete(`http://localhost:8080/members/${item.id}`)
      .then((res) => {
        console.log(res.data);
        getData()
      })
      .catch((e) => console.log(e));
  };

  return (
    <>
      <div>
        <h5>Admin Dashboard</h5>
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
            {users?.map((item, index) => {
              return (
                <>
                  <tr key={index}>
                    <input type="checkbox" />
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.role}</td>
                    <p>
                      <EditModal item={item} getData={getData} />

                      {/* <NewModal item={item} /> */}
                    </p>
                    <p onClick={() => handleDelete(item)}>❌</p>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export { Dashboard };
