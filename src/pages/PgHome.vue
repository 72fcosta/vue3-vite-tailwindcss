<script setup lang="ts"></script>

<template>
   <div class="flex w-full py-8 self-center">
      <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
         <div class="flex items-center font-semibold dark:font-normal text-blue-400">
            <span class="text-red-400 mr-1">const</span>
            <span class="text-slate-400 mr-1"> template =</span>
            <span>["</span>
            <span class="text-lime-500 dark:text-lime-200">Vue3</span>
            <span>", "</span>
            <span class="text-lime-500 dark:text-lime-200">Vite</span>
            <span>", "</span>
            <span class="text-lime-500 dark:text-lime-200">Tailwindcss</span>
            <span>"]</span>
            <span class="text-lg blink text-amber-400">|</span>
         </div>
      </div>
   </div>
</template>

<style>
.blink {
   animation: blink-animation 1s steps(2, start) infinite;
}
@keyframes blink-animation {
   to {
      visibility: hidden;
   }
}
</style>
