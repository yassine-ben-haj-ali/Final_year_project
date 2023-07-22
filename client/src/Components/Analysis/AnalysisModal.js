import React, { useRef, useState } from "react";
import { Form, Input, Space, notification, Button, DatePicker, Upload } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";

const { TextArea } = Input;

const AnalysisModal = ({ getAnalysis }) => {
  const { user, token } = useSelector((state) => state.auth);
  
  const [file, setFile] = useState();
  const formRef = useRef(null);

  const onFinish = async (values) => {
    try {
      const formData = new FormData();
      const indicatorsValues = formRef.current.getFieldsValue(["indicators"]);
      const indicatorsData = indicatorsValues.indicators?.map((indicator) => ({
        Indicator: indicator.indicator,
        Value: indicator.value,
      }));

      formData.append("file", file);
      Object.keys(values).forEach((key) => {
        const value = values[key];
        if (value !== undefined && value !== null && value !== "") {
          formData.append(key, value);
        }
      });

      const res = await axios.post(
        `http://localhost:8800/api/analysis/${user._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      getAnalysis();
      
      formRef.current.resetFields();
      setFile(null)
      notification.success({ message: "Analysis test saved successfully" });
    } catch (err) {
      notification.error({ message: "Something went wrong" });
    }
  };

  const [form] = Form.useForm();

  return (
    <div>
      <Form
        ref={formRef}
        style={{
          width: "100%",
        }}
        form={form}
        layout="vertical"
        autoComplete="off"
        onFinish={onFinish}
      >
        <Form.Item
          label="Nom de l'analyse"
          name="Name"
          rules={[
            {
              required: true,
              message: "Please enter the name of the analysis",
            },
            {
              type: "string",
              min: 3,
              message: "The name must be at least 3 characters long",
            },
          ]}
        >
          <Input
            placeholder="Taper le nom d'analyse"
            
          />
        </Form.Item>

        <Form.Item
          label="Date"
          name="Date"
          rules={[
            {
              required: true,
              message: "Please select the date",
            },
          ]}
        >
          <DatePicker/>
        </Form.Item>

        <Form.Item
          label="Result File"
          name="File"
      
        >
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

        <Form.Item
          label="ajouter un commentaire"
          name="Notes"
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
              min: 30,
            },
          ]}
        >
          <TextArea
            placeholder="ajouter un commentaire"
            
          />
        </Form.Item>

        <Form.List name="indicators">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{
                    display: "flex",
                    marginBottom: 8,
                  }}
                  align="baseline"
                >
                  <Form.Item
                    {...restField}
                    name={[name, "indicator"]}
                    rules={[
                      {
                        required: false,
                        message: "Missing indicator name",
                      },
                    ]}
                  >
                    <Input placeholder="Nom de l'indicateur" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "value"]}
                    rules={[
                      {
                        required: false,
                        message: "Missing value",
                      },
                    ]}
                  >
                    <Input placeholder="valeur" />
                  </Form.Item>
                  <div onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block>
                  Add field
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Ajouter
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AnalysisModal;