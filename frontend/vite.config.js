// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// ⚠️ 將 base 設為你的 GitHub repo 名稱（有 /）
export default defineConfig({
  base: '/KANG-XUAN_PersonalWebsite/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
