<template>
    <div class="nous-chat" :style="widgetStyle">
        <div class="nous-chat__header" @click="toggleChat">
            {{ title }}
        </div>
        <div v-if="isOpen" class="nous-chat__body">
            <div class="nous-chat__messages">
                <div
                    v-for="(message, index) in messages"
                    :key="index"
                    :class="['nous-chat__message', `nous-chat__message--${message.type}`]">
                    {{ message.text }}
                </div>
            </div>
            <div class="nous-chat__input-area">
                <input
                    v-model="userInput"
                    @keyup.enter="sendMessage"
                    placeholder="Type a message..."
                    class="nous-chat__input"/>
                <button @click="sendMessage" class="nous-chat__send-button">Send</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

// Props
const props = defineProps({
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
})

// State variables
const isOpen = ref(false)
const messages = ref([])
const userInput = ref('')

// Computed property for widget styles
const widgetStyle = computed(() => ({
    '--nous-chat-color': props.color,
    '--nous-chat-font-family': props.fontFamily,
    '--nous-chat-z-index': props.zIndex
}))

// Functions
const toggleChat = () => {
    isOpen.value = !isOpen.value
}

const sendMessage = async () => {
    if (!userInput.value.trim()) return

    messages.value.push({ type: 'user', text: userInput.value })
    const userMessage = userInput.value
    userInput.value = ''

    try {
        const response = await axios.post(props.webhookUrl, {
            message: userMessage
        })
        if (response.data && response.data.length > 0) {
            response.data.forEach(msg => {
                messages.value.push({ type: 'bot', text: msg.text })
            })
        }
    } catch (error) {
        console.error('Error sending message:', error)
        messages.value.push({ type: 'bot', text: 'Sorry, I encountered an error. Please try again.' })
    }
}

const sendInitialMessage = async () => {
    try {
        const response = await axios.post(props.webhookUrl, {
            message: props.initPayload
        })
        if (response.data && response.data.length > 0) {
            response.data.forEach(msg => {
                messages.value.push({ type: 'bot', text: msg.text })
            })
        }
    } catch (error) {
        console.error('Error sending initial message:', error)
    }
}

// Lifecycle hook
onMounted(() => {
    if (props.firstMessage) {
        messages.value.push({ type: 'bot', text: props.firstMessage })
    }
    sendInitialMessage()
})
</script>
