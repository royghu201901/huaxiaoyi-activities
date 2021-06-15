import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Space, Input, Button, Modal, message } from 'antd';
import { useIntl, FormattedMessage, history } from 'umi';
// import type { ProColumns, ActionType } from '@ant-design/pro-table';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { TableListItem } from './data';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import StoreContext from './components/StoreContext'
import StoreModalForm from './components/StoreModalForm'
import StoreTransfer from './components/StoreTransfer'

import './index.less'

const { Search } = Input

const onSearch = (value: string) => console.log(value)

const dataSource = [
  {
    key: 1,
    index: 1,
    storeId: 1347,
    storeName: '朝天门火锅',
    storeImg: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
  },
  {
    key: 2,
    index: 2,
    storeId: 1348,
    storeName: '小龙坎',
    storeImg: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
  },
  {
    key: 3,
    index: 3,
    storeId: 1349,
    storeName: '哥老官',
    storeImg: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
  },
  {
    key: 4,
    index: 4,
    storeId: 1350,
    storeName: '老大房',
    storeImg: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
  },
  {
    key: 5,
    index: 5,
    storeId: 1351,
    storeName: '顺旺基',
    storeImg: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
  },
]

export default (): React.ReactNode => {
  // 国际化
  const intl = useIntl();

  // 添加新商户弹窗
  const [modalVisible, setModalVisible] = useState<boolean>(false)

  // 设置弹窗时的rowKey
  const [rowKey, setRowKey] = useState<any>(null)

  // 设置已有商家弹窗
  const [storeModalVisible, setStoreModalVisible] = useState(false)

  // 列表设置
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '编号',
      dataIndex: 'index',
      key: 'index',
      align: 'center'
    },
    {
      title: '商家ID',
      dataIndex: 'storeId',
      key: 'storeId',
      align: 'center'
    },
    {
      title: '商家名称',
      dataIndex: 'storeName',
      key: 'storeName',
      align: 'center',
      copyable: true
    },
    {
      title: '商家缩略图',
      dataIndex: 'storeImg',
      key: 'storeImg',
      width: 200,
      valueType: 'image',
      align: 'center'
    },
    {
      title: <FormattedMessage id="pages.activityList.option" defaultMessage="操作" />,
      dataIndex: 'option',
      valueType: 'option',
      align: 'center',
      render: (_, record) => [
        <Button
          key="storeDetail"
          type="primary"
          onClick={() => {
            console.log(record)
            setRowKey(record.key)
            setModalVisible(true)
          }}
        >
          修改商家信息
        </Button>,
        <Button
          key="assistantList"
          onClick={() => {
            console.log(record)
            history.push(`/assistantList?id=${record.key}`)
          }}
        >
          <FormattedMessage id="pages.storeList.assistantList" defaultMessage="用户列表" />
        </Button>,
        <Button
          key="deleteStore"
          type="primary"
          danger
          onClick={() => {
            console.log(record)
            Modal.confirm({
              title: '提示',
              centered: true,
              icon: <ExclamationCircleOutlined />,
              content: `是否确定删除商家「${record.storeName}」的详情页`,
              okText: '删除',
              okType: 'danger',
              cancelText: '取消',
              onOk() {
                dataSource.map((val, index) => {
                  if (val.storeName === record.storeName) {
                    dataSource.splice(index, 1)
                  }
                })
                // console.log(dataSource) 
                message.success(`成功删除${record.storeName}`)
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

  return (
    <PageContainer>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Card>
          <span style={{ lineHeight: 2.25 }}>商家名称：</span>
          <Search
            placeholder="请输入商家名称"
            allowClear
            enterButton="搜索"
            onSearch={onSearch}
            style={{ width: 300 }}
          />
          <Button
            type="primary"
            style={{ float: 'right' }}
            onClick={() => {
              setRowKey(null) // 添加时重置rowKey
              setModalVisible(true)
            }}
          >
            添加新商家
          </Button>
          <Button
            type="primary"
            style={{ float: 'right', marginRight: '10px' }}
            onClick={() => {
              setStoreModalVisible(true)
            }}
          >
            添加已有商家
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

      {/* 新商家弹窗 */}
      <StoreContext.Provider value={{ modalVisible, setModalVisible, rowKey }}>
        <StoreModalForm />
      </StoreContext.Provider>

      {/* 已有商家弹窗 */}
      <Modal
        title="批量添加已有商户"
        width={700}
        visible={storeModalVisible}
        onOk={() => setStoreModalVisible(false)}
        onCancel={() => setStoreModalVisible(false)}
      >
        {/* 已有商家穿梭框 */}
        {/*
          //TODO 还是需要context建立上下文进行状态管理，在组件中获取接口数据
        */}
        <StoreTransfer />
      </Modal>
    </PageContainer>
  );
};
