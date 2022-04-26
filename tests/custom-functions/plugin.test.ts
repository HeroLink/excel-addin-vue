import { generate } from "@/utils/custom-functions/plugin";
import { resolve } from "path";
import { describe, it } from "vitest";

const cwd = process.cwd();
const input = resolve(cwd, "public/assets/custom-functions/functions.ts");
const output = resolve(cwd, "public/assets/custom-functions/functions.json");

describe("Custom functions metadata plugin", () => {
    it("generate result", async () => {
        const results = await generate(input, output);
        console.log(results);
    });
});
