import { Modal, Form, Input, Select } from "antd"
import { useEffect, useState } from "react";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import axios from "axios";
import api from "../../../utils/api";
import { Option } from "antd/es/mentions";



const FormCreate = () => {
  const [options, setOptions] = useState([])

  useEffect(() => {
    axios.request({
      url: api + "/teachers",
      method: 'GET'
    }).then(res => {
      // console.log(res);

      let data = res.data.data

      setOptions(data)
    })
  })


  return (
    <>
      <div className="pt-5">

        <Form.Item
        label="Teacher"
          name="teacher_id"
          rules={[
            {
              required: true,
              message: 'Please Select your Teacher!',
            },
          ]}
        >
          <Select
            placeholder="Please Select Teacher"
            style={{ width: '100%' }}
            
            allowClear={true}
          >
            {options.map(option => (
              <Select.Option key={option.id} value={option.id}>
                {option.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: 'Please input your Name!',
            },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Name" />
        </Form.Item>

      </div>
    </>
  )
}

export default FormCreate