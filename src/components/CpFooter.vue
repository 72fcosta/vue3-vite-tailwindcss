<script setup lang="ts">
import { ref, computed, onMounted } from "vue"
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
   theme: z.string().nullable().default(null),
})

const systemThemeSchema = z.object({
   theme: z.string().nullable().default(null),
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
const hasLocalStorageTheme = computed(() => !!localStorageTheme.value.theme)

const getThemeFrom = computed(() => {
   return hasLocalStorageTheme.value ? "localStorage" : "system"
})

const localStorageIsDark = computed(() => localStorageTheme.value.theme === "dark")

const systemIsDark = computed(() => systemTheme.value.theme === "dark")

const appIsDark = computed(() => localStorageIsDark.value || systemIsDark.value)

const btnIconType = computed(() => {
   const btnIconType = getThemeFrom.value === "system" ? BIconDisplay : BIconChevronUp
   return btnIconType
})

const iconTheme = computed(() => {
   return appIsDark.value ? BIconMoonStars : BIconSun
})

// ⭐Data
const themeOptions = [
   { id: "system", label: "Sistema", icon: BIconDisplay },
   { id: "dark", label: "Escuro", icon: BIconMoonStars },
   { id: "light", label: "Claro", icon: BIconSun },
]

// 🍄Methods
const solveLocalStorageTheme = async () => {
   const find = localStorage.getItem("twColorScheme")
   const res = { theme: find }
   localStorageTheme.value = localStorageThemeSchema.parse(res)
}

const solveSystemTheme = async () => {
   if (!localStorageTheme.value.theme) {
      const find = window.matchMedia("(prefers-color-scheme: dark)").matches
      const res = { theme: find ? "dark" : "light" }
      systemTheme.value = systemThemeSchema.parse(res)
   } else {
      systemTheme.value = systemThemeSchema.parse({ theme: null })
   }
}

const solveClassTheme = async () => {
   if (appIsDark.value) {
      document.documentElement.classList.add("dark")
   } else {
      document.documentElement.classList.remove("dark")
   }
}

const solveAppTheme = async () => {
   await solveLocalStorageTheme()
   await solveSystemTheme()
   await solveClassTheme()
}

const openMySite = () => {
   window.open("https://72fcosta.netlify.app", "_self")
}
const openMyRepo = () => {
   window.open("https://github.com/72fcosta/vue3-vite-tailwindcss", "_self")
}

const onSelectAppTheme = async (idTheme: string) => {
   if (idTheme === "system") {
      localStorage.removeItem("twColorScheme")
   } else {
      localStorage.setItem("twColorScheme", idTheme)
   }
   solveAppTheme()
}

// 🕒Lifecycles
onMounted(async () => {
   const darkModePreference = window.matchMedia("(prefers-color-scheme: dark)")
   darkModePreference.addEventListener("change", () => {
      solveAppTheme()
   })
   solveAppTheme()
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
                              class="flex cursor-pointer bg-slate-50 text-slate-600 h-10 items-center ring-2 ring-offset-2 rounded-sm gap-x-2 px-3 py-2"
                              @click="onSelectAppTheme(theme.id)">
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
