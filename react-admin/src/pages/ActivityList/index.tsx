import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Space, Input, Button } from 'antd';
import { useIntl, FormattedMessage, history } from 'umi';
// import type { ProColumns, ActionType } from '@ant-design/pro-table';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { TableListItem } from './data.d';
// import styles from './index.less';

const { Search } = Input

const onSearch = (value: string) => console.log(value)

const columns: ProColumns<TableListItem>[] = [
  {
    title: '名称',
    dataIndex: 'title',
    key: 'title',
    align: 'center',
    copyable: true
  },
  {
    title: '活动时间',
    dataIndex: 'time',
    key: 'time',
    width: 200,
    align: 'center'
  },
  {
    title: '价格',
    dataIndex: 'price',
    valueType: 'money',
    key: 'price',
    align: 'center'
  },
  {
    title: '商家数量',
    dataIndex: 'store',
    key: 'store',
    align: 'center'
  },
  {
    title: '购卡用户数量',
    dataIndex: 'usersNum',
    key: 'usersNum',
    align: 'center'
  },
  {
    title: <FormattedMessage id="pages.activityList.titleStatus" defaultMessage="活动状态" />,
    dataIndex: 'status',
    hideInForm: true,
    align: 'center',
    valueEnum: {
      0: {
        text: (
          <FormattedMessage id="pages.activityList.nameStatus.default" defaultMessage="未开始" />
        ),
        status: 'Default',
      },
      1: {
        text: (
          <FormattedMessage id="pages.activityList.nameStatus.running" defaultMessage="运行中" />
        ),
        status: 'Processing',
      },
      2: {
        text: (
          <FormattedMessage id="pages.activityList.nameStatus.offline" defaultMessage="已结束" />
        ),
        status: 'Error',
      },
    },
  },
  {
    title: <FormattedMessage id="pages.activityList.option" defaultMessage="操作" />,
    dataIndex: 'option',
    valueType: 'option',
    align: 'center',
    render: (_, record) => [
      <Button
        key="activityDetail"
        size="small"
        type="primary"
        onClick={() => {
          console.log(record)
        }}
      >
        修改活动
      </Button>,
      <Button
        key="storeList"
        size="small"
        onClick={() => {
          console.log(record)
          history.push(`/storeList?id=${record.key}`)
          // 或者
          // history.push({
          //   pathname: '/storeList',
          //   query: {
          //     id: `${record.key}`,
          //   }
          // })
        }}
      >
        <FormattedMessage id="pages.activityList.storeList" defaultMessage="商家列表" />
      </Button>,
      <Button
        key="usersList"
        size="small"
        onClick={() => {
          console.log(record)
          history.push(`/usersList?id=${record.key}`)
        }}
      >
        <FormattedMessage id="pages.activityList.usersList" defaultMessage="用户列表" />
      </Button>,
    ],
  },
]

const dataSource = [
  {
    key: 1,
    title: '五一商家联盟卡',
    time: '2021-05-02 12:01:12 - 2021-05-30 12:01:12',
    price: '99.00',
    store: 47,
    usersNum: 205,
    status: 1
  },
  {
    key: 2,
    title: '五一商家联盟卡2',
    time: '2021-05-02 12:01:12 - 2021-05-30 12:01:12',
    price: '199.00',
    store: 47,
    usersNum: 205,
    status: 0
  },
  {
    key: 3,
    title: '五一商家联盟卡3',
    time: '2021-05-02 12:01:12 - 2021-05-30 12:01:12',
    price: '299.00',
    store: 47,
    usersNum: 205,
    status: 2
  },
]

export default (): React.ReactNode => {
  const intl = useIntl();
  return (
    <PageContainer>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Card>
          <span style={{ lineHeight: 2.25 }}>活动名称：</span>
          <Search
            placeholder="请输入活动名称"
            allowClear
            enterButton="搜索"
            onSearch={onSearch}
            style={{ width: 300 }}
          />
          <Button
            type="primary"
            style={{ float: 'right' }}
            onClick={() => {
              history.push('/addActivity')
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
    </PageContainer>
  );
};
