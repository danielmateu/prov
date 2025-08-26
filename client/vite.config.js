import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    server: {
        proxy: {
            '/api': {
                target: 'https://aswoshop.aswo.com',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '')
            },
            '/apicand': {
                target: 'https://api-products.candelsa.com/api',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/apicand/, '')
            }
        }
    }
})
