<template>
    <div class="ns-flex ns-flex-col ns-h-full">
        <div class="ns-mx-8 ns-mt-9">
            <!-- logo -->
            <div class="ns-w-11 ns-h-11 ns-rounded-full ns-bg-white ns-flex ns-items-center ns-justify-center ns-mb-7">
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="none" viewBox="0 0 24 24">
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

            <!-- welcome message -->
            <h1 class="ns-text-3xl ns-font-semibold ns-text-white ns-mb-1">{{ firstMessage }}</h1>
            <p class="ns-text-white/60">{{ secondMessage }}</p>
        </div>

        <!-- recent conversation -->
        <div class="ns-px-7 ns-w-full ns-mt-auto">
            <p class="ns-text-white ns-text-sm ns-font-medium ns-mb-2">Recent Conversation</p>

            <div class="ns-flex ns-items-center ns-bg-white ns-px-5 ns-py-4 ns-rounded-xl ns-border ns-border-gray-100 ns-shadow-chatbox">
                <div class="ns-w-9 ns-h-9 ns-mr-3 ns-flex ns-items-center ns-justify-center ns-rounded-full"
                    :style="{ backgroundColor: 'var(--nous-chat-color)' }">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 18 18">
                    <g id="frame__Frame" clip-path="url(#frame__clip0_1212_3584)">
                        <path id="frame__Vector" fill="#fff" d="M13.5 2.25a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H9.957l-3.572 2.143a.75.75 0 0 1-1.13-.558l-.005-.085v-1.5H4.5a3 3 0 0 1-2.996-2.85l-.004-.15v-6a3 3 0 0 1 3-3h9ZM10.5 9H6a.75.75 0 0 0 0 1.5h4.5a.75.75 0 1 0 0-1.5ZM12 6H6a.75.75 0 0 0 0 1.5h6A.75.75 0 1 0 12 6Z"/>
                    </g>
                    <defs>
                        <clipPath id="frame__clip0_1212_3584">
                        <path fill="#fff" d="M0 0h18v18H0z"/>
                        </clipPath>
                    </defs>
                    </svg>
                </div>
                
                <div>
                    <h4 class="ns-text-sm ns-font-semibold">Start Conversation</h4>
                    <p class="ns-text-gray-500 ns-text-sm">Typically replies in seconds</p>
                </div>
            </div>
        </div>

        <!-- branding -->
        <div class="ns-p-4 ns-text-gray-400 ns-text-sm ns-text-center ns-w-full">
            <p>Powered by <a href="https://nous.my">Nous</a></p>
        </div>

        <!-- background -->
        <div class="ns-absolute ns-inset-0 ns-z-[-1]" :style="{ background: 'linear-gradient(to bottom, var(--nous-chat-color) 30%, white)' }">
            <div class="ns-absolute ns-top-2 ns-right-2 ns-w-64 ns-h-8 ns-z-[-1] ns-bg-white ns-opacity-70 ns-filter ns-blur-[40px] ns-rotate-[-10deg]"></div>
            <div class="ns-absolute ns-top-2 ns-right-2 ns-w-40 ns-h-32 ns-z-[-1] ns-bg-white ns-opacity-50 ns-filter ns-blur-[40px] ns-rotate-[-24deg]"></div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    firstMessage: { type: String, required: true },
    secondMessage: { type: String, required: true }
})
</script>