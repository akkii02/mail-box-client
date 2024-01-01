import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import "./Mailbox.css";
import { useSelector } from "react-redux";

const Mailbox = () => {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const userEmail = useSelector((state) => state.auth.userId);
  const replacedSenderMail = userEmail.replace(/[@.]/g, "");
console.log("ser",replacedSenderMail)
  const submitHandler = async (event) => {
    event.preventDefault();

    const contentState = editorState.getCurrentContent();
    const plainText = contentState.getPlainText();

    console.log("email", email);
    console.log("subject", subject);
    console.log("mail", plainText);

    const mailData = {
      email: email,
      subject: subject,
      mailBody: plainText,
    };

    const rawContentState = convertToRaw(contentState);
    console.log("rawContentState", rawContentState);

    try {
      const response = await fetch(
        `https://mailboxclient-d7818-default-rtdb.firebaseio.com/sentMail${replacedSenderMail}.json`,
        {
          method: "POST",
          body: JSON.stringify(mailData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      let data = await response.json();
      console.log(data);

   
      setEmail("");
      setSubject("");
      setEditorState(EditorState.createEmpty());
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="email-compose-container">
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="to" className="m-2">
          <Form.Control
            type="email"
            placeholder="To"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="subject" className="m-2">
          <Form.Control
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="body" className="m-2 email-editor-wrapper">
          <Editor
            editorState={editorState}
            onEditorStateChange={setEditorState}
            wrapperClassName="wrapper-class"
            editorClassName="editor-class email-editor"
            toolbarClassName="toolbar-class email-editor-toolbar"
            placeholder="Write some message"
            toolbar={{
              inline: { inDropdown: true },
            }}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Send
        </Button>
      </Form>
    </div>
  );
};

export default Mailbox;