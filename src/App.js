import React, { Component } from 'react';
import MainLayout from "./containers/layout/MainLayout";
import BasketLayout from "./containers/layout/BasketLayout";
import ShopItemGrid from "./containers/layout/grid/ShopItemGrid"
import DetailLayout from "./containers/layout/DetailLayout";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";

class App extends Component {
    render(){
        return (
                <Router>
                    <div>
                        <Route path='/cart' render={(props) =>
                            <div>
                                <MainLayout />
                                <BasketLayout />
                            </div>
                        } />
                        <Route exact path='/detail/:id' render={(props) =>
                            <div>
                                <MainLayout />
                                <DetailLayout id={props.match.params.id}/>
                            </div>
                        } />
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