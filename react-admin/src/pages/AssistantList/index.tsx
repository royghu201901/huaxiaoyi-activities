import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Space, Input, Button, Modal, message, Form } from 'antd';
import { useIntl, FormattedMessage } from 'umi';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { TableListItem } from './data.d';
import { ExclamationCircleOutlined, EditOutlined } from '@ant-design/icons';

import './index.less'

const { Search } = Input

const onSearch = (value: string) => console.log(value)

const columns: ProColumns<TableListItem>[] = [
  {
    title: '店员姓名',
    dataIndex: 'name',
    key: 'name',
    align: 'center'
  },
  {
    title: '店员手机号码',
    dataIndex: 'mobile',
    key: 'mobile',
    align: 'center',
    copyable: true
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
    width: 200,
    align: 'center'
  },
  {
    title: '最后登录时间',
    dataIndex: 'updateTime',
    key: 'updateTime',
    width: 200,
    align: 'center'
  },
  {
    title: <FormattedMessage id="pages.activityList.option" defaultMessage="操作" />,
    dataIndex: 'option',
    valueType: 'option',
    align: 'center',
    render: (_, record) => [
      <Button
        key="editPassword"
        type="primary"
        onClick={() => {
          // console.log(record)
          Modal.confirm({
            title: '修改密码',
            icon: <EditOutlined />,
            content: 
              <Form>
                <Form.Item label="店员姓名">{record.name}</Form.Item>
                <Form.Item label="登录手机号码">{record.mobile}</Form.Item>
                <Form.Item label="修改密码">
                  <Input placeholder="不填则设置为默认" />
                </Form.Item>
                <Form.Item label="确认密码">
                  <Input placeholder="不填则设置为默认" />
                </Form.Item>
              </Form>
            ,
            onOk() {
              message.success('成功设置密码')
              // 此处向数据库发送put请求
            },
            onCancel() {
              message.info('取消修改')
            }
          })
        }}
      >
        修改密码
      </Button>,
      <Button
        key="deleteAssistant"
        type="primary"
        danger
        onClick={() => {
          // console.log(record)
          Modal.confirm({
            title: '提示',
            centered: true,
            icon: <ExclamationCircleOutlined />,
            content: `是否确定删除该店员「${record.name}」`,
            okText: '删除',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
              dataSource.map((val, index) => {
                if (val.name === record.name) {
                  dataSource.splice(index, 1)
                }
              })
              // console.log(dataSource) 
              message.success(`成功删除${record.name}`)
              // 此处向数据库发送post请求
            },
            onCancel() {
              message.info('取消删除')
            },
          });
        }}
      >
        删除
      </Button>,
    ],
  },
]

const dataSource = [
  {
    key: 1,
    name: '张三',
    mobile: '13888888881',
    createTime: '2021-05-02 12:01:12',
    updateTime: '2021-05-30 12:01:12',
    password: '123456'
  },
  {
    key: 2,
    name: '李四',
    mobile: '13888888882',
    createTime: '2021-05-02 12:01:12',
    updateTime: '2021-05-30 12:01:12',
    password: '123456'
  },
  {
    key: 3,
    name: '王五',
    mobile: '13888888883',
    createTime: '2021-05-02 12:01:12',
    updateTime: '2021-05-30 12:01:12',
    password: '123456'
  },
  {
    key: 4,
    name: '吴六',
    mobile: '13888888884',
    createTime: '2021-05-02 12:01:12',
    updateTime: '2021-05-30 12:01:12',
    password: '123456'
  },
]

export default (): React.ReactNode => {
  const intl = useIntl();

  // 添加店员弹窗
  const [modalVisible, setModalVisible] = useState(false)
  // 确认添加店员
  const handleOk = () => {
    message.success('成功添加店员')
    // 此处向数据库发送post请求
    setModalVisible(false);
  }
  // 取消添加店员
  const handleCancel = () => {
    setModalVisible(false);
  }

  return (
    <PageContainer>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Card>
          <span style={{ lineHeight: 2.25 }}>店员信息：</span>
          <Search
            placeholder="请输入店员姓名/手机号码"
            allowClear
            enterButton="搜索"
            onSearch={onSearch}
            style={{ width: 300 }}
          />
          <Button
            type="primary"
            style={{ float: 'right' }}
            onClick={() => {
              setModalVisible(true)
            }}
          >
            添加
          </Button>
        </Card>

        <Card>
          <ProTable<TableListItem>
            headerTitle={intl.formatMessage({
              id: 'pages.searchTable.title',
              defaultMessage: '查询表格',
            })}
            rowKey="key"
            columns={columns}
            dataSource={dataSource}
            toolBarRender={false}
            search={false}
            pagination={
              {
                pageSize: 10,
                current: 1,
              }
            }
          />
        </Card>
      </Space>

      {/* 添加弹窗 */}
      <Modal
        title="添加店员"
        visible={modalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose
        maskClosable={false}
      >
        <Form>
          <Form.Item label="店员姓名">
            <Input
              placeholder="请输入店员姓名" 
              allowClear
            />
          </Form.Item>
          <Form.Item label="手机号码">
            <Input
              placeholder="请输入店员手机号码" 
              allowClear
            />
          </Form.Item>
          <Form.Item label="登录密码">
            <Input
              placeholder="不填则设置为默认" 
              allowClear
            />
          </Form.Item>
        </Form>
      </Modal>
    </PageContainer>
  );
};
