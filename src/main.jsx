// 引入Tailwind CSS样式文件
import './index.css'
// 引入React核心模块
import { StrictMode } from 'react'
// 引入React DOM渲染模块
import { createRoot } from 'react-dom/client'
// 引入根组件App
import App from './App'

// 渲染根组件到页面
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)