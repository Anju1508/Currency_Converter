

const dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const massage=document.querySelector(".msg");


for(let select of dropdowns){
    for(Currcode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=Currcode;
        if(select.name==="from" && Currcode==="INR"){
            newOption.selected="selected";
        }else if(select.name==="to" && Currcode==="USD"){
            newOption.selected="selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    })
}

const updateFlag=(element)=>{
    let Currcode=element.value;
    let countryCode=countryList[Currcode];
    let newSrc=`https://flagsapi.com/${countryCode}/shiny/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
}

btn.addEventListener("click", async (evt)=>{
    evt.preventDefault();
    let amount=document.querySelector(".amount input");
    let amtValue=amount.value;
    if(amtValue==="" || amtValue<1){
        amtValue=1;
        amount.value="1";
    }
    const api_key="43dea1b2d4d142903e8cea54";
    const URL=`https://v6.exchangerate-api.com/v6/${api_key}/latest/${fromCurr.value}`;
    let response=await fetch(URL);
    let data=await response.json();
    let exchangeRate=data.conversion_rates[toCurr.value];

    let Amount=amtValue*exchangeRate;
    let finalAmt=Amount.toFixed(2);
    
    massage.innerText=`${amtValue}  ${fromCurr.value} = ${finalAmt}  ${toCurr.value}`; 

});