<script setup lang="ts">
// import { computed, onMounted, onUpdated } from "vue"
import {
   Listbox,
   ListboxButton,
   ListboxOptions,
   ListboxOption,
} from "@headlessui/vue"
import {
   // BIconDisplay,
   // BIconChevronUp,
   // BIconMoonStars,
   // BIconSun,
   BIconGithub,
   BIconClipboardHeart,
} from "bootstrap-icons-vue"

defineProps<{
   msg: string
}>()

// data
// interface SelectedScheme {
//    id: Number
//    system: String
//    dark: Boolean
//    label: String
// }

// const selectedScheme = { value: { dark: true } }

// const solveIsDark = (isDark: boolean) => {
//    if (isDark) {
//       document.documentElement.classList.add("dark")
//    } else {
//       document.documentElement.classList.remove("dark")
//    }
//    selectedScheme.value.dark = isDark
// }

// const systemThemeIsDark = window.matchMedia("(prefers-color-scheme: dark)")
// const localStorageContent = localStorage.getItem("twColorScheme")
// const isSystem = !localStorageContent

// const schemeOptions = [
//    {
//       index: 0,
//       system: true,
//       dark: systemThemeIsDark.matches,
//       icon: BIconDisplay,
//       label: "Sistema",
//    },
//    {
//       index: 1,
//       system: false,
//       dark: true,
//       icon: BIconMoonStars,
//       label: "Escuro",
//    },
//    {
//       index: 2,
//       system: false,
//       dark: false,
//       icon: BIconSun,
//       label: "Claro",
//    },
// ]

// systemThemeIsDark.addEventListener("change", (res) => {
//    const isDark = res.matches
//    solveIsDark(isDark)
// })

// const cTypeIcon = computed(() => {
//    const typeIcon = selectedScheme.system ? BIconDisplay : BIconChevronUp
//    return typeIcon
// })
// const cThemeIcon = computed(() => {
//    const themeIcon = selectedScheme.dark ? BIconMoonStars : BIconSun
//    return themeIcon
// })

// // methods
// const openMySite = () => {
//    window.open("https://72fcosta.netlify.app", "_self")
// }
// const openMyRepo = () => {
//    window.open("https://github.com/72fcosta/vue3-vite-tailwindcss", "_self")
// }

// onMounted(() => {
//    let indexSchemeOptions
//    if (isSystem) {
//       indexSchemeOptions = 0
//    } else {
//       indexSchemeOptions = localStorageContent === "dark" ? 1 : 2
//    }
//    selectedScheme.selectedScheme = schemeOptions[indexSchemeOptions]
//    const isDark = selectedScheme.dark
//    solveIsDark(isDark)
// })
// onUpdated(() => {
//    const isDark = selectedScheme.value.dark
//    if (selectedScheme.value.system) {
//       localStorage.removeItem("twColorScheme")
//    } else {
//       localStorage.twColorScheme = isDark ? "dark" : "light"
//    }
//    solveIsDark(isDark)
// })
</script>

<template>
   <footer class="text-slate-50 dark:text-slate-600 bg-slate-300 py-4">
      <!-- <div class="flex items-center justify-between mx-auto max-w-7xl px-2">
         <button
            class="flex h-10 ring-2 ring-slate-400 ring-offset-2 rounded-sm gap-x-2 px-3 py-2"
            @click="openMySite">
            <BIconClipboardHeart class="h-5 w-5" />
            <span class="text-base">72fcosta</span>
         </button>

         <div class="flex items-center justify-between gap-x-3">
            <Listbox v-model="selectedScheme">
               <div class="relative">
                  <ListboxButton
                     class="flex h-10 items-center justify-center ring-2 ring-slate-400 ring-offset-2 rounded-sm gap-x-2 px-3 py-2">
                     <Component :is="cTypeIcon" class="h-5 w-5" />
                     <Component :is="cThemeIcon" class="h-5 w-5" />
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
                           v-for="scheme in schemeOptions"
                           :key="scheme.index"
                           :value="scheme"
                           as="template"
                           class="my-3">
                           <li
                              :class="selected ? 'ring-blue-500' : 'ring-slate-300'"
                              class="flex cursor-pointer bg-slate-50 text-slate-600 h-10 items-center ring-2 ring-offset-2 rounded-sm gap-x-2 px-3 py-2">
                              <Component :is="scheme.icon" class="h-5 w-5" />
                              <div class="text-b">{{ scheme.label }}</div>
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
      </div> -->
   </footer>
</template>
