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

// 🚀Schema
const appThemeSchema = z.object({
   id: z.string().default(""),
   system: z.boolean().default(false),
   dark: z.boolean().default(false),
   iconName: z.string().default(""),
   label: z.string().default(""),
})

const systemThemeSchema = z.object({
   matches: z.boolean().default(false),
})

const localStorageThemeSchema = z.object({
   matches: z.boolean().default(false),
})

// ⚡Reactive Data
const systemTheme = ref(systemThemeSchema.parse({}))
const localStorageTheme = ref(localStorageThemeSchema.parse({}))
const themeSel = ref(appThemeSchema.parse({}))

// 🎯Computed
const isSystemDark = computed(() => systemTheme.value.matches)
console.log("🛸 > file: CpFooter.vue > isSystemDark", isSystemDark.value)

const isLocalStorageDark = computed(() => localStorageTheme.value.matches)
console.log("🛸 > file: CpFooter.vue > isLocalStorageDark", isLocalStorageDark.value)

const btnIconType = computed(() => {
   const btnIconType = themeSel.value.system ? BIconDisplay : BIconChevronUp
   return btnIconType
})

const iconTheme = computed(() => {
   const iconTheme = themeSel.value.dark ? BIconMoonStars : BIconSun
   return iconTheme
})

// ⭐Data
const themeOptions = [
   { id: "system", label: "Sistema", iconName: "BIconDisplay" },
   { id: "dark", label: "Escuro", iconName: "BIconMoonStars" },
   { id: "light", label: "Claro", iconName: "BIconSun" },
]

// 🍄Methods
const solveIsDark = (id: string, isDark: boolean) => {
   console.log("🛸 > file: CpFooter.vue:76 > solveIsDark", id, isDark)
   // set class
   if (isDark) {
      document.documentElement.classList.add("dark")
   } else {
      document.documentElement.classList.remove("dark")
   }
   // set localStorage
   if (id === "system") {
      localStorage.removeItem("twColorScheme")
   } else {
      localStorage.twColorScheme = isDark ? "dark" : "light"
   }
}

const openMySite = () => {
   window.open("https://72fcosta.netlify.app", "_self")
}
const openMyRepo = () => {
   window.open("https://github.com/72fcosta/vue3-vite-tailwindcss", "_self")
}

// 🕒Lifecycles
onMounted(() => {
   console.log("🛸 > file: CpFooter.vue > onMounted 🖐")
   const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
   systemTheme.addEventListener("change", (res) => {
      const isDark = res.matches
      solveIsDark("system", isDark)
   })

   let systemThemeIsDark = systemTheme.matches
   const localStorageContent = localStorage.getItem("twColorScheme")
   const isSystem = !localStorageContent

   // select current theme
   const themeIdCur = isSystem ? "system" : localStorageContent
   const themeOptionsCur = themeOptions.find((item) => item.id === themeIdCur)
   themeSel.value = appThemeSchema.parse(themeOptionsCur)

   const id = themeSel.value.id
   let isDark = null
   if (id === "system") {
      isDark = systemThemeIsDark
   } else {
      isDark = id === "dark"
   }
   solveIsDark(id, isDark)
})

onUpdated(() => {
   console.log("🛸 > file: CpFooter.vue > onUpdated 🖐")
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
                     <Component :is="btnIconType" class="h-5 w-5" />
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
                           :key="theme.id"
                           :value="theme"
                           as="template"
                           class="my-3">
                           <li
                              :class="selected ? 'ring-blue-500' : 'ring-slate-300'"
                              class="flex cursor-pointer bg-slate-50 text-slate-600 h-10 items-center ring-2 ring-offset-2 rounded-sm gap-x-2 px-3 py-2">
                              <Component :is="theme.iconName" class="h-5 w-5" />
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
