import vuetify from "vite-plugin-vuetify";

// PWA Config
const title = "AsiaSalamat";
const shortTitle = "AsiaSalamat";
const description = "Health App";
const image = "https://vuetify3nuxt3starter.behonbaker.com/starter.png";
const url = "https://vuetify3nuxt3starter.behonbaker.com/";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  // import styles
  css: ["@/assets/main.scss"],
  devtools: { enabled: true },
  // enable takeover mode
  typescript: { shim: false },
  build: { transpile: ["vuetify"] },
  ssr:false,
 runtimeConfig:{
  public: {
    baseURL: process.env.BASE_URL || 'http://asiasalamat.ir',
  },
 },
  modules: [
    "@kevinmarrec/nuxt-pwa",
    '@vee-validate/nuxt',
    async (options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        config.plugins ||= [];
        config.plugins.push(vuetify());
      });
    },
    '@pinia/nuxt',
  ],

  app: {
    head: {
      title: "Asia Salamat",
      titleTemplate: "Asia Salamat",
      link: [
        { rel: "stylesheet", href: "https://rsms.me/inter/inter.css" },
        { rel: "preconnect", href: "https://rsms.me/" },
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "canonical", href: url },
      ],
      htmlAttrs: { dir: 'rtl', lang: 'fa' },
      meta: [
        {
          hid: "description",
          name: "description",
          content: description,
        },
        { property: "og:site_name", content: title },
        { hid: "og:type", property: "og:type", content: "website" },
        {
          hid: "og:url",
          property: "og:url",
          content: url,
        },
        {
          hid: "og:image:secure_url",
          property: "og:image:secure_url",
          content: image,
        },
        {
          hid: "og:title",
          property: "og:title",
          content: title,
        },
        {
          hid: "og:description",
          property: "og:description",
          content: description,
        },
        {
          hid: "og:image",
          property: "og:image",
          content: image,
        },
       
      ],
    },
  },

  pwa: {
    meta: {
      name: shortTitle,
      author: "Behon Baker",
      theme_color: "#4f46e5",
      description: description,
    },
    manifest: {
      name: shortTitle,
      short_name: shortTitle,
      theme_color: "#4f46e5",
      description: description,
    },
  },
});
