import { Button, Form, Input, Modal, Table } from "antd";
import { useEffect, useState } from "react";
import { deleteUser, getAllUsers, updateUser } from "../../modules/fetch/users";

const GetAllUsers = () => {
  const [users, setUsers] = useState([]);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [form] = Form.useForm();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedUserIdToDelete, setSelectedUserIdToDelete] = useState(null);

  useEffect(() => {
    // Fetch user data from the backend API
    fetchUsers();
  }, []);

  // buat fetching user
  const fetchUsers = async () => {
    try {
      const response = await getAllUsers();
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = (id) => {
    // Open the delete confirmation modal and set the selected user ID (jadi passing id sebagai parameter)
    setDeleteModalOpen(true);
    setSelectedUserIdToDelete(id);
  };

  const handleUpdate = (id) => {
    // Open the update modal and set the selected user ID (jadi passing id sebagai parameter)
    setUpdateModalOpen(true);
    setSelectedUserId(id);

    // Set the existing name and password values in the form atau set the existing name and an empty password field ketika buka the update modal
    const selectedUser = users.find((user) => user.id === id);
    form.setFieldsValue({
      name: selectedUser.name,
      password: "",
    });
  };

  // handle update user
  const handleUpdateModalOk = async () => {
    try {
      // Perform the update logic here
      const updatedName = form.getFieldValue("name"); // sending back with the parameter name
      const updatedPassword = form.getFieldValue("password"); // sending back with the parameter password
      console.log(`Updating user with ID ${selectedUserId}`);
      console.log("Updated Name:", updatedName);
      console.log("Updated Password:", updatedPassword);

      // Call the updateUser function with the updated values
      const response = await updateUser(
        selectedUserId,
        updatedName,
        updatedPassword
      );
      console.log("Update response:", response);

      // Close the update modal
      setUpdateModalOpen(false);

      // Refetch the user data to get the updated list
      await fetchUsers();
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  const handleUpdateModalCancel = () => {
    // Reset the form and close the update modal
    form.resetFields(); // form dibalikan ke value awal
    setUpdateModalOpen(false); // or tutup modal, ketika klik cancel
  };

  // function delete user
  const handleDeleteModalOk = async () => {
    try {
      console.log(`Deleting user with ID ${selectedUserIdToDelete}`);

      // Call the deleteUser function to delete the user
      const response = await deleteUser(selectedUserIdToDelete);
      console.log("Delete response:", response);

      // Close the delete confirmation modal
      setDeleteModalOpen(false);

      // Refetch the user data to get the updated list
      await fetchUsers(); // panggil fetch user function
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  const handleDeleteModalCancel = () => {
    // Close the delete confirmation modal, ketika klik cancel
    setDeleteModalOpen(false);
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div>
          <Button type="primary" onClick={() => handleUpdate(record.id)}>
            Update
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => handleDelete(record.id)}
            className="delete-button"
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <Table
        dataSource={users.map((user) => ({ ...user, key: user.id }))}
        columns={columns}
        rowClassName="table-row"
      />

      <Modal
        title="Update User"
        open={updateModalOpen}
        onOk={handleUpdateModalOk}
        onCancel={handleUpdateModalCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please enter a name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please enter a password" }]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Delete User"
        open={deleteModalOpen}
        onOk={handleDeleteModalOk}
        onCancel={handleDeleteModalCancel}
      >
        <p>Are you sure you want to delete this user?</p>
      </Modal>
    </>
  );
};

export default GetAllUsers;
