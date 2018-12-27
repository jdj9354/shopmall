import React, {Component} from 'react';
import './SelectBox.css';

class SelectBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.items[0].name
        };
    }

    onChange(e) {
        this.setState({
            value: this.props.items[e.target.selectedIndex].name
        })
        this.props.onSelectionChange(this.props.items[e.target.selectedIndex].name);
    }

    render() {

        return (
            <div className="form-group">
                <select value={this.state.value} onChange={this.onChange.bind(this)} className="form-control">
                    {this.props.items.map(option => {
                        return <option value={option.name} key={option.name}>{option.name} (
                            +{option.priceChange} )</option>
                    })}
                </select>
            </div>

        )
    }
}

export default SelectBox;