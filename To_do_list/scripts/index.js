let buttonClik=document.getElementById("button_do");
let buttonRemove=document.getElementById("clearAll");
let TODO=document.getElementById("todoList");
let legitCheck=document.getElementById("do_intext");
let findElem=document.querySelector(".todo-list-search");


buttonClik.addEventListener("click",(e)=>{
e.preventDefault();
if(legitCheck.value!=="")  
{
newTask(legitCheck.value);
legitCheck.value = "";
}
else return null;
}
)


function newTask(newVal)
{
let ICONCLASS=document.createElement("i");
ICONCLASS.classList.add("icon-cancel");

let newEl=document.createElement("div");
let date=new Date();
let tmp1=date.getMinutes();
let tmp2=date.getSeconds();
let tmp3=date.getMonth()+1;
if(tmp3<10) tmp3="0"+tmp3;
tmp1<10?tmp1="0"+tmp1:tmp1=tmp1+"";
tmp2<10?tmp2="0"+tmp2:tmp2=tmp2+"";

const dateText = `${date.getDate()}-${tmp3}-${date.getFullYear()} Time:${date.getHours()}:${tmp1}:${tmp2}`;
newEl.innerHTML=`<p>${dateText} <br> <p class="textElem">${newVal}<p></p>`;
newEl.appendChild(ICONCLASS);
TODO.appendChild(newEl);
}



TODO.addEventListener("click",(e)=>{
let toRemove=e.target.closest(".icon-cancel");
if(toRemove) toRemove.parentNode.remove();
})



findElem.addEventListener("input",()=>{
let allNotes=document.querySelectorAll(".todo-list div")

allNotes.forEach((e)=>{
if((e.querySelector(".textElem").innerText.indexOf(findElem.value))===-1) e.style.display="none";
else e.style.display="";
})

})

legitCheck.addEventListener("keyup",(e)=>{
if(e.keyCode==13)
{ 
e.preventDefault();
buttonClik.click();
}
})

buttonRemove.addEventListener("click",(e)=>{
e.preventDefault();
let allNotes=document.querySelectorAll(".todo-list div");
if(allNotes.length) 
{
allNotes.forEach((eachDiv)=>{
eachDiv.remove();
})
}
})