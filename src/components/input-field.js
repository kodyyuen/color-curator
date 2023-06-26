import { Form, InputGroup, Col } from "react-bootstrap";

const InputField = ({colorSubmit, color, colorInput, onColorChange, name}) => {
  return (
    <Col>
          <InputGroup className="mb-3">
            <InputGroup.Text
              className={`fw-bold ${
                colorSubmit === color
                  ? "text-success"
                  : colorSubmit > color
                  ? "text-primary"
                  : "text-danger"
              }`}
            >
              {name.charAt(0)}
            </InputGroup.Text>
            <Form.Control
              disabled={colorSubmit === color}
              aria-label={`${name} value`}
              value={colorInput}
              onChange={(event) =>
                onColorChange(event.target.value)
              }
            />
          </InputGroup>
        </Col>
  );
};

export default InputField;