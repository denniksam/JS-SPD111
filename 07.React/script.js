const e = React.createElement;  // псевдонім - друге посилання
class Component1 extends React.Component {
    render() {                         // правила композиції компонента             
        return React.createElement(    // основа - React.createElement                                  
            'ul',                      // 1. 'Тег' або Клас                
            {                          // 2. props - параметри, що             
                style: {               //  будуть передаватись конструктору                      
                    color: 'fuchsia'   //  компонента - ініціалізація                                  
                }                      //                 
            },                         // 3. Дочірні елементи - перелік та/або масив             
            e('li',{ className: 'green' },'First item'),
            e('li',{},'Second item'),
            [
                e('li',{},'Third item'),
                e('li',{},'Fourth item'),
            ],
            ["5th", "6th", "7th"].map(str => e('li',{},`${str} item`) )
        )                     
    }
}

ReactDOM.render( 
    React.createElement(Component1,{},null),
    document.getElementById("component1")
);