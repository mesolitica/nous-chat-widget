<template>
  <div class="ns-flex ns-flex-col ns-h-full">
    <!-- header -->
    <div
      class="ns-flex ns-items-center ns-h-14 ns-w-full ns-px-5"
      :style="{ backgroundColor: 'var(--nous-chat-color)' }"
    >
      <!-- back button -->
      <a href="#" role="button" @click.prevent="$emit('goBackHome')">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
          class="ns-cursor-pointer ns-mr-3"
        >
          <g id="tabler-icon-arrow-left__tabler-icon-arrow-left">
            <path
              id="tabler-icon-arrow-left__Vector"
              stroke="#fff"
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M5 12h14M5 12l6 6m-6-6 6-6"
            />
          </g>
        </svg>
      </a>

      <!-- logo -->
      <div
        class="ns-w-8 ns-h-8 ns-rounded-full ns-bg-white ns-flex ns-items-center ns-justify-center ns-mr-1"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          fill="none"
          viewBox="0 0 24 24"
        >
          <g id="logo-86__logo-86" clip-path="url(#logo-86__clip0_1212_3644)">
            <path
              id="logo-86__Vector"
              fill="#007DFC"
              fill-rule="evenodd"
              d="M15.333 7.011A6 6 0 0 0 12 6V0A12 12 0 1 1 0 12h6a6 6 0 1 0 9.333-4.989Z"
              clip-rule="evenodd"
            />
            <path
              id="logo-86__Vector_2"
              fill="#007DFC"
              fill-rule="evenodd"
              d="M6 0a6 6 0 0 1-6 6v6A12.001 12.001 0 0 0 12 0H6Z"
              clip-rule="evenodd"
            />
          </g>
          <defs>
            <clipPath id="logo-86__clip0_1212_3644">
              <path fill="#fff" d="M0 0h24v24H0z" />
            </clipPath>
          </defs>
        </svg>
      </div>

      <!-- title or bot name -->
      <h1 class="ns-text-white ns-font-semibold ns-ml-2 ns-grow">
        {{ props.title }}
      </h1>

      <DropdownMoreAction @start-new-session="handleStartNewSession"></DropdownMoreAction>
    </div>

    <!-- body -->
    <!-- chat messages container -->
    <div
      class="ns-flex-1 ns-overflow-y-auto ns-p-4 ns-relative no-scrollbar"
      ref="chatContainer"
    >
      <template v-for="(message, index) in messages" :key="index">
        <!-- chat system bubble -->
        <div v-if="message.type === 'bot'" class="ns-flex ns-items-end ns-mb-4">
          <!-- avatar -->
          <div
            class="ns-w-8 ns-h-8 ns-rounded-full ns-bg-white ns-flex ns-items-center ns-justify-center ns-flex-shrink-0 ns-mr-3 ns-mb-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <g id="logo-86__logo-86" clip-path="url(#logo-86__clip0_1212_3644)">
                <path
                  id="logo-86__Vector"
                  fill="#007DFC"
                  fill-rule="evenodd"
                  d="M15.333 7.011A6 6 0 0 0 12 6V0A12 12 0 1 1 0 12h6a6 6 0 1 0 9.333-4.989Z"
                  clip-rule="evenodd"
                />
                <path
                  id="logo-86__Vector_2"
                  fill="#007DFC"
                  fill-rule="evenodd"
                  d="M6 0a6 6 0 0 1-6 6v6A12.001 12.001 0 0 0 12 0H6Z"
                  clip-rule="evenodd"
                />
              </g>
              <defs>
                <clipPath id="logo-86__clip0_1212_3644">
                  <path fill="#fff" d="M0 0h24v24H0z" />
                </clipPath>
              </defs>
            </svg>
          </div>
          <!-- message content -->
          <div class="ns-flex ns-flex-col">
            <div
              class="ns-bg-gray-100 ns-rounded-xl ns-rounded-bl-sm ns-p-3 ns-max-w-[100%]"
            >
              <p class="ns-text-sm">{{ message.text }}</p>
            </div>
            <!-- timestamp -->
            <span class="ns-text-xs ns-text-gray-500 ns-mt-1">{{
              formatTimestamp(message.timestamp)
            }}</span>
          </div>
        </div>

        <!-- User chat bubble -->
        <div v-else class="ns-flex ns-justify-end ns-mb-4">
          <!-- message content -->
          <div class="ns-flex ns-flex-col ns-items-end">
            <div
              class="ns-rounded-xl ns-rounded-br-sm ns-p-3 ns-max-w-[100%]"
              :style="{ backgroundColor: 'var(--nous-chat-color)' }"
            >
              <p class="ns-text-sm ns-text-white">{{ message.text }}</p>
            </div>

            <!-- timestamp -->
            <span class="ns-text-xs ns-text-gray-500 ns-mt-1">{{
              formatTimestamp(message.timestamp)
            }}</span>
          </div>
        </div>
      </template>

      <TypingIndicator v-if="isTyping" />
    </div>

    <!-- Top overlay -->
    <div
      class="ns-absolute ns-top-14 ns-left-0 ns-right-0 ns-h-16 ns-bg-gradient-to-b ns-from-white ns-to-transparent ns-pointer-events-none ns-opacity-70 ns-z-10"
      :class="{ 'ns-hidden': isAtTop }"
    ></div>

    <!-- Bottom overlay -->
    <div
      class="ns-absolute ns-bottom-[6.25rem] ns-left-0 ns-right-0 ns-h-16 ns-bg-gradient-to-t ns-from-white ns-to-transparent ns-pointer-events-none ns-opacity-70 ns-z-10"
      :class="{ 'ns-hidden': isAtBottom }"
    ></div>

    <!-- input area -->
    <div class="ns-relative ns-grid ns-grid-cols-6">
      <div class="ns-col-span-5 ns-h-[48px]">
        <div v-if="isText" key="textbox" class="ns-pl-4">
          <div
            class="ns-flex ns-items-center ns-border ns-border-gray-200 ns-bg-gray-50 ns-rounded-full ns-px-4 ns-h-12"
          >
            <input
              type="text"
              placeholder="Type a message..."
              class="ns-flex-1 ns-bg-transparent ns-outline-none ns-text-sm placeholder:ns-text-gray-500 focus:ns-outline-none focus:ns-ring-0 focus:ns-ring-transparent"
              v-model="userInput"
              @keyup.enter="sendMessage"
              :disabled="streaming"
            />

            <button class="ns-ml-2" @click="sendMessage">
              <svg
                v-if="streaming"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="#6B7280"
                viewBox="0 0 20 20"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path
                  d="M17 4h-10a3 3 0 0 0 -3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3 -3v-10a3 3 0 0 0 -3 -3z"
                />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="none"
                viewBox="0 0 20 20"
              >
                <g id="noun-send-6644234-1__noun-send-6644234 1">
                  <path
                    id="noun-send-6644234-1__Vector"
                    fill="#6B7280"
                    d="M17.319 7.725 5.018 1.53c-.976-.494-2.088-.331-2.888.425-.862.813-1.119 2.05-.644 3.163.638 1.5 1.381 3.275 1.45 3.443.2.481.65.819 1.169.819H10c.825 0 .825 1.25 0 1.25H4.106c-.481 0-.95.287-1.181.831-.394.944-.913 2.182-1.444 3.425a2.792 2.792 0 0 0 .644 3.163 2.503 2.503 0 0 0 1.737.706 2.59 2.59 0 0 0 1.157-.281l12.375-6.238A2.503 2.503 0 0 0 18.73 9.55c-.138-.794-.694-1.457-1.419-1.819l.006-.006Z"
                  />
                </g>
              </svg>
            </button>
          </div>
        </div>
        <div v-else key="audio" class="ns-pl-4">
          <div id="waveform" ref="waveformContainer" class="ns-w-full ns-h-[32px]"></div>
          <select class="ns-invisible" id="mic-select">
            <option value="" hidden>Select mic</option>
          </select>
        </div>
      </div>
      <div>
        <button class="ns-pl-4 ns-pt-3.5" @click="stream">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#6B7280"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="icon icon-tabler icons-tabler-outline icon-tabler-microphone"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path
              d="M9 2m0 3a3 3 0 0 1 3 -3h0a3 3 0 0 1 3 3v5a3 3 0 0 1 -3 3h0a3 3 0 0 1 -3 -3z"
            ></path>
            <path d="M5 10a7 7 0 0 0 14 0"></path>
            <path d="M8 21l8 0"></path>
            <path d="M12 17l0 4"></path>
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
import { ref, onMounted, onUnmounted, watch, inject, nextTick } from "vue";
import TypingIndicator from "./TypingIndicator.vue";
import DropdownMoreAction from "./DropdownMoreAction.vue";
import { useFormatTimestamp } from "../composables/useFormatTimestamp";
import axios from "axios";
import WaveSurfer from "wavesurfer.js";
import RecordPlugin from "wavesurfer.js/dist/plugins/record.esm.js";
import RecordRTC, { StereoAudioRecorder } from "recordrtc";

const props = inject("nousChatProps");

const chatContainer = ref(null);
const isAtTop = ref(true);
const isAtBottom = ref(true);
const userSessionId = ref(null);
const chatHistorySessionId = ref(null);
const userInput = ref("");
const messages = ref([]);
const isTyping = ref(false);
const isText = ref(true);

const { formatTimestamp } = useFormatTimestamp();

const wavesurfer = ref(null);
const record = ref(null);
const waveformContainer = ref(null);
const get_mic_permission = ref(false);
const recordAudio = ref(null);
const ws = ref(null);
const silentcount = ref(0);
const user_ref = ref(null);
const bot_ref = ref(null);
const firsttime_user = ref(true);
const firsttime_bot = ref(true);
const interrupted = ref(false);
const streaming = ref(false);
let scrollingWaveform = false;

onMounted(() => {
  scrollToBottom();
  chatContainer.value?.addEventListener("scroll", handleScroll);

  initializeUserSession();
});

const initializeUserSession = () => {
  userSessionId.value = localStorage.getItem("nous-user-session-id");

  if (!userSessionId.value) {
    createNewUserSession();
  } else {
    loadExistingUserSession();
  }
};

const createNewUserSession = () => {
  userSessionId.value = crypto.randomUUID();
  chatHistorySessionId.value = `nous-chat-history-${userSessionId.value}`;
  localStorage.setItem("nous-user-session-id", userSessionId.value);
  localStorage.setItem(chatHistorySessionId.value, JSON.stringify([]));
  sendInitialMessage();
};

const loadExistingUserSession = () => {
  chatHistorySessionId.value = `nous-chat-history-${userSessionId.value}`;
  fetchMessages();
};

const resetState = () => {
  isText.value = true;
  firsttime_user.value = true;
  destroyWaveSurfer();
  destroyRecordRTC();
  destroyWebSocket();
};

const handleStartNewSession = () => {
  localStorage.removeItem("nous-user-session-id");
  localStorage.removeItem(chatHistorySessionId.value);
  messages.value = [];
  createNewUserSession();
  resetState();
};

watch(
  () => props.messages,
  () => {
    scrollToBottom();
  },
  { deep: true }
);

// Clean up event listener
onUnmounted(() => {
  chatContainer.value?.removeEventListener("scroll", handleScroll);
});

const scrollToBottom = () => {
  if (chatContainer.value) {
    nextTick(() => {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
    });
  }
};

const handleScroll = () => {
  if (chatContainer.value) {
    const { scrollTop, scrollHeight, clientHeight } = chatContainer.value;
    isAtTop.value = scrollTop === 0;
    isAtBottom.value = scrollTop + clientHeight >= scrollHeight - 1;
  }
};

const sendMessage = async () => {
  if (!streaming.value) {
    if (!isText.value) return;
    if (!userInput.value.trim()) return;

    const userMessage = userInput.value;
    userInput.value = "";

    await sendMessageToServerStream(userMessage, false);
  } else {
    interrupted.value = true;
  }
};

const sendInitialMessage = async () => {
  await sendMessageToServer(props.initPayload, true);
};

const sendMessageToServer = async (message, isInitial) => {
  isTyping.value = true;

  if (!isInitial) {
    addMessage("user", message);
  }

  scrollToBottom();

  try {
    const response = await axios.post(props.webhookUrl, {
      message: message,
      sender: userSessionId.value,
    });

    const botMessages = response.data;

    botMessages.forEach((msg) => {
      addMessage("bot", msg.text);
      scrollToBottom();
    });
  } catch (error) {
    console.error("Error sending message:", error);
  } finally {
    isTyping.value = false;
  }
};

const sendMessageToServerStream = async (message, isInitial) => {
  isTyping.value = true;
  streaming.value = true;

  if (!isInitial) {
    addMessage("user", message);
  }

  scrollToBottom();

  try {
    const response = await fetch(props.webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: message,
        sender: userSessionId.value,
        stream: true,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let actual_done = false;

    while (true) {
      const { done, value } = await reader.read();
      actual_done = done;
      if (done) break;
      if (interrupted.value) break;
      if (firsttime_bot.value) {
        addMessage("bot", "");
        bot_ref.value = messages.value[messages.value.length - 1];
        isTyping.value = false;
        firsttime_bot.value = !firsttime_bot.value;
      }

      const chunk = decoder.decode(value, { stream: true });
      const chunk_split = chunk.split("data: ");
      const data = JSON.parse(chunk_split[1]);
      bot_ref.value.text += data["choices"][0]["delta"]["content"];
      scrollToBottom();
    }
  } catch (error) {
    console.error("Error sending message:", error);
  } finally {
    localStorage.setItem(chatHistorySessionId.value, JSON.stringify(messages.value));
    streaming.value = false;
    interrupted.value = false;
    firsttime_bot.value = true;
  }
};

const addMessage = (type, text, timestamp) => {
  if (!timestamp) {
    timestamp = new Date().toLocaleString("en-US");
  }
  messages.value.push({ type, text, timestamp });

  localStorage.setItem(chatHistorySessionId.value, JSON.stringify(messages.value));
  scrollToBottom();
};

const fetchMessages = async () => {
  const histories = localStorage.getItem(chatHistorySessionId.value);
  messages.value = JSON.parse(histories);
  scrollToBottom();
};

const destroyWebSocket = () => {
  if (ws.value) {
    ws.value.close();
    console.log("websocket disconnected.");
  }
};

const createWebSocket = () => {
  const uri = props.webhookUrl.replace("http://", "ws://").replace("https://", "wss://");
  ws.value = new WebSocket(
    `${uri}/ws/${userSessionId.value}?language=${props.asrLanguage}&minimum_trigger_vad_ms=${props.asrChunk}`
  );
  ws.value.onmessage = async function (event) {
    if (event.data == "<|silent|>") {
      silentcount.value += 1;
    } else {
      if (firsttime_user.value) {
        addMessage("user", "");
        user_ref.value = messages.value[messages.value.length - 1];
        firsttime_user.value = !firsttime_user.value;
      }
      interrupted.value = true;
      user_ref.value.text += event.data;
      scrollToBottom();
      silentcount.value = 0;
    }

    if (
      (props.asrChunk / 1000) * silentcount.value >= props.minimumSilentSecond &&
      !firsttime_user.value
    ) {
      interrupted.value = false;
      firsttime_user.value = !firsttime_user.value;
      silentcount.value = 0;
      //recordAudio.value.pauseRecording();
      localStorage.setItem(chatHistorySessionId.value, JSON.stringify(messages.value));
      await sendMessageToServerStream(
        messages.value[messages.value.length - 1].text,
        true
      );

      //recordAudio.value.resumeRecording();
    }
  };
};

const destroyWaveSurfer = () => {
  if (wavesurfer.value) {
    wavesurfer.value.destroy();
  }
};

async function asyncSend(blob) {
  const arr = await blob.arrayBuffer();
  const base64String = btoa(
    String.fromCharCode.apply(null, new Uint8Array(arr).slice(300))
  );
  ws.value.send(base64String);
}

const destroyRecordRTC = () => {
  if (recordAudio.value) {
    recordAudio.value.destroy();
  }
};

const createRecordRTC = () => {
  navigator.getUserMedia(
    {
      audio: true,
    },
    function (stream) {
      recordAudio.value = RecordRTC(stream, {
        type: "audio",
        mimeType: "audio/webm",
        sampleRate: 44100,
        desiredSampRate: 16000,

        recorderType: StereoAudioRecorder,
        numberOfAudioChannels: 1,
        timeSlice: 100,
        bufferSize: 16384,
        ondataavailable: function (blob) {
          asyncSend(blob);
        },
      });
      recordAudio.value.startRecording();
    },
    function (error) {
      console.error(JSON.stringify(error));
    }
  );
};

const createWaveSurfer = () => {
  if (wavesurfer.value) {
    wavesurfer.value.destroy();
  }
  wavesurfer.value = WaveSurfer.create({
    container: waveformContainer.value,
    waveColor: "#9ea3ae",
    progressColor: "#000000",
    barWidth: 2,
    barGap: 2,
    barRadius: 2,
    height: 48,
    hideScrollbar: false,
    cursorWidth: 0,
  });

  record.value = wavesurfer.value.registerPlugin(
    RecordPlugin.create({ scrollingWaveform, renderRecordedAudio: false })
  );
};

const stream = async () => {
  if (isText.value) {
    isText.value = false;

    await nextTick();

    const micSelect = document.querySelector("#mic-select");
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then(function (stream) {
          get_mic_permission.value = true;
          RecordPlugin.getAvailableAudioDevices().then((devices) => {
            devices.forEach((device) => {
              const option = document.createElement("option");
              option.value = device.deviceId;
              option.text = device.label || device.deviceId;
              micSelect.appendChild(option);
            });
          });
        })
        .catch(function (error) {});
    } else {
    }

    createWaveSurfer();
    createWebSocket();
    createRecordRTC();

    const deviceId = micSelect.value;
    record.value.startRecording({ deviceId }).then(() => {});
  } else {
    resetState();
  }
};
</script>
