class Component2 extends React.Component {// <> - React.Fragment - контейнер для елементів без проміжного DOM
        
    render() {
        return <> 
            <h3>Hello from JSX</h3> 
        </>
    }
}

ReactDOM.render( <Component2/>, 
    document.getElementById("component2"));