import React, { useState } from "react";
import {
  Form,
  Input,
  Select,
  notification,
  Button,
  Modal,
} from "antd";
import axios from "axios";
import { useSelector } from "react-redux";
const { TextArea } = Input;

const AntecedentModal = ({ getAntecedents }) => {
  const { user, token } = useSelector((state) => state.auth);

  const [Data, setData] = useState({
    Relationship: "",
    Disease: "",
    Notes: "",
  });

 
  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        `http://localhost:8800/api/antecedent/${user._id}`,
        { ...Data },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getAntecedents();
      setData({
        Relationship: "",
        Disease: "",
        Notes: "",
      });
      form.resetFields();
      notification.success({ message: "Antcedent saved with success" });
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
            label="Lien de parenté"
            name="Relationship"
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
            <Select
              showSearch
              placeholder="Search to Select"
              optionFilterProp="children"
              onChange={(value) => {
                setData({ ...Data, Relationship: value });
              }}
              options={[
                {
                  value: "Mère",
                  label: "Mère",
                },
                {
                  value: "Père",
                  label: "Père",
                },
                {
                  value: "Frère",
                  label: "Frère",
                },
                {
                  value: "Soeur",
                  label: "Soeur",
                },
                {
                  value: "Grand-père paternel",
                  label: "Grand-père paternel",
                },
                {
                  value: "Grand-mère paternelle",
                  label: "Grand-mère paternelle",
                },
                {
                  value: "Grand-père maternel",
                  label: "Grand-père maternel",
                },
                {
                  value: "Grand-mère maternelle",
                  label: "Grand-mère maternelle",
                },
                {
                  value: "oncle paternel",
                  label: "oncle paternel",
                },
                {
                  value: "oncle maternel",
                  label: "oncle maternel",
                },
                {
                  value: "tante paternelle",
                  label: "tante paternelle",
                },
                {
                  value: "tante maternelle",
                  label: "tante maternelle",
                },
                {
                  value: "cousin(e) paternel(le)",
                  label: "cousin(e) paternel(le)",
                },
                {
                  value: "cousin(e) maternel(le)",
                  label: "cousin(e) maternel(le)",
                },
                {
                  value: "autre",
                  label: "autre",
                },
              ]}
            />
          </Form.Item>
          <Form.Item
            label="Maladie"
            name="Disease"
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
            <Input
              placeholder="Taper le nom du maladie"
              onChange={(e) => {
                setData({ ...Data, Disease: e.target.value });
              }}
            />
          </Form.Item>
          <Form.Item label="Notes" name="Notes">
            <TextArea
              rows={4}
              onChange={(e) => {
                setData({ ...Data, Notes: e.target.value });
              }}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit"> Ajouter</Button>
          </Form.Item>
        </Form>
    </div>
  );
};

export default AntecedentModal;
