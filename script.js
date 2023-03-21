const slider=document.querySelector("[data-lengthslider]");
const lengthnumber=document.querySelector("[data-lengthnumber]");
const passwordisplay=document.querySelector("[data-passwordisplay]");
const copybtn=document.querySelector("[data-copy]");
const copymsg=document.querySelector("[data-copymsg]");
const uppercasecheck=document.querySelector("#uppercase");
const lowercasecheck=document.querySelector("#lowercase");
const numbercheck=document.querySelector("#number");
const symbolcheck=document.querySelector("#symbols");
const indicator=document.querySelector("[data-indicator]");
const generatebtn=document.querySelector(".generatebtn");
const allcheckbox=document.querySelectorAll("input[type=checkbox]");
let symbol="*/+~`-&%#@]${}[]()";

let password="";
let passwordlength=10;
let checkcount=1;
//set strength color into gray
setindicator("#ccc");
handleslider();

function handleslider(){
    slider.value=passwordlength;//slider will be at 10;
    lengthnumber.innerText=passwordlength;//number has to be 10
    const min=slider.min;
    const max=slider.max;
    slider.style.backgroundSize = ( (passwordlength-min)*100/(max-min)) + "% 100%";
}

function setindicator(color){
   indicator.style.backgroundColor=color;
    indicator.style.boxShadow= '0px 0px 12px 1px ${color}';
   
}

function getRandomInteger(min,max){
    return Math.floor(Math.random()*(max-min))+min;
}

function getRandomNumber(){
    return getRandomInteger(0,9);
}

function getRandomLowerCase(){
    
    return String.fromCharCode(getRandomInteger(97,123));
}

function getRandomUpperCase(){
    return String.fromCharCode(getRandomInteger(65,91));
}
 function getSymbols(){
    const randnumb=getRandomInteger(0,symbol.length);
    return symbol.charAt(randnumb);
}
function calStrength(){
   let hasupper=false;
   let haslower=false;
   let hassymbol=false;
   let hasnumber=false;

   if(uppercasecheck.checked) 
   hasupper = true;
   if(lowercasecheck.checked)
    haslower = true;
   if(numbercheck.checked)
    hasnumber = true;
   if(symbolcheck.checked) 
   hassymbol = true;

   if(hasupper && haslower && hasnumber && hassymbol && passwordlength>=8)
   {
   setindicator("#0f0");
   }
   else if(hasupper && haslower && (hasnumber || hassymbol) && passwordlength>=6)
   {
    setindicator("#ff0");
   }
   else{
    setindicator("#f00");
   }
}


async function copyContent(){
   
    try{
        await navigator.clipboard.writeText(passwordisplay.value);
        copymsg.innerText="copied";
    }
    catch(e){
        copymsg.innerText="failed";

    }
    //to make copy wala span visible
    copymsg.classList.add("active");
    setTimeout(()=>{
        copymsg.classList.add("active");
    },2000);
}

slider.addEventListener("input",(e)=>{
  passwordlength=e.target.value;
  handleslider();
});

copybtn.addEventListener('click',() => {
  if(passwordisplay.value)
    copyContent();
})

function handlecheckboxchange(){
    checkcount=0;
    allcheckbox.forEach((checkbox)=>{
        if(checkbox.checked)
         checkcount++;
    });
    if(passwordlength<checkcount)
    {
        passwordlength=checkcount;
        handleslider();
    }
}

allcheckbox.forEach((checkbox) => {
    checkbox.addEventListener('change',handlecheckboxchange)

});

// function shufflepassword(){
   

generatebtn.addEventListener("click",()=>{
    //none of checkbox is selected
      if(checkcount<=0)
      {
        return;
      }
      if(passwordlength<checkcount)
    {
        passwordlength=checkcount;
        handleslider();
    }
    //remove old password;
    console.log("starting the journey");
    password="";

    //lets put all checkbox checked
    // if(uppercasecheck.checked)
    // {
    //     password+=getRandomUpperCase();
    // }
    // if(lowercasecheck.checked)
    // {
    //     password+=getRandomLowerCase();
    // }
    // if(numbercheck.checked)
    // {
    //     password+=getRandomNumber();
    // }
    // if(symbolcheck.checked)
    // {
    //     password+=getSymbols();
    // }
    let funcArr=[];
    if(uppercasecheck.checked)
        funcArr.push(getRandomUpperCase);
    
    if(lowercasecheck.checked)
       funcArr.push(getRandomLowerCase);
    
    if(numbercheck.checked)
       funcArr.push(getRandomNumber);

    if(symbolcheck.checked)
       funcArr.push(getSymbols);


       //comulsory passowrd
    for(let i=0;i<funcArr.length;i++)
    {
        password+=funcArr[i]();
    }
    console.log("compulsory done");
    //remaining password
    for(let i=0;i<(passwordlength-funcArr.length);i++)
    {
        let randidx=getRandomInteger(0,funcArr.length);
        password+=funcArr[randidx]();
    }
    //Fisher Yates   
    function shufflepassword(array){
        for(let i=array.length-1;i>0;i--)
        {
            const j=Math.floor(Math.random()*(i+1));
            const temp=array[i];
            array[i]=array[j];
            array[j]=temp;

        }
        let str="";
        array.forEach((el)=>(str+=el));
        return str;
    }
    //shuffle password
    password=shufflepassword(Array.from(password));
    //show in UI
    passwordisplay.value=password;
    console.log("Ui addition done");
    calStrength();
});





