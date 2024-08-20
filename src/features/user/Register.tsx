// import React from "react";
import { useState } from "react";
import { Card, Input, Button, Form, message } from "antd";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import axios from "axios";
import api from "../../utils/api";
import openNotification from "../../common/notification";
import checkAuth from "../../app/auth";
import { Link } from "react-router-dom";

const FeatureRegister = () => {
    checkAuth()

    const [data, setData] = useState({
        phone: '',
        password: '',
    })
    const onFinish = (values) => {
        setData({
            ...data,
            ...values
        })

        try {
            axios
                .post(api + "/register", data)
                .then((response) => {
                    console.log(response);
                    
                    let data = response.data

                    if (data.status == false) {
                        message.error(data.messages)
                    } else if (data.status === true) {
                        message.success(data.messages);


                        localStorage.setItem("token", data.data.token)

                        setInterval(() => {
                            window.location.href = 'app/dashboard'
                        }, 2000)
                    }
                })
        } catch (error) {
            console.log(error);

            message.error('Gagal Saat Register')
        }
    }
    return (
        <>
            <div className="w-full h-screen flex justify-center max-h-full items-center bg-slate-800">
                <Card
                    className="text-center"
                    title="Register"
                    bordered={true}
                    style={{
                        width: 500,
                    }}
                >
                    <Form
                        name="login"
                        initialValues={{
                            remember: true,
                        }}
                        style={{
                            maxWidth: 500,
                        }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="phone"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Phone!',
                                },
                            ]}
                        >
                            <Input prefix={<UserOutlined />} placeholder="phone" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Password!',
                                },
                            ]}
                        >
                            <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
                        </Form.Item>

                        <Form.Item className="text-center">
                            <Button block type="primary" htmlType="submit">
                                Register
                            </Button>
                            or <Link to={"/login"} className="text-blue-500 items-center">Do You Have Ready Acount!</Link>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        </>
    )
}

export default FeatureRegister