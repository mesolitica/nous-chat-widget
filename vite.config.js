import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    plugins: [vue()],
    build: {
        lib: {
            entry: 'src/main.js',
            name: 'Nous',
            fileName: 'nous-chat',
            formats: ['iife']
        },
        rollupOptions: {
            output: {
                extend: true,
                entryFileNames: 'nous-chat.js',
                format: 'iife',
                name: 'Nous',
                globals: {
                    vue: 'Vue'
                }
            }
        }
    }
})