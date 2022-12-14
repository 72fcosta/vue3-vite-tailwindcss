import { describe, it, expect } from "vitest"

import { mount } from "@vue/test-utils"
import CpFooter from "../CpFooter.vue"

describe("HelloWorld", () => {
   it("renders properly", () => {
      const wrapper = mount(CpFooter, { props: { msg: "Hello Vitest" } })
      expect(wrapper.text()).toContain("Hello Vitest")
   })
})
