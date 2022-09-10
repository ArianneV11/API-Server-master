const path = require('path');
const fs = require('fs');
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
                    if(this.HttpContext.path.params.op == ' ')
                        this.HttpContext.path.params.op = '+';
                    switch(this.HttpContext.path.params.op){
                        case '+' : break;
                    }

                }else{
                    let respondObj = {error: "op is missing"};
                    this.HttpContext.response.JSON(respondObj);
                }
            }
                
        }
    }