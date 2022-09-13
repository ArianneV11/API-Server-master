const path = require('path');
const fs = require('fs');
const { threadId } = require('worker_threads');
module.exports =
    class MathsController extends require('./Controller') {
        constructor(HttpContext) {
            super(HttpContext);
            //this.repository = new Repository(new MathModel());
        }
        
        get() {
            if (this.HttpContext.path.queryString == '?') {
                let helpPage = path.join(process.cwd(), "wwwroot/helpPages/mathsServiceHelp.html");
                let pageContent = fs.readFileSync(helpPage);
                this.HttpContext.response.content("text/html", pageContent);
            }
            else{
                if(this.HttpContext.path.params.op){
                    switch(this.HttpContext.path.params.op){
                        case " " || "+":
                            this.HttpContext.path.params.value = parseInt(this.HttpContext.path.params.x) + parseInt(this.HttpContext.path.params.y);
                            if(this.HttpContext.path.params.op == ' ')
                                this.HttpContext.path.params.op = '+';
                                this.HttpContext.response.JSON(this.HttpContext.path.params);
                            break;    
                        case "-":
                            this.HttpContext.path.params.value = parseInt(this.HttpContext.path.params.x) - parseInt(this.HttpContext.path.params.y);
                            this.HttpContext.response.JSON(this.HttpContext.path.params);
                            break;
                        case "*":
                            this.HttpContext.path.params.value = parseInt(this.HttpContext.path.params.x) * parseInt(this.HttpContext.path.params.y);
                            this.HttpContext.response.JSON(this.HttpContext.path.params);
                            break;
                        case "/":
                            this.HttpContext.path.params.value = parseInt(this.HttpContext.path.params.x) / parseInt(this.HttpContext.path.params.y);
                            this.HttpContext.response.JSON(this.HttpContext.path.params);
                            break;
                        case "%":
                            this.HttpContext.path.params.value = parseInt(this.HttpContext.path.params.x) % parseInt(this.HttpContext.path.params.y);
                            this.HttpContext.response.JSON(this.HttpContext.path.params);
                            break;
                        case "!":
                            this.HttpContext.path.params.value = factorial(parseInt(this.HttpContext.path.params.n));
                            this.HttpContext.response.JSON(this.HttpContext.path.params);
                            break;
                        case "p":
                            this.HttpContext.path.params.value = isPrime(parseInt(this.HttpContext.path.params.n));
                            this.HttpContext.response.JSON(this.HttpContext.path.params);
                            break;
                        case "np":
                            this.HttpContext.path.params.value = findPrime(parseInt(this.HttpContext.path.params.n));
                            this.HttpContext.response.JSON(this.HttpContext.path.params);
                            break;
                        }
                }else{
                     let respondObj = {error: "op parameter is missing"};
                     this.HttpContext.response.JSON(respondObj);
                }
            }
                
        }
    }
    function Infinity(result) {
            return result;
    }
    function NaN(result){
        return result;
    }
    function missingParameter(result){
        return result;
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