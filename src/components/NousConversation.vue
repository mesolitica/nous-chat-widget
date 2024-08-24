<template>
    <div class="ns-flex ns-flex-col ns-h-full">
        <!-- header -->
        <div class="ns-flex ns-items-center ns-h-14 ns-w-full ns-px-5" :style="{ backgroundColor: 'var(--nous-chat-color)' }">
            <!-- back button -->
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" class="ns-cursor-pointer ns-mr-3">
                <g id="tabler-icon-arrow-left__tabler-icon-arrow-left">
                    <path id="tabler-icon-arrow-left__Vector" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M5 12l6 6m-6-6 6-6"/>
                </g>
            </svg>

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
            <h1 class="ns-text-white ns-font-semibold ns-ml-2">{{ title }}</h1>
        </div>

        <!-- body -->
        <!-- chat messages container -->
        <div class="ns-flex-1 ns-overflow-y-auto ns-p-4 ns-relative no-scrollbar" ref="chatContainer">
            <!-- chat system bubble -->
            <div class="ns-flex ns-items-end ns-mb-4">
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
                        <p class="ns-text-sm">Hello. saya adam dari Microlink. Ada apa-apa saya boleh bantu?</p>
                    </div>
                    <!-- timestamp -->
                    <span class="ns-text-xs ns-text-gray-500 ns-mt-1">12:34 PM</span>
                </div>
            </div>

            <!-- User chat bubble -->
            <div class="ns-flex ns-justify-end ns-mb-4">
                <!-- message content -->
                <div class="ns-flex ns-flex-col ns-items-end">
                    <div class="ns-rounded-xl ns-rounded-br-sm ns-p-3 ns-max-w-[80%]"
                        :style="{ backgroundColor: 'var(--nous-chat-color)' }">
                        <p class="ns-text-sm ns-text-white">Boleh saya tahu mengenai project microlink modal terbaru?</p>
                    </div>
                    
                    <!-- timestamp -->
                    <span class="ns-text-xs ns-text-gray-500 ns-mt-1">12:35 PM</span>
                </div>
            </div>

            <!-- chat system bubble -->
            <div class="ns-flex ns-items-end ns-mb-4">
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
                        <p class="ns-text-sm">Maaf, sebagai Chatbot, saya tidak mempunyai maklumat terkini mengenai projek terbaru Microlink. Saya hanya boleh memberikan maklumat umum tentang Microlink sebagai penyedia penyelesaian teknologi dan penyepaduan sistem dalam sektor perkhidmatan kewangan, telekomunikasi dan sektor awam. Untuk maklumat terkini mengenai projek terbaharu Microlink, disarankan untuk menghubungi Microlink secara langsung atau melawat laman web rasmi mereka.</p>
                    </div>
                    <!-- timestamp -->
                    <span class="ns-text-xs ns-text-gray-500 ns-mt-1">12:34 PM</span>
                </div>
            </div>
        </div>

         <!-- Top overlay -->
        <div class="ns-absolute ns-top-14 ns-left-0 ns-right-0 ns-h-16 ns-bg-gradient-to-b ns-from-white ns-to-transparent ns-pointer-events-none ns-opacity-70 ns-z-10" :class="{ 'ns-hidden': isAtTop }"></div>

        <!-- Bottom overlay -->
        <div class="ns-absolute ns-bottom-14 ns-left-0 ns-right-0 ns-h-16 ns-bg-gradient-to-t ns-from-white ns-to-transparent ns-pointer-events-none ns-opacity-70 ns-z-10" :class="{ 'ns-hidden': isAtBottom }"></div>
    
        <!-- input area -->
        <div class="ns-p-4 ns-border-t ns-border-gray-200">
            <div class="ns-flex ns-items-center ns-bg-gray-100 ns-rounded-full ns-px-4 ns-py-2">
                <input type="text" placeholder="Type a message..." class="ns-flex-1 ns-bg-transparent ns-outline-none ns-text-sm">
                <button class="ns-ml-2 ns-text-blue-500">
                    <svg xmlns="http://www.w3.org/2000/svg" class="ns-h-5 ns-w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clip-rule="evenodd" />
                    </svg>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'

const props = defineProps({
    title: { type: String, required: true },
    firstMessage: { type: String, required: true }
})

const chatContainer = ref(null)
const isAtTop = ref(true)
const isAtBottom = ref(true)

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

onMounted(() => {
    scrollToBottom()
    chatContainer.value.addEventListener('scroll', handleScroll)
})

// Assuming you have a messages prop or reactive data
// If not, you'll need to add it to your component
watch(() => props.messages, () => {
    scrollToBottom()
}, { deep: true })

// Clean up event listener
onUnmounted(() => {
    chatContainer.value.removeEventListener('scroll', handleScroll)
})
</script>