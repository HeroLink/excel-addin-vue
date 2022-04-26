import { generateCustomFunctionsMetadata } from "custom-functions-metadata";
import * as fs from "fs";

export async function generate(input: string, output: string) {
    const results = await generateCustomFunctionsMetadata(input, false);
    if (results.errors.length > 0) {
        // has error
        console.error("Errors found:");
        results.errors.forEach((err) => {
            console.error(input, err);
        });
    } else {
        // write into functions.json
        try {
            fs.writeFileSync(output, results.metadataJson);
            return results;
        } catch (err) {
            throw new Error(`Cannot write to JSON file: ${output}.`);
        }
    }
}

export default function plugin(input: string, output: string) {
    // input: F:\MSRA\Project\excel-addin-vue\public\assets\custom-functions\functions.ts
    // id: F:/MSRA/Project/excel-addin-vue/public/assets/custom-functions/functions.ts
    // "/.../g": global flags, replace "\" to "/"
    const functionsID = input.replace(/\\/g, "/");
    return {
        name: "rollup-plugin-excel-CFMetadata",
        async transform(code: string, id: string) {
            if (id === functionsID) {
                // console.log("Transform", id);
                const results = await generate(input, output);
                // add associations
                results.associate.forEach((item) => {
                    code += `\nCustomFunctions.associate("${item.id}", ${item.functionName});`;
                });
                return code;
            }
        },
    };
}
