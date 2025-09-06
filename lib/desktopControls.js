const contextMenu = document.getElementById("contextMenu");
const powerOff = document.getElementById("SMLB");
const startMenu = document.getElementById("startMenu");
const startButton = document.getElementById("buttonHolder");
let mouseOnMenu = false;
let isStartOpen = false;

//override default context menu
document.addEventListener('contextmenu', event => event.preventDefault());

function setUp(){
    startMenu.style.display = "none";
}

setUp();

document.addEventListener("mousedown", function(event){
    var buttonCode;
    buttonCode = event.button;

    if(buttonCode != 2){
        if(!mouseOnMenu){  
            contextMenu.style.display = "none";
        }
        return;
    };
    
    var x = event.clientX;
    var y = event.clientY;
    console.log(buttonCode);
    console.log(x, y);

    contextMenu.style.top = y + "px";
    contextMenu.style.left = x + "px";

    contextMenu.style.display = "flex";
});

contextMenu.addEventListener("mouseenter", () => {
    mouseOnMenu = true;
    console.log(mouseOnMenu);
});
contextMenu.addEventListener("mouseleave", () => {
    mouseOnMenu = false;
    console.log(mouseOnMenu);
});

powerOff.addEventListener("click", () => {
    alert("bye bye");
    window.close();
});

startButton.addEventListener("click", openStartMenu)

function openStartMenu(){
    if(!isStartOpen){
        isStartOpen = true;
        startMenu.style.display = "flex";
    }else{
        isStartOpen = false;
        startMenu.style.display = "none";
    }
}