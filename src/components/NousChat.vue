<template>
    <div class="nous-chat" :style="widgetStyle">
        <div class="nous-chat__header" @click="toggleChat">
            {{ title }}
        </div>
        <div v-if="isOpen" class="nous-chat__body">
            <div class="nous-chat__messages">
                <div v-for="(message, index) in messages" :key="index" :class="['nous-chat__message', `nous-chat__message--${message.type}`]">
                    {{ message.text }}
                </div>
            </div>
            <div class="nous-chat__input-area">
                <input v-model="userInput" @keyup.enter="sendMessage" placeholder="Type a message..." class="nous-chat__input">
                <button @click="sendMessage" class="nous-chat__send-button">Send</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'NousChat',
    props: {
        webhookUrl: {
            type: String,
            required: true
        },
        color: {
            type: String,
            default: '#1076EE'
        },
        title: {
            type: String,
            default: 'Chat with us'
        },
        fontFamily: {
            type: String,
            default: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
        },
        firstMessage: {
            type: String,
            default: ''
        },
        initPayload: {
            type: String,
            default: 'SpecialInitPayLoadDoNotTouch'
        },
        zIndex: {
            type: String,
            default: '1000'
        }
    },
    data() {
        return {
            isOpen: false,
            messages: [],
            userInput: ''
        }
    },
    computed: {
        widgetStyle() {
            return {
                '--nous-chat-color': this.color,
                '--nous-chat-font-family': this.fontFamily,
                '--nous-chat-z-index': this.zIndex
            }
        }
    },

    mounted() {
        if (this.firstMessage) {
            this.messages.push({ type: 'bot', text: this.firstMessage })
        }
        this.sendInitialMessage()
    },

    methods: {
        toggleChat() {
            this.isOpen = !this.isOpen
        },

        async sendMessage() {
            if (!this.userInput.trim()) return

            this.messages.push({ type: 'user', text: this.userInput })
            const userMessage = this.userInput
            this.userInput = ''

            try {
                const response = await axios.post(this.webhookUrl, {
                    message: userMessage
                })
                if (response.data && response.data.length > 0) {
                    response.data.forEach(msg => {
                        this.messages.push({ type: 'bot', text: msg.text })
                    })
                }
            } catch (error) {
                console.error('Error sending message:', error)
                this.messages.push({ type: 'bot', text: 'Sorry, I encountered an error. Please try again.' })
            }
        },

        async sendInitialMessage() {
            try {
                const response = await axios.post(this.webhookUrl, {
                    message: this.initPayload
                })
                if (response.data && response.data.length > 0) {
                    response.data.forEach(msg => {
                        this.messages.push({ type: 'bot', text: msg.text })
                    })
                }
            } catch (error) {
                console.error('Error sending initial message:', error)
            }
        }
    }
}
</script>
