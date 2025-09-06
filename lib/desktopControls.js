const contextMenu = document.getElementById("contextMenu");

//override default context menu
document.addEventListener('contextmenu', event => event.preventDefault());

function openContext(){

}

document.addEventListener("mousedown", function(event){
    var buttonCode;
    buttonCode = event.button;

    if(buttonCode != 2){return;};
    
    var x = event.clientX;
    var y = event.clientY;
    console.log(buttonCode);
    console.log(x, y);

    contextMenu.style.top = y + "px";
    contextMenu.style.left = x + "px";

    contextMenu.style.display = "flex";
});
    