import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {convertToRaw, Editor, EditorState, RichUtils} from "draft-js";

class CreateEmail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
            subject: '', body: ''
        };
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

    handleSubjectChange = (e) => {
        this.setState({subject: e.target.value});
    };

    handleBodyChange = (e) => {
        this.setState({body: e.target.value});
    };

    onChange = editorState => {
        this.setState({
            editorState
        });
    };

    submitForm = () => {
        let subject = this.state.subject;
        let contentState = this.state.editorState.getCurrentContent();
        let body = {bodyContent: convertToRaw(contentState)};
        body = (body.bodyContent.blocks[0].text == '') ? '' : JSON.stringify(body.bodyContent);

        fetch('/api/admin/emails/create', {
            method: 'post',
            headers: {"Content-Type": "application/json", "Accept": "application/json"},
            body: JSON.stringify({subject, body})
        }).then(function (response) {
            return response.json();
        }).then((data) => {
            if (data.errors) {
                let errorItems = Object.keys(data.errors).map((key, i) => {
                    let error = data.errors[key][0];
                    return (<li>{error}</li>)
                });

                this.setState({
                    errors: true,
                    success: false,
                    errorItems
                });
            } else {
                this.setState({
                    errors: false,
                    success: true,
                });
            }
        })
    };

    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        {this.state.success ?
                            <div className="alert alert-success">The Email was stored.</div>
                            : null}

                        {this.state.errors ?
                            <div className="alert alert-danger">
                                {this.state.errorItems}
                            </div>
                            : null}

                        <div className="card">
                            <div className="card-header">Write your new email</div>

                            <div className="card-body">
                                <div>
                                    <label htmlFor="">Subject</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="subject"
                                        id="subject"
                                        onChange={this.handleSubjectChange}
                                    />
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
                                        />
                                    </div>
                                </div>

                                <br/>

                                <button type="button" className="btn badge-primary" onClick={this.submitForm}>
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