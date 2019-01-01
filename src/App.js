import React, {Component} from 'react';
import Login from "./containers/layout/login/Login"
import MainLayout from "./containers/layout/MainLayout";
import OrderLayout from "./containers/layout/OrderLayout"
import BasketLayout from "./containers/layout/BasketLayout";
import ShopItemGrid from "./containers/layout/grid/ShopItemGrid"
import DetailLayout from "./containers/layout/DetailLayout";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import Registration from "./containers/layout/login/Registration";

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
                    <Route path='/login' render={(props) =>
                        <div>
                            <MainLayout/>
                            <Login/>
                        </div>
                    }/>
                    <Route path='/order' render={(props) =>
                        <div>
                            <MainLayout/>
                            <OrderLayout itemsArray={props.location.itemsArray}/>
                        </div>
                    }/>
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
                            <ShopItemGrid/>
                        </div>
                    }/>
                </div>
            </Router>
        );
    }
}

export default App;