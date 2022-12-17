import { describe, it, expect } from "vitest"

import { mount } from "@vue/test-utils"
import PgHome from "../pages/PgHome.vue"

describe("BasicTest", () => {
   it("renders properly", () => {
      const wrapper = mount(PgHome)
      expect(wrapper.text()).toContain("Vite")
   })
})
