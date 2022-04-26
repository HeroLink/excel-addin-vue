import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import * as fs from "fs";
import { resolve } from "path";
import * as os from "os";
import CFPlugin from "./src/utils/custom-functions/plugin";

const homedir = os.homedir();

// generate custom functions typescript and json file
const input = resolve(__dirname, "public/assets/custom-functions/functions.ts");
const output = resolve(
    __dirname,
    "public/assets/custom-functions/functions.json"
);

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), CFPlugin(input, output)],
    resolve: {
        alias: {
            "@": resolve(__dirname, "src"), // path alias
        },
    },
    server: {
        https: {
            key: fs.readFileSync(
                resolve(`${homedir}/.office-addin-dev-certs/localhost.key`)
            ),
            cert: fs.readFileSync(
                resolve(`${homedir}/.office-addin-dev-certs/localhost.crt`)
            ),
            ca: fs.readFileSync(
                resolve(`${homedir}/.office-addin-dev-certs/ca.crt`)
            ),
        },
        port: 3200,
    },
    build: {
        rollupOptions: {
            input: {
                taskpane: resolve(__dirname, "public/index.html"),
                functions: input,
            },
            output: {
                entryFileNames: "[name].js",
            },
        },
    },
});
