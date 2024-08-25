<template>
    <!-- action button -->
    <button @click.stop="toggleActionDropdown" ref="toggleButton">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 20 20">
            <g id="tabler-icon-dots__tabler-icon-dots">
                <g id="tabler-icon-dots__Vector">
                <path fill="#fff" d="M3.333 10A.833.833 0 1 0 5 10a.833.833 0 0 0-1.667 0Zm5.833 0a.833.833 0 1 0 1.667 0 .833.833 0 0 0-1.667 0ZM15 10a.833.833 0 1 0 1.667 0A.833.833 0 0 0 15 10Z"/>
                <path stroke="#fff" stroke-linecap="round" stroke-linejoin="round" d="M3.333 10A.833.833 0 1 0 5 10a.833.833 0 0 0-1.667 0Zm5.833 0a.833.833 0 1 0 1.667 0 .833.833 0 0 0-1.667 0ZM15 10a.833.833 0 1 0 1.667 0A.833.833 0 0 0 15 10Z"/>
                </g>
            </g>
        </svg>
    </button>

    <!-- action dropdown -->
    <div class="ns-absolute ns-top-14 ns-right-0 ns-bg-white ns-rounded-lg ns-shadow-lg ns-z-20" v-if="isActionDropdownOpen" ref="dropdown">
        <button class="ns-p-2 ns-w-full ns-text-left ns-text-sm ns-font-medium" @click.prevent="startNewSession">Start a New Session</button>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isActionDropdownOpen = ref(false)
const emit = defineEmits(['startNewSession'])
const toggleButton = ref(null)
const dropdown = ref(null)

const toggleActionDropdown = () => {
    isActionDropdownOpen.value = !isActionDropdownOpen.value
}

const startNewSession = () => {
    emit('startNewSession')
    isActionDropdownOpen.value = false
}

const handleClickOutside = (event) => {
    if (
        isActionDropdownOpen.value &&
        !toggleButton.value.contains(event.target) &&
        !dropdown.value.contains(event.target)
    ) {
        isActionDropdownOpen.value = false
    }
}

onMounted(() => {
    document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
})
</script>