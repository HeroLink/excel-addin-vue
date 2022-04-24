import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import * as fs from "fs";
import { resolve } from "path";
import * as os from "os";
import { generate } from "custom-functions-metadata/lib/commands";

const homedir = os.homedir();
const input = resolve(__dirname, "public/assets/custom-functions/functions.ts");
const outpout = resolve(__dirname, "public/assets/custom-functions/functions.json");
generate(input, outpout);

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
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
});
