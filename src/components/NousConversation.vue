<template>
    <div class="ns-flex ns-flex-col ns-h-full">
        <!-- header -->
        <div class="ns-flex ns-items-center ns-h-14 ns-w-full ns-px-5" :style="{ backgroundColor: 'var(--nous-chat-color)' }">
            <!-- back button -->
            <a href="#" role="button" @click.prevent="$emit('goBackHome')">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" class="ns-cursor-pointer ns-mr-3">
                    <g id="tabler-icon-arrow-left__tabler-icon-arrow-left">
                        <path id="tabler-icon-arrow-left__Vector" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M5 12l6 6m-6-6 6-6"/>
                    </g>
                </svg>
            </a>

            <!-- logo -->
            <div class="ns-w-8 ns-h-8 ns-rounded-full ns-bg-white ns-flex ns-items-center ns-justify-center ns-mr-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24">
                    <g id="logo-86__logo-86" clip-path="url(#logo-86__clip0_1212_3644)">
                        <path id="logo-86__Vector" fill="#007DFC" fill-rule="evenodd" d="M15.333 7.011A6 6 0 0 0 12 6V0A12 12 0 1 1 0 12h6a6 6 0 1 0 9.333-4.989Z" clip-rule="evenodd"/>
                        <path id="logo-86__Vector_2" fill="#007DFC" fill-rule="evenodd" d="M6 0a6 6 0 0 1-6 6v6A12.001 12.001 0 0 0 12 0H6Z" clip-rule="evenodd"/>
                    </g>
                    <defs>
                        <clipPath id="logo-86__clip0_1212_3644">
                        <path fill="#fff" d="M0 0h24v24H0z"/>
                        </clipPath>
                    </defs>
                </svg>
            </div>

            <!-- title or bot name -->
            <h1 class="ns-text-white ns-font-semibold ns-ml-2">{{ props.title }}</h1>
        </div>

        <!-- body -->
        <!-- chat messages container -->
        <div class="ns-flex-1 ns-overflow-y-auto ns-p-4 ns-relative no-scrollbar" ref="chatContainer">
            <template v-for="(message, index) in messages" :key="index">
                <!-- chat system bubble -->
                <div v-if="message.type === 'bot'" class="ns-flex ns-items-end ns-mb-4">
                    <!-- avatar -->
                    <div class="ns-w-8 ns-h-8 ns-rounded-full ns-bg-white ns-flex ns-items-center ns-justify-center ns-flex-shrink-0 ns-mr-3 ns-mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <g id="logo-86__logo-86" clip-path="url(#logo-86__clip0_1212_3644)">
                                <path id="logo-86__Vector" fill="#007DFC" fill-rule="evenodd" d="M15.333 7.011A6 6 0 0 0 12 6V0A12 12 0 1 1 0 12h6a6 6 0 1 0 9.333-4.989Z" clip-rule="evenodd"/>
                                <path id="logo-86__Vector_2" fill="#007DFC" fill-rule="evenodd" d="M6 0a6 6 0 0 1-6 6v6A12.001 12.001 0 0 0 12 0H6Z" clip-rule="evenodd"/>
                            </g>
                            <defs>
                                <clipPath id="logo-86__clip0_1212_3644">
                                <path fill="#fff" d="M0 0h24v24H0z"/>
                                </clipPath>
                            </defs>
                        </svg>
                    </div>
                    <!-- message content -->
                    <div class="ns-flex ns-flex-col">
                        <div class="ns-bg-gray-100 ns-rounded-xl ns-rounded-bl-sm ns-p-3 ns-max-w-[80%]">
                            <p class="ns-text-sm">{{ message.text }}</p>
                        </div>
                        <!-- timestamp -->
                        <span class="ns-text-xs ns-text-gray-500 ns-mt-1">{{ formatTimestamp(message.timestamp) }}</span>
                    </div>
                </div>

                <!-- User chat bubble -->
                <div v-else class="ns-flex ns-justify-end ns-mb-4">
                    <!-- message content -->
                    <div class="ns-flex ns-flex-col ns-items-end">
                        <div class="ns-rounded-xl ns-rounded-br-sm ns-p-3 ns-max-w-[80%]"
                            :style="{ backgroundColor: 'var(--nous-chat-color)' }">
                            <p class="ns-text-sm ns-text-white">{{ message.text }}</p>
                        </div>
                        
                        <!-- timestamp -->
                        <span class="ns-text-xs ns-text-gray-500 ns-mt-1">{{ formatTimestamp(message.timestamp) }}</span>
                    </div>
                </div>
            </template>

            <TypingIndicator v-if="isTyping" />
        </div>

         <!-- Top overlay -->
        <div class="ns-absolute ns-top-14 ns-left-0 ns-right-0 ns-h-16 ns-bg-gradient-to-b ns-from-white ns-to-transparent ns-pointer-events-none ns-opacity-70 ns-z-10" :class="{ 'ns-hidden': isAtTop }"></div>

        <!-- Bottom overlay -->
        <div class="ns-absolute ns-bottom-[6.25rem] ns-left-0 ns-right-0 ns-h-16 ns-bg-gradient-to-t ns-from-white ns-to-transparent ns-pointer-events-none ns-opacity-70 ns-z-10" :class="{ 'ns-hidden': isAtBottom }"></div>
    
        <!-- input area -->
        <div class="ns-px-4">
            <div class="ns-flex ns-items-center ns-border ns-border-gray-200 ns-bg-gray-50 ns-rounded-full ns-px-4 ns-h-12">
                <input type="text" 
                    placeholder="Type a message..." 
                    class="ns-flex-1 ns-bg-transparent ns-outline-none ns-text-sm placeholder:ns-text-gray-500 focus:ns-outline-none focus:ns-ring-0 focus:ns-ring-transparent" 
                    v-model="userInput"
                    @keyup.enter="sendMessage">
                <button class="ns-ml-2" @click="sendMessage">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20">
                        <g id="noun-send-6644234-1__noun-send-6644234 1">
                            <path id="noun-send-6644234-1__Vector" fill="#6B7280" d="M17.319 7.725 5.018 1.53c-.976-.494-2.088-.331-2.888.425-.862.813-1.119 2.05-.644 3.163.638 1.5 1.381 3.275 1.45 3.443.2.481.65.819 1.169.819H10c.825 0 .825 1.25 0 1.25H4.106c-.481 0-.95.287-1.181.831-.394.944-.913 2.182-1.444 3.425a2.792 2.792 0 0 0 .644 3.163 2.503 2.503 0 0 0 1.737.706 2.59 2.59 0 0 0 1.157-.281l12.375-6.238A2.503 2.503 0 0 0 18.73 9.55c-.138-.794-.694-1.457-1.419-1.819l.006-.006Z"/>
                        </g>
                    </svg>
                </button>
            </div>
        </div>

        <!-- branding -->
        <div class="ns-p-4 ns-text-gray-400 ns-text-sm ns-text-center ns-w-full">
            <p>Powered by <a href="https://nous.my">Nous</a></p>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, inject } from 'vue'
import TypingIndicator from './TypingIndicator.vue'
import axios from 'axios'

const props = inject('nousChatProps')

const chatContainer = ref(null)
const isAtTop = ref(true)
const isAtBottom = ref(true)
const userSessionId = ref(null)
const userInput = ref('')
const messages = ref([])
const isTyping = ref(false)

onMounted(() => {
    scrollToBottom()
    chatContainer?.value?.addEventListener('scroll', handleScroll)

    userSessionId.value = localStorage.getItem('nous-user-session-id')
    if (!userSessionId.value) {
        userSessionId.value = crypto.randomUUID()
        localStorage.setItem('nous-user-session-id', userSessionId.value)
    } else {
        // fetchMessages()
    }
    sendInitialMessage()
})

// Assuming you have a messages prop or reactive data
// If not, you'll need to add it to your component
watch(() => props.messages, () => {
    scrollToBottom()
}, { deep: true })

// Clean up event listener
onUnmounted(() => {
    chatContainer?.value?.removeEventListener('scroll', handleScroll)
})

const scrollToBottom = () => {
    if (chatContainer.value) {
        chatContainer.value.scrollTop = chatContainer.value.scrollHeight
    }
}

const handleScroll = () => {
    if (chatContainer.value) {
        const { scrollTop, scrollHeight, clientHeight } = chatContainer.value
        isAtTop.value = scrollTop === 0
        isAtBottom.value = scrollTop + clientHeight >= scrollHeight - 1
    }
}

const sendMessage = async () => {
    if (!userInput.value.trim()) return

    const userMessage = userInput.value
    userInput.value = ''
    
    await sendMessageToServer(userMessage, false)
}

const sendInitialMessage = async () => {
    await sendMessageToServer(props.initPayload, true)
}

const sendMessageToServer = async (message, isInitial) => {
    isTyping.value = true

    if (!isInitial) {
        addMessage('user', message)
    }

    try {
        const response = await axios.post(props.webhookUrl, {
            message: message,
            sender: userSessionId.value
        })
        
        const botMessages = response.data
        if (!isInitial) console.log(botMessages)
        
        botMessages.forEach(msg => {
            addMessage('bot', msg.text)
        })
    } catch (error) {
        console.error('Error sending message:', error)
    } finally {
        isTyping.value = false
    }
}

const addMessage = (type, text) => {
    const timestamp = new Date().toLocaleString('en-US')
    messages.value.push({ type, text, timestamp })
}

const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp)
    const today = new Date()
    if (date.toDateString() === today.toDateString()) {
        return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
    }
    return date.toLocaleString('en-US', { month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true })
}

const fetchMessages = async () => {
    const response = await axios.get(props.webhookUrl, {
        params: {
            sender: userSessionId.value
        }
    })
}
</script>