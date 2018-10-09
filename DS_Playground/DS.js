//@ts-check

var userName;
var money;


PageLoad();

function PrintRandomNumbers() {
    var result = new Array();

    if (PayGame(1)) {
        for (var i = 0; i < 5; i++) {
            result.push(GetRandomInt(0, 10));
        }

        console.log("Button Pressed");
        console.log(result);
        document.getElementById("Number Results").innerText = result;
        // money--;
        // console.log(money);
    }

}


function Click_ShowCookies() { alert(document.cookie); }

function Click_SetCookie() { SetCookie(document.getElementById("inputCookieName").nodeValue, document.getElementById("inputCookieValue").nodeValue); }

function Click_DeleteCookie() { DeleteCookie(document.getElementById("inputCookieName").nodeValue); }

function GetRandomInt(minValue, maxValue) {
    return Math.round(Math.random() * (maxValue - minValue) + minValue);
}

function PageLoad() {
    userName = GetCookie("userName");
    if (userName != "") { alert("Welcome Back " + userName + "! Check out our Games..."); }
    else {
        userName = "";
        while (userName == "" || userName == null) {
            userName = prompt("Please Enter your Name: ", "");
        }
        SetCookieWithExpireDays("userName", userName,365);
    }


    if (GetCookie("money") == "") { SetCookieWithExpireDays("money", 10,365); }
    money = GetCookie("money");
}

function PayGame(cost) {
    if (money >= cost) {
        money -= cost;
        SetCookieWithExpireDays("money", money,365);
        return true;
    }
    else return false;

}
