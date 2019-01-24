import * as Util from '../Util';
import * as Constants from "../Constants";

class AuthManager {
    async getAuthInfo() {
        let accessToken = this.getCookie("access_token");
        let refreshToken = this.getCookie("refresh_token");
        if (accessToken) {
            return await new Promise((resolve) => {
                    resolve({
                            user: localStorage.getItem("activeUser"),
                            token: accessToken
                        }
                    )
                }
            );

        } else {
            if (refreshToken) {

                let response = await fetch(Constants.backend + "/api/auth/renewToken", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({refreshToken: refreshToken})
                });
                let authInfo = await response.json();

                let accessTokenStr = document.cookie = "access_token=" + authInfo.access_token + "; expires=" + authInfo.accessTokenExpiresAt + "; path=/";
                document.cookie = accessTokenStr;


                return {
                    user: localStorage.getItem("activeUser"),
                    token: authInfo.access_token
                };

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
                return await new Promise((resolve) => {
                    resolve({user: "guest"})
                });
            }
        }
    }

    setAuthInfo(user, accessToken, refreshToken, expireIn) {
        let accessTokenStr = document.cookie = "access_token=" + accessToken + "; expires=" + expireIn + "; path=/";
        let refreshTokenStr = document.cookie = "refresh_token=" + refreshToken + ";expires= 31 Dec 9999 12:00:00 UTC; path=/";
        localStorage.setItem("activeUser", user);
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

    deleteCookie = (name) => {
        document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
}

export default AuthManager;