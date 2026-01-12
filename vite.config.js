import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from "path";
// https://vite.dev/config/
export default defineConfig({
    plugins: [vue()],
    css: {
        preprocessorOptions: {
            less: {
                additionalData: '@import "@/assets/less.less";',
                javascriptEnabled: true
            }
        }
    },
    resolve: {
        alias: {
            // '@': fileURLToPath(new URL('./src', import.meta.url))
            "@": resolve(__dirname, "./src")
        }
    },
    server: {
        port: 3000,
        open: true // 自动打开浏览器
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    'vue-vendor': ['vue', 'vue-router', 'pinia']
                }
            }
        }
    }
});
