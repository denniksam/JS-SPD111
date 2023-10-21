const baseUrl = "https://api.coincap.io/v2" ;

// обробники подій для кнопок - у події DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    const ajax1Button = document.getElementById("ajax1-button");
    if(ajax1Button) ajax1Button.addEventListener('click', ajax1ButtonClick);
    else console.error("ajax1-button not found");

    const ajax2Button = document.getElementById("ajax2-button");
    if(ajax2Button) ajax2Button.addEventListener('click', ajax2ButtonClick);
    else console.error("ajax2-button not found");    
});
function ajax2ButtonClick() {
    fetch(                     // запит AJAX
        `${baseUrl}/assets?limit=5`,   // адреса та параметр
        {                      // об'єкт з додатковими налаштуваннями  
            method: 'GET',     // метод запиту (https://www.rfc-editor.org/rfc/rfc7231 розділ 4)
            headers: {         // заголовки, зокрема авторизаційний
                'Authorization': "Bearer c10b438d-c8c0-4498-9a0a-c7cfdf9b4518"
            }
        }
    ).then( r => {
        if( r.status === 200 ) {
            // r.text().then(showText);
            r.json().then(showCryptoJson)
        }
        else {
            console.error( `fetch error: got status ${r.status}` );
        }
    });
}
function showCryptoJson( json ) {
    var container = document.getElementById("result-container") ;
    if( ! container ) throw "result-container not found";
    const table = document.createElement('table');
    table.classList.add('striped');

    const thead = document.createElement('thead');
    const tr = document.createElement('tr');
    let th = document.createElement('th');
    th.innerText = "Rank";
    tr.appendChild(th);
    th = document.createElement('th');
    th.innerText = "Name";
    tr.appendChild(th);
    th = document.createElement('th');
    th.innerText = "Rate";
    tr.appendChild(th);
    thead.appendChild(tr);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    // у цій API масив даних приходить у полі "data"
    for( let rate of json.data ) {  
        let tr = document.createElement('tr');

        let td = document.createElement('td');
        td.innerText = rate.rank;
        tr.appendChild(td);

        td = document.createElement('td');
        td.innerText = rate.name;
        tr.appendChild(td);

        td = document.createElement('td');
        td.innerText = rate.priceUsd;
        tr.appendChild(td);

        tr.addEventListener('click', () => showHistory(rate) );
        tbody.appendChild(tr);
    }
    table.appendChild(tbody);
    container.appendChild(table);
}

function showHistory( asset ) {
    alert( `${baseUrl}/assets/${asset.id}/history` );
}

function ajax1ButtonClick(e) {
    const url = "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json";
    window.fetch(url)  // надіслати асинхронний запит до url
        .then( r => {  // у відповідь на запит приходить Response - 
            // НТТР-пакет-відповідь, розібрана в JS-об'єкт  
            // r.status - число, статус-код виконання запиту
            // r.statusText - рядок, що роз'яснює статус-код
            // r.headers - заголовки відповіді
            if( r.status === 200 ) {
                // у випадку успішного завантаження вилучаємо тіло
                // пакету в одному з форматів:
                // r.body - stream
                // r.json() - JSON
                // r.blob() - Binary Large Object
                // r.text() - текст

                // r.text().then( showText ) ;
                r.json().then(showJson);
            }
            else {
                console.error( `fetch error: got status ${r.status}` );
            }
        });

    console.log("ajax1ButtonClick");
}

function showText( txt ) {
    var container = document.getElementById("result-container") ;
    if( ! container ) throw "result-container not found";
    const div1 = document.createElement('div');
    div1.innerText = txt ;
    container.appendChild( div1 ) ;
}
function showJson( json ) {
    var container = document.getElementById("result-container") ;
    if( ! container ) throw "result-container not found";
    const div1 = document.createElement('div');
    // робота з json-даними передбачає, що ми розуміємо структуру даних,
    // тобто чи є це масив чи об'єкт, який його склад тощо.
    const ul = document.createElement('ul');
    for( let rate of json ) {
        let li = document.createElement('li');
        li.innerText = `1 ${rate.cc} (${rate.txt}) - ${rate.rate} hrn` ;
        li.addEventListener('click', () => showRate(rate) );
        ul.appendChild(li);
    }
    container.appendChild( ul ) ;
}
function showRate( rate ) {
    alert( `${rate.exchangedate} r030:${rate.r030} \n1 ${rate.cc} (${rate.txt}) - ${rate.rate} hrn` )
}
/* c10b438d-c8c0-4498-9a0a-c7cfdf9b4518
JSON - JavaScript Object Notation - формат передачі даних у
текстовому поданні з синтаксисом, схожим на об'єкти JS
серед даних може бути:
1. Примітив ("рядок", 123, 123.321, true/false, null)
2. Масив [ 1, 2, 3, 4, 5 ]
3. Об'єкт { "field1": значення, "field2": значення2 }, де значення - див. пп.1-3

Лапки: є три типи '', "", ``
'' та "" не мають жодної різниці, відмінність тільки у рекомендаціях
"" - user-defined values - дані, придуманні користувачем
'' - стандартні літерали, те, що саме так і має бути
`` - інтерполюючий рядок, в нього можна підставляти змінні
      `x=${x}` --> 'x=10'

У JS є декілька способів роботи зі змінними
1) без оголошення 
 x = 10
 це створює глобальну змінну (window.x), вона доступна 
 іншим функціям та скриптам, відповідно, її перепризначення
 може спричинити збої інших активностей.
2) з оголошенням (JS-5)
 var x = 10
 створює змінну з областю видності у функції. Для var 
 діє принцип "підняття" - усі інструкції піднімаються (при
    компіляції) до початку функції
function f() {          function f() {                         
    ...                     var x                        
    ... {          -->      ... {                      
    var x = 10              x = 10     
    }                       }  
    x == 10                 x == 10  
    var x = 20 -- OK
}                       }
3)       (JS-6)          
let x = 10
const x = 10
це локальні означення - у межах найближчого блоку {}
  function f() {  
    ...         
    ... {       
        let x = 10  
        ...
        let x = 20 -- redeclaration error
    } 
    x - undefined
}
більш того, ці означення "відстежують" повторні оголошення
(redeclaration), тоді як var - ні
*/