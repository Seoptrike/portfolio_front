import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  esbuild: {
    // 개발 중 남긴 로그가 프로덕션 번들에 들어가지 않도록 제거 (개발 서버에서는 유지)
    drop: mode === 'production' ? ['console', 'debugger'] : [],
  },
  build: {
    rollupOptions: {
      output: {
        // 벤더 청크를 분리해 초기 로드와 캐시 효율을 개선.
        // 에디터는 묶지 않는다 — TinyMCE(자기소개서)와 Toast UI(경력기술서)는
        // 서로 다른 화면에서만 쓰이므로 각 지연 청크에 따라가는 편이 작다.
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          mui: ['@mui/material', '@mui/icons-material', '@mui/x-date-pickers'],
        },
      },
    },
  },
}))
