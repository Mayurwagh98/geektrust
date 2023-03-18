import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";

const Dashboard = () => {
  // https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json

  let [users, setUsers] = useState();

  let getData = async () => {
    await axios
      .get(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
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
                    <p>📝</p>
                    <p>❌</p>
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
