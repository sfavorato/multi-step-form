import { defineConfig, presetUno } from "unocss";

export default defineConfig({
  presets: [presetUno()],
  rules: [[/^min-w-([\.\d]+)px$/, ([_, num]) => ({ "min-width": `${num}px` })]],
});
