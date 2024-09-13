<template>
  <div v-for="(token, index) in tokens" :key="index">
    <div v-if="token.type == 'code'" class="ns-pt-4 ns-pb-4">
      <div class="ns-bg-gray-800 ns-rounded-lg ns-overflow-hidden">
        <div
          class="ns-flex ns-justify-between ns-items-center ns-p-2 ns-bg-gray-700"
        >
          <div>
            <span class="ns-text-white ns-pl-2 ns-text-xs">{{
              token.lang
            }}</span>
          </div>
          <div class="ns-flex ns-gap-4">
            <button
              @click="copyCode(index)"
              class="ns-h-[24px] ns-bg-gray-700 ns-text-white ns-rounded ns-px-2 ns-py-1 ns-text-xs ns-hover:bg-gray-500 ns-transition-colors"
            >
              <span v-if="copied"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="ns-h-[16px] icon icon-tabler icons-tabler-outline icon-tabler-check"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M5 12l5 5l10 -10" /></svg
              ></span>
              <span v-else
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="ns-h-[16px] icon icon-tabler icons-tabler-outline icon-tabler-copy"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path
                    d="M7 7m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z"
                  />
                  <path
                    d="M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1"
                  /></svg
              ></span>
            </button>
          </div>
        </div>
        <pre
          v-html="hljs.highlightAuto(token.text).value"
          style="background-color: #20293a"
          class="ns-pb-4 ns-whitespace-break-spaces ns-pt-2 hljs ns-px-4 ns-overflow-x-auto ns-overflow-y-auto ns-min-h-[100px] ns-max-h-[350px] ns-max-w-[300px] ns-lg:max-w-full ns-text-xs"
        ></pre>
      </div>
    </div>
    <div v-else v-html="marked.parse(token.raw)"></div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { marked } from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";
import DOMPurify from "isomorphic-dompurify";

const renderer = new marked.Renderer();
const tokens = ref([]);

renderer.codespan = (code) => {
  return `<code>${code.replaceAll("&amp;", "&")}</code>`;
};

renderer.link = (href, title, text) => {
  return `<a href="${href?.replace(
    />$/,
    ""
  )}" target="_blank" rel="noreferrer">${text}</a>`;
};

const props = defineProps({
  content: {
    type: String,
    required: true,
  },
});

tokens.value = marked.lexer(props.content);

watch(
  () => props.content,
  (newVal) => {
    tokens.value = marked.lexer(props.content);
  }
);

const copied = ref(false);
const copyCode = (index) => {
  navigator.clipboard.writeText(tokens.value[index].text).then(() => {
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 1000);
  });
};
</script>
