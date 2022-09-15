const path = require('path');
const fs = require('fs');
const { threadId } = require('worker_threads');
module.exports =
    class MathsController extends require('./Controller') {
        constructor(HttpContext) {
            super(HttpContext);
        }
        error(message){
            this.HttpContext.path.params["error"] = message;
            return false;
        }
        getNumberParameters(paramsName){
            if (paramsName in this.HttpContext.path.params){
                let n = parseFloat(this.HttpContext.path.params[paramsName]);
                if(isNaN(n))
                    return this.error(paramsName + " parameter is not a number");
                this.HttpContext.path.params[paramsName] = n;
            }else
                return this.error(paramsName + " parameter is missing");
            return true; 
        }
        checkNumberParameters(nbParams){
            if (Object.values(this.HttpContext.path.params).length > nbParams) {
                return this.error("too many parameters");    
            }     
            return true;
        }
        oneParameter(){
            return (
                this.getNumberParameters('n') && this.checkNumberParameters(2)
            );
        }
        twoParameter(){
            return (
                this.getNumberParameters('x') && this.getNumberParameters('y') && this.checkNumberParameters(3)
            );
        }
        get() {
            if (this.HttpContext.path.queryString == '?') {
                let helpPage = path.join(process.cwd(), "wwwroot/helpPages/mathsServiceHelp.html");
                let pageContent = fs.readFileSync(helpPage);
                this.HttpContext.response.content("text/html", pageContent);
            }
            else{
                if('op' in this.HttpContext.path.params){
                    
                    switch(this.HttpContext.path.params.op){
                        case " ":
                            if(this.twoParameter()){
                                this.HttpContext.path.params.value = parseInt(this.HttpContext.path.params.x) + parseInt(this.HttpContext.path.params.y);
                                if(this.HttpContext.path.params.op == ' ')
                                    this.HttpContext.path.params.op = '+';
                            }
                            break;    
                        case "-":
                            if(this.twoParameter()){
                                this.HttpContext.path.params.value = parseInt(this.HttpContext.path.params.x) - parseInt(this.HttpContext.path.params.y);
                            }
                            break;
                        case "*":
                            if(this.twoParameter()){
                                this.HttpContext.path.params.value = parseInt(this.HttpContext.path.params.x) * parseInt(this.HttpContext.path.params.y);
                            }
                            break;
                        case "/":
                            if(this.twoParameter()){
                                this.HttpContext.path.params.value = Division(parseInt(this.HttpContext.path.params.x), parseInt(this.HttpContext.path.params.y));
                            }
                            break;
                        case "%":
                            if(this.twoParameter()){
                                this.HttpContext.path.params.value = Modulo(parseInt(this.HttpContext.path.params.x), parseInt(this.HttpContext.path.params.y));
                            }
                            break;
                        case "!":
                            if(this.oneParameter()){
                                this.HttpContext.path.params.value = factorial(parseInt(this.HttpContext.path.params.n));
                            }
                            break;
                        case "p":
                            if(this.oneParameter()){
                                this.HttpContext.path.params.value = isPrime(parseInt(this.HttpContext.path.params.n));
                            }
                            break;
                        case "np":
                            if(this.oneParameter()){
                                this.HttpContext.path.params.value = findPrime(parseInt(this.HttpContext.path.params.n));
                            }
                            break;
                        }
                }
                else{
                    this.error("op parameter is missing");
                }
               this.HttpContext.response.JSON(this.HttpContext.path.params);
            }
        }
    }
    function Division(x,y) {
        x = Number(x);
        y = Number(y);
        let value = x/y;
        if(isNaN(value)){
            value = "NaN"; 
        }
        if(value === Infinity)
        {
            value = "Infinity";
        }
        return value;
    }
    function Modulo(x,y){
        x = Number(x);
        y = Number(y);
        let value = x % y;
        if(isNaN(value)){
            value = "NaN"; 
        }
        return value;
    }
    function factorial(n) {
        if (n === 0 || n === 1) {
            return 1;
        }
        return n * factorial(n - 1);
    }
    function isPrime(value) {
        for (var i = 2; i < value; i++) {
            if (value % i === 0) {
                return false;
            }
        }
        return value > 1;
    }
    function findPrime(n) {
        let primeNumer = 0;
        for (let i = 0; i < n; i++) {
            primeNumer++;
            while (!isPrime(primeNumer)) {
                primeNumer++;
            }
        }
        return primeNumer;
    }