import React, {Component} from 'react';
import ProductRegister from "../layout/ProductRegister";
import BackendController from "../../controller/BackendController";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";

let backendController = new BackendController();

class AdminRouter extends Component{

    constructor(props){
        super(props);
        this.state = {
            status:-1,
            pathname:""
        };
        this.setState({status:-1, pathname:props.pathname});
    }

    async componentDidMount() {
        let result = await backendController.requestAPI("/api/auth/authenticate", {}, "POST");
        if (result.ok)
            this.setState({status: result.ok});
    }

    render() {
        if(this.state.status == -1){
            return(
            <div>
                Page is not authorized
            </div>)
        }
        else{
            return (
                <Router>
                    <div>
                        <Route path={"/admin/productRegister"} component={ProductRegister}/>
                    </div>
                </Router>
            )

        }
    }


}

export default AdminRouter;