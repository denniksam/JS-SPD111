// Ініціалізація модуля, масив [] залежностей передається параметром
// ! метод module без другого параметра - пошук модуля, а з параметром -
//   ініціалізація. Тому навіть без залежностей масив слід зазначати
const mainApp = angular.module("mainApp", []);

// Утворюємо контролер
mainApp.controller(
    "mainController",    // назва контролера (див. тег з ng-controller)
    function($scope) {   // ф. ініціалізації - наповнення scope
        $scope.data1 = "Hello" ;
        $scope.data2 = 10;
        $scope.btnClick = function() {
            $scope.data1 += "!" ;
        }
        $scope.incClick = () => $scope.data2++ ;
        $scope.decClick = () => $scope.data2-- ;
    }
)  // більшість методів модуля повертають this (fluid interface)
.controller(  // що дозволяє робити каскад операцій
    "secondController",
    function($scope) {
        $scope.data1 = "World" ;
    }
)
.directive(
    "directive1",
    function() {
        return {
            template: "<b>I am directive One</b>",
            restrict: "A"
        }
    }
)
.directive(
    "directive2",
    function() {
        return {
            template: "<b>I am directive Two</b> with data1 = <i>{{data1}}</i>",
            restrict: "C",
            scope: {},  // ізольований (свій, власний) окіл (scope)
            controller: function($scope) {
                $scope.data1 = "Дані директиви 2";
            }
        }
    }
)
.directive(
    "directive3",
    function() {
        return {
            template: "<div><b>I am directive Three</b></div>",
            restrict: "M",
            replace: true   // заміняти контейнер собою
        }
    }
)
.directive(
    "directive4",
    function() {
        return {
            template: "<div><b>I am directive Four</b></div>",
            restrict: "E",
            replace: true
        }
    }
);
// як приклад - розірвана інструкція (можна було б продовжувати)
mainApp.component(
    "component1",
    {
        template: `
            <b ng-click="bClick()">I am component {{x}}</b>
        `,
        controller: function($scope) {
            $scope.x = 1 ;
            $scope.bClick = () => $scope.x++ ;
        }
    }
)
.component(
    "component2",
    {
        template: `<div>
            <b ng-click="updateClick()">Last updated @ {{data.moment}}</b>
            <p ng-repeat="rate in data.rates" >
                <b ng-if="rate.cc == 'EUR'">
                    {{rate.txt}} {{rate.rate}}
                </b>
                <span ng-if="rate.cc != 'EUR'">
                    {{rate.txt}} {{rate.rate}}
                </span>
            </p>
        </div>`,
        controller: component2Controller
    }
);
/* Принцип інжекції - передача до функції необхідних ресурсів
   - параметри $scope, $http це НЕ вхідні параметри, це "запит"
   на інжекцію
*/
function component2Controller($http, $scope) {
    $scope.data = {   // модель-об'єкт (з комплексними даними)
        moment: new Date().toLocaleTimeString(),
        rates: []
    };
    $scope.updateClick = () => {
        $scope.data.moment = new Date().toLocaleTimeString();
    }
    const url = "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json";
    $http.get(url).then( r => {        // у сервісі $http r відразу
        $scope.data.rates = r.data ;   // містить JSON у полі "data"
    } ) ;
}
/* Виконати останнє Д.З. з JS (AJAX) засобами Angular
*/