<script setup lang="ts">
import { ref, computed, onMounted, onUpdated } from "vue"
import { z } from "zod"
import {
   Listbox,
   ListboxButton,
   ListboxOptions,
   ListboxOption,
} from "@headlessui/vue"
import {
   BIconDisplay,
   BIconChevronUp,
   BIconMoonStars,
   BIconSun,
   BIconGithub,
   BIconClipboardHeart,
} from "bootstrap-icons-vue"

const systemThemeIsDark = window.matchMedia("(prefers-color-scheme: dark)")
systemThemeIsDark.addEventListener("change", (res) => {
   const isDark = res.matches
   solveIsDark(isDark)
})

const themeOptions = [
   {
      index: 0,
      system: true,
      dark: systemThemeIsDark.matches,
      icon: BIconDisplay,
      label: "Sistema",
   },
   {
      index: 1,
      system: false,
      dark: true,
      icon: BIconMoonStars,
      label: "Escuro",
   },
   {
      index: 2,
      system: false,
      dark: false,
      icon: BIconSun,
      label: "Claro",
   },
]

const themeSchema = z.object({
   id: z.number().default(-1),
   system: z.boolean().default(false),
   dark: z.boolean().default(false),
   label: z.string().default(""),
})

let themeSel = ref(themeSchema.parse({}))
console.log("🛸 > file: CpFooter.vue:52 > themeSel", themeSel.value)

const solveIsDark = (isDark: boolean) => {
   if (isDark) {
      document.documentElement.classList.add("dark")
   } else {
      document.documentElement.classList.remove("dark")
   }
   if (themeSel.value) themeSel.value.dark = isDark
}

// computed
const iconType = computed(() => {
   const iconType = themeSel.value.system ? BIconDisplay : BIconChevronUp
   return iconType
})
const iconTheme = computed(() => {
   const iconTheme = themeSel.value.dark ? BIconMoonStars : BIconSun
   return iconTheme
})

// methods
const openMySite = () => {
   window.open("https://72fcosta.netlify.app", "_self")
}
const openMyRepo = () => {
   window.open("https://github.com/72fcosta/vue3-vite-tailwindcss", "_self")
}

onMounted(() => {
   const localStorageContent = localStorage.getItem("twColorScheme")
   const isSystem = !localStorageContent
   let themeOptionsIndex
   if (isSystem) {
      themeOptionsIndex = 0
   } else {
      themeOptionsIndex = localStorageContent === "dark" ? 1 : 2
   }
   themeSel.value = themeSchema.parse(themeOptions[themeOptionsIndex])
   const isDark = themeSel.value.dark
   solveIsDark(isDark)
})
onUpdated(() => {
   const isDark = themeSel.value.dark
   if (themeSel.value.system) {
      localStorage.removeItem("twColorScheme")
   } else {
      localStorage.twColorScheme = isDark ? "dark" : "light"
   }
   solveIsDark(isDark)
})
</script>

<template>
   <footer class="text-slate-50 dark:text-slate-600 bg-slate-300 py-4">
      <div class="flex items-center justify-between mx-auto max-w-7xl px-2">
         <button
            class="flex h-10 ring-2 ring-slate-400 ring-offset-2 rounded-sm gap-x-2 px-3 py-2"
            @click="openMySite">
            <BIconClipboardHeart class="h-5 w-5" />
            <span class="text-base">72fcosta</span>
         </button>

         <div class="flex items-center justify-between gap-x-3">
            <Listbox v-model="themeSel">
               <div class="relative">
                  <ListboxButton
                     class="flex h-10 items-center justify-center ring-2 ring-slate-400 ring-offset-2 rounded-sm gap-x-2 px-3 py-2">
                     <Component :is="iconType" class="h-5 w-5" />
                     <Component :is="iconTheme" class="h-5 w-5" />
                  </ListboxButton>
                  <transition
                     enter-active-class="transition duration-200 ease-out"
                     enter-from-class="translate-y-1 opacity-0"
                     enter-to-class="translate-y-0 opacity-100"
                     leave-active-class="transition duration-150 ease-in"
                     leave-from-class="translate-y-0 opacity-100"
                     leave-to-class="translate-y-1 opacity-0">
                     <ListboxOptions
                        class="absolute w-48 mb-6 bottom-full -right-3/4 bg-slate-300 rounded-md px-2">
                        <ListboxOption
                           v-slot="{ selected }"
                           v-for="theme in themeOptions"
                           :key="theme.index"
                           :value="theme"
                           as="template"
                           class="my-3">
                           <li
                              :class="selected ? 'ring-blue-500' : 'ring-slate-300'"
                              class="flex cursor-pointer bg-slate-50 text-slate-600 h-10 items-center ring-2 ring-offset-2 rounded-sm gap-x-2 px-3 py-2">
                              <Component :is="theme.icon" class="h-5 w-5" />
                              <div class="text-b">{{ theme.label }}</div>
                           </li>
                        </ListboxOption>
                     </ListboxOptions>
                  </transition>
               </div>
            </Listbox>

            <button
               class="flex h-10 items-center ring-2 ring-slate-400 ring-offset-2 rounded-sm px-3 py-2"
               @click="openMyRepo">
               <BIconGithub class="h-5 w-5" />
            </button>
         </div>
      </div>
   </footer>
</template>
