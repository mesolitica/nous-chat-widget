import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

function wrapIIFE() {
    return {
        name: 'wrap-iife',
        generateBundle(options, bundle) {
            const fileName = 'nous-chat.js'
            const file = bundle[fileName]
        if (file) {
            file.code = `(function(global){
    var process = { env: { NODE_ENV: 'production' } };
    ${file.code}
                global.Nous = Nous;
            })(typeof window !== 'undefined' ? window : this);`;
        }   
        }
    }
}

export default defineConfig({
    plugins: [vue(), wrapIIFE()],
    build: {
        lib: {
            entry: 'src/main.js',
            name: 'Nous',
            fileName: () => 'nous-chat.js',
            formats: ['iife']
        },
        rollupOptions: {
            external: [], // Empty array means no external dependencies
            output: {
                globals: {} // Empty object as we're not using any globals
            }
        },
        cssCodeSplit: false,
    },
    define: {
        'process.env.NODE_ENV': JSON.stringify('production')
    },
    server: {
        open: './index.html'
    }
})