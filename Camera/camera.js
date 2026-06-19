const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const captureBtn = document.getElementById("captureBtn");
const recordBtn = document.getElementById("recordBtn");
const stopBtn = document.getElementById("stopBtn");
const flash = document.getElementById("flash");
const recordingTimer = document.getElementById("recordingTimer");

let mediaRecorder;
let recordedChunks = [];

let timerInterval;
let seconds = 0;


// Virtual File System
let fileSystem = JSON.parse(
    localStorage.getItem("fileSystem")
) || {
    Pictures: [],
    Videos: []
};


// Start Camera
async function startCamera() {

    try {

        const stream =
        await navigator.mediaDevices.getUserMedia({
            video:true,
            audio:true
        });

        video.srcObject = stream;

        mediaRecorder =
        new MediaRecorder(stream);

        mediaRecorder.ondataavailable = (e) => {

            if(e.data.size > 0){
                recordedChunks.push(e.data);
            }

        };

        mediaRecorder.onstop = saveVideo;

    }
    catch(err){

        console.error(err);
        alert("Camera Access Denied");

    }

}

startCamera();


// Capture Image
captureBtn.addEventListener("click", () => {

    flash.classList.add("flash");

    setTimeout(() => {
        flash.classList.remove("flash");
    },200);

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx =
    canvas.getContext("2d");

    ctx.drawImage(
        video,
        0,
        0,
        canvas.width,
        canvas.height
    );

    const imageData =
    canvas.toDataURL("image/png");

    const file = {
        name:`Photo-${Date.now()}.png`,
        type:"image",
        data:imageData,
        created:new Date().toLocaleString()
    };

    fileSystem.Pictures.push(file);

    localStorage.setItem(
        "fileSystem",
        JSON.stringify(fileSystem)
    );

    console.log("Photo Saved");
    console.log(fileSystem);

});


// Start Recording
recordBtn.addEventListener("click", () => {

    if(mediaRecorder.state === "inactive"){

        recordedChunks = [];

        mediaRecorder.start();

        startTimer();

        console.log("Recording Started");

    }

});


// Stop Recording
stopBtn.addEventListener("click", () => {

    if(mediaRecorder.state !== "inactive"){

        mediaRecorder.stop();

        stopTimer();

        console.log("Recording Stopped");

    }

});


// Save Video
function saveVideo(){

    const blob =
    new Blob(recordedChunks,{
        type:"video/webm"
    });

    const reader =
    new FileReader();

    reader.onloadend = () => {

        const file = {
            name:`Video-${Date.now()}.webm`,
            type:"video",
            data:reader.result,
            created:new Date().toLocaleString()
        };

        fileSystem.Videos.push(file);

        localStorage.setItem(
            "fileSystem",
            JSON.stringify(fileSystem)
        );

        console.log("Video Saved");
        console.log(fileSystem);

    };

    reader.readAsDataURL(blob);

    recordedChunks = [];

}


// Recording Timer
function startTimer(){

    seconds = 0;

    recordingTimer.style.display =
    "block";

    timerInterval =
    setInterval(() => {

        seconds++;

        const mins =
        String(Math.floor(seconds / 60))
        .padStart(2,"0");

        const secs =
        String(seconds % 60)
        .padStart(2,"0");

        recordingTimer.textContent =
        `🔴 ${mins}:${secs}`;

    },1000);

}


// Stop Timer
function stopTimer(){

    clearInterval(timerInterval);

    recordingTimer.style.display =
    "none";

}