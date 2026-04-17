// @ts-check
import { defineConfig, fontProviders } from "astro/config";

import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  trailingSlash: "never",
  fonts: [
    {
      name: "Noto Sans JP",
      cssVariable: "--font-noto-sans-jp",
      provider: fontProviders.fontsource(),
      subsets: ["japanese", "latin"],
    },
    {
      name: "Zalando Sans Expanded",
      cssVariable: "--font-zalando-sans-expanded",
      provider: fontProviders.fontsource(),
      weights: [500],
    },
    {
      name: "Sofia Sans Extra Condensed",
      cssVariable: "--font-sofia-sans-extra-condensed",
      provider: fontProviders.fontsource(),
      weights: [800, 900],
    },
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: [
            '@use "/src/styles/_color.scss" as *;',
            '@use "/src/styles/_mixin.scss" as *;',
            '@use "/src/styles/community/gateway/_index.scss" as commGateway;',
          ].join("\n"),
        },
      },
    },
  },

  integrations: [svelte()],
});
