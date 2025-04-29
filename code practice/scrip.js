let Addsubmit= document.getElementById("addSubmit");
let fullList=document.getElementById("currentList");
let filList= document.getElementById("filteredList");
let RemoveSubmit=document.getElementById("removeSubmit");
let RangeSubmit=document.getElementById("rangeSubmit");
let yourCurrentTotal= document.getElementById("yourCurrentTotal");
let AllItems=[];

let addbutton=document.getElementById("add");
let inputItem=document.getElementById("inputItem")
let removebutton=document.getElementById("remove");
let removeItem=document.getElementById("removeItem");
let filterbutton=document.getElementById("filter");
let filterbody=document.getElementById("filterBody");
let filterhead=document.getElementById("filterHead");
let totalandlist=document.getElementById("totalandlist");
let filterlist=document.getElementById("filteredList");



addbutton.addEventListener("click", function(){
    addbutton.style.backgroundColor= "#ff9900";
    addbutton.style.color=  "#ffe5bf";

    filterbutton.style.backgroundColor= "#ffe5bf";
    filterbutton.style.color=  "#ff9900";
    
    removebutton.style.backgroundColor= "#ffe5bf" ;
    removebutton.style.color=  "#ff9900";

    inputItem.classList.toggle("displaynone");
    removeItem.classList.add("displaynone");
    filterbody.classList.add("displaynone");
    filterhead.classList.add("displaynone");
    filterlist.classList.add("displaynone");
    totalandlist.classList.remove("displaynone");
})

removebutton.addEventListener("click", function(){
    removebutton.style.backgroundColor= "#ff9900";
    removebutton.style.color=  "#ffe5bf";

    addbutton.style.backgroundColor= "#ffe5bf";
    addbutton.style.color=  "#ff9900";

    filterbutton.style.backgroundColor= "#ffe5bf";
    filterbutton.style.color=  "#ff9900";

    removeItem.classList.toggle("displaynone");
    inputItem.classList.add("displaynone");
    filterbody.classList.add("displaynone");
    filterhead.classList.add("displaynone");
    filterlist.classList.add("displaynone");
    totalandlist.classList.remove("displaynone");


})

filterbutton.addEventListener("click", function(){
    removebutton.style.backgroundColor= "#ffe5bf";
    removebutton.style.color= "#ff9900";

    addbutton.style.backgroundColor= "#ffe5bf";
    addbutton.style.color=  "#ff9900";
    filterbutton.style.backgroundColor= "#ff9900";
    filterbutton.style.color=  "#ffe5bf";


    filterbody.classList.toggle("displaynone");
    inputItem.classList.add("displaynone");
    removeItem.classList.add("displaynone");
    totalandlist.classList.add("displaynone");
    filterlist.classList.remove("displaynone");


})





class Item{
    constructor(item,price){
        this.item=item;
        this.price=price;
    }
}

Addsubmit.addEventListener("click", function(){
    let Addprice= document.getElementById("priceInput");
    let Additem= document.getElementById("itemInput");

    if (isNaN(Addprice.value) || Addprice.value.trim() === "") {
        throw new Error("You have no valid price value!");
    }

let item1= new Item(Additem.value, Addprice.value);
AllItems.push(`${item1.item} : ${item1.price}`); 

updateList(); 
totalCalc();

Additem.value = "";
    Addprice.value = "";
});


RemoveSubmit.addEventListener("click", function(){
    let removeItem=document.getElementById('itemRemove');

    let i=0;
for (i; i<AllItems.length; i++){
    let cut= AllItems[i].indexOf(':') - 1;
    let test =AllItems[i].slice(0, cut);

    if (test==removeItem.value){
        AllItems.splice(i,1);
    }
}
console.log(AllItems);
updateList()
totalCalc();

removeItem.value="";

});

RangeSubmit.addEventListener("click", function(){
    filList.innerHTML="";
    totalandlist.classList.add("displaynone");
    filterhead.classList.toggle("displaynone");
    let inputedRange=document.getElementById("itemRange").value;
    let aboveFilter=document.getElementById("AboveDirection");
    let belowFilter=document.getElementById("BelowDirection");
    const displayParagraph= document.getElementById("displayrange");
    let rangeDirection;

    if (aboveFilter.checked){
        rangeDirection="above";
    } else if(belowFilter.checked){
        rangeDirection="below";
    
    } else{
        throw new Error("You must select a range");
        
    }
    let filteredRange= AllItems.filter(newRange);
    filteredList();



    function newRange(element){
        let cut= Number(element.slice(element.indexOf(':') + 1, element.length));
        if (rangeDirection=='above'){
        
            return cut >= inputedRange;       }

        else if (rangeDirection=='below'){
                return cut <= inputedRange;  
        }
        else{
                    return 0;
                }
        
    }

    

displayParagraph.innerHTML = "";

const showCurrentRange = document.createElement("p");
showCurrentRange.textContent = `Currently showing items ${inputedRange} and ${rangeDirection}`;

displayParagraph.appendChild(showCurrentRange);


    function filteredList() {
        filList.innerHTML = "";
    
        filteredRange.forEach(item => {
            const addUpdate = document.createElement("li");
            addUpdate.textContent = item;
            filList.appendChild(addUpdate);
        });
    }

});


function updateList() {
    fullList.innerHTML = "";

    AllItems.forEach(item => {
        const addUpdate = document.createElement("li");
        addUpdate.textContent = item;
        fullList.appendChild(addUpdate);
    });
}

function totalCalc(){
    let total= AllItems.map(item => {
    let cut= item.indexOf(':') +1 ;
    let test= Number(item.slice(cut, item.length));
    return test;
    });
    console.log(total);

    let i;
    let youTotal=0;
    for( i= 0; i<AllItems.length; i++){
        youTotal= youTotal + total[i];
    }

yourCurrentTotal.innerHTML="";
    const yourOutput= document.createElement('p');
    const value= document.createTextNode(` Your total is ${youTotal}`);
    yourCurrentTotal.appendChild(value);
}