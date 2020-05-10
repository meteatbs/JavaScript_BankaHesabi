const balance=document.getElementById('balance');
const money_plus=document.getElementById('money-plus');
const money_minus=document.getElementById('money-minus');
const list=document.getElementById('list');
const form=document.getElementById('form');
const text=document.getElementById('text');
const amount=document.getElementById('amount');
const categoryresult=document.getElementById('category');

// const dummyTransactions=[
//     {id:1,text:'Phone',amount:-40},
//     {id:2,text:'Lg',amount:10},
//     {id:3,text:'Asus',amount:-150},
//     {id:4,text:'Camera',amount:3000}
// ];
// its a string  we want to parse it into an arr 

const localStorageTransaction=JSON.parse(localStorage.getItem('transactions'));

//we are controlling either local storage empty or not
let transactions=localStorage.getItem('transactions')!==null?localStorageTransaction:[];

//Add trasaction e because of submit
function addTransaction(e) {
    e.preventDefault();
    if (text.value.trim()==='' || amount.value.trim()==='') {
        alert('Please add a text or amount ');
    }
    else{
        const transaction={
            id:generateID(),
            text:text.value, //str arr
            categoryresult:categoryresult.value,//str arr
            amount:+amount.value //num arr
        }
        // console.log(transaction)
        transactions.push(transaction);

        addTransactionDOM(transaction);
        updateValues();

        updateLocalStorage();

        GetSelectedText();

        text.value='';
        amount.value='';
    }

}

//Generate random ID
function generateID() {
    return Math.floor(Math.random()*1000000000);
}



//Add transactions to DOM list
function  addTransactionDOM(transaction) {
    //Get Sign
    const sign=transaction.amount<0?'-':'+';

    const item = document.createElement('li');

    //Add class based on value yeni transaction ekleme
    item.classList.add(transaction.amount <0?'minus':'plus');
    item.innerHTML=`
    ${transaction.text}<span>Amount: ${sign}${Math.abs(transaction.amount)} |   Category: ${transaction.categoryresult}</span>
    <button class="deleteBtn" onclick="removeTransaction(${transaction.id})">x</button>
    `;
    list.appendChild(item);
}


//Update the balance income and expense reducer function acc(toplama) item=current value
function updateValues() {
    const amounts=transactions.map(transaction => transaction.amount);

    // console.log(amount);

    const total=amounts.reduce((acc,item)=>(acc+=item),0).toFixed(2);

    const income=amounts.filter(item=>item>0).reduce((acc,item)=>(acc+=item),0).toFixed(2);

    const expense =(amounts.filter(item=> item<0).reduce((acc,item)=>(acc+=item),0)*-1).toFixed(2);

    // console.log(total); filter metodu yeni bir dizi olusturur (reduce testini gecenleri aktarır)
    // console.log(expense);


    balance.innerText=`$${total}`;
    money_plus.innerText=`$${income}`;
    money_minus.innerText=`$${expense}`;
}

//Remove Transaction by id  for each trasaction we call a function

function removeTransaction(id) {
    transactions=transactions.filter(transaction => transaction.id!==id);

    updateLocalStorage();
    init();
}
//Update local storage transaction
function updateLocalStorage() {
    localStorage.setItem('transactions',JSON.stringify(transactions));
}

//get category
function GetSelectedText(){
    var e = document.getElementById("category");
    var result = e.options[e.selectedIndex].text;


     
    //  document.getElementById("result").innerHTML = result;
     console.log(result);
}
GetSelectedText();


//Init app
function init() {
    list.innerHTML='';

    transactions.forEach(addTransactionDOM);
    updateValues();
}

init();




form.addEventListener('submit',addTransaction);