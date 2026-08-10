import process from "node:process";
import os from "node:os";
export function getAllArguments() {
    return process.argv.slice(2);
}
const args = getAllArguments();
export const commandCallbacks = {
    "--help": () => {
        console.log("Commands:");
        console.log("--version | -v");
        console.log("--os");
        console.log("--dir");
        console.log("--env");
    },
    "--version": () => {
        console.log("System Version:");
        console.log(`${os.version()}`);
    },
    "--os": () => {
        console.log("system Version");
        console.log(`${os.version()}`);
    },
    "--memory": () => {
        console.log(`Total memory: ${os.totalmem()}, ${os.platform}`);
    },
    "--dir": () => {
        console.log(`Currnet Directory: ${process.cwd()}`);
    },
    "--env": () => {
        console.log(`Environment: ${process.env.NODE_ENV ?? "Developement"}`);
    },
    "--json": () => {
        const data = {
            version: `System Version : ${os.version()}`,
            os: `System OS: ${os.release()}, ${os.platform}`,
            memory: `Total Memory: ${os.totalmem()}, Free Memory:${os.freemem()}`,
            dir: `Current Directory: ${process.cwd()}`,
            env: `Environment: ${process.env.NODE_ENV ?? "Developement"}`,
        };
        console.log(JSON.stringify(data, null, 2));
    },
};
args.forEach((element) => {
    switch (element) {
        case "--help":
            commandCallbacks["--help"]?.();
            break;
        case "--version":
            commandCallbacks["--version"]?.();
            break;
        case "--v":
            commandCallbacks["--version"]?.();
            break;
        case "--os":
            commandCallbacks["--os"]?.();
            break;
        case "memory":
            commandCallbacks["--memory"]?.();
            break;
        case "--dir":
            commandCallbacks["--dir"]?.();
            break;
        case "--env":
            commandCallbacks["--env"]?.();
            break;
        case "--json":
            commandCallbacks["--json"]?.();
            break;
    }
});
//# sourceMappingURL=index.js.map