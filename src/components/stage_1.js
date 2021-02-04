import React, { useContext, useRef, useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { MyContext } from "../context";

const Stage1 = () => {
    const textInput = useRef();
    const context = useContext(MyContext);

    const [error, setError] = useState([false, '']);

    const handleSubmit = (e) => {
        e.preventDefault();
        const value = textInput.current.value;
        const validate = validateInput(value);

        if (validate) {
            setError([false, '']);
            context.addPlayer(value);

            textInput.current.value = '';
        }

    }

    const validateInput = (value) => {
        if (value === '') {
            setError([true, 'Sorry, You need to type something.']);
            return false;
        }
        if (value.length <= 2) {
            setError([true, 'Sorry you need three character at-least.']);
            return false;
        }
        return true;
    }

    console.log(context);

    return (
        <>
            <Form className="mt-4" onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Control
                        type="text"
                        placeholder="Add Player name..."
                        name="player"
                        ref={textInput}
                    />
                </Form.Group>

                {
                    error[0]
                        ?
                        <Alert variant={'danger'}>
                            {error[1]}
                        </Alert>
                        : null
                }

                <Button
                    className={'miami w-100'}
                    variant={'primary'}
                    type={'submit'}
                >
                    Add Player
                </Button>

                {
                    context.state.players && context.state.players.length > 0
                        ?
                        <>
                            <hr/>
                            <div>
                                <ul className="list-group">
                                    {context.state.players.map((item, id) => (
                                        <li
                                            className="list-group-item d-flex justify-content-between align-items-center list-group-item-action"
                                            key={id}
                                        >
                                            {item}
                                            <span
                                                className={'badge badge-danger'}
                                                onClick={() => context.removePlayer(id)}
                                            >x
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="action_button" onClick={() => context.next()}>
                                    NEXT
                                </div>

                            </div>
                        </>
                        : null
                }

            </Form>
        </>
    );
}

export default Stage1;
