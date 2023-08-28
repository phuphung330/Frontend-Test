import { Table, message, Button, Form, Input } from 'antd';
import moment from 'moment';
import { data } from './data';
import { useState } from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'

interface data {
  id: string;
  name: string;
  balance: number;
  email: string;
  registerAt: Date;
  active: boolean;
  key: string,
  action: () => JSX.Element;
}

const MyTable = () => {
  const [dataSource, setDataSource] = useState<data[]>(data)
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    const newKey = [...newSelectedRowKeys];
    setSelectedRowKeys(newKey);
  };
  const [editingRow, setEditingRow] = useState('');
  const hasSelected = selectedRowKeys.length > 0;
  const [form] = Form.useForm();
  const isEditing = (record: data) => record.key === editingRow;

  interface TColumn {
    title: string;
    dataIndex: keyof data;
    key: string;
    render?: (text: string, record: data) => JSX.Element;
  }

  const columns: TColumn[] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => {
        if (editingRow === record.key) {
          return <Form.Item
            className='mb-0'
            name='name'
            rules={[{
              required: true,
              message: "Please enter your name"
            }]}>
            <Input />
          </Form.Item>
        } else {
          return <span className='font-medium text-gray-500'>{text}</span>
        }
      }
    },
    {
      title: 'Balance ($)',
      dataIndex: 'balance',
      key: 'balance',
      render: (text, record) => {
        if (editingRow === record.key) {
          return <Form.Item className='mb-0'
            name='balance'
            rules={[{
              required: true,
              message: 'Please enter your balance'
            }]}>
            <Input />
          </Form.Item>
        } else {
          return <span className='font-medium text-gray-500'>{`$${text.toLocaleString()}`}</span>
        }
      }
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (text, record) => {
        if (editingRow === record.key) {
          return <Form.Item
            className='mb-0'
            name="email"
            rules={[{
              required: true,
              message: 'Please enter your email'
            }]}>
            <Input />
          </Form.Item>
        } else {
          return <a className='font-medium text-gray-500' href={`mailto:${text}`}>{text}</a>
        }
      }
    },
    {
      title: 'Registration',
      dataIndex: 'registerAt',
      key: 'registerAt',
      render: (text) => (
        <span className='font-medium text-gray-500' title={moment(text).format('YYYY-MM-DD HH:mm:ss')}>
          {moment(text).format('YYYY-MM-DD')}
        </span>
      ),
    },
    {
      title: 'STATUS',
      dataIndex: 'active',
      key: 'active',
      render: () => (<span className='rounded-full border-[2px] p-1 font-medium text-gray-500 border-gray-400'>Status</span>)
    },
    {
      title: 'ACTION',
      key: 'action',
      dataIndex: "action",
      render: (_, record: data) => {
        const editable = isEditing(record)
        return (
          <>
            <EditOutlined onClick={() => {
              setEditingRow(record.key.toString());
              form.setFieldsValue({
                name: record.name,
                balance: record.balance,
                email: record.email,
              })

            }} className='text-2xl mr-2 text-gray-500' />
            <DeleteOutlined className='text-2xl text-gray-500' onClick={() => handleDelete(record)} />
            {editable ? <Button className='ml-2' type='primary' htmlType='submit'>Save</Button> : ""}
          </>
        )
      }
    },
  ];

  const handleDelete = (record: data) => {
    setDataSource((prevData) => prevData.filter((New) => New.id !== record.id));
    message.success('Deleted User Success!')
    setSelectedRowKeys([])
  }
  const handleDeleteAll = () => {
    setDataSource((prevData) => prevData.filter((New) => !selectedRowKeys.includes(New.id)));
    message.success(`Deleted ${selectedRowKeys.length} Users Success!`)
    setSelectedRowKeys([])
  }

  const pagination = {
    pageSize: 10,
    total: dataSource.length,
    showTotal: (total: number) => <div className='absolute left-0 font-semibold'>{`${total} results`}</div>,
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const onFinish = (values: data) => {
    const updatedDataSource = [...dataSource];
    updatedDataSource.splice(parseInt(editingRow), 1, { ...values, key: editingRow })
    setDataSource(updatedDataSource);
    setEditingRow('')
    message.success('Edited User Information Success!')

  }
  return (<div className=' px-5'>
    <Form form={form} onFinish={onFinish}>
      <Table rowSelection={rowSelection}
        columns={columns} dataSource={dataSource} pagination={pagination} />
    </Form>
    <span className='flex text-sm font-semibold  mt-[-20px]'>{hasSelected ? <div>
      <Button onClick={handleDeleteAll} className='mr-3' danger type='primary'>Delete All </Button>
      Selected {selectedRowKeys.length} Users
    </div>
      : ""}
    </span>
  </div>)
}
export default MyTable;
