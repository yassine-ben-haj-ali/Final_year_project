import React, { useState } from "react";
import {
  Form,
  Input,
  Select,
  notification,
  Button,
  DatePicker,
  Modal,
  Upload,
} from "antd";
import axios from "axios";
import { useSelector } from "react-redux";

const RadiographyModal = ({ getRadiography }) => {
  const { user, token } = useSelector((state) => state.auth);
  const [file, setFile] = useState();

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      Object.keys(values).forEach((key) => {
        const value = values[key];
        if (value !== undefined && value !== null && value !== "") {
          formData.append(key, value);
        }
      });
      const res = await axios.post(
        `http://localhost:8800/api/radiography/${user._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      getRadiography();
      form.resetFields();
      setFile(null)
      notification.success({ message: "Radiography test saved with success" });
    } catch (err) {
      notification.error({ message: "something went wrong" });
    }
  };

  const [form] = Form.useForm();

  return (
    <div>
      <Form
        style={{
          width: "100%",
        }}
        form={form}
        layout="vertical"
        autoComplete="off"
        onFinish={handleSubmit}
      >
        <Form.Item
          label="Sélectionner le type de l'examen radiologique"
          name="Type"
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
              min: 3,
            },
          ]}
        >
          <Select
            showSearch
            placeholder="Search to Select"
            optionFilterProp="children"
            options={[
              {
                value: "Echographie",
                label: "Echographie",
              },
              {
                value: "Fibroscopie",
                label: "Fibroscopie",
              },
              {
                value: "IRM",
                label: "IRM",
              },
              {
                value: "Panoramique dentaire",
                label: "Panoramique dentaire",
              },
              {
                value: "Radio",
                label: "Radio",
              },
              {
                value: "Scanner",
                label: "Scanner",
              },
              {
                value: "Angiographie",
                label: "Angiographie",
              },
              {
                value: "Angioscanner",
                label: "Angioscanner",
              },
              {
                value: "Arthrographie",
                label: "Arthrographie",
              },
              {
                value: "Arthroscopie",
                label: "Arthroscopie",
              },
              {
                value: "Artériographie",
                label: "Artériographie",
              },
              {
                value: "Bronchoscopie",
                label: "Bronchoscopie",
              },
              {
                value: "Capillaroscopie",
                label: "Capillaroscopie",
              },
              {
                value: "Coloscopie",
                label: "Coloscopie",
              },
              {
                value: "Doppler transcrânien",
                label: "Doppler transcrânien",
              },
              {
                value: "Echo-doppler",
                label: "Echo-doppler",
              },
              {
                value: "Echographie abdominale",
                label: "Echographie abdominale",
              },
              {
                value: "Echographie de l'appareil urinaire",
                label: "Echographie de l'appareil urinaire",
              },
              {
                value: "Echographie du coeur",
                label: "Echographie du coeur",
              },

              {
                value: "Echographie pelvienne",
                label: "Echographie pelvienne",
              },
              {
                value: "Fibroscanner",
                label: "Fibroscanner",
              },
              {
                value: "Hystéroscopie",
                label: "Hystéroscopie",
              },

              {
                value: "Scanner des sinus",
                label: "Scanner des sinus",
              },
              {
                value: "Transit Oeso-gastroduodénal",
                label: "Transit Oeso-gastroduodénal",
              },
              {
                value: "Autre",
                label: "Autre",
              },
            ]}
          />
        </Form.Item>
        <Form.Item
          label="Nom d'examen"
          name="Name"
          rules={[
            {
              required: true,
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
          <Input placeholder="Taper le nom d'examen" />
        </Form.Item>
        <Form.Item
          label="motif de l'examen"
          name="Reason"
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
          <Input placeholder="Taper le motif de l'examen" />
        </Form.Item>
        <Form.Item
          label="Date"
          name="Date"
          rules={[
            {
              required: true,
            },
            {
              type: "String",
              min: 3,
            },
          ]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item label="Result File" name="File">
          <Upload
            beforeUpload={(file) => {
              setFile(file);
              return false; // Prevent automatic upload before form submission
            }}
            fileList={file ? [file] : []}
          >
            <Button>Click to Upload</Button>
            {file && file.name}
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {" "}
            Ajouter
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default RadiographyModal;
