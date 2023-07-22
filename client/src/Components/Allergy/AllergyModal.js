import React, { useState } from "react";
import {
  Form,
  Input,
  Select,
  notification,
  Button,
  DatePicker,
  Checkbox,
  Modal,
} from "antd";
import axios from "axios";
import { useSelector } from "react-redux";
const { TextArea } = Input;

const AllergyModal = ({ getAllergies }) => {
  const { user, token } = useSelector((state) => state.auth);

  const [Data, setData] = useState({
    Type: "",
    Name: "",
    FollowupStatus: "",
    YearOfDiscovery: "",
    FamilyHistory: false,
    Notes: "",
  });
  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        `http://localhost:8800/api/allergy/${user._id}`,
        { ...Data },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getAllergies();
      setData({
        Type: "",
        Name: "",
        FollowupStatus: "",
        YearOfDiscovery: "",
        FamilyHistory: false,
        Notes: "",
      });
      form.resetFields();
      notification.success({ message: "Allergy saved with success" });
    } catch (err) {
      notification.error({ message: "something went wrong" });
    }
  };

  const [form] = Form.useForm();
  const YearChange = (date, dateString) => {
    setData({ ...Data, YearOfDiscovery: dateString });
  };
  return (
    <div>
      <Form
      onFinish={handleSubmit}
        style={{
          width: "100%",
        }}
        form={form}
        layout="vertical"
        autoComplete="off"
      >
        <Form.Item
          label="Type d'allergie"
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
              min: 5,
            },
          ]}
        >
          <Select
            showSearch
            placeholder="Search to Select"
            optionFilterProp="children"
            onChange={(value) => {
              setData({ ...Data, Type: value });
            }}
            options={[
              {
                value: "Allergies respiratoires",
                label: "Allergies respiratoires",
              },
              {
                value: "Allergies de contact",
                label: "Allergies de contact",
              },
              {
                value: "Allergies médicamenteuses",
                label: "Allergies médicamenteuses",
              },
              {
                value: "Allergies alimentaire",
                label: "Allergies alimentaire",
              },
              {
                value: "Allergies professionnelles",
                label: "Allergies professionnelles",
              },
              {
                value: "Autre",
                label: "Autre",
              },
            ]}
          />
        </Form.Item>
        <Form.Item
          label="Allergique à"
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
          <Input
            placeholder="Taper le nom d'allergie"
            onChange={(e) => {
              setData({ ...Data, Name: e.target.value });
            }}
          />
        </Form.Item>
        <Form.Item
          label="L'année de découverte"
          name="YearOfDiscovery"
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
          <DatePicker onChange={YearChange} picker="year" />
        </Form.Item>
        <Form.Item label="Etat de suivi de l'allergie" name="FollowupStatus">
          <Select
            onChange={(value) => {
              setData({ ...Data, FollowupStatus: value });
            }}
            showSearch
            placeholder="Search to Select"
            optionFilterProp="children"
            options={[
              {
                value: "Désensibilisation en cours",
                label: "Désensibilisation en cours",
              },
              {
                value: "Désensibilisation terminée ",
                label: "Désensibilisation terminée",
              },
              {
                value: "Aucun suivi",
                label: "Aucun suivi",
              },
            ]}
          />
        </Form.Item>
        <Form.Item name="FamilyHistory">
          <Checkbox
            checked={Data.FamilyHistory}
            onChange={(e) => {
              setData({ ...Data, FamilyHistory: e.target.checked });
            }}
          >
            Terrain familial
          </Checkbox>
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
          <Button type="primary" htmlType="submit">
            {" "}
            Ajouter
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AllergyModal;







   

