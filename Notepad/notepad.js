const copy = document.querySelector("#copy");
const paste = document.querySelector("#paste");
const textarea = document.querySelector("textarea");
const newBtm = document.querySelector("#new");
const open = document.querySelector("#open");
const fileInput = document.querySelector("#fileInput")
const saveBtn = document.querySelector("#save");

copy.addEventListener("click", async function () {
    await navigator.clipboard.writeText(textarea.value);
    alert("Copied!");
});

paste.addEventListener("click", async function () {
    const text = await navigator.clipboard.readText();
    textarea.value = text;
});
newBtm.addEventListener("click", function(){
    textarea.value = ""
})
open.addEventListener("click", () => {
    fileInput.click();
});
fileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    // console.log(reader)
    reader.onload = (event) => {
        // console.log(event)
        textarea.value = event.target.result;
    };
    reader.readAsText(file);
});


saveBtn.addEventListener("click", () => {
    const text = textarea.value;

    const blob = new Blob([text], { type: "text/plain" });

    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "notes.txt";

    a.click();

    URL.revokeObjectURL(a.href);
});