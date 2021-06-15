import { useContext, useState, useRef } from 'react' // 利用context父子组件传值
import StoreContext from './StoreContext'

import { message, Card, Button, Tooltip, Modal } from 'antd'
// import { message, Card, Button, Tooltip } from 'antd'
import type { FormInstance } from 'antd'
import {
  ModalForm,
  ProFormText,
  ProFormUploadButton,
} from '@ant-design/pro-form'
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'
import './StoreModalForm.less'

const StoreModalForm = () => {
  // 利用上下文传参
  const { modalVisible, setModalVisible, rowKey } = useContext(StoreContext)

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
  // 通过formRef重置，但是富文本需要单独初始化
  const formRef = useRef<FormInstance>()

  // 根据rowKey来发起请求，添加时不传，修改时传
  console.log(rowKey)

  // 重置弹窗初始化
  const [resetModalVisible, setResetModalVisible] = useState(false)
  // 重置弹窗
  const resetForm = (props: any) => {
    Modal.confirm({
      title: '是否确定重置表单？',
      content: '重置后表单信息将丢失！',
      onOk() {
        props.reset();
        setEditorState(BraftEditor.createEditorState(null)) // 单独初始化富文本
        setOutputHTML(null)
        message.success('表单已重置')
      },
    });
  }

  return (
    <>
      <ModalForm
        title="添加商户"
        width={'45%'}
        formRef={formRef}
        visible={modalVisible}
        onFinish={async (values) => {
          message.success(rowKey ? '修改商户成功' : '新增商户成功')
          console.log(values)
          return true
        }}
        onVisibleChange={setModalVisible}
        submitter={{
          render: (props, defaultDoms) => {
            // 此处的defaultDoms就是默认的取消和确认按钮
            // console.log(defaultDoms) 
            return [
              ...defaultDoms,
              <Tooltip
                key="reset-tooltip"
                placement="topRight"
                title="重置后表单信息将丢失!"
                color="#fd4f54"
              >
                <Button
                  key="extra-reset"
                  type="primary"
                  danger
                  onClick={() => {
                    //! 此处直接使用弹窗嵌套会使背景页面滚动条消失
                    // Modal.confirm({
                    //   title: '是否确定重置表单？',
                    //   content: '重置后表单信息将丢失！',
                    //   onOk() {
                    //     props.reset();
                    //     setEditorState(BraftEditor.createEditorState(null)) // 单独初始化富文本
                    //     setOutputHTML(null)
                    //   }
                    // })

                    // 声明后调用
                    if (resetModalVisible) {
                      resetForm(props)
                    } else {
                      setResetModalVisible(true)
                      resetForm(props)
                    }
                  }}
                >
                  重置
                </Button>
              </Tooltip>,
            ];
          },
        }}
      >
        <ProFormUploadButton
          name="introImg"
          label="首页缩略图"
          max={1}
          fieldProps={{
            name: 'introImg',
            listType: 'picture-card',
          }}
          action="/upload.do"
          extra="宽：750px；高：1200px"
        />
        <ProFormUploadButton
          name="tag"
          label="设置标签"
          max={1}
          fieldProps={{
            name: 'bantagner',
            listType: 'picture-card',
          }}
          action="/upload.do"
        />
        <ProFormUploadButton
          name="banner"
          label="Banner 图"
          max={1}
          fieldProps={{
            name: 'banner',
            listType: 'picture-card',
          }}
          action="/upload.do"
          extra="宽：750px；高：1200px"
        />
        <ProFormText
          name="storeName"
          label="商家名称"
          width="xl"
          placeholder="请输入20字以内的商家标题"
        />
        {/* <ProFormTextArea
          name="desc"
          label="商品描述"
          width="xl"
        /> */}
        <Card
          title="商品详情"
          style={{ width: '100%' }}
        >
          <BraftEditor
            className="my-editor"
            value={editorState}
            onChange={handleChange}
            placeholder="请输入商品详情"
          />
        </Card>
      </ModalForm>
    </>
  )
}

export default StoreModalForm