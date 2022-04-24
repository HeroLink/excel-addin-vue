import { generateCustomFunctionsMetadata } from "custom-functions-metadata";

export default (input: string, output: string) => {
    let generateResult = generateCustomFunctionsMetadata(input, true);
    console.log(generateResult);
};
