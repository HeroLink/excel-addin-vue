// Intentionally empty, will instead use runtime-declared JS/TS instead
// @ts-nocheck
import Recognizers from "@microsoft/recognizers-text-suite";

/**
 * This recognizer will find any dimension presented. E.g. "My house is 20 km from my school".
 * Limitations of calling Excel JavaScript APIs through a custom function
 * =XLP.GETDIMENSION("My house is 20 km from my school")
 * =XLP.GETDIMENSION("B2")
 * @customfunction
 * @param address The address of the cell contains dimensions.
 * @returns Recognized results.
 */
export async function getDimension(address: string) {
    console.log(Recognizers);
    try {
        const context = new Excel.RequestContext();
        let range = context.workbook.worksheets
            .getActiveWorksheet()
            .getRange(address);
        range.load("values");
        await context.sync();
        let value = range.values[0][0];
        console.log("Get cell value", value);
        // let value = sentence;
        if (value) {
            let results = Recognizers.recognizeDimension(
                value,
                Recognizers.Culture.English
            );
            console.log("Recognized result", results);
            if (results) {
                const result = results[0];
                const resolution: Excel.EntityCellValue = {
                    type: Excel.CellValueType.entity,
                    text: "resolution",
                    properties: {
                        value: result.resolution.value,
                        unit: result.resolution.unit,
                    },
                    basicType: Excel.RangeValueType.error,
                    basicValue: "#VALUE!",
                };
                const myEntity: Excel.EntityCellValue = {
                    type: Excel.CellValueType.entity,
                    text: "dimension",
                    properties: {
                        start: result.start,
                        end: result.end,
                        resolution,
                        text: result.text,
                        typeName: result.typeName,
                    },
                    basicType: Excel.RangeValueType.error, // A readonly property. Used as a fallback in incompatible scenarios.
                    basicValue: "#VALUE!", // A readonly property. Used as a fallback in incompatible scenarios.
                };
                range = context.workbook.getSelectedRange();
                range.valuesAsJson = [[myEntity]];
                await context.sync();
            }
        }
    } catch (error) {
        return error;
    }
}
