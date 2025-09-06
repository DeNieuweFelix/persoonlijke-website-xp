const clickAudio = new Audio("sounds/main/click.mp3");
console.log(clickAudio);

document.addEventListener("mousedown", () => {
    console.log("meow :3");

    clickAudio.currentTime = 0;
    clickAudio.play();
});
