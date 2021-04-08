function drawChecker(){
  let mainBlock=document.querySelector('.main-block');
  let block;
  let flag=true;
  let countRow=10
  let countCol=10
  let cnt=0
  let getPosition
  for (let i=0;i<10; i++){
    countRow+=i
    for(let j=0;j<10;j++){
      countCol+=j
      if (j==0) flag=!flag
      block=document.createElement('div');
      if(i==0)
        block.id=i+j+1;
      else {
        block.id=10*i+j+1;
      }
      if (flag) block.className='block black ';
      else block.className='block white ';

      mainBlock.appendChild(block);
      flag=!flag;
    }
  }
  

}
drawChecker();


function gameGetMethod(number){
    var xhr= new XMLHttpRequest();
    let url=new URL("http://dotGame21.std-400.ist.mospolytech.ru/get.ajax.php");
    url.searchParams.set("game",number);
    xhr.open("GET",url,false);
    xhr.send();
    //console.log(xhr.status);
    arr=JSON.parse(xhr.responseText);
    return arr;
   
}
function gameGetPostMethod(number,col,row,user){
   var xhr= new XMLHttpRequest();
    let url=new URL("http://dotGame21.std-400.ist.mospolytech.ru/add.ajax.php");
    url.searchParams.set("col",Number.parseInt(col));
    url.searchParams.set("row",Number.parseInt(row));
    url.searchParams.set("user",user) 
    url.searchParams.set("game",Number.parseInt(number));
    xhr.open("GET",url,false);
    xhr.send();
    arr=JSON.parse(xhr.responseText);
    return arr;
    //console.log(JSON.parse(xhr.responseText));
}
 function printPosition(number,color){
  arr=gameGetMethod(number);
  str="";
  if(arr.lenght==0) 
    document.getElementById("empty").innerHTML="Not point found";
  //console.log(arr.lenght)
  for(i in arr){
    str=(arr[i].ROW%8)+(arr[i].COL%8)
    var N = 255;
    var randomArray = Array(N).fill(0).map((x,i) => i + 1).sort(() => Math.random() - 0.5);
    white=Math.floor(Math.random()*255)
    white=0?white=1:white=white
    red=Math.floor(Math.random()*255)
    red=0?red=2:red=red
    blue=Math.floor(Math.random()*255)
    blue=0?blue=3:blue=blue
    color="rgb("+randomArray[white]+","+randomArray[red]+","+randomArray[blue]+")";
    try{
      if (document.getElementById(str).style.backgroundColor===""){
        document.getElementById(str).style.backgroundColor=color;
        document.getElementById("empty").innerHTML="Игрок "+arr[i].USER;
      }
        
    }catch(e){

    }
  }
 
}
function fullTable(el){
    var a=document.getElementsByClassName("main-block");
    var N = 255;
    var randomArray = Array(N).fill(0).map((x,i) => i + 1).sort(() => Math.random() - 0.5);
    white=Math.floor(Math.random()*255)
    white=0?white=1:white=white
    red=Math.floor(Math.random()*255)
    red=0?red=2:red=red
    blue=Math.floor(Math.random()*255)
    blue=0?blue=3:blue=blue
    color="rgb("+randomArray[white]+","+randomArray[red]+","+randomArray[blue]+")";
    try{
      if (a[0].childNodes[el].style.backgroundColor===""){
          a[0].childNodes[el].style.backgroundColor=color;
        document.getElementById("empty").innerHTML="Игрок компьютер";
      }
        
    }catch(e){

    }
 
}

function isTableFull(){
  var mydiv=document.getElementsByClassName('main-block');
  countEl=0;
  for(i in mydiv[0].childNodes){
    //console.log(mydiv[0].childNodes[i].style.backgroundColor)
    //console.log(countEl);
    try{
       if(mydiv[0].childNodes[i].style.backgroundColor!=="")
        countEl+=1
        if(countEl>=64){
          return countEl;
          //for(i in mydiv[0].childNodes)
            //mydiv[0].childNodes[i].style.backgroundColor="transparent"
      }   
    }catch(e){

    }
  }
  
}

function intervalisTableFull(){

}
 var intervalisTableFull = window.setInterval(function(){
    
  if(isTableFull()>=64){
  //console.log("in if")
  var mydiv=document.getElementsByClassName('main-block');
  mydiv[0].innerHTML="";
  drawChecker();
  }
else{
    var intervalId = window.setInterval(function(){
    arr=["red","blue","yellow","pink"]
    printPosition(Math.floor(Math.random()*50),arr[Math.floor(Math.random()*4)]);
  }, 1000);
  var intervalFullPoint = window.setInterval(function(){
    var N = 100;
    var randomArray = Array(N).fill(0).map((x,i) => i + 1).sort(() => Math.random() - 0.5);
    var index=Math.floor(Math.random()*100)
    index=0?index=1:index=index;
   fullTable(randomArray[index]);
  }, 6000);
}



}, 7000);