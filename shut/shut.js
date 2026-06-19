const startMenuSearch = document.querySelector("#startMenuSearch");
const searchPanel = document.querySelector(".search-panel");
const searchBar = document.querySelector("#searchBar")
function showResult(arr){
    searchContent.innerHTML = ""
    arr.forEach(element => {
        searchContent.innerHTML = `
            <div class="left-panel">
                <h3>Best match</h3>
                <div class="best-match">
                    <img src="${windowIcon[element].img}">
                    <div>
                        <h4>${element}</h4>
                        <span>App</span>
                    </div>
                </div>
            </div>
            <div class="right-panel">
                <img src="${windowIcon[element].img}" class="app-logo">
                <h1>${element}</h1>
                <p>App</p>
                <div class="actions">
                    <div class="action">↗ Open</div>
                    <div class="action">📌 Pin to Start</div>
                    <div class="action">📍 Pin to Taskbar</div>
                    <div class="action">⚙ App Settings</div>
                    <div class="action">🗑 Uninstall</div>
                </div>
            </div>
        `;
    });
    searchPanel.appendChild(searchContent)
}
startMenuSearch.addEventListener("input", function (e) {
  searchPanel.style.display = "block";
  searchBar.value  = e.target.value
  let Icons = Object.keys(windowIcon).filter(function (icon) {
        return icon.toLowerCase()
        .includes(e.target.value.toLowerCase());
    });
    if (Icons.length > 0) {
        showResult(Icons)
    } 
});
searchPanel.addEventListener("click", function(){
  searchPanel.style.display = "none";
})
const searchContent = document.createElement("div");
searchContent.className = "search-content";

