import { createApp } from 'vue'
import NousChat from './components/NousChat.vue'
import style from './style.css?inline'

const Nous = {
    init(config) {
        // Inject style
        if (!document.getElementById('nous-chat-style')) {
            const styleElement = document.createElement('style')
            styleElement.id = 'nous-chat-style'
            styleElement.textContent = style
            document.head.appendChild(styleElement)
        }

        // Create and mount Vue app
        const container = document.createElement('div')
        document.body.appendChild(container)
        const app = createApp(NousChat, config)
        app.mount(container)
    }
}

// Explicitly set Nous on window
if (typeof window !== 'undefined') {
    window.Nous = Nous
}

export default Nous
