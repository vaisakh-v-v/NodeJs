import process from "node:process";
import {readFile, writeFile} from "node: fs/promise"
const fetchJSON = async =>{
    try{
        const file = await readFile(`./tasks.json`, "utf8");
        return JSON.parse(file);
    }
    catch (e){
        console.log(e);
    }
};
 
const updateJSON = async (data) => {
    try{
        const promise = await writeFile("./tasks.json", JSON.stringify(data));
        return promise;
    }
    catch (e){
        console.error(e);
    }
};

const commandFunc = {
    "view: tasks": async () =>{
        const tasks = await fetchJSON();
        if(!tasks.payload.length){
            console.log("No tasks added. Use add: tasks [task] to add tasks");
            return;
        }
        tasks.payload.forEach((element) =>{
            console.log(`ID: ${element.id}`);
            console.log(`${element.content}`);
            console.log(`Progress: ${element.progress}`);
            console.log("");
        });
    },
    "add: tasks": async(args) =>{
        const tasks = await fetchJSON();
        const id = ++tasks._id;
        if(!args?.length){
            console.log("Task should be provided as argument eg npm run add: tasks -- 'some task'");
            return;
        }
        const task = {
            id: `${id}`,
            content: args[0],
            progress: "To Do",

        };
        const updateTask = {
            payload: [...tasks.payload, task],
            _id: id,
        };
        updateJSON(updateTask);
        console.log("Task Added. ");
    },
    "updateProgress: tasks": async (args) => {
        const tasks = await fetchJSON();
        if(!args){
            console.log("Task should be provided as argument. e.g. npm run delete: tasks -- id = 1 progress = 2 ");
            return;
        }
        if(!args?.length < 2){
            console.log("Task should be provided as argument e.g. npm run delete: tasks -- id=1 progress = 2");
            return; }
        if(!args[0].startsWith("id=")){
            console.log("Task should be provided as argument e.g. npm run delete: tasks -- id=1 progress = 2");
            return;
        }
        if(!args[1].startsWith("progress=")){
            console.log("Task should be provided as argument e.g. npm run delete: tasks -- id=1 progress = 2");
            return;
        }
        const id = pardeInt(args[0].replace("id=", ""));
        const progress = parseInt(args[1].replace("progress=", ""));
        const task = tasks.payload.find((each) => each.id === `${id}`);
        if(!task){
            console.log("Task not found. give valid id");
            return;
        }
        switch(progress){
            case 1: 
                task.progress = "To Do";
                break;
            case 2:
                task.progress = "In progress";
                break;
            case 3: 
                task.progress = "completed";
            default :
                task.progress = ""

        }

    }
}