import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

/**
 * Vite 전체 설정
 *  ex) 경로 alias 설정, 빌드 옵션 등
 */
export default defineConfig(({ command }) => {
  const isBuild = command === 'build';

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    esbuild: isBuild ? {
      drop: ['console', 'debugger'],
    } : {}, // 개발 모드에서는 제거하지 않음
    server: {
      proxy: {
        '/api': {
          target: 'http://54.180.116.0',
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});



/**
 export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  },
  esbuild: {
    drop: ['console', 'debugger'],  //  console.* 제거해줌
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://54.180.116.0',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
 */