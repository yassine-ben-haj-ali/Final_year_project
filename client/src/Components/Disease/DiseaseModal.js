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

const DiseaseModal = ({ getDiseases }) => {
  const { user, token } = useSelector((state) => state.auth);

  const [Data, setData] = useState({
    Speciality: "",
    Name: "",
    Genetic: false,
    DetectedIn: "",
    CuredIn: "",
    ChronicDisease: false,
    Notes: "",
  });

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        `http://localhost:8800/api/disease/${user._id}`,
        { ...Data },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getDiseases();
      setData({
        Speciality: "",
        Name: "",
        Genetic: false,
        DetectedIn: "",
        CuredIn: "",
        ChronicDisease: false,
        Notes: "",
      });
      form.resetFields();
      notification.success({ message: "Disease saved with success" });
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
            label="Sélectionner la spécialité médicale"
            name="Speciality"
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
                setData({ ...Data, Speciality: value });
              }}
              options={[
                {
                  value: "Cardiologie & Vasculaire (Cœur & Vaisseaux)",
                  label: "Cardiologie & Vasculaire (Cœur & Vaisseaux)",
                },
                {
                  value: "Chirurgie & médecine esthétique (Visage & corps)",
                  label: "Chirurgie & médecine esthétique (Visage & corps)",
                },
                {
                  value: "Dermatologie (Peau)",
                  label: "Dermatologie (Peau)",
                },
                {
                  value: "Endocrinologie & diabétologie (Diabète & autres)",
                  label: "Endocrinologie & diabétologie (Diabète & autres)",
                },
                {
                  value: "Gastro-entérologie (Appareil digestif)",
                  label: "Gastro-entérologie (Appareil digestif)",
                },
                {
                  value: "Gynécologie & Obstétrique",
                  label: "Gynécologie & Obstétrique",
                },
                {
                  value: "Hématologie (sang)",
                  label: "Hématologie (sang)",
                },
                {
                  value: "Hépatologie (foie)",
                  label: "Hépatologie (foie)",
                },
                {
                  value: "Médecine Dentaire (Dents)",
                  label: "Médecine Dentaire (Dents)",
                },
                {
                  value: "Médecine Générale",
                  label: "Médecine Générale",
                },
                {
                  value: "Neurologie (Cerveau et Nerfs)",
                  label: "Neurologie (Cerveau et Nerfs)",
                },
                {
                  value: "Néphrologie  (Reins)",
                  label: "Néphrologie  (Reins)",
                },
                {
                  value: "Ophtalmologie (Yeux)",
                  label: "Ophtalmologie (Yeux)",
                },
                {
                  value: "Orthopédie & Traumatologie (Os)",
                  label: "Orthopédie & Traumatologie (Os)",
                },
                {
                  value: "Oto-Rhino-Laryngologie (ORL) (Oreille nez gorge)",
                  label: "Oto-Rhino-Laryngologie (ORL) (Oreille nez gorge)",
                },
                {
                  value: "Pneumologie (Poumons)",
                  label: "Pneumologie (Poumons)",
                },
                {
                  value: "Psychiatrie (Trouble mentaux)",
                  label: "Psychiatrie (Trouble mentaux)",
                },
                {
                  value: "Pédiatrie (Enfant)",
                  label: "Pédiatrie (Enfant)",
                },
                {
                  value: "Rhumatologie (articulations)",
                  label: "Rhumatologie (articulations) ",
                },
                {
                  value: "Urologie (appareil urinaire)",
                  label: "Urologie (appareil urinaire)",
                },
                {
                  value: "Cancérologie (cancer)",
                  label: "Cancérologie (cancer)",
                },
                {
                  value: "Autre",
                  label: "Autre",
                },
              ]}
            />
          </Form.Item>
          <Form.Item
            label="Maladie"
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
              placeholder="Taper le nom du maladie"
              onChange={(e) => {
                setData({ ...Data, Name: e.target.value });
              }}
            />
          </Form.Item>
          <Form.Item name="Genetic">
            <Checkbox
              checked={Data.Genetic}
              onChange={(e) => {
                setData({ ...Data, Genetic: e.target.checked });
              }}
            >
              Antécédent familial
            </Checkbox>
          </Form.Item>
          <Form.Item name="ChronicDisease">
            <Checkbox
              checked={Data.ChronicDisease}
              onChange={(e) => {
                setData({ ...Data, ChronicDisease: e.target.checked });
              }}
            >
              Maladie longue durée
            </Checkbox>
          </Form.Item>
          <Form.Item
            label="Détectée en "
            name="DetectedIn"
            rules={[
              {
                required: false,
              },
              {
                type: "String",
                min: 3,
              },
            ]}
          >
            <DatePicker
              onChange={(date, dateString) => {
                setData({ ...Data, DetectedIn: dateString });
              }}
              picker="year"
            />
          </Form.Item>
          <Form.Item
            label="Guérie en "
            name="CuredIn"
            rules={[
              {
                required: false,
              },
              {
                type: "String",
                min: 3,
              },
            ]}
          >
            <DatePicker
              onChange={(date, dateString) => {
                setData({ ...Data, CuredIn: dateString });
              }}
              picker="year"
            />
          </Form.Item>

          <Form.Item label="ajouter un commentaire" name="Notes">
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
export default DiseaseModal;
