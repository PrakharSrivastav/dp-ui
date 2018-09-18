import axios from "axios";

class HttpService {

    constructor() {
        this.http = axios;
        this.token = null;
        if (process.env.NODE_ENV == "development") {
            this.apiUrl = "http://localhost:8080/api/";
            this.authUrl = "http://localhost:8080/login";
            this.signupUrl = "http://localhost:8080/tenant/sign-up";
        }

        this.headers = {
            "Content-Type": 'application/json',
            "Accept": "application/json"
        };
        console.log("Service Constructor", process.env.NODE_ENV)
    }

    getBaseURL() {
        console.log(this.apiUrl)
        return this.apiUrl;
    }

    login(credentials) {
        let config = { headers: this.headers };
        return this.http.post(this.authUrl, credentials, config);
    }


    getToken() {
        console.log("validation ", window.localStorage.hasOwnProperty("token") && window.localStorage.getItem("token") != null);
        if (window.localStorage.hasOwnProperty("token") && window.localStorage.getItem("token") != null) {
            return window.localStorage.getItem("token");
        } else if (this.token != null) {
            console.log("the token is ", this.token)
            return this.token;
        }
        else {
            return null;
        }
    }

    getJwtClient() {
        let token = this.getToken();
        // console.log("token is ", token);
        let header = {
            "Content-Type": 'application/json',
            "Accept": "application/json",
            "Authorization": "Bearer " + token
        };
        // console.log("header is ", header);
        let client = this.http.create({
            baseURL: this.apiUrl,
            headers: header,
            data: {},
            validateStatus: function (status) {
                return status < 500;
            }
        });
        // console.log(this);
        console.log("from client ", window.localStorage.getItem("token"));
        return client;
    }

    // check if the user is logged-in?
    check() {
        if (localStorage.getItem("token") != null) {
            console.log("Service - check :: user logged-in");
            return true;
        } else {
            this.clearAuthItems();
            console.log("Service - check :: user NOT logged-in");
            return false;
        }
    }

    // perform logout
    logout() {
        console.log("Service :: Logging out");
        this.clearAuthItems();
    }

    // reusable function to delete localStorage and reset token
    clearAuthItems() {
        this.token = null;
        window.localStorage.removeItem("token");
        console.log("Service :: removed token ", this.token, window.localStorage.getItem("token"));
    }

    checkUnauthorizedAccess(context, error) {
        if (error.message == "Network Error") {
            console.log("Unauthorized access");
            console.log(error);
            context.$emit("logout");
        }
    }

    // check if the current route is admin route
    isAdminRoute(to) {
        console.log("Service :: checking if admin route");
        return (to.path.split("/").indexOf("admin") > -1) ? true : false;
    }

    // check if the current route is admin route
    isWebRoute(to) {
        console.log("Service :: checking if web route");
        return (to.path.split("/").indexOf("web") > -1) ? true : false;
    }

    getUploadFormClient() {
        let token = this.getToken();
        // console.log("token is ", token);
        let header = {
            "Content-Type": "multipart/form-data; charset=utf-8;boundary=--XXX--",
            "Accept": "application/json",
            //"Content-Type": 'application/json',
            "Authorization": "Bearer "+token
        };
        // console.log("header is ", header);
        let client = this.http.create({
            baseURL: this.apiUrl,
            headers: header,
            data: {},
            validateStatus: function (status) {
                return status < 500;
            }
        });
        // console.log(this);
        console.log("from client ", window.localStorage.getItem("token"));
        return client;
    }
}

const http = new HttpService();
export default http;