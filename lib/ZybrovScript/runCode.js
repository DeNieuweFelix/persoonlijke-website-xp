const input = document.getElementById("ZS-input");
const output = document.getElementById("ZSp-output");

//variables

let vars = [
    [
        0,
        0,
        0,
    ],
    [
        "",
        "",
        "",
    ],
    [
        false,
        false,
        false
    ]
];

function resetVars(){
    vars = [
        [
        0,
        0,
        0,
    ],
    [
        "",
        "",
        "",
    ],
    [
        false,
        false,
        false
    ]

    ];
}

let totalTime;
function runZScode(){

    resetVars();
    ZSoutput("", true);

    const start = Date.now();

    let code = input.value;
    const allSyntax = [];
    console.log(code);

    let seperateLines = code.split("~");

    for(let i = 0; i < seperateLines.length; i++){
        seperateLines[i] = seperateLines[i].replace("\n", "");
    }

    for(const line of seperateLines){
        allSyntax.push(line.split(" "));
    }

    console.log("arrays:")
    console.log(seperateLines);
    console.log(allSyntax);
    console.log("\n");

    count = 0;
    for(const x of allSyntax){
        console.log(x);
        

        if(x[0].includes("SetVar")){

            if(x.length > 2){
                console.log("too many arguments!");
                ZSerror("", 1, count);
                return;
            }

            var a = (x[0].replace("SetVar(", "")).replace(")", "");

            console.log(x[0]);
            let b;
            let c;
            console.log(a);

            var BC = getType(a);
            b = BC[0];
            c = BC[1];

            console.log(b);
            if(c > 2){
                console.log("var number too high!");
                return;
            }
            
            let proceed = false;

            if(c == 2){
                if(x[1] == "true"){
                    x[1] = true;
                }else if(x[1] == "false"){
                    x[1] = false;
                }else{
                    return;
                }
            }
            if(c == 0){
                x[1] = parseInt(x[1]);
            }

            console.log(x[1]);
            console.log("var type: " + typeof x[1]);

            switch(c){
                case 0:
                    if(typeof x[1] == "number"){
                        proceed = true;
                    }
                    break;
                case 1:
                    if(typeof x[1] == "string"){
                        proceed = true;
                    }
                    break;
                case 2:
                    if(typeof x[1] == "boolean"){
                        proceed = true;
                    }
                    break;
                default:
                    proceed = false;
                    break;
            }
            
            console.log(proceed);
            if(!proceed){return;};

            console.log("prev. value: " + vars[c][b]);
            vars[c][b] = x[1];
            console.log("new value: " + vars[c][b]);

            console.log("all values: " + vars);

        }else if(x[0].includes("ClearVar")){

            if(x.length > 1){
                console.log("too many arguments!");
                ZSerror("", 1, count);
                return;
            }

            var a = (x[0].replace("ClearVar(", "")).replace(")", "");

            var BC = getType(a);
            const b = BC[0];
            const c = BC[1];

            let newVal;

            switch(c){
                case 0:
                    newVal = 0;
                    break;
                case 1:
                    newVal = "";
                    break;
                case 2:
                    newVal = false;
                    break;
                default:
                    newVal = undefined;
                    break;
            }

            console.log("old values: " + vars[c][b]);

            vars[c][b] = newVal;

            console.log("new values: " + vars[c][b]);
        }else if(x[0].includes("LogVar")){
            
            if(x.length > 1){
                console.log("too many arguments!");
                ZSerror("", 1, count);
                return;
            }

            var a = (x[0].replace("LogVar(", "")).replace(")", "");

            var BC = getType(a);
            const b = BC[0];
            const c = BC[1];

            ZSoutput((vars[c][b]).toString());
        }else if(x[0].includes("CombVar")){
            
            if(x.length > 3){
                console.log("too many arguments!");
                ZSerror("", 1, count);
                return;
            }

            if(x.length < 3){
                console.log("not enough arguments!")
                ZSerror("CombVar NEEDS 3 arguments to work!!!");
                return;
            }

            var a = (x[0].replace("CombVar(", "")).replace(")", "");

            var BC = getType(a);
            const b = BC[0];
            const c = BC[1];

            if(c == 2){
                ZSerror("Booleans cannot be combined!!!");
                return;
            }

            var DE = getType(x[1]);
            var FG = getType(x[2]);

            console.log(DE, FG);

            if(DE[1] != c || FG[1] != c){
                ZSerror("invalid data types to combine!");
                return;
            }

            let val1 = vars[DE[1]][DE[0]];
            let val2 = vars[FG[1]][FG[0]];
            let val3;

            if(c == 0){
                val1 = val1.toString();
                val2 = val2.toString();
            }

            console.log("values to combine: " + val1, val2);
            val3 = val1 + val2;
            console.log("final value: " + val3);

            if(c == 0){
                val3 = parseInt(val3);
            }

            console.log("old values: " + vars[c][b]);
            
            vars[c][b] = val3;

            console.log("new values: " + vars[c][b]);

        }

        count++;
    }
    const end = Date.now();
    totalTime = end - start;

    ZSoutput("", false, true, totalTime);
}


function getType(a){
    let b;
    let c;

    if(a.includes("int")){

        console.log("setting value of int! :3");
        b = parseInt(a.replace("int", ""));
        c = 0;

    }else if(a.includes("str")){

        console.log("setting value of string! :3");
        b = parseInt(a.replace("str", ""));
        c = 1;

    }else if(a.includes("bool")){

        console.log("setting value of bool! :3");
        b = parseInt(a.replace("bool", ""));
        c = 2;
        
    }else{
        console.log("error, value type not valid!!!");
    }

    return([b, c]);
            
}

function ZSoutput(string, clear = false, finishMessage = false, finalTime = 0){
    if(clear){
        output.innerHTML = "";
        return;
    }
    if(finishMessage){
        output.innerHTML += "<p class='ZSfinish'> Executed in: " + finalTime + " MS</p>";
        return;
    }

    output.innerHTML += "<p> >"+(string + "\n")+"</p>";
    
}

function ZSerror(string = "", errorType = 0, line = 0){
    if(string != ""){
        output.innerHTML += "<p class='ZSerror'>"+(string + "\n")+"</p>";
        return;
    }

    let text;
    if(errorType != 0){
        switch(errorType){
            case 1:
                text = "Too many arguments! [at line "+ line + "]";
                break;
            default:
                text = "unknown error, my bad!";
                break;
        }
    }
    output.innerHTML += "<p class='ZSerror'>"+(text + "\n")+"</p>";
}
