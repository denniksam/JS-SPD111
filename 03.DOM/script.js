const products = [  // масив (конструктор масива)
    {   // об'єкт - розширення прототипу object
        title: "Product 1",   // ключ: значення, розділення комою
        "price": 19.50,       // імена ключів можна брати у ""
        "action-price": 12.00,  // імена, що порушують іменування, треба брати у ""
    },  // перехід до нового ел-та масиву
    { title: "Product 2", "price": 29.50, "action-price": 22.00 },
    { title: "Product 3", "price": 39.50, "action-price": 32.00 },
    { title: "Product 4", "price": 49.50, "action-price": 42.00 },
    { title: "Product 5", "price": 59.50, "action-price": 52.00 },
] ;

document.addEventListener('DOMContentLoaded', function() {
    /* Дана подія виникає коли завантажено HTML та утворено
       "дерево" DOM. Саме у даній події доступні усі елементи,
       незалежно від розташування тега скрипт. */

    // Роботу з елементами реалізовуємо за наступною схемою:
    // 1. Шукаємо елемент(и)   
    const out = document.getElementById( "out" ) ;
    // 2. Перевіряємо чи знайдено
    if( ! out ) {
        // 3. Якщо не знайдено, то
        // або вивести повідомлення (якщо робота може продовжуватись)
        console.error( 'Element #out not found' ) ;
        // або викинути виключення, якщо роботу треба зупиняти
        throw 'Element #out not found' ;
    }
    // 4. Працюємо з елементом
    // а) через зміну HTML
    out.innerHTML = "<b>Вітання з DOMContentLoaded</b>" ;
    // б) через створення елементів та їх додавання
    const i = document.createElement("i");  // <i></i>
    const t = document.createTextNode("Hello from DOM");
    i.appendChild(t);  // <i>Hello from DOM</i>
    out.appendChild(i);  // <... id=out> <i>Hello from DOM</i> </>

    // задача про таблицю
    serveButton() ;
});

function serveButton() {
    // інколи виникає задача пошуку елемента без можливості позначити
    // його атрибутом "id" чи в інший спосіб. У такому разі максимально
    // деталізуємо положення елементу (по відношенню до інших елементів)
    // та складаємо для нього selector
    const button = document.querySelector("p button") ;
    if( ! button ) throw "Selector 'p button' not found" ;
    button.onclick = buttonClick ;  // !!! без ()
}
function buttonClick() {
    const outTable = document.getElementById("out-table");
    if( ! outTable ) throw "Element #out-table not found" ;
    var tableHtml = "<table><tr><th>Title</th><th>Price</th><th>Action</th></tr>";
    for( let product of products ) {
        tableHtml += `<tr>
            <td>${product.title}</td>
            <td>${product.price}</td>
            <td>${product['action-price']}</td>
        </tr>` ;
    }
    tableHtml += "</table>" ;
    outTable.innerHTML = tableHtml ;
}

function buttonClickWrong() {
    /* <table>
        <tr><th>Title</th><th>Price</th><th>Action</th></tr>
        <tr><td>{title}</td><td>{price}</td><td>{action-price}</td></tr>
       </table> 
     */
    const outTable = document.getElementById("out-table");
    if( ! outTable ) throw "Element #out-table not found" ;
    // !! будь-яка зміна DOM відразу призводить до його повної перебудови.
    outTable.innerHTML = "<table><tr><th>Title</th><th>Price</th><th>Action</th></tr>";
    // ця інструкція створює незавершену таблицю і запускає перебудову DOM
    // відповідно, HTML закриє тег і подальші команди буде сприймати 
    // поза таблицею
    
    for( let product of products ) {  // for-of цикл по елементам масиву
        // `` - зворотні (ё-лапки) дозволяють розривати рядки та інтерполювати змінні
        outTable.innerHTML += `<tr>
            <td>${product.title}</td>
            <td>${product.price}</td>
            <td>${product['action-price']}</td>
        </tr>` ;
    }

    outTable.innerHTML += "</table>" ;
}
