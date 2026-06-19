let bottom = document.querySelector(".bottom");
var sco = 0
var random = 0
function makeBubble(){
    var bubble = ""
    for(let i =0 ;i<140;i++){
        random = Math.floor(Math.random()*10)
        bubble += `<div class="bubble">${random}</div>`
    }
    bottom.innerHTML = bubble
}
function timer(){
    var time = 60
    setInterval(function(){
        if(time>0){
            time--;
           document.querySelector(".timer").textContent = time
        }else{
            clearInterval(time)
            bottom.innerHTML = "Game Over"
        }
    },1000)
}
function makeHit(){
    let rn = Math.floor(Math.random()*10)
    document.querySelector(".hit").textContent = rn
}
function score(){
    sco += 10
    document.querySelector(".score").textContent = sco
}

bottom.addEventListener("click", function(dets){
    var num = Number(dets.target.textContent);
    var hit = Number(document.querySelector(".hit").textContent);

    if(num === hit){
        score();
        makeBubble();
        makeHit();
    }
})

makeBubble()
timer()

