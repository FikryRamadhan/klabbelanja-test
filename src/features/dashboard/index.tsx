import { Breadcrumb, Button, Card, Form, message, Modal, Popconfirm, Table, Typography } from "antd"
import { Link } from "react-router-dom"
import { useState } from "react";
import FormCreate from "./component/formCreate";
import axios from "axios";
import api from "../../utils/api";
import { useForm } from "antd/es/form/Form";
import openNotification from "../../common/notification";
import PaginatedTable from "./component/table";

const FeatureDashboard = () => {
    const [dataCreate, setDataCreate] = useState({
        teacher_id: '',
        name: '',
    })
    const [form] = Form.useForm()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        form.validateFields()
            .then(values => {
                setDataCreate({
                    teacher_id: values.teacher_id,
                    name: values.name
                })
            }).catch(err => {
                message.error("Pleace Check Your Field")
            });
        
        axios.post(api + "/student", dataCreate).then(res => {  
            let data = res.data
            if (data.status === true) {
                message.success(data.messages)
                setIsModalOpen(false)
                
                setInterval(() => {
                    window.location.reload()
                },1000)
            } else {
                message.error(data.data)
            }
        })

        // setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div className="flex justify-center ml-5">
                <Breadcrumb
                    className="text-slate-950"
                    items={[
                        {
                            title: 'Home',
                        },
                        {
                            title: <Link to={"/dashbaord"}>Data Siswa</Link>,
                        }
                    ]}
                />
            </div>
            <div className="w-full pt-5">
                <div className="flex items-center justify-center">
                    <Card
                        title="Data Siswa"
                        extra={<Button type="primary" onClick={showModal}>
                            Create
                        </Button>}
                        style={{
                            width: 1000,
                        }}
                    >
                        <PaginatedTable />
                    </Card>
                </div>
            </div>
            <Form
                name="createData"
                initialValues={{
                    remember: true,
                }}
                style={{
                    maxWidth: 500,
                }}
                form={form}
            >
                <Modal title="Create Data Student" open={isModalOpen} okText="Create" onOk={handleOk} onCancel={handleCancel}>
                    <FormCreate />
                </Modal>
            </Form>
        </>
    )
}

export default FeatureDashboard