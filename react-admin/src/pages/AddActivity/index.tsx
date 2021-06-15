import { useState } from 'react'
import {
  StepsForm,
  ProFormText,
  // ProFormDatePicker,
  // ProFormSelect,
  // ProFormTextArea,
  // ProFormCheckbox,
  ProFormSwitch,
  ProFormDateTimeRangePicker,
  ProFormDigit,
  ProFormUploadButton
} from '@ant-design/pro-form'
import { PageContainer } from '@ant-design/pro-layout'
import { Card, message, Button, Modal, Alert } from 'antd'
import { useIntl, history } from 'umi'
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'
import './index.less'

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, time)
  })
}

export default () => {
  // 设置全球化
  const intl = useIntl()

  // 设置编辑器初始内容
  const [editorState, setEditorState] = useState(BraftEditor.createEditorState(null))
  // 设置编辑器生成的初始html
  const [outputHTML, setOutputHTML] = useState(null)
  // 编辑内容触发
  const handleChange = (editorState: any): void => {
    setEditorState(editorState)
    setOutputHTML(editorState.toHTML())
    console.log(outputHTML) // 用于发送给前端展示
  }

  // 取消返回活动列表功能模块：
  // 设置弹窗初始化
  const [isModalVisible, setIsModalVisible] = useState(false)
  // 点击取消按键打开弹窗
  const showModal = () => {
    setIsModalVisible(true)
  }
  // 点击弹窗中的确认返回活动列表
  const handleOk = () => {
    setIsModalVisible(false)
    history.push('/activityList')
  }
  // 点击弹窗中的取消关闭弹窗
  const handleCancel = () => {
    setIsModalVisible(false)
  }


  return (
    <PageContainer>
      <Card>
        <StepsForm<{
          name: string
        }>
          onFinish={async (values) => {
            const submitData = {
              ...values,
              outputHTML
            }
            console.log(submitData)
            await waitTime(1000)
            message.success('提交成功')
          }}
          formProps={{
            validateMessages: {
              required: '此项为必填项',
            },
          }}
          submitter={{
            render: (props) => {
              if (props.step === 0) {
                return (
                  <Button type="primary" onClick={() => props.onSubmit?.()}>
                    下一步
                  </Button>
                )
              }
  
              if (props.step === 1) {
                return [
                  <Button key="pre" onClick={() => props.onPre?.()}>
                    上一步
                  </Button>,
                  <Button type="primary" key="goToTree" onClick={() => props.onSubmit?.()}>
                    下一步
                  </Button>,
                ]
              }
  
              return [
                <Button key="gotoTwo" onClick={() => props.onPre?.()}>
                  上一步
                </Button>,
                <Button key="backtoList" style={{ marginLeft: '20px' }} onClick={showModal}>
                  取消
                </Button>,
                <Button type="primary" key="goToTree" onClick={() => props.onSubmit?.()}>
                  提交
                </Button>,
              ]
            },
          }}
        >
          {/* 基础设置 */}
          <StepsForm.StepForm<{
            name: string
          }>
            name="base"
            title="基础设置"
            onFinish={async ({ name }) => {
              console.log(name)
              await waitTime(100)
              return true
            }}
          >
            <ProFormText
              name="name"
              label="活动名称"
              width="xl"
              placeholder="请输入20字以内的活动名称"
              rules={[{ required: true }]}
            />
            <ProFormDateTimeRangePicker
              name="dateTime"
              label="活动起始时间"
              width="xl"
              rules={[{ required: true }]}
            />
            <ProFormSwitch
              name="status"
              label="活动是否开启"
              fieldProps={{
                onChange: val => console.log(val)
              }}
              rules={[{ required: true }]}
            />
            <ProFormDigit
              name="price"
              label="购卡金额"
              width="xl"
              tooltip="单位：元，保留2位小数，例：199.00"
              fieldProps={{ precision: 2 }}
              placeholder="请输入购卡金额"
              rules={[{ required: true }]}
            />
          </StepsForm.StepForm>

          {/* 内容设置 */}
          <StepsForm.StepForm
            name="content"
            title="内容设置"
            onFinish={async () => {
              await waitTime(100)
              return true
            }}
          >
            <ProFormUploadButton
              name="banner"
              label="首页 Banner"
              max={1}
              fieldProps={{
                name: 'banner',
                listType: 'picture-card',
              }}
              action="/upload.do"
              extra="宽：750px；高：1200px"
              rules={[{ required: true }]}
            />
            <Card
              title="活动说明"
              style={{ width: '100%', marginBottom: '20px' }}
            >
              <BraftEditor
                className="my-editor"
                value={editorState}
                onChange={handleChange}
                placeholder="请输入活动说明"
              />
              {/* <div className="code">
                <p>源码</p>
                { outputHTML }
              </div> */}
            </Card>
          </StepsForm.StepForm>

          {/* 分享设置 */}
          <StepsForm.StepForm name="share" title="分享设置">
            <ProFormUploadButton
              name="shareImg"
              label="分享缩略图"
              max={1}
              fieldProps={{
                name: 'shareImg',
                listType: 'picture-card',
              }}
              action="/upload.do"
              extra="宽：750px；高：1200px"
              rules={[{ required: true }]}
            />
            <ProFormText
              name="shareTitle"
              label="分享标题"
              width="xl"
              placeholder="请输入20字以内的分享标题"
              rules={[{ required: true }]}
            />
            <ProFormText
              name="shareDesc"
              label="分享描述"
              width="xl"
              placeholder="请输入20字以内的分享描述"
              rules={[{ required: true }]}
            />
            <ProFormUploadButton
              name="sharePoster"
              label="分享海报图"
              max={1}
              fieldProps={{
                name: 'sharePoster',
                listType: 'picture-card',
              }}
              action="/upload.do"
              extra="宽：750px；高：1200px"
              rules={[{ required: true }]}
            />
            <Modal title="返回活动列表" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
              <Alert
                message={intl.formatMessage({
                  id: 'pages.addActivity.alertMessage',
                  defaultMessage: '返回后填写的数据将被清除',
                })}
                type="warning"
                showIcon
                banner
                style={{
                  margin: -12,
                  marginBottom: 24,
                }}
              />
              <p>是否清除数据，并返回活动列表？</p>
            </Modal>
          </StepsForm.StepForm>
        </StepsForm>
      </Card>
    </PageContainer>
  )
}