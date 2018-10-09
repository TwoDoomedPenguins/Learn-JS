// cookieValue
let money_ko = 100;

var moneyValue = document.getElementById("moneyValue");

PageLoad();

function klickMich() {

    if (PayGame(1)) {
        var line = document.getElementById("line");
        var storage = [];

        for (var i = 0; i < 5; i++) {
            storage.push(RealRandom(0, 10));
        }

        var output = "";
        for (var i = 0; i < 5; i++) {
            output += storage.pop(storage[i]) + " - ";
        }

        line.textContent = output;
        money_ko++;
        // moneyValue.textContent = money_ko;

    }
}


// document.readyState(SiteIsReady());
function ReloadElements() {
    moneyValue.textContent = money_ko;
}

function Click_ShowCookies() { alert(document.cookie); }

function Click_SetCookie() { SetCookie(document.getElementById("inputCookieName").value, document.getElementById("inputCookieValue").value); }

function Click_DeleteCookie() { DeleteCookie(document.getElementById("inputCookieName").value); }

function PageLoad() {
    userName = GetCookie("userName");
    if (userName != "") { alert("Welcome Back " + userName + "! Check out our Games..."); }
    else {
        userName = "";
        while (userName == "" || userName == null) {
            userName = prompt("Please Enter your Name: ", "");
        }
        SetCookieWithExpireDays("userName", userName, 365);
    }


    if (GetCookie("money_ko") == "") { SetCookieWithExpireDays("money_ko", 10, 365); }
    money_ko = GetCookie("money_ko");

    moneyValue.textContent = money_ko;
}

function PayGame(cost) {
    if (money_ko >= cost) {
        money_ko -= cost;
        SetCookieWithExpireDays("money_ko", money_ko, 365);
        ReloadElements();
        return true;
    }
    else return false;

}