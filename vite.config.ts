import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import * as fs from "fs";
import { resolve } from "path";
import * as os from "os";

const homedir = os.homedir();

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
    },
    build:{
        rollupOptions:{
            input: "public/index.html"
        }
    }
});
