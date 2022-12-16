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
const localStorageThemeSchema = z.object({
   has: z.boolean().default(false),
   matches: z.boolean().default(false),
})

const systemThemeSchema = z.object({
   matches: z.boolean().default(false),
})

const appThemeSchema = z.object({
   id: z.string().default(""),
   label: z.string().default(""),
})

// ⚡Reactive Data
const localStorageTheme = ref(localStorageThemeSchema.parse({}))
const systemTheme = ref(systemThemeSchema.parse({}))
const appTheme = ref(appThemeSchema.parse({}))

// 🎯Computed
const hasLocalStorageTheme = computed(() => localStorageTheme.value.has)

const getThemeFrom = computed(() => {
   return hasLocalStorageTheme.value ? "localStorage" : "system"
})

const localStorageIsDark = computed(() => localStorageTheme.value.matches)

const systemIsDark = computed(() => systemTheme.value.matches)

const appIsDark = computed(() => {
   if (hasLocalStorageTheme.value) {
      return localStorageIsDark
   } else {
      return systemIsDark
   }
})

const btnIconType = computed(() => {
   const btnIconType = getThemeFrom.value === "system" ? BIconDisplay : BIconChevronUp
   return btnIconType
})

const iconTheme = computed(() => (appIsDark.value ? BIconMoonStars : BIconSun))

// ⭐Data
const themeOptions = [
   { id: "system", label: "Sistema", icon: BIconDisplay },
   { id: "dark", label: "Escuro", icon: BIconMoonStars },
   { id: "light", label: "Claro", icon: BIconSun },
]

// 🍄Methods
const solveLocalStorageTheme = async () => {
   console.log("🛸 > solveLocalStorageTheme 🖐")
   const solvedLocalStorageTheme = localStorage.getItem("twColorScheme") || {}
   localStorageTheme.value = localStorageThemeSchema.parse(solvedLocalStorageTheme)
}

const solveSystemTheme = async () => {
   console.log("🛸 > solveSystemTheme 🖐")
   const solvedSystemTheme = window.matchMedia("(prefers-color-scheme: dark)")
   systemTheme.value = systemThemeSchema.parse(solvedSystemTheme)
}

const solveClassTheme = async () => {
   console.log("🛸 > solveClassTheme 🖐")
   if (systemIsDark.value) {
      document.documentElement.classList.add("dark")
   } else {
      document.documentElement.classList.remove("dark")
   }
}

const solveAppTheme = async () => {
   let themeId = ""
   await solveLocalStorageTheme()
   if (getThemeFrom.value === "system") {
      themeId = "system"
      await solveSystemTheme()
   } else {
      themeId = localStorageIsDark.value ? "dark" : "light"
   }
   await solveClassTheme()
   const appThemeCur = themeOptions.find((item) => item.id === themeId)
   appTheme.value = appThemeSchema.parse(appThemeCur)
}

const openMySite = () => {
   window.open("https://72fcosta.netlify.app", "_self")
}
const openMyRepo = () => {
   window.open("https://github.com/72fcosta/vue3-vite-tailwindcss", "_self")
}

// 🕒Lifecycles
onMounted(() => {
   // const themeIdCur = isSystem ? "system" : localStorageContent
   // const appThemeCur = themeOptions.find((item) => item.id === themeIdCur)
   // appTheme.value = appThemeSchema.parse(appThemeCur)

   // const id = appTheme.value.id
   // let isDark = null
   // if (id === "system") {
   //    isDark = systemThemeIsDark
   // } else {
   //    isDark = id === "dark"
   // }

   solveAppTheme()

   // solveIsDark(id, isDark)
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
            <Listbox v-model="appTheme">
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
