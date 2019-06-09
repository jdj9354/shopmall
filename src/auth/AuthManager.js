import * as Util from '../Util';
import * as Constants from "../Constants";


let facebook_oauth_clientID = "806579793042911";
let facebook_api_version = "v3.2";

class AuthManager {
    async init() {
        await this.loadFacebookSDK();
        return;
    }

    async getAuthInfo() {

        let accessToken = this.getCookie("access_token");
        let refreshToken = this.getCookie("refresh_token");

        if (accessToken) {
            let authType = localStorage.getItem("authType");
            if (authType == "facebook") {
                let loginCheckPromise = new Promise((resolve, reject) => {
                    if (!window.FB)
                        resolve();
                    window.FB.getLoginStatus(async (response) => {
                            if (response.status == "unknown")
                                await this.setAuthInfo("guest", null, null, 0, "basic");
                            resolve();
                        }
                    )
                });
                await loginCheckPromise;
            } else if (authType == "instagram") {
                let tokenValidityCheckPromise = new Promise((resolve, reject) => {
                    fetch("https://api.instagram.com/v1/users/self/?access_token=" + accessToken)
                        .then(async (result) => {
                            let resultJson = await result.json();
                            if (resultJson.meta.code == 200) {
                                resolve(true);
                            } else {
                                reject(false);
                            }
                        })
                        .catch((exception) => {
                            console.log(exception);
                        });
                });
                let checkResult = await tokenValidityCheckPromise;

                if (!checkResult)
                    return null;
            }
            let returnPromise = (new Promise((resolve) => {
                resolve({
                        user: localStorage.getItem("activeUser"),
                        authType: localStorage.getItem("authType"),
                        token: accessToken
                    }
                )
            }));
            let result = await returnPromise.then((res) => {
                return res;
            });
            return result;

        } else {
            if (refreshToken) {
                let authType = localStorage.getItem("authType");
                let authInfo;

                if (authType == "kakao") {
                    let response = await fetch("/api/auth/kakao/token", {
                        method: 'POST',
                        body: JSON.stringify({
                            refresh_token: refreshToken
                        })
                    });
                    authInfo = await response.json();
                } else {
                    let response = await fetch("/api/auth/renewToken", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({refreshToken: refreshToken})
                    });
                    authInfo = await response.json();
                }


                let accessTokenStr = document.cookie = "access_token=" + authInfo.access_token + "; expires=" + authInfo.accessTokenExpiresAt + "; path=/";
                document.cookie = accessTokenStr;


                return {
                    user: localStorage.getItem("activeUser"),
                    authType: localStorage.getItem("authType"),
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
                let authType = localStorage.getItem("authType");
                if (authType == "facebook") {
                    let loginCheckPromise = new Promise((resolve, reject) => {
                        window.FB.getLoginStatus(async (response) => {
                                switch (response.status) {
                                    case "connected" :
                                    case "not_authorized" :
                                        (this.loginWithFaceBook())
                                            .then(() => {
                                                window.location = "/";
                                            })
                                            .catch(() => {
                                                window.alert("로그인에 실패하였습니다");
                                            });
                                        break;
                                    case "unknown" :
                                        await this.setAuthInfo("guest", null, null, 0, "basic");
                                        break;
                                }
                                resolve({
                                    user: localStorage.getItem("activeUser"),
                                    authType: localStorage.getItem("authType"),
                                    token: this.getCookie("access_token")
                                });
                            }
                        )
                    })
                    return await loginCheckPromise;

                } else {
                    let retPromise = new Promise((resolve, reject) => {
                        resolve({user: "guest"});
                    });
                    let result = await retPromise;
                    return result;
                }
            }
        }
    }

    async setAuthInfo(user, accessToken, refreshToken, expireIn, authType) {
        let accessTokenStr = document.cookie = "access_token=" + accessToken + "; expires=" + expireIn + "; path=/";
        document.cookie = accessTokenStr;
        if (refreshToken) {
            let refreshTokenStr = document.cookie = "refresh_token=" + refreshToken + ";expires= 31 Dec 9999 12:00:00 UTC; path=/";
            document.cookie = refreshTokenStr;
        }
        localStorage.setItem("activeUser", user);
        localStorage.setItem("authType", authType);
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

    clearAuthInfo = async () => {
        let authType = localStorage.getItem("authType");
        let accesToken = this.getCookie("access_token");

        if (authType == "kakao") {
            if (accesToken) {
                // Not working code need to be updated
                // window.alert(accesToken)
                // let logoutResult = await fetch("https://kapi.kakao.com/v1/user/logout", {
                //     mode: 'no-cors',
                //     method: 'POST',
                //     headers: {
                //         'Accept': 'application/json',
                //         'Content-Type': 'application/json',
                //         'Access-Control-Allow-Origin': '*',
                //         'Authorization': 'Bearer ' + accesToken
                //     }
                // });
                // console.log(logoutResult);
            }
        }

        this.deleteCookie("accessToken");
        this.deleteCookie("refreshToken");

        localStorage.setItem("activeUser", "guest");
        localStorage.setItem("authType", "NA");
    }

    async loadFacebookSDK() {

        let sdkObj = document.getElementById("fbSDK");

        if (sdkObj)
            return;
        let loadPromise = new Promise((resolve, reject) => {
            (function (d, s, id) {
                let js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) {
                    return;
                }

                js = d.createElement(s);

                js.id = id;
                js.src = "https://connect.facebook.net/en_US/sdk.js";
                fjs.parentNode.insertBefore(js, fjs);

                window.fbAsyncInit = () => {
                    window.FB.init({
                        appId: facebook_oauth_clientID,
                        cookie: true,
                        xfbml: true,
                        version: facebook_api_version
                    });
                    window.FB.AppEvents.logPageView();
                    resolve();
                };
            }(document, 'script', 'facebook-jssdk'));
            resolve();
        });
        await loadPromise;
        return;
    }

    loginWithFaceBook() {
        let loginResultPromise = new Promise((resolve, reject) => {
            window.FB.login(async (response) => {
                if (this.getAuthInfo().user != "guest") {
                    if (response.status == 'connected') {
                        let authResponse = response.authResponse;
                        await this.setAuthInfo(authResponse.userID, authResponse.accessToken, null, authResponse.expiresIn, "facebook");
                        resolve(true);
                    } else {
                        reject(false);
                    }
                }
            });
        });
        return loginResultPromise;
    }
}

export default AuthManager;