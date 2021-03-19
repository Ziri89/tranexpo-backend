import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";
import { createStore, applyMiddleware, compose } from "redux";
import allReducers from "./reducers";
import thunk from "redux-thunk";
import i18n from "./i18n";
import { I18nextProvider, withTranslation } from "react-i18next";
import Navbar from "./navbar/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SinglePost from "./pages/SinglePost";
import "./App.css";
import TransportRegistration from "./pages/TransportRegistration";
import About from "./pages/About";
import Footer from "./footer/Footer";
import PackagesPlan from "./pages/PackagesPlan";
import FreightPosts from "./pages/FreightPosts";
import PassengersPosts from "./pages/PassengersPosts";
import Posts from "./pages/Posts";
import AdminRegister from "./pages/AdminRegister";
import AdminDashboard from "./pages/AdminDashboard";
import TravelerPost from "./pages/TravelerSinglePost";

const composeEnhancers =
    (window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const middleware = [thunk];
const enhancer = composeEnhancers(applyMiddleware(...middleware));

const store = createStore(allReducers, enhancer);

const localesString = "/:locale(de|en|fr|it|ba)?";
export const baseUrl = i18n.language === "/de" ? "" : "/" + i18n.language;
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
                    <Route path={localesString + "/posts"}>
                        <Posts />
                    </Route>
                    <Route path={localesString + "/packages-plans"}>
                        <PackagesPlan />
                    </Route>
                    <Route path={localesString + "/freight-posts"}>
                        <FreightPosts />
                    </Route>
                    <Route path={localesString + "/passenger-posts"}>
                        <PassengersPosts />
                    </Route>
                    <Route path={localesString + "/admin-registration"}>
                        <AdminRegister />
                    </Route>
                    <Route path={localesString + "/admin-dashboard"}>
                        <AdminDashboard />
                    </Route>
                    <Route path={localesString + "/single-post/:id"}>
                        <SinglePost />
                    </Route>
                    <Route path={localesString + "/traveler-single-post/:id"}>
                        <TravelerPost />
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
                <CookiesProvider>
                    <App />
                </CookiesProvider>
            </Provider>
        </I18nextProvider>,
        document.getElementById("root")
    );
}
