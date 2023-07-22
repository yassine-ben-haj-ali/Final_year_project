import React, { useState } from "react";
import { useSelector } from "react-redux";
import { DatePicker, Form, Input, Button, Upload, notification } from "antd";
import axios from "axios";
// const { TextArea } = Input;
const EditPatientProfile = () => {
  const [file, setFile] = useState();
  const { token } = useSelector((state) => state.auth);
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    const formData = new FormData();
    formData.append("file", file);
    Object.keys(values).forEach((key) => {
      const value = values[key];
      if (value !== undefined && value !== null && value !== "") {
        formData.append(key, value);
      }
    });

    try {
      await axios.put(
        "http://localhost:8800/api/profile/patient/edit",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      notification.success({ message: "informations updated with success!!" });
      form.resetFields();
    } catch (error) {
      notification.error({ message: error.message });
    }
  };
  return (
    <Form
      form={form}
      onFinish={onFinish}
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 24,
      }}
      layout="vertical"
      style={{
        maxWidth: 900,
      }}
    >
      <Form.Item
        label="Firstname"
        name="Firstname"
        rules={[
          {
            required: false,
          },
          {
            type: "string",
            warningOnly: true,
          },
          {
            type: "string",
            min: 5,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Lastname"
        name="Lastname"
        rules={[
          {
            required: false,
          },
          {
            type: "string",
            warningOnly: true,
          },
          {
            type: "string",
            min: 5,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Phone number" name="Phone" rules={[
          {
            required: false,
          },
          {
            type: "string",
            warningOnly: true,
          },
          {
            type: "string",
            min: 8,
            max:8
          },
        ]}>
        <Input />
      </Form.Item>
      <Form.Item label="City" name="City" rules={[
          {
            required: false,
          },
          {
            type: "string",
            warningOnly: true,
          },
          {
            type: "string",
            min: 5,
            max:15
          },
        ]}>
        <Input />
      </Form.Item>
      <Form.Item label="Pin code" name="Pincode" rules={[
          {
            required: false,
          },
          {
            type: "string",
            warningOnly: true,
          },
          {
            type: "string",
            min: 3,
            max:7
          },
        ]}>
        <Input />
      </Form.Item>
      <Form.Item label="Country" name="Country" rules={[
          {
            required: false,
          },
          {
            type: "string",
            warningOnly: true,
          },
          {
            type: "string",
            min: 4,
          },
        ]}>
        <Input />
      </Form.Item>
      <Form.Item label="Address" name="Address" rules={[
          {
            required: false,
          },
          {
            type: "string",
            warningOnly: true,
          },
          {
            type: "string",
            min: 5,
            max:30
          },
        ]}>
        <Input />
      </Form.Item>
      <Form.Item label="Birthday" name="Birthday">
        <DatePicker />
      </Form.Item>
      {/* <Form.Item label="Description" name="Description">
      <TextArea rows={4} />
    </Form.Item> */}
      <Form.Item label="profile picture" name="File">
        <Upload
          customRequest={({ file }) => {
            setFile(file);
          }}
          showUploadList={false}
        >
          <Button>Click to Upload</Button>
          {file && file.name}
        </Upload>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          valider
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditPatientProfile;
