import React, { useState } from "react";
import "./NewModal.css";
import axios from "axios";

const NewModal = ({ item }) => {
  let [updateText, setUpdateText] = useState({
    name: "",
    email: "",
  });
  const modal = document.querySelector(".modal");
  //   const trigger = document.querySelector(".trigger");
  //   const closeButton = document.querySelector(".close-button");

  function toggleModal() {
    modal.classList.toggle("show-modal");
    console.log(item);
  }

  let handleChange = (event) => {
    let { name, value } = event.target;

    setUpdateText({
      ...updateText,
      [name]: value,
    });
  };
  
  let updateNote = async () => {
    console.log(item);
    // await axios
    //   .patch(
    //     // `https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`,
    //     `http://localhost:8080/members/${item.id}`,
    //     updateText
    //   )
    //   .then((res) => {
    //     console.log(res.data);
    //     // setUpdateText(res.data)
    //     // getData();
    //     // alert(res.data.message);
    //   })
    //   .catch((e) => console.log(e.message));
  };

  
  //   function windowOnClick(event) {
  //     if (event.target === modal) {
  //       toggleModal();
  //     }
  //   }

  //   trigger.addEventListener("click", toggleModal);
  //   closeButton.addEventListener("click", toggleModal);
  //   window.addEventListener("click", windowOnClick);
  return (
    <div>
      <button class="trigger" onClick={toggleModal}>
        edit
      </button>
      <div class="modal">
        <div class="modal-content">
          <span class="close-button" onClick={toggleModal}>
            ×
          </span>
          {/* <h1>Hello, I am a modal!</h1> */}
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="name"
              name="name"
              value={updateText.name}
              onChange={handleChange}
            />

            <input
              type="text"
              placeholder="email"
              name="email"
              value={updateText.email}
              onChange={handleChange}
            />
            <input type="submit" value="submit" onClick={updateNote} />
          </form>
        </div>
      </div>
    </div>
  );
};

export { NewModal };
