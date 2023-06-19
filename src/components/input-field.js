import { Form, InputGroup } from "react-bootstrap";

const InputField = ({value, onChangeInput}) => {
  return (
    <InputGroup className="mb-3">
      <InputGroup.Text>Blue</InputGroup.Text>
      <Form.Control
        aria-label="Blue value"
        value={value}
        onChange={(event) => onChangeInput(event)}
      />
    </InputGroup>
  );
};

export default InputField;