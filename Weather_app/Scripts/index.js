let SearchMenu=document.getElementById("main");
let ResultMenu=document.getElementById("main_weather");
let appID='dbbb7b30bf96e408347dc635f1972e38';
let system='Metric';
let InputValue=document.getElementById("typing");
let Complete=document.getElementById('completion');
let filler=document.querySelector('.complete');
let SelectedValue=document.querySelector(".Selected");



SearchMenu.hidden=true;

window.addEventListener("load", function() 
{
  setTimeout(function () 
  {
let destroyer= document.getElementById("loading_screen");
document.body.removeChild(destroyer);
SearchMenu.hidden=false;
InputValue.focus();

  },1000)
})


const endpoint='https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
const cities=[];

fetch(endpoint)
.then(blob=>blob.json())
.then(data=>cities.push(...data))

////////////////////////////////
function matches(pattern,cities) 
{
return cities.filter(place=>{
const regular=new RegExp(`^${pattern}`,'gi');
return place.city.match(regular);
})
}
//////////////////////////////////////
//////////////////////////////////
function display_matches() 
{
  filler.hidden=false;
  const matchArray=matches(this.value,cities);
  let i=0;
  const insertion=matchArray.map((place)=>{
i++;
if(i<4)
return `

<li>
<span class="card card-body mb-1 name ">${place.city}</span>
</li>
`
}).join('');
filler.innerHTML=insertion;
if(!(/[a-zA-Z]/.test(InputValue.value))) 
{
  filler.innerHTML="";
  filler.hidden=true;
}
else 
{
for(let j=0;j<=4;j++){
  if(Complete.children[j]!=undefined) 
  Complete.children[j].addEventListener('click',()=>{InputValue.value=document.getElementById('completion').children[j].innerText})
}
if(Complete.children[0]==undefined) 
Complete.hidden=true;
}


InputValue.addEventListener("keyup",(e)=>{
  if(InputValue.value!=="")
  {
    let listHolder=document.querySelectorAll(".complete> li ");
  
  if(e.keyCode===40) //keydown
  {
    let IteratorDown=0;
    for(let i=0;i<listHolder.length;i++)
    {
      if ( listHolder[i].classList.contains("Selected") )
      {
      listHolder[i].classList.remove("Selected");  //usuwa klase
      break;
      }
      ++IteratorDown;
    }
   

    // 1.nie mamy żadnego selecta wybranego=iterator 3
    // 2.mamy wybrane  0,1 iterator 0,1
    // 3.jestemy na elemencie 2 iterator 2
    
  if( IteratorDown>=listHolder.length-1 ) listHolder[0].classList.add("Selected");
  else listHolder[IteratorDown+1].classList.add("Selected");
  SelectedValue=document.querySelector(".Selected");
  }
  
  else if(e.keyCode===38) //strzalka w gore
  {
    //szukamy selecta i usuwamy,a zapamietany poprzednik staje sie selectem,jesli <0,to [2]
    let IteratorUp=0;
    
    for(let j=0;j<listHolder.length;j++)
    {
      if ( listHolder[j].classList.contains("Selected") )
      {
      listHolder[j].classList.remove("Selected");  //usuwa klase
      break;
      }
      ++IteratorUp;
    }
    if( !IteratorUp ) listHolder[listHolder.length-1].classList.add("Selected");
    else listHolder[IteratorUp-1].classList.add("Selected");
    SelectedValue=document.querySelector(".Selected");
  }
}});
  
}


InputValue.addEventListener("keyup", display_matches);
document.addEventListener("keyup",(e)=>{  
if(e.keyCode===13 && ResultMenu.hidden===true) 
{
InputValue.value=SelectedValue.children[0].innerText;
document.querySelector(".to_go").click();
}
});

function load_data() 
{
  for(let i=0;i<=4;i++) 
 {
  if(Complete.children[i]!=undefined) 
  Complete.children[i].hidden=true;
 }
 Complete.hidden=true;
 let searchTerm=InputValue.value;
 searchWeather(searchTerm);
}

SearchMenu.addEventListener("click",()=>{Complete.hidden=true;});


function searchWeather (city) 
{
  fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${appID}&units=${system}`).then(result=>{
//catch i zarzdzanie errorem  
if (result.status !==200 ) {
  if(result.status ===404)
  throw new Error("404 response");
  else throw new Error("400 response")
  return;
}
else
  {
  result.json().then(result2=>{
    init(result2,city);
    })
  }
}).catch(err=>{console.log(err);
  InputValue.value="";
  return;
})

 }

function init(ServerResult,cityName) 
{
 let UpCity=cityName[0].toUpperCase()+cityName.slice(1); 
let temprature_norm=ServerResult.main.temp;
let temprature_min=ServerResult.main.temp_min;
let temprature_max=ServerResult.main.temp_max;
let CityFull=document.createElement("p");
CityFull.innerHTML=UpCity;
let child_tempmax=document.createElement("p");
child_tempmax.innerHTML=`${temprature_max}°C`;
let child_tempmin=document.createElement("p");
child_tempmin.innerHTML=`${temprature_min}°C`;
let child_temp_norm=document.createElement("p");
child_temp_norm.innerHTML=`${temprature_norm}°C`;
let temp_catch=[];
for(let i=1;i<4;i++) 
{
  temp_catch[i]=document.getElementById(`holder${i}`);
}
temp_catch[1].appendChild(child_tempmax);
temp_catch[2].appendChild(child_tempmin);
temp_catch[3].appendChild(child_temp_norm);
ResultMenu.insertBefore(CityFull,temp_catch[1].parentElement);

SearchMenu.hidden=true;
ResultMenu.hidden=false;

CityFull.addEventListener("click",(e)=>{
e.preventDefault();
child_temp_norm.remove();
child_tempmax.remove();
child_tempmin.remove();
CityFull.remove();
InputValue.value="";
ResultMenu.hidden=true;
SearchMenu.hidden=false;
InputValue.focus();
})
}


