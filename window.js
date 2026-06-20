const windowIcon = {
  This_PC: {
    img: "img/pc.png",
    left: 16,
    top: 16,
    value: "This_PC",
  },
  Recycle_Bin: {
    img: "img/recycle-bin.png",
    left: 16,
    top: 96,
    value: "Recycle_Bin",
  },
  Chrome: {
    img: "img/chrome.png",
    left: 16,
    top: 176,
    value: "Chrome",
  },
  Kanbon: {
    img: "img/kanbon.png",
    left: 16,
    top: 256,
    value: "Kanbon",
  },
  Snake_Game: {
    img: "img/snake.png",
    left: 16,
    top: 336,
    value: "Snake_Game",
  },
  Image_Editor: {
    img: "img/editor.png",
    left: 16,
    top: 416,
    value: "Image_Editor",
  },
  Spotify: {
    img: "img/spotify.png",
    left: 16,
    top: 490,
    value: "Spotify",
  },
  GitHub: {
    img: "img/github.png",
    left: 96,
    top: 16,
    value: "GitHub",
  },
  LinkedIn: {
    img: "img/linkedin.png",
    left: 96,
    top: 96,
    value: "LinkedIn",
  },
  Bubbles: {
    img: "img/bubbles.png",
    left: 96,
    top: 176,
    value: "Bubbles",
  },
  Camera: {
    img: "img/camera.png",
    left: 96,
    top: 256,
    value: "Camera",
  },
  MicroSoft: {
    img: "img/edge.png",
    left: 96,
    top: 336,
    value: "MicroSoft",
  },
  Notepad: {
    img: "img/notepad.png",
    left: 96,
    top: 416,
    value: "Notepad",
  },
  File_Explorer: {
    img: "img/file.png",
    left: 96,
    top: 490,
    value: "File_Explorer",
  },
};

const screen = document.querySelector(".screen");
const windowBtn = document.querySelector("#windowBtn");
const windowTaskSearch = document.querySelector("#windowTaskSearch");
const sub_screen = document.querySelector(".sub_screen");
const windowContainer = document.querySelector(".window-container");
const startMenu = document.querySelector(".start-menu");
const header = document.createElement("header");
const controlPanel = document.createElement("div");
const minimizeBtn = document.createElement("button");
const maximizeBtn = document.createElement("button");
const closeBtn = document.createElement("button");
const iframe = document.createElement("iframe");
const newWindowPanel = document.createElement("div");
const currentTime = document.querySelector("#currentTime")
const currentDate = document.querySelector("#currentDate")
function createIcon(size,imgSize) {
  Object.keys(windowIcon).forEach((key) => {
    const icon = document.createElement("div");
    icon.classList.add("icon");
    icon.style.left = `${windowIcon[key].left}px`;
    icon.style.top = `${windowIcon[key].top}px`;
    icon.style.width = size;
    icon.style.height = size;
    icon.setAttribute("value", key);
    const img = document.createElement("img");
    img.src = `${windowIcon[key].img}`;
    img.width = imgSize;
    const span = document.createElement("span");
    span.textContent = key;
    icon.appendChild(img);
    icon.appendChild(span);
    document.querySelector(".sub_screen").appendChild(icon);
  });
}
createIcon(`${65}px`,35);

function drag() {
  let currentIcon = null;
  let offsetX = 0;
  let offsetY = 0;
  document.querySelectorAll(".icon").forEach((icon) => {
    icon.addEventListener("mousedown", (e) => {
      currentIcon = icon;
      offsetX = e.clientX - icon.offsetLeft;
      offsetY = e.clientY - icon.offsetTop;
    });
  });
  document.addEventListener("mousemove", (e) => {
    if (!currentIcon) return;
    currentIcon.style.left = `${e.clientX - offsetX}px`;
    currentIcon.style.top = `${e.clientY - offsetY}px`;
  });
  document.addEventListener("mouseup", () => {
    currentIcon = null;
  });
}

drag();

let enabled = false;
windowBtn.addEventListener("click", function () {
  startMenu.classList.toggle("activeFlex");
});

windowTaskSearch.addEventListener("input", function (e) {
  const icons = document.querySelectorAll(".icon");
  icons.forEach((icon) => {
    const name = icon.querySelector("span").textContent;
    if (name.toLowerCase().includes(e.target.value.toLowerCase())) {
      icon.classList.add("icon-hover");
    } else if (e.target.value.toLowerCase() == null) {
      icon.classList.remove("icon-hover");
    } else {
      icon.classList.remove("icon-hover");
    }
    screen.addEventListener("click", function () {
      icon.classList.remove("icon-hover");
      windowTaskSearch.value = "";
    });
  });
});



function createIconPanel(source){
  // console.log(source)
  header.className = "newToolbar";
  header.id = "newToolbar";
  controlPanel.className = "newControlPanel";
  minimizeBtn.id = "newMinimizePanel";
  minimizeBtn.textContent = "−";
  maximizeBtn.id = "newMaximizePanel";
  maximizeBtn.textContent = "▢";
  closeBtn.id = "newClosePanel";
  closeBtn.textContent = "✕";
  controlPanel.append(minimizeBtn, maximizeBtn, closeBtn);
  header.appendChild(controlPanel);
  iframe.src = source;
  iframe.className = "newWindowMain";
  newWindowPanel.className = "newWindowPanel";
  newWindowPanel.append(header, iframe);
  screen.appendChild(newWindowPanel);
}

createIconPanel("/Spotify/index.html")
function createTaskbarButton(id, imgSrc) {
    const btn = document.createElement("div");
    btn.className = "taskbar-btn";
    btn.id = id;
    const img = document.createElement("img");
    img.src = imgSrc;
    btn.appendChild(img);
    return btn
}

let task = createTaskbarButton("Chrome","img/chrome.png");
document.querySelector(".taskbar-center").appendChild(task)

function closetaskBtn(closeBtn, windowPanel, taskbarBtn) {
    closeBtn.addEventListener("click", () => {
        windowPanel.remove();
        if (taskbarBtn) {
            taskbarBtn.remove();
        }
    });
}

sub_screen.addEventListener("dblclick", function (e) {
  const icon = e.target.closest(".icon");
  if (!icon) return;
  if (icon.getAttribute("value") == "This_PC" || icon.getAttribute("value") == "File_Explorer") {
    windowContainer.style.display = "flex";
    FileExplorer.classList.add("buttonActive");
  } else if (icon.getAttribute("value") == "Spotify") {
    newWindowPanel.style.display = "flex";
    createIconPanel("Spotify/spotify.html")
    task = createTaskbarButton("Spotify","img/spotify.png");
    task.classList.add("buttonActive")
    document.querySelector(".taskbar-center").appendChild(task)
    closetaskBtn(newClosePanel,newWindowPanel,task);
    taskBarBtnActive(task,newWindowPanel)
  }
  else if (icon.getAttribute("value") == "Kanbon") {
    newWindowPanel.style.display = "flex";
    createIconPanel("KanbanBoard/kanbon.html")
    task = createTaskbarButton("Kanbon","img/kanbon.png");
    task.classList.add("buttonActive")
    document.querySelector(".taskbar-center").appendChild(task)
    closetaskBtn(newClosePanel,newWindowPanel,task);
    taskBarBtnActive(task,newWindowPanel)
  }
  else if (icon.getAttribute("value") == "Snake_Game") {
    newWindowPanel.style.display = "flex";
    createIconPanel("SnakeGame/snake.html")
    task = createTaskbarButton("Snake_Game","img/snake.png");
    task.classList.add("buttonActive")
    document.querySelector(".taskbar-center").appendChild(task)
    closetaskBtn(newClosePanel,newWindowPanel,task);
    taskBarBtnActive(task,newWindowPanel)
  }
  else if (icon.getAttribute("value") == "Image_Editor") {
    newWindowPanel.style.display = "flex";
    createIconPanel("Image-Editor/editor.html")
    task = createTaskbarButton("Image_Editor","img/editor.png");
    task.classList.add("buttonActive")
    document.querySelector(".taskbar-center").appendChild(task)
    closetaskBtn(newClosePanel,newWindowPanel,task);
    taskBarBtnActive(task,newWindowPanel)
  }
  else if (icon.getAttribute("value") == "Bubbles") {
    newWindowPanel.style.display = "flex";
    createIconPanel("BubbleGame/bubble.html")
    task = createTaskbarButton("Bubbles","img/bubbles.png");
    task.classList.add("buttonActive")
    document.querySelector(".taskbar-center").appendChild(task)
    closetaskBtn(newClosePanel,newWindowPanel,task);
    taskBarBtnActive(task,newWindowPanel)
  }
  else if(icon.getAttribute("value") == "Notepad"){
    newWindowPanel.style.display = "flex";
    createIconPanel("Notepad/notepad.html")
    task = createTaskbarButton("Notepad","img/notepad.png");
    task.classList.add("buttonActive")
    document.querySelector(".taskbar-center").appendChild(task)
    closetaskBtn(newClosePanel,newWindowPanel,task);
    taskBarBtnActive(task,newWindowPanel)
  }
   else if(icon.getAttribute("value") == "Camera"){
    newWindowPanel.style.display = "flex";
    createIconPanel("Camera/camera.html")
    task = createTaskbarButton("Camera","img/camera.png");
    task.classList.add("buttonActive")
    document.querySelector(".taskbar-center").appendChild(task)
    closetaskBtn(newClosePanel,newWindowPanel,task);
    taskBarBtnActive(task,newWindowPanel)
  }
  else if(icon.getAttribute("value") == "Chrome"){
    window.open("https://www.google.com/search?q=sheriyans+coding+school&sca_esv=3750d84e3b6f83f6&sxsrf=APpeQnsRiT-eFwhT6Dx1DZcSn87F-UVzyA%3A1781881322544&source=hp&ei=6lk1atGbHdacseMPsKn3qAY&iflsig=ABILxe8AAAAAajVn-oOmOTTnrv7MkqS41RvIYM5bLTP4&oq=sh&gs_lp=Egdnd3Mtd2l6IgJzaCoCCAAyBBAjGCcyChAjGIAEGIoFGCcyFBAuGMcBGJECGLEDGNEDGIAEGIoFMggQABiABBixAzIIEC4YgAQYsQMyCBAAGIAEGLEDMhEQLhiABBixAxiDARjHARjRAzIIEC4YgAQYsQMyCBAuGIAEGLEDMgsQLhiABBjHARjRA0iKH1D8DVjkEHABeACQAQCYAesBoAGHA6oBBTAuMS4xuAEByAEA-AEBmAIDoALSA6gCCsICEBAjGJ0GGOgGGN0FGOoCGCfCAgcQIxjqAhgnwgINEC4YxwEY0QMY6gIYJ8ICCxAAGIAEGLEDGIMBwgIFEAAYgATCAg4QLhiABBixAxjHARjRA8ICFBAuGIAEGIoFGI0GGLEDGMcBGNEDmAM88QVku1R-YRQy35IHBTEuMS4xoAebF7IHBTAuMS4xuAeWA8IHBTItMi4xyAcbgAgB&sclient=gws-wiz","_black")
  }
   else if(icon.getAttribute("value") == "LinkedIn"){
    window.open("https://www.linkedin.com/in/amit-kumar-0329b226b/","_black")
  }
   else if(icon.getAttribute("value") == "GitHub"){
    window.open("https://github.com/Amitkumar-art2004","_black")
  }
  else if(icon.getAttribute("value") == "MicroSoft"){
    window.open("https://www.microsoft.com/en-us/edge/download?msockid=361a45d0d5e36c742cf652e6d4816dc0&form=MA13FJ","_black")
  }
});


function startResize(e) {
  e.preventDefault();

  const dir = [...e.target.classList].find((cls) => cls !== "resize");

  const startX = e.clientX;
  const startY = e.clientY;

  const startWidth = windowContainer.offsetWidth;
  const startHeight = windowContainer.offsetHeight;

  const startLeft = windowContainer.offsetLeft;
  const startTop = windowContainer.offsetTop;

  function resize(e) {
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;

    let width = startWidth;
    let height = startHeight;
    let left = startLeft;
    let top = startTop;

    if (dir.includes("e")) width = startWidth + dx;

    if (dir.includes("s")) height = startHeight + dy;

    if (dir.includes("w")) {
      width = startWidth - dx;
      left = startLeft + dx;
    }

    if (dir.includes("n")) {
      height = startHeight - dy;
      top = startTop + dy;
    }

    if (width > 400) {
      windowContainer.style.width = width + "px";
      windowContainer.style.left = left + "px";
    }

    if (height > 300) {
      windowContainer.style.height = height + "px";
      windowContainer.style.top = top + "px";
    }
  }

  function stopResize() {
    document.removeEventListener("mousemove", resize);
    document.removeEventListener("mouseup", stopResize);
  }

  document.addEventListener("mousemove", resize);
  document.addEventListener("mouseup", stopResize);
}

document.querySelectorAll(".resize").forEach((handle) => {
  handle.addEventListener("mousedown", startResize);
});
const date = new Date();

const hours = String(date.getHours()).padStart(2, "0");
const minute = String(date.getMinutes()).padStart(2, "0");
const day = String(date.getDate()).padStart(2, "0");
const month = String(date.getMonth() + 1).padStart(2, "0");
const year = date.getFullYear();

currentTime.innerHTML = `${hours}:${minute}`;
currentDate.innerHTML = `${day}-${month}-${year}`;