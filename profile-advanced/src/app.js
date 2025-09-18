import React, { useEffect, useState } from "react";
import { Row, Col, Spin, Modal, Form, Input, Button, Card } from "antd";
import { EditOutlined } from "@ant-design/icons";
import "antd/dist/reset.css";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleSave = (values) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === selectedUser.id ? { ...u, ...values } : u))
    );
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Advanced User Profiles</h2>
      {loading ? (
        <div className="d-flex justify-content-center">
          <Spin size="large" />
        </div>
      ) : (
        <Row gutter={[16, 16]}>
          {users.map((user) => {
            const avatarUrl = `https://avatars.dicebear.com/v2/avataaars/${user.username}.svg?options[mood][]=happy`;
            return (
              <Col xs={24} sm={12} md={8} lg={6} key={user.id}>
                <Card
                  cover={<img alt={user.username} src={avatarUrl} />}
                  actions={[
                    <EditOutlined key="edit" onClick={() => handleEdit(user)} />,
                  ]}
                >
                  <Card.Meta
                    title={user.name}
                    description={
                      <>
                        <p>Email: {user.email}</p>
                        <p>Phone: {user.phone}</p>
                        <p>Company: {user.company.name}</p>
                      </>
                    }
                  />
                </Card>
              </Col>
            );
          })}
        </Row>
      )}

      <Modal
        title="Edit User"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        {selectedUser && (
          <Form
            layout="vertical"
            initialValues={selectedUser}
            onFinish={handleSave}
          >
            <Form.Item name="name" label="Name">
              <Input />
            </Form.Item>
            <Form.Item name="email" label="Email">
              <Input />
            </Form.Item>
            <Form.Item name="phone" label="Phone">
              <Input />
            </Form.Item>
            <Form.Item name="website" label="Website">
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Save
              </Button>
            </Form.Item>
          </Form>
        )}
      </Modal>
    </div>
  );
}

export default App;
