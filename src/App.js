import React, {Component} from 'react';
import Login from "./containers/layout/login/Login"
import MainLayout from "./containers/layout/MainLayout";
import OrderLayout from "./containers/layout/OrderLayout"
import BasketLayout from "./containers/layout/BasketLayout";
import DetailLayout from "./containers/layout/DetailLayout";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import {Redirect} from "react-router-dom";
import IndexLayout from "./containers/layout/IndexLayout";
import Registration from "./containers/layout/login/Registration";
import AuthManager from "./auth/AuthManager";
import AuthBeforePurchase from "./containers/layout/AuthBeforePurchase";
import PurchaseLayout from "./containers/layout/PurchaseLayout";
import MyPageLayout from "./containers/layout/MyPageLayout";
import SearchResult from "./containers/layout/SearchResult";
import ProductRegister from "./containers/layout/ProductRegister";
import PurchaseSuccessLayout from "./containers/layout/PurchaseSuccessLayout";
import PurchaseFailLayout from "./containers/layout/PurchaseFailLayout";


class App extends Component {
    constructor(props) {
        super(props);
        let authInfoPromise = new AuthManager().getAuthInfo();
        authInfoPromise.then((authInfo) => {
            this.setState(({
                authInfo: authInfo
            }))
        })
    }

    render() {
        return (
            <Router>
                <div>
                    <Route
                        path="/admin"
                        render={({match: {url}}) => (
                            <>
                                <Route path={`${url}/productRegister`} component={ProductRegister}/>
                            </>
                        )}
                    />
                    <Route path='/registration' render={(props) => {
                        return (
                            <div>
                                <MainLayout/>
                                <Registration forwarding={props.location.forwarding}/>
                            </div>
                        )
                    }
                    }/>
                    <Route path='/mypage' render={(props) => {
                        return (
                            <div>
                                <MainLayout/>
                                <MyPageLayout/>
                            </div>
                        )
                    }}/>
                    <Route path='/login_with_purchase' render={(props) => {
                        return (
                            <div>
                                <MainLayout/>
                                <AuthBeforePurchase/>
                            </div>)
                    }}/>
                    <Route path='/login' render={(props) => {
                        return (
                            <div>
                                <MainLayout/>
                                <Login forwarding="/"/>
                            </div>)
                    }}/>
                    <Route path='/order' render={(props) => {
                        if (!this.state)
                            return (<div>
                                <MainLayout/>
                                <OrderLayout/>
                            </div>);
                        if (!this.state.authInfo)
                            return (<div>
                                <MainLayout/>
                                <OrderLayout/>
                            </div>);

                        let authInfo = this.state.authInfo;
                        let noMemPurchase = false;

                        if (props.noMemPurchase)
                            noMemPurchase = props.noMemPurchase;
                        if (props.location.noMemPurchase)
                            noMemPurchase = props.location.noMemPurchase

                        if (authInfo.user == "guest" && !noMemPurchase) {
                            return (<Redirect to="/login_with_purchase"/>)

                        } else {
                            return (
                                <div>
                                    <MainLayout/>
                                    <OrderLayout/>
                                </div>);
                        }
                    }
                    }/>
                    <Route path='/purchaseSuccess' render={(props) => {
                        return(
                            <div>
                               <MainLayout/>
                               <PurchaseSuccessLayout/>
                            </div>
                        )
                    }}/>
                    <Route path='/purchaseFail' render={(props) => {
                        return(
                            <div>
                                <MainLayout/>
                                <PurchaseFailLayout/>
                            </div>
                        )
                    }}/>
                    <Route path='/purchaseList' render={(props) => {
                        return (
                            <div>
                                <MainLayout/>
                                <PurchaseLayout/>
                            </div>
                        )
                    }}/>
                    <Route path='/cart' render={(props) =>
                        <div>
                            <MainLayout/>
                            <BasketLayout/>
                        </div>
                    }/>
                    <Route exact path='/detail/:id' render={(props) =>
                        <div>
                            <MainLayout/>
                            <DetailLayout id={props.match.params.id}/>
                        </div>
                    }/>
                    <Route exact path='/search/:query' render={(props) =>
                        <div>
                            <MainLayout/>
                            <SearchResult searchQuery={props.match.params.query}/>
                        </div>
                    }/>
                    <Route exact path='/' render={(props) =>
                        <div>
                            <MainLayout/>
                            <IndexLayout/>
                        </div>
                    }/>
                </div>
            </Router>
        );
    }
}

export default App;