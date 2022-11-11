import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import mpa from "vite-plugin-multi-pages";
import htmlTemplate from "vite-plugin-html-template-mpa";

const _root = process.cwd().replace(/\\/g, '/');
const _pageName = _root.split('/')[_root.split('/').length - 1];

// https://vitejs.dev/config/
export default defineConfig({
  base: "",
  plugins: [vue(),
    mpa({
      scanDir: "src/modules",
      rewrites: [
        {
          from: "page1.html",
          to: "page1",
        },
        {
          from: "page2",
          to: "page2.html",
        },
      ],
    }),
    htmlTemplate({
      pagesDir: "src/modules",
      pages: {
        test: {
          title: "Page1",
        },
        remittance: {
          title: "{Page2}",
          urlParams: "pageId=33",
        },
      },
      buildCfg: {
        moveHtmlTop: true,
        moveHtmlDirTop: false,
        buildPrefixName: "",
        htmlHash: false,
        buildAssetDirName: _pageName + "/assets",
        buildChunkDirName: _pageName + "/js",
        buildEntryDirName: _pageName + "/js",
        htmlPrefixSearchValue: "../../../",
        htmlPrefixReplaceValue: "./",
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    rollupOptions: {
      output: {},
    },
  }
})
