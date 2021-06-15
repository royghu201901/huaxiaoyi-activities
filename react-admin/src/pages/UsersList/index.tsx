import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Space, Input, Button, Modal } from 'antd';
import { useIntl, FormattedMessage } from 'umi';
// import type { ProColumns, ActionType } from '@ant-design/pro-table';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { TableListItem } from './data.d';
import { TagOutlined } from '@ant-design/icons';

import './index.less'

const { Search, TextArea } = Input

const onSearch = (value: string) => console.log(value)

const columns: ProColumns<TableListItem>[] = [
  {
    title: '用户ID',
    dataIndex: 'usersId',
    key: 'usersId',
    align: 'center'
  },
  {
    title: '用户姓名',
    dataIndex: 'usersName',
    key: 'usersName',
    align: 'center'
  },
  {
    title: '用户手机号',
    dataIndex: 'mobile',
    key: 'mobile',
    align: 'center'
  },
  {
    title: '购卡时间',
    dataIndex: 'time',
    key: 'time',
    width: '200px',
    align: 'center'
  },
  {
    title: '用户地址',
    dataIndex: 'address',
    key: 'address',
    align: 'center'
  },
  {
    title: '商家核销',
    dataIndex: 'storeName',
    key: 'storeName',
    align: 'center'
  },
  {
    title: '备注',
    dataIndex: 'usersNote',
    key: 'usersNote',
    hideInTable: true,
  },
  {
    title: <FormattedMessage id="pages.usrsList.status" defaultMessage="礼品发放状态" />,
    dataIndex: 'status',
    hideInForm: true,
    align: 'center',
    valueEnum: {
      0: {
        text: (
          <FormattedMessage id="pages.usrsList.nameStatus.default" defaultMessage="未发放" />
        ),
        status: 'Default',
      },
      1: {
        text: (
          <FormattedMessage id="pages.usrsList.nameStatus.sent" defaultMessage="已发放" />
        ),
        status: 'Success',
      },
    },
  },
  {
    title: <FormattedMessage id="pages.activityList.option" defaultMessage="操作" />,
    dataIndex: 'option',
    valueType: 'option',
    align: 'center',
    render: (_, record) => [
      (
        // 如果备注有内容 展示 修改备注按钮，否则展示 备注按钮
        <Button
          key="activityDetail"
          size="small"
          onClick={() => {
            // console.log(record)
            Modal.confirm({
              title: `${record.usersNote !== '' ? '修改备注' : '添加备注'}`,
              icon: <TagOutlined />,
              // content: MyTextArea(record.usersNote),
              content: 
                <TextArea
                  rows={4}
                  maxLength={100}
                  defaultValue={record.usersNote} // 此处不能用value，否则会定死不能修改
                  style={{ marginTop: '15px', marginLeft: '-15px' }}
                  placeholder='请输入100字以内的备注'
                  
                  onChange={
                    ({ target: { value } }) => console.log(value)  // 输出value
                  }
                />
              ,
              onOk() {

              }
            })
          }}
        >
          {record.usersNote !== '' ? '修改备注' : '备注'}
        </Button>
      ),
      (
        // 状态如果是 0 未发放 则展示按钮
        record.status === 0
        &&
        <Button
          key="changeStatus"
          // key={record.key}
          size="small"
          type="primary"
          onClick={() => {
            console.log(record)
          }}
        >
          确认发放
        </Button>
      ),
    ],
  },
]

const dataSource = [
  {
    key: 1,
    usersId: 1347,
    usersName: '张三',
    mobile: '13888888888',
    time: '2021-05-02 12:01:12',
    address: '杭州市江干区',
    storeName: '海底捞',
    status: 0,
    usersNote: ''
  },
  {
    key: 2,
    usersId: 1348,
    usersName: '张三',
    mobile: '13888888888',
    time: '2021-05-02 12:01:12',
    address: '杭州市江干区',
    storeName: '海底捞',
    status: 1,
    usersNote: '111'
  },
  {
    key: 3,
    usersId: 1349,
    usersName: '张三',
    mobile: '13888888888',
    time: '2021-05-02 12:01:12',
    address: '杭州市江干区',
    storeName: '海底捞',
    status: 1,
    usersNote: ''
  },
]

// const MyTextArea = (ctx?: string) => {
//   const [modalText, setModalText] = useState(ctx)
//   return (
//     <TextArea
//       rows={4}
//       defaultValue={modalText}
//       style={{ marginTop: '15px' }}
//       placeholder='请输入100字以内的备注'
//       // onChange={setModalText}
//     />
//   )
// }

export default (): React.ReactNode => {
  const intl = useIntl();

  return (
    <PageContainer>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Card>
          <span style={{ lineHeight: 2.25 }}>用户信息：</span>
          <Search
            placeholder="请输入用户姓名/ID/手机号码"
            allowClear
            enterButton="搜索"
            onSearch={onSearch}
            style={{ width: 300 }}
          />
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
