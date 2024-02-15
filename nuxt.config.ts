import vuetify from "vite-plugin-vuetify";
import type { NuxtPage } from "nuxt/schema";
// PWA Config
const title = "Asia Salamat";
const shortTitle = "Asia Salamat";
const description = "Health App";
const image = "~/assets/img/pics/mark.jpg";
const url = "~/assets/img/pics/mark.jpg";
// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  // import styles
  css: ["@/assets/main.scss"],
  devtools: { enabled: true },
  // enable takeover mode
  typescript: { shim: false },
  build: { transpile: ["vuetify"] },
  ssr: false,
  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_URL || "http://asiasalamat.ir",
    },
  },
  loadingindicator: {
    name: "./assets/index.html",
    img: "./assets/img/pics/splash2.gif",
  },
  modules: [
    "@kevinmarrec/nuxt-pwa",
    "@vee-validate/nuxt",
    "@sidebase/nuxt-pdf",
    "@vite-pwa/nuxt",
    async (options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        config.plugins ||= [];
        config.plugins.push(vuetify());
      });
    },
    "@pinia/nuxt",
  ],
  hooks: {
    "pages:extend"(pages) {
      function setMiddleware(pages: NuxtPage[]) {
        for (const page of pages) {
          if (page.path === "/" || page.path === "/confirm") {
            page.meta ||= {};
            page.meta.middleware = ["not-logged", "is-logged"];
          } else {
            page.meta ||= {};
            page.meta.middleware = ["not-logged"];
          }

          if (page.children) {
            setMiddleware(page.children);
          }
        }
      }
      setMiddleware(pages);
    },
  },
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
      htmlAttrs: { dir: "rtl", lang: "fa" },
      meta: [
        {
          hid: "description",
          name: "description",
          content: description,
        },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1, maximum-scale=1",
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
    icon:

    {
      source: "./assets/img/icons/ic_launcher_monochrome.png",
      fileName: "ic_launcher_monochrome.png",
      sizes:[144, 152, 192],

      purpose: 'maskable',
      splash:{
        backgroundColor:'white'
      }
        
    },
    meta: {
      name: shortTitle,
      author: "Navid jaberi",
      theme_color: "white",
      description: description,
      mobileAppIOS: true,
        
    },

    manifest: {
      name: shortTitle,
      short_name: shortTitle,
      theme_color: "white",
      description: description,
      background_color:'white'
    },
  },
});
