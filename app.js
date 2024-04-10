let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset");
let winmsg = document.querySelector(".winmsg");
let msgcontainer = document.querySelector(".msg-container")
let newgame = document.querySelector(".newgame");

let turno = true; //player0,playerx
let count = 0;

let winprobability  = [
    [0,1,2],
    [0,3,6],
    [0,4,7],
    [1,4,7],
    [2,5,8],
    [3,4,5],
    [6,7,8],
    [6,4,2],
]

boxes.forEach((box) =>{
    box.addEventListener(("click"),()=>{
        console.log("button was clicked");
        if(turno){
            box.innerHTML = "O";
            box.style.color = "#fca311"
            turno = false;
        }else{
            box.innerHTML = "X";
            box.style.color = "#03071e"
            turno = true;
        }
        box.disabled = true;
        checkwinner();
        count++;
        let iswinner = checkwinner()
        if(count === 9 && !iswinner){
            gamedraw();
        }
    })
})

const newgamebtn=()=>{
    turno=true;
    enableboxes();
    msgcontainer.style.display="none";
    
}

const disableboxes=()=>{
    for(let box of boxes){
        box.disabled = true;
    }
}

const enableboxes=()=>{
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}

const showwinner =(winner)=>{
    winmsg.innerHTML = `Congratulations, Winner is ${winner}`;
    msgcontainer.style.display = "block";
    disableboxes();

}
const gamedraw =()=>{
    winmsg.innerHTML = "Game Draw";
    msgcontainer.style.display = "block";
    disableboxes();
}

const checkwinner= ()=>{
    for(let pattern of winprobability){
        let pos1val = boxes[pattern[0]].innerText; 
        let pos2val = boxes[pattern[1]].innerText; 
        let pos3val = boxes[pattern[2]].innerText; 
        
        if(pos1val != "" && pos2val != "" && pos3val != ""){
            if(pos1val === pos2val && pos2val===pos3val && pos3val==pos1val){
                console.log("winner is",pos1val);
                showwinner(pos1val);
            }
        }
    }
}

newgame.addEventListener("click",newgamebtn);
reset.addEventListener("click", newgamebtn);