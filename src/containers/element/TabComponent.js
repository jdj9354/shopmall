import React, {Component} from 'react';
import './TabComponent.css';

class TabComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            tabItems: props.tabItems,
            firstElement : props.tabItems[0]
        };
    }

    render() {
        return (
            <div>
                <div class="tab">
                    {
                        this.state.tabItems.map((el) => {
                            if(el == this.state.firstElement)
                                return (
                                    <button className="tablinks active" onClick={event => this.openTab(event, el.name)}>{el.name}</button>
                                )
                            else
                                return (
                                    <button className="tablinks" onClick={event => this.openTab(event, el.name)}>{el.name}</button>
                                )
                        })
                    }
                </div>
                {
                    this.state.tabItems.map((el) => {
                        if(el == this.state.firstElement)
                            return (
                                <div id={el.name} style={{display:"block"}} className="tabcontent">{el.element}</div>
                            )
                        else
                            return (
                                <div id={el.name} className="tabcontent">{el.element}</div>
                            )
                    })
                }
            </div>
        )
    }

    openTab(evt, cityName) {
        // Declare all variables
        let i, tabcontent, tablinks;

        // Get all elements with class="tabcontent" and hide them
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }

        // Get all elements with class="tablinks" and remove the class "active"
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }

        // Show the current tab, and add an "active" class to the button that opened the tab
        document.getElementById(cityName).style.display = "block";
        evt.currentTarget.className += " active";
    }
}

export default TabComponent;