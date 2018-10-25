//@ts-check
// var https = import("https");

function Login() {
    console.log("bin in Login");

    let userName = document.getElementById("inputUserName");
    let password = document.getElementById("inputPassword");

    // let request = http.get("http://127.0.0.1:8081");

    fetch(
        "http://127.0.0.1:8081", {
            method: "POST",
            body: JSON.stringify({
                userName: "BLA",
                password: "BLUB"                
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }
    ).then(function(response)
    {        
        response.text().then(function(body)
        {
            console.log(body);
            let response = JSON.parse(body);
            console.log("Username = "+response.userName);
        })
    });
}