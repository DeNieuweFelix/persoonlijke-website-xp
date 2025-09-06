import { apps } from './applicationsList.js';

const desktop = document.getElementById("desktop");

//create apps
for(const a of apps){
    console.log("Trying to create new object!");
    console.log(a);

    //create new element
    const holder = document.createElement("div");
    const image = document.createElement("img");
    const name = document.createElement("p");

    image.src = `img/app-icons/${a.image}`;
    name.innerHTML = a.name;

    holder.appendChild(image);
    holder.appendChild(name);

    desktop.appendChild(holder);

    holder.setAttribute("id", a.ID);
    holder.classList.add("desktopApp");
    holder.setAttribute("title", `:3//apps/${a.name}`);

    //click-register stuff and stuff
    holder.addEventListener("click", () => {
        holder.addEventListener("click", doubleClick);
        setTimeout(() => {
            holder.removeEventListener("click", doubleClick)
        }, 300);
    })
}

function doubleClick(){
    console.log("double click!");
    document.body.style.cursor = 'url("../img/cursors/default_busy.cur"), pointer';

    const timeOutRan = Math.floor(Math.random() * 600);
    console.log(timeOutRan);

    setTimeout(() => {
        document.body.style.cursor = 'url("../img/cursors/default_arrow.cur"), pointer';
    }, timeOutRan);
}

