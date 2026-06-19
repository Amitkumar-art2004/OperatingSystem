const contextMenu = document.querySelector(".context-menu ");
const right_click = document.querySelector(".right_click");
const refresh = document.querySelector("#refresh");
const sort = document.querySelector("#sort");
const view = document.querySelector("#view")
const subView = document.querySelector("#subView")
const small = document.querySelector(".small")
const medium = document.querySelector(".medium")
const large = document.querySelector(".large")
const newFolderBtn = document.querySelector("#newFolderBtn")
const wallpaper = document.querySelector("#wallpaper")
document.addEventListener("contextmenu", (event) => {
  event.preventDefault();
  const x = event.clientX;
  const y = event.clientY;
  // console.log(`Right-clicked at Position X: ${x}, Y: ${y}`);
  contextMenu.style.display = "flex";
  contextMenu.style.top = `${y}px`;
  contextMenu.style.left = `${x}px`;
});
refresh.addEventListener("click", function () {
  contextMenu.style.display = "none";
  subView.style.display = "none"
});

sort.addEventListener("click", function () {
    sub_screen.innerHTML = "";
    contextMenu.style.display = "none";
    createIcon("65px", 35);
    let top = 560;
    folders.forEach(folder => {
        folder.left = 16;
        folder.top = top;
        top += 80;
    });
    saveFolders();
    renderFolders();
    drag();
});
view.addEventListener("click", function(){
  subView.style.display = "flex"
})
medium.addEventListener("click", function(){
  small.classList.remove("menuActive")
  medium.classList.add("menuActive")
  sub_screen.innerHTML =""
  createIcon(`${75}px`,45);
})
large.addEventListener("click", function(){
  small.classList.remove("menuActive")
  medium.classList.remove("menuActive")
  large.classList.add("menuActive")
  sub_screen.innerHTML =""
  createIcon(`${85}px`,55);
})
small.addEventListener("click", function(){
  small.classList.add("menuActive")
  medium.classList.remove("menuActive")
  large.classList.remove("menuActive")
  sub_screen.innerHTML =""
  createIcon(`${65}px`,35);
})


const folders = JSON.parse(localStorage.getItem("folders")) || [];

// Save folders
function saveFolders() {
    localStorage.setItem("folders", JSON.stringify(folders));
}

// Create folder
function createFolder() {
    const folderName = prompt("Enter folder name:");

    if (!folderName) return;

    const folderData = {
        id: Date.now(),
        name: folderName,
        left: 16,
        top: 560
    };
    folders.push(folderData);

    saveFolders();

    renderFolder(folderData);
}

// Render one folder
function renderFolder(folderData) {

    const folder = document.createElement("div");

    folder.classList.add("icon");
    folder.dataset.id = folderData.id;

    folder.style.position = "absolute";
    folder.style.left = folderData.left + "px";
    folder.style.top = folderData.top + "px";
    folder.style.width = `${65}px`
    folder.style.height = `${65}px`

    folder.innerHTML = `
        <img src="img/fi.png" width="35" alt="">
        <span>${folderData.name}</span>
    `;

    sub_screen.appendChild(folder);

    makeFolderDraggable(folder);
}

// Render all folders
function renderFolders() {

    folders.forEach(folder => {
        renderFolder(folder);
    });

}

// Drag logic
function makeFolderDraggable(folder) {

    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    folder.addEventListener("mousedown", (e) => {

        isDragging = true;

        offsetX = e.clientX - folder.offsetLeft;
        offsetY = e.clientY - folder.offsetTop;

        document.addEventListener("mousemove", move);
        document.addEventListener("mouseup", stop);
    });

    function move(e) {

        if (!isDragging) return;

        folder.style.left =
            e.clientX - offsetX + "px";

        folder.style.top =
            e.clientY - offsetY + "px";
    }

    function stop() {

        isDragging = false;

        const folderObj = folders.find(
            item => item.id == folder.dataset.id
        );

        if (folderObj) {

            folderObj.left = folder.offsetLeft;
            folderObj.top = folder.offsetTop;

            saveFolders();
        }

        document.removeEventListener(
            "mousemove",
            move
        );

        document.removeEventListener(
            "mouseup",
            stop
        );
    }
}

// New Folder button
newFolderBtn.addEventListener("click", () => {
    createFolder();
  contextMenu.style.display = "none";

});

// Load folders on refresh
window.addEventListener("load", () => {
    renderFolders();
});

wallpaper.addEventListener("click", function () {
    const wall = prompt("Enter wallpaper URL:");
    if (!wall) return;
    contextMenu.style.display = "none";

    screen.style.background = `url("${wall}") no-repeat center center fixed`;
    screen.style.backgroundSize = "cover";

    localStorage.setItem("wallpaper", wall);
});

const savedWallpaper = localStorage.getItem("wallpaper");

if (savedWallpaper) {
    screen.style.background = `url("${savedWallpaper}") no-repeat center center fixed`;
    screen.style.backgroundSize = "cover";
}