import { useState, useEffect } from 'react';
import { Table, Pagination, Spin, Select, Button, Popconfirm, message, Modal, Form, Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import axios from 'axios';
import api from '../../../utils/api';
import { render } from 'react-dom';
import FormEdit from './formEdit';
import { isString } from 'antd/es/button';


const PaginatedTable = () => {

    const [options, setOptions] = useState([])
    const [teacherId, setTeacherId] = useState(0)
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [editingItem, setEditingItem] = useState(null);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [dataUpdate, setDataUpdate] = useState({
        student_id: '',
        name: '',
        teacher_id: '',
    })
    const [form] = Form.useForm();


    /**
     * For Select
     */


    const handleChange = (value) => {
        setTeacherId(value)
        fetchData(currentPage, pageSize, teacherId);
    }


    useEffect(() => {
        axios.request({
            url: api + "/teachers",
            method: 'GET'
        }).then(res => {

            let data = res.data.data

            setOptions(data)
        })
    })

    /**
     * For Table
     */
    useEffect(() => {
        fetchData(currentPage, pageSize, teacherId);
    }, [currentPage, pageSize, teacherId]);

    const fetchData = (page, pageSize, teacher_id) => {
        setLoading(true);
        axios.get(api + `/students?size=${pageSize}&page=${page}&teacher_id=${teacher_id}`)
            .then(response => {
                setData(response.data.data.data);
                setTotal(response.data.data.totalData);
                setLoading(false);
            })
            .catch(error => {
                setLoading(false);
            });
    };

    const handleTableChange = (pagination, pageSize) => {
        setCurrentPage(pagination)
        setPageSize(pageSize)
    };

    /**
     * For Handle Edit & Update
     */
    const handleEdit = (record) => {
        setEditingItem({ ...record })
        form.setFieldsValue(record);
        form.setFieldsValue({ student_id: record.id });
        setEditModalVisible(true);
    };



    const handleCancel = () => {
        form.resetFields()
        setEditingItem(null)
        setEditModalVisible(false);
    };

    const handleOk = () => {
        form.validateFields()
            .then(values => {
                setDataUpdate({
                    student_id: values.student_id,
                    name: values.name,
                    teacher_id: values.teacher_id,
                });

                axios.patch(api + `/student??student_id=${dataUpdate.id}`, dataUpdate).then(res => {
                    let data = res.data
                    if (data.status === true) {
                        message.success(data.messages)

                        fetchData(currentPage, pageSize, teacherId)
                        form.resetFields()
                        setEditModalVisible(false);
                    } else {
                        message.error(data.data)
                    }
                })
            }).catch(err => {
                message.error("Pleace Check Your Field")
            });
    };

    /**
     * For Delete
     *  For Handle Delete Action
     */
    const handleDelete = (id) => {
        axios.delete(api + `/student?student_id=${id}`)
            .then(() => {
                message.success('Item deleted successfully');
                fetchData(currentPage, pageSize, teacherId);
            })
            .catch(error => {
                message.error('Failed to delete item');
            });
    };


    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Teacher Name',
            dataIndex: 'teacher_name',
            key: 'teacher_name',
        },
        {
            key: 'action',
            title: 'Action',
            render: (_, record) => (
                <span>
                    <Button type="link" onClick={() => handleEdit(record)}>
                        Edit
                    </Button>
                    <Popconfirm
                        title="Are you sure to delete this item?"
                        onConfirm={() => handleDelete(record.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="link" danger>
                            Delete
                        </Button>
                    </Popconfirm>
                </span>
            ),
        }
    ];
    return (
        <>
            <div>
                <div className="pb-5">
                    <label htmlFor="teacher_id">Select Teacher</label>
                    <Select
                        className='ml-3'
                        placeholder="Please Select Teacher"
                        style={{ width: '20%' }}
                        allowClear={true}
                        onChange={handleChange}
                    >
                        {options.map(option => (
                            <Select.Option key={option.id} value={option.id}>
                                {option.name}
                            </Select.Option>
                        ))}
                    </Select>
                </div>
                {loading ? (
                    <Spin className='text-center' tip="Loading..." />
                ) : (
                    <>

                        <Table
                            dataSource={data}
                            columns={columns}
                            pagination={false}
                            onChange={handleTableChange}
                            rowKey="id"
                        />
                        <Pagination
                            current={currentPage}
                            showSizeChanger={true}
                            pageSizeOptions={['5', '10', '15', '20']}
                            pageSize={pageSize}
                            total={total}
                            showTotal={(total) => `Total ${total} items`}
                            onChange={(page, pageSize) => handleTableChange(page, pageSize)}
                            style={{ marginTop: 16 }}
                        />
                    </>
                )}

                <Form
                    id='form'
                    layout="vertical"
                    name="editData"
                    style={{
                        maxWidth: 500,
                    }}
                    clearOnDestroy={true}
                    form={form}
                >
                    <Modal title="Edit Data Student"
                        open={editModalVisible}
                        okText="Create" onOk={handleOk}
                        onCancel={handleCancel}>
                        {/* <FormEdit /> */}
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
                                        <Select.Option key={option.id} defaultValue={editingItem?.teacher_id} value={option.id}>
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
                            <Form.Item
                                label="ID"
                                name="student_id"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your ID!',
                                    },
                                ]}
                            >
                                <Input prefix={<UserOutlined />} placeholder="ID" />
                            </Form.Item>
                        </div>
                    </Modal>
                </Form>

            </div>
        </>
    );
};

export default PaginatedTable;