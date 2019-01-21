import * as Util from '../Util';
import * as Constants from "../Constants";

class AuthManager {
    getAuthInfo() {
        let accessToken = this.getCookie("access_token");
        let refreshToken = this.getCookie("refresh_token");
        if (accessToken) {
            return new Promise((resolve) => {
                    resolve (accessToken)});

        } else {
            if (refreshToken) {

                let response = fetch(Constants.backend + "/api/auth/renewToken", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({refreshToken:refreshToken})})
                    .then(response => response.json())
                    .then((authInfo) => {
                        let accessTokenStr = document.cookie = "access_token=" + authInfo.accessToken + "; expires=" + authInfo.accessTokenExpiresAt + "; path=/";
                        console.log(accessTokenStr);
                        document.cookie = accessTokenStr;
                    });

                return response;

                // if (response.statusCode != 200) {
                //     return {
                //         user: "guest"
                //     }
                // } else {
                //     var expireDate = Util.dateFromISO8601(response.body.expires_in);
                //     this.setAuthInfo(response.body.access_token, response.body.refresh_token, expireDate);
                //
                //     let accessToken = this.getCookie("access_token");
                //     let refreshToken = this.getCookie("refresh_token");
                //
                //     return {
                //         user: accessToken
                //     }
                // }
            } else {
                return new Promise((resolve) => {
                    resolve ("guest")});
            }
        }
    }

    setAuthInfo(accessToken, refreshToken, expireIn) {
        let accessTokenStr = document.cookie = "access_token=" + accessToken + "; expires=" + expireIn + "; path=/";
        let refreshTokenStr = document.cookie = "refresh_token=" + refreshToken + ";expires= 31 Dec 9999 12:00:00 UTC; path=/";
        console.log("new accessToken : " + accessTokenStr);
        console.log("new refreshToken : " + refreshTokenStr);
        document.cookie = accessTokenStr;
        document.cookie = refreshTokenStr;
    }

    getCookie = (cname) => {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return null;
    }
}

export default AuthManager;