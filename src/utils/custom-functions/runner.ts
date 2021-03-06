import { ICustomFunctionsIframeRunnerTypeScriptMetadata } from "@/inferfaces/custom-functions";
import { METHODS_EXPOSED_ON_CF_RUNNER_OUTER_FRAME } from "./register";

export default ({
    solutionId,
    functions,
    code,
}: ICustomFunctionsIframeRunnerTypeScriptMetadata) => {
    const resultingHtml = `<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8" />
  <title>Script Lab</title>
  <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
  <meta http-equiv="Pragma" content="no-cache" />
  <meta http-equiv="Expires" content="0" />
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1, shrink-to-fit=no"
  />
</head>

<body>
  <script>
    window.parent.${
        METHODS_EXPOSED_ON_CF_RUNNER_OUTER_FRAME.scriptRunnerOnLoad
    }(window, "${solutionId}");
  </script>

  <script>
    ${code}

    ${functions
        .map(
            (func) =>
                `CustomFunctionsDictionary["${func.fullId}"] = ${func.javascriptFunctionName};`
        )
        .join("\n  ")}

    window.parent.${
        METHODS_EXPOSED_ON_CF_RUNNER_OUTER_FRAME.scriptRunnerOnLoadComplete
    }();
  </script>
</body>

</html>`;

    return resultingHtml;
};

// cspell:ignore crossorigin
