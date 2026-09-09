import app from "./app.ts";
app.listen(3000, () => {
    console.log("Server running at port : 3000");
});

process.on("beforeExit", (code) => {
  console.log("beforeExit fired, code:", code);
  console.log("Active handles:", (process as any)._getActiveHandles().length);
});
