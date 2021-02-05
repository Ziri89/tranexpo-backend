import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import allReducers from "./reducers";
import thunk from "redux-thunk";
import i18n from "./i18n";
import { I18nextProvider, withTranslation } from "react-i18next";
import Navbar from "./navbar/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./App.css";
import TransportRegistration from "./pages/TransportRegistration";
import About from "./pages/About";
import Footer from "./footer/Footer";
import PackagesPlan from "./pages/PackagesPlan";
import Posts from "./pages/Posts";

const composeEnhancers =
    (window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const middleware = [thunk];
const enhancer = composeEnhancers(applyMiddleware(...middleware));

const store = createStore(allReducers, enhancer);

//const lang = localStorage.getItem("lang");
//const baseRouteUrl = lang === "gb" ? "/en" : "/" + lang;
const localesString = "/:locale(de|en|fr|it|ba)?";
export const baseUrl = i18n.language === "/de" ? "" : "/" + i18n.language;
console.log("Lang from App: " + baseUrl, localesString);
function App() {
    return (
        <div className="App">
            <HashRouter>
                <Navbar />
                <Switch>
                    <Route exact path={localesString + "/"}>
                        <Home />
                    </Route>
                    <Route path={localesString + "/login"}>
                        <Login />
                    </Route>
                    <Route path={localesString + "/create-account"}>
                        <Register />
                    </Route>
                    <Route path={localesString + "/transport-registration"}>
                        <TransportRegistration />
                    </Route>
                    <Route path={localesString + "/about"}>
                        <About />
                    </Route>
                    <Route path={localesString + "/packages-plans"}>
                        <PackagesPlan />
                    </Route>
                    <Route path={localesString + "/posts"}>
                        <Posts />
                    </Route>
                </Switch>
            </HashRouter>
            <Footer />
        </div>
    );
}

export default withTranslation("translations")(App);

if (document.getElementById("root")) {
    ReactDOM.render(
        <I18nextProvider i18n={i18n}>
            <Provider store={store}>
                <App />
            </Provider>
        </I18nextProvider>,
        document.getElementById("root")
    );
}
