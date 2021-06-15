//TODO useContext父子组件传值
//* 父子组件不在同一个一个页面
//* 公共组件

import { createContext } from 'react'

const StoreContext = createContext({
  modalVisible: false,
  setModalVisible: (modalVisible: boolean) => {},
  rowKey: 1
})

export default StoreContext
