import Layout from "@/components/Layout";
import useAuthStore from "@/modules/authStore";
import { Button, Form, Input, message, Modal } from "antd";
import { useEffect, useState } from "react";
import { updateProfile } from "@/modules/fetch/users";
import { getLoginUser } from "@/modules/fetch/users";

function Profile() {
  const setUser = useAuthStore((state) => state.setUser); // agar header juga berubah name-nya
  const userData = useAuthStore((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);
  const [form] = Form.useForm(); // a form instance dari antd
  const [currentUser, setCurrentUser] = useState("");

  const fetchUser = async () => {
    if (window.localStorage.getItem("token")) {
      const data = await getLoginUser();
      setCurrentUser(data);
    }
  };


  useEffect(() => {
    const storedValues = JSON.parse(localStorage.getItem("profileFormValues"));

    if (storedValues) {
      form.setFieldsValue(storedValues); // panggil stored values di form, ketika page baru di load
    }
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser); // parsing agar keterima sebagai local storage
      useAuthStore.setState({ user: parsedUser }); // setting user data ke local storage
    }
    fetchUser();
  }, [form]);

  const showModal = () => {
    setIsOpen(true);
  }; // open modal ketika click edit

  const handleCancel = () => {
    setIsOpen(false);
  }; // tutup modal ketika click close/cancel

  const handleSave = async () => {
    try {
      await form.validateFields(); // Validate the form fields oleh antd
      const values = await form.getFieldsValue(); // Get the form values oleh antd

      console.log("Received values of form:", values);
      localStorage.setItem("profileFormValues", JSON.stringify(values)); // method is used to store data in local storage, dengan keys "profileFormValues"
      setIsOpen(false); // kalau sudah update, tutup otomatis modal

      // Call the updateProfile function with the updated values, or sending back to our server
      await updateProfile(userData.id, values.name, values.password);

      // Update the userData.name in the Zustand store (agar header berubah name-nya)
      setUser({ ...userData, name: values.name });

      message.success("Profile updated successfully!"); // react toast oleh antd
    } catch (error) {
      console.error(error);
      message.error("Failed to update profile."); // react toast oleh antd
    }
  };

  return (
    <Layout userMe={currentUser}>
      <div className="profileContainer">
        <h1 className="profileHeading">Profile</h1>
        <Form
          className="profileForm"
          form={form}
          initialValues={{ name: userData.name, email: userData.email }} // set initial values
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
        >
          <Form.Item label="Name" name="name">
            <Input disabled={!isOpen} />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input disabled />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input.Password disabled={!isOpen} />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            {!isOpen && <Button onClick={showModal}>Edit</Button>}
            <Modal
              title="Edit Profile"
              visible={isOpen}
              onCancel={handleCancel}
              footer={[
                <Button key="cancel" onClick={handleCancel}>
                  Cancel
                </Button>,
                <Button key="save" onClick={handleSave}>
                  Save
                </Button>
              ]}
            >
              <Form
                form={form}
                initialValues={{ name: userData.name, email: userData.email }}
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 16 }}
              >
                <Form.Item label="Name" name="name">
                  <Input />
                </Form.Item>
                <Form.Item label="Email" name="email">
                  <Input disabled />
                </Form.Item>
                <Form.Item label="Password" name="password">
                  <Input.Password />
                </Form.Item>
              </Form>
            </Modal>
          </Form.Item>
        </Form>
      </div>
    </Layout>
  );
}

export default Profile;
