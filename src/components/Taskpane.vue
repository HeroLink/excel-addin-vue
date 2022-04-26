<script setup lang="ts">
import { dynamicRegisterCF } from "@/utils/custom-functions/register";

async function onClick() {
    // window.Excel.run(async (context) => {
    //     const range = context.workbook.getSelectedRange();
    //     range.format.fill.color = "green";
    //     await context.sync();
    // });

    await fetch("https://localhost:3000/tests/custom-functions/functions.ts")
        .then((res) => {
            console.log("Fetch function.ts", res);
            return res.text();
        })
        .then((data) => {
            // console.log("Read functions.ts", data);
            dynamicRegisterCF(data);
        });
}
</script>

<template>
    <div class="content">
        <div class="content-header">
            <div class="padding">
                <h2>Create an entity cell from Microsoft Recognizers Text.</h2>
            </div>
        </div>
        <div class="content-main">
            <div class="padding">
                <h3>Excel add-in in Vue3 + TypeScript + Vite.</h3>
                <p>Click to dynamically register custom functions.</p>
                <button @click="onClick">Run</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.content-header {
    background: #2a8dd4;
    color: #fff;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 80px;
    overflow: hidden;
}

.content-main {
    background: #fff;
    position: fixed;
    top: 80px;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: auto;
}

.padding {
    padding: 15px;
}
</style>
