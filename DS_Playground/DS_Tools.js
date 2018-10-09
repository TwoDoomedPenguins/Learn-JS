//@ts-check

function GetCookie(cookieName) {
    cookieName = cookieName.trim();
    cookieName += "=";
    var decodedFullCookie = decodeURI(document.cookie);
    var cookieArray = decodedFullCookie.split("; ");
    for (var i = 0; i < cookieArray.length; i++) {
        if (cookieArray[i].length >= cookieName.length && cookieArray[i].substr(0, cookieName.length) == cookieName) {
            return cookieArray[i].substring(cookieName.length, cookieArray[i].length);
        }
    }
    return "";
}

function SetCookie(cookieName, cookieValue) {
    cookieName = cookieName.trim();
    if (cookieName != "" && cookieName != null) {
        document.cookie = cookieName + "=" + cookieValue;
    }
}

function SetCookieWithExpireDate(cookieName, cookieValue, expireDate) {
    cookieName = cookieName.trim();
    if (cookieName != "" && cookieName != null) {
        var date = new Date(expireDate);
        document.cookie = cookieName + "=" + cookieValue + ";expires=" + date.toUTCString();
    }
}

function SetCookieWithExpireDays(cookieName, cookieValue, expireDays) {
    cookieName = cookieName.trim();
    if (cookieName != "" && cookieName != null) {
        var date = new Date();
        date.setTime(date.getTime() + (expireDays * 24*60*60*1000));
        document.cookie = cookieName + "=" + cookieValue + ";expires=" + date.toUTCString();
    }
}

function DeleteCookie(cookieName) {
    cookieName = cookieName.trim();
    if (cookieName != "" && cookieName != null) {
        var date = new Date(1900, 1, 1);
        SetCookieWithExpireDate(cookieName, "", date);
    }
}