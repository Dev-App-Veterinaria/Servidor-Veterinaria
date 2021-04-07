export * from "./user";
import { userInit } from "."

const init = async () => {
    console.log("SEEDER")
    await userInit();
    process.exit();
}

init();
