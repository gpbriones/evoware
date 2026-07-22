import process from "process";

declare global {
    interface Window {
        process: typeof process;
    }
}

export {};