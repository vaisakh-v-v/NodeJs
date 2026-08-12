import os from 'node:os';
import process from 'node:process';

export function getAllArguments(): Array<string>{
    return process.argv.slice(2);
}

const args: Array<string> = getAllArguments();

export const commandCallbacks: Record<string , () => void> = {
    "--help": () =>{
        console.log("commands:");
        console.log("--version | -v");
        console.log("--os");
        console.log("--memory");
        console.log("--dir");
        console.log("--env");
    },
    "--version" : () => {
        console.log(` System Version : ${os.version()}`);
    },
    "--os": () => {
        console.log(`System OS : ${os.release} ${os.platform()}`);
    },
    "--memory": () =>{
        console.log(`Total Memory: ${os.totalmem()} Free Memory: ${os.freemem()}`);
    },
    "--dir": () => {
        console.log(`Currnet Directory: ${process.cwd()}`);
    },
    "--env": () =>{
        console.log(`Environment: ${process.env.NODE_ENV?? "Developement"}`);
    },
    "--json": () =>{
        const data: Record<string, string> = {
        version: `System Version: ${os.version()}`,
        os: `System OS : ${os.release} ${os.platform()}`,
        memory: `Total Memory: ${os.totalmem()} Free Memory: ${os.freemem()}`,
        dir: `Currnet Directory: ${process.cwd()}`,
        env: `Environment: ${process.env.NODE_ENV?? "Developement"}`,
        };
        console.log(JSON.stringify(data, null, 2));
    },
} ;

args.forEach((element) =>{
    switch (element){
        case "--help":
            commandCallbacks["--help"]?.();
            break;
        case "--version":
            commandCallbacks["--version"]?.();
            break;
        case "--os":
            commandCallbacks["--os"]?.();
            break;
        case "--v":
            commandCallbacks["--version"]?.();
            break;
        case "--memory":
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
