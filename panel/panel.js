const desktopIcons = [
  {
    value: "This_PC",
    img: "img/pc.png",
    text: "This_PC"
  },
  {
    value: "Recycle_Bin",
    img: "img/recycle-bin.png",
    text: "Recycle_Bin"
  },
  {
    value: "Chrome",
    img: "img/chrome.png",
    text: "Chrome"
  },
  {
    value: "Spotify",
    img: "img/spotify.png",
    text: "Spotify"
  },
  {
    value: "Camera",
    img: "img/camera.png",
    text: "Camera"
  },
  {
    value: "Notepad",
    img: "img/notepad.png",
    text: "Notepad"
  },
  {
    value: "Kanbon",
    img: "img/kanbon.png",
    text: "Kanbon"
  },
  {
    value: "Snake_Game",
    img: "img/snake.png",
    text: "Snake_Game"
  },
  {
    value: "Image_Editor",
    img: "img/editor.png",
    text: "Image_Editor"
  },
  {
    value: "Spotify",
    img: "img/spotify.png",
    text: "Spotify",
  }
  
];

const closePanel = document.querySelector("#closePanel");
const maximizePanel = document.querySelector("#maximizePanel");
const minimizePanel = document.querySelector("#minimizePanel");
const toolbar = windowContainer.querySelector(".toolbar");
const FileExplorer = document.querySelector("#File_Explorer");
const home = document.querySelector("#home");
const gallery = document.querySelector("#gallery");
const oneDrive = document.querySelector("#oneDrive");
const desktop = document.querySelector("#desktop");
const download = document.querySelector("#download");
const pictures = document.querySelector("#pictures");
const documentFolder = document.querySelector("#document");
const music = document.querySelector("#music");
const video = document.querySelector("#video");
const explorerView = document.querySelector(".explorer-view")
const empty = document.querySelector("#empty")
const sectionBlock1 = document.querySelector("#section-block1")
const sectionBlock2 = document.querySelector("#section-block2")
const headTag = document.querySelector("#headTag")
const explorerViewDesktopIcon = document.querySelector(".explorer-view-desktopIcon")
const pictur = document.querySelector(".pictur")
const exploreGallery = document.querySelector("#exploreGallery")
const pictureBtn = document.querySelector("#pictureBtn")
const exploreVideo = document.querySelector("#exploreVideo")
const newWindowMain = document.querySelector(".newWindowMain")

const fileSystem = JSON.parse(localStorage.getItem("fileSystem"));

let isDragging = false;
let isMaximized = false;
function close(panel,Display){
  panel.addEventListener("click", function () {
    Display.style.display = "none";
    FileExplorer.classList.remove("buttonActive");
  });
}

function maximize(panel,Display){
  panel.addEventListener("click", function () {
    Display.classList.toggle("togglePanel");
    if (Display.classList.contains("togglePanel")) {
      Display.style.left = "0px";
      Display.style.top = "0px";
    }
  });
}

function minimize(panel,Display){
  panel.addEventListener("click", function () {
    Display.style.transition =
      "transform 250ms ease-in-out, opacity 250ms ease-in-out";
    Display.style.transform = "scale(0.1)";
    Display.style.opacity = "0";
    setTimeout(() => {
      Display.style.display = "none";
    }, 250);
  });
}

function doubleClickToolbar(tool,Display){
  tool.addEventListener("dblclick", function () {
    Display.classList.toggle("togglePanel");
    if (Display.classList.contains("togglePanel")) {
      Display.style.left = "0px";
      Display.style.top = "0px";
    }
  });
}

function windowContainerDrag() {
  let offsetX = 0;
  let offsetY = 0;
  toolbar.addEventListener("mousedown", (e) => {
    if (isMaximized) return;
    isDragging = true;
    offsetX = e.clientX - windowContainer.offsetLeft;
    offsetY = e.clientY - windowContainer.offsetTop;
  });
  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    windowContainer.style.left = `${e.clientX - offsetX}px`;
    windowContainer.style.top = `${e.clientY - offsetY}px`;
  });
  document.addEventListener("mouseup", () => {
    isDragging = false;
  });
}

close(closePanel,windowContainer);
close(newClosePanel,newWindowPanel);
maximize(maximizePanel,windowContainer)
maximize(newMaximizePanel,newWindowPanel)
minimize(minimizePanel,windowContainer)
minimize(newMinimizePanel,newWindowPanel)
doubleClickToolbar(toolbar,windowContainer)
doubleClickToolbar(newToolbar,newWindowPanel)
windowContainerDrag();


function taskBarBtnActive(file,Window){
  file.addEventListener("click", function () {
    Window.style.transform = "none";
    Window.style.opacity = "1";
    Window.style.display = "flex";
    file.classList.add("buttonActive");
  });
}
taskBarBtnActive(FileExplorer,windowContainer)


// newWindowContainer Drag feature
let offsetX = 0;
let offsetY = 0;
newToolbar.addEventListener("mousedown", (e) => {
  if (isMaximized) return;
  isDragging = true;
  offsetX = e.clientX - newWindowPanel.offsetLeft;
  offsetY = e.clientY - newWindowPanel.offsetTop;
});
newWindowPanel.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  newWindowPanel.style.left = `${e.clientX - offsetX}px`;
  newWindowPanel.style.top = `${e.clientY - offsetY}px`;
});
newWindowPanel.addEventListener("mouseup", () => {
  isDragging = false;
});



const buttons = [oneDrive, download, documentFolder, music];
function panelClick(btn) {
  btn.addEventListener("click", function () {
    buttons.forEach(item => item.classList.remove("active"));
    btn.classList.add("active")
    if(btn.id === "oneDrive"){
      headTag.innerHTML = `<i class="fa-solid fa-cloud text-blue ispace"></i> ${btn.id}`
    }else if(btn.id === "music"){
      headTag.innerHTML = `<i class="fa-solid fa-music text-red ispace"></i>  ${btn.id}`
    }
    else if(btn.id === "download"){
      headTag.innerHTML = `<i class="fa-solid fa-arrow-down text-blue ispace"></i>  ${btn.id}`
    }else if(btn.id === "document"){
      headTag.innerHTML = `<i class="fa-solid fa-file-lines text-yellow ispace"></i> Documents`
    }
    sectionBlock1.classList.add("sectionBlocks")
    sectionBlock2.classList.add("sectionBlocks")
    explorerViewDesktopIcon.classList.remove("explorer-view-desktopIcon-active")
    home.classList.remove("active");
    exploreGallery.style.display = "none"
    empty.style.display = "flex";
    explorerView.classList.add("explorer-view-active");
  });
}
buttons.forEach(btn => panelClick(btn));

home.addEventListener("click", function(){
  home.classList.add("active");
  //  btn.classList.remove("active")
  headTag.innerHTML = `🏠 Home`
  empty.style.display = "none";
  explorerView.style.display = "flex"
  exploreGallery.style.display = "none"
  pictureBtn.style.display = "none"
  exploreVideo.style.display = "none"
  explorerViewDesktopIcon.classList.remove("explorer-view-desktopIcon-active")
  explorerView.classList.remove("explorer-view-active");
    // explorerViewDesktopIcon.style.display = "none"
  sectionBlock1.classList.remove("sectionBlocks")
  sectionBlock2.classList.remove("sectionBlocks")
})
function desktopPanelIcon(){
  const desktopIcon = document.createElement("div");
  desktopIcons.forEach(item =>{
        desktopIcon.innerHTML += `
            <div class="desktopIcon" value="${item.value}">
                  <img src="${item.img}" width="48" alt="">
                  <span>${item.text}</span>
              </div>
            `
  })
  
  explorerViewDesktopIcon.appendChild(desktopIcon);
}
desktopPanelIcon()
desktop.addEventListener("click", function(){
  explorerView.style.display = "none"
  empty.style.display = "none";
  home.classList.remove("active");
  explorerViewDesktopIcon.classList.add("explorer-view-desktopIcon-active")
  exploreGallery.style.display = "none"
  pictureBtn.style.display = "none"
  exploreVideo.style.display = "none"
  headTag.innerHTML = `<i class="fa-solid fa-desktop text-blue ispace"></i> Desktop`
})


gallery.addEventListener("click", function(){
  explorerView.style.display = "none"
  empty.style.display = "none";
  home.classList.remove("active");
  exploreGallery.style.display = "flex"
  pictureBtn.style.display = "none"
  exploreVideo.style.display = "none"
  headTag.innerHTML = `<i class="fa-solid fa-images text-orange ispace"></i> Gallery`
})


pictures.addEventListener("click", function(){
  explorerView.style.display = "none"
  empty.style.display = "none";
  home.classList.remove("active");
  exploreGallery.style.display = "none"
  pictureBtn.style.display = "flex"
  exploreVideo.style.display = "none"
  headTag.innerHTML = `<i class="fa-solid fa-image text-blue ispace"></i> Gallery`
})

video.addEventListener("click", function(){
  explorerView.style.display = "none"
  empty.style.display = "none";
  home.classList.remove("active");
  exploreGallery.style.display = "none"
  pictureBtn.style.display = "none"
  exploreVideo.style.display = "flex"
  headTag.innerHTML = `<i class="fa-solid fa-video text-red ispace"></i> Videos`
})



function openPreview(type, src){
    newWindowPanel.innerHTML = "";
    let element;
    if(type === "image"){
        element = document.createElement("img");
        element.src = src;
        element.style.width = "95%"
        element.style.height = "95%"
        element.style.objectFit = "contain"
    }else{
        element = document.createElement("video");
        element.src = src;
        element.style.width = "95%"
        element.style.height = "95%"
        element.style.objectFit = "contain"
        element.controls = true;
        element.autoplay = true;
    }
    newWindowPanel.appendChild(element);
    newWindowPanel.style.display = "flex";
    newWindowPanel.style.alignItems = "center"
    newWindowPanel.style.justifyContent = "center"
    // Close when clicked
    element.addEventListener("click", () => {
        newWindowPanel.style.display = "none";
        newWindowPanel.innerHTML = "";
    });
}
fileSystem.Pictures.forEach(file => {
    const img1 = document.createElement("img");
    img1.src = file.data;
    img1.width = 100;
    img1.height = 100;
    img1.addEventListener("dblclick", () => {
        openPreview("image", file.data);
    });
    exploreGallery.appendChild(img1);
    const img2 = document.createElement("img");
    img2.src = file.data;
    img2.width = 100;
    img2.height = 100;
    img2.addEventListener("dblclick", () => {
        openPreview("image", file.data);
    });
    pictureBtn.appendChild(img2);
});
fileSystem.Videos.forEach(file => {
    const video1 = document.createElement("video");
    video1.src = file.data;
    video1.width = 100;
    video1.height = 100;
    video1.addEventListener("dblclick", () => {
        openPreview("video", file.data);
    });
    exploreGallery.appendChild(video1);
    const video2 = document.createElement("video");
    video2.src = file.data;
    video2.width = 100;
    video2.height = 100;
    video2.addEventListener("dblclick", () => {
        openPreview("video", file.data);
    });
    exploreVideo.appendChild(video2);
});