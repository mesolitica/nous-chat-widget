# Chat Widget 💬

Customizable Web Chat Widget 💬

Currently this chat widget optimized for https://nous.my, but to change to use your own should be super easy to do it.

## Features 🔥

- Collapse and expand animation.
- Waiting chat respond animation.
- Customize color, title, font family and first message.
- Support SSE Streaming, OpenAI compatibility.
- Audio streaming using RecordRTC.
- Interrupt button to stop streaming for text input.
- Interrupt voice to stop streaming for audio input.
- Auto generate user UUID and store the historical chats in UserSession.
- Error message on exception.

<img src="img/hi-there.png" width="50%">

### Voice interrupt example

https://github.com/user-attachments/assets/10f876c2-aa1d-400c-9796-102948083efa

## how to

### development

1. Use Yarn,

```bash
yarn install
yarn run dev
```

2. Access http://localhost:5173

### build

1. Use Yarn,

```bash
yarn build
```

2. Run [build.html](build.html).

## Parameters

```js
const props = defineProps({
  webhookUrl: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: "#ff2627",
  },
  title: {
    type: String,
    default: "Padi Bot",
  },
  firstMessage: {
    type: String,
    default: "Chat with us",
  },
  secondMessage: {
    type: String,
    default: "How can we help you today?",
  },
  initPayload: {
    type: String,
    default: "SpecialInitPayLoadDoNotTouch",
  },
  zIndex: {
    type: String,
    default: "1000",
  },
  asrChunk: {
    type: Number,
    default: 800,
  },
  asrLanguage: {
    type: String,
    default: "en",
  },
  minimumSilentSecond: {
    type: Number,
    default: 1.5,
  },
});
```

To initialize,

```html
<script src="./dist/nous-chat.js"></script>
<script>
  Nous.init({
    color: "#1076EE",
    zIndex: "1000",
    webhookUrl:
      "https://search-api-v2.nous.mesolitica.com/chat/happytohelp@mesolitica.com/2968",
    title: "Bot",
    firstMessage: "Hi there!",
    secondMessage: "How can I help you today?",
    initPayload: "SpecialInitPayLoadDoNotTouch",
  });
</script>
```
