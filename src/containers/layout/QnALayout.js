import React, {Component} from 'react';
import './QnALayout.css';
import {EditorState, convertToRaw} from 'draft-js';
import {Editor} from 'react-draft-wysiwyg';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

class QnALayout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
        };
    }

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        });
    };

    render() {
        const {editorState} = this.state;
        return (
            <div className="QnALayout">
                <Editor className="Editor"
                        editorState={editorState}
                        wrapperClassName="demo-wrapper"
                        editorClassName="demo-editor"
                        onEditorStateChange={this.onEditorStateChange}
                />
            </div>
        )

    }
}


export default QnALayout;