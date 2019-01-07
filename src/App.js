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
import PurchaseLayout from "./containers/layout/PurchaseLayout";


class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Route path='/registration' render={(props) => {
                        return (
                            <div>
                                <MainLayout/>
                                <Registration/>
                            </div>
                        )
                    }
                    }/>
                    <Route path='/login_with_purchase' render={(props) => {
                        return (
                            <div>
                                <MainLayout/>
                                <Login withPurchase={true}/>
                            </div>)
                    }}/>
                    <Route path='/login' render={(props) => {
                        let itemsArray;

                        console.log(props)

                        if (props.location.itemsArray)
                            itemsArray = props.location.itemsArray;
                        if (props.itemsArray)
                            itemsArray = props.itemsArray;

                        return (
                            <div>
                                <MainLayout/>
                                <Login itemsArray={itemsArray}/>
                            </div>)
                    }}/>
                    <Route path='/order' render={(props) => {
                        let authInfo = new AuthManager().getAuthInfo();
                        let noMemPurchase = false;

                        if (props.noMemPurchase)
                            noMemPurchase = props.noMemPurchase;
                        if (props.location.noMemPurchase)
                            noMemPurchase = props.location.noMemPurchase

                        if (authInfo.user == "guest" && !noMemPurchase) {
                            return (<Redirect to="/login_with_purchase"/>)
                        }
                        else {
                            return (
                                <div>
                                    <MainLayout/>
                                    <OrderLayout itemsArray={props.location.itemsArray}/>
                                </div>);
                        }
                    }
                    }/>
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