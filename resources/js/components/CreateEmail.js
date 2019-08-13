import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Editor, EditorState, RichUtils} from "draft-js";

class CreateEmail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty()
        };
    }

    onChange = editorState => {
        this.setState({
            editorState
        });
    };

    handleKeyCommand = command => {
        const newState = RichUtils.handleKeyCommand(
            this.state.editorState,
            command
        );
        if (newState) {
            this.onChange(newState);
            return "handled";
        }
        return "not-handled";
    };

    onUnderlineClick = () => {
        this.onChange(
            RichUtils.toggleInlineStyle(this.state.editorState, "UNDERLINE")
        );
    };

    onBoldClick = () => {
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, "BOLD"));
    };

    onItalicClick = () => {
        this.onChange(
            RichUtils.toggleInlineStyle(this.state.editorState, "ITALIC")
        );
    };


    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Write your new email</div>

                            <div className="card-body">
                                <div>
                                    <label htmlFor="">Subject</label>
                                    <input type="text" className="form-control"/>
                                </div>
                                <br/>
                                <div className="editorContainer">
                                    <button onClick={this.onUnderlineClick}>U</button>
                                    <button onClick={this.onBoldClick}>
                                        <b>B</b>
                                    </button>
                                    <button onClick={this.onItalicClick}>
                                        <em>I</em>
                                    </button>

                                    <div className="editors" style={styles.editor}>
                                        <Editor
                                            editorState={this.state.editorState}
                                            handleKeyCommand={this.handleKeyCommand}
                                            onChange={this.onChange}
                                            placeHolder="Write your Email here ... "
                                        />
                                    </div>
                                </div>

                                <br/>

                                <button type="button" className="btn badge-primary">
                                    Send Email
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const styles = {
    editor: {
        border: '1px solid #ccc',
        cursor: 'text',
        minHeight: 80,
        padding: 10,
    },
};

ReactDOM.render(<CreateEmail/>, document.getElementById('create-email'));

export default CreateEmail;