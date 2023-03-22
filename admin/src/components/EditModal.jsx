import { Button, Modal, Tooltip, Input } from "antd";
import { useState } from "react";
import axios from "axios";
import { EditFilled } from "@ant-design/icons";
import "./NewModal.css";

const EditModal = ({ item, getData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  let [updateText, setUpdateText] = useState({
    name: "",
    email: "",
    role: "",
  });

  let updateMembers = async () => {
    await axios
      .patch(`http://localhost:8080/members/${item.id}`, updateText)
      .then((res) => {
        // console.log(res.data);
        // alert(res.data.message);
        // setUpdateText(res.data)
        getData();
      })
      .catch((e) => console.log(e.message));
  };

  let handleChange = (event) => {
    let { name, value } = event.target;

    setUpdateText({
      ...updateText,
      [name]: value,
    });
  };
  const showModal = () => {
    setUpdateText(item);
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    updateMembers();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Tooltip title="Edit" color="red">
        <Button onClick={showModal}>
          {/* <EditFilled /> */}
          📝
        </Button>
      </Tooltip>
      <Modal
        title="Update"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <form onSubmit={(e) => e.preventDefault()} className="edit_form">
          <Input
            type="text"
            placeholder="name"
            name="name"
            value={updateText.name}
            onChange={handleChange}
          />

          <Input
            type="text"
            rows={4}
            style={{ backgroundColor: "#f1eaea" }}
            placeholder="email"
            name="email"
            value={updateText.email}
            onChange={handleChange}
          />
          <Input
            type="text"
            placeholder="role"
            name="role"
            value={updateText.role}
            onChange={handleChange}
          />
        </form>
      </Modal>
    </>
  );
};
export { EditModal };
