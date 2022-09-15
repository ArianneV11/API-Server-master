//const apiBaseURL = "http://localhost:5000/api/maths";
const apiBaseURL= "https://201964860-api-server.glitch.me/api/maths";
function webAPI_getMaths(queryString, successCallBack = null, errorCallBack = null) {
    $.ajax({
        url: apiBaseURL + queryString,
        type: 'GET',
        "headers": {
            "accept": "text/plain",
            "Access-Control-Allow-Origin":"*"
        },
        success: mathsResult => {
            if (successCallBack != null)
                successCallBack(mathsResult);
            console.log(mathsResult)
        },
        error: function (jqXHR, textStatus, errorThrown) {
            if (errorCallBack != null)
                errorCallBack(errorThrown);
            console.log("webAPI_getContacts - error");
        }
    });
}