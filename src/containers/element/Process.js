import React, {Component} from 'react';
import './Process.css';


class Process extends Component{
    render(){
        return(
            <ul class="process_ul">{
                this.props.items.map((el) => {
                    if (el.isStepOn)
                        return <li class="step_on">{el.text}</li>;
                    else
                        return <li>{el.text}</li>;
                })
            }
            </ul>
        )
    }
}

export default Process;