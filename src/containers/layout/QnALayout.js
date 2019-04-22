import React, {Component} from 'react';
import 'QnALayout.css';
import {Editor, EditorState} from 'draft-js';

class QnALayout extends Component {

    constructor(props) {
        super(props);
        this.state = {editorState: EditorState.createEmpty()};
        this.onChange = (editorState) => {
            this.setState({editorState})
        };
    }

    render() {
        return (
            <div className="QnALayout">
                <Editor editorState={this.state.editorState} onChange={this.onChange()}/>
            </div>
        )

    }
}

export default QnALayout;