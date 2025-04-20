import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import autoImport from 'unplugin-auto-import/vite'
// https://vitejs.dev/config/
export default defineConfig(async (config) => {
  return {
    build: {
      // 开发阶段启用源码映射：https://uniapp.dcloud.net.cn/tutorial/migration-to-vue3.html#需主动开启-sourcemap
      sourcemap: process.env.NODE_ENV === 'development',
    },
    resolve: {
      alias: {
        '@': '/src',
      },
    },
    plugins: [
      uni(),
      autoImport({
        imports: ['vue', 'pinia'],
        dts: './src/auto-imports.d.ts',
        dirs: [
          'src/services',
          'src/store',
          'src/utils',
          'src/hooks',
          'src/types',
          'src/composables',
          'src/components',
        ],
      }),
    ],
  }
})
