import { useEffect, useState } from "react";
import {
  Container,
  Button,
  Image,
  Row,
  ButtonGroup,
  Col,
} from "react-bootstrap";
import { findImageByRGB, findNameByRGB } from "./colors/colors-service";
import InputField from "./input-field";

const Home = () => {
  const [red, setRed] = useState(Math.floor(Math.random() * 256));
  const [green, setGreen] = useState(Math.floor(Math.random() * 256));
  const [blue, setBlue] = useState(Math.floor(Math.random() * 256));
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [playerColorName, setPlayerColorName] = useState("");
  const [playerImage, setPlayerImage] = useState("");

  const [redInput, setRedInput] = useState(0);
  const [greenInput, setGreenInput] = useState(0);
  const [blueInput, setBlueInput] = useState(0);
  const [redSubmit, setRedSubmit] = useState(0);
  const [greenSubmit, setGreenSubmit] = useState(0);
  const [blueSubmit, setBlueSubmit] = useState(0);

  const [correct, setCorrect] = useState(false);
  const [giveUp, setGiveUp] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const answerColorText = {
    color: `rgb(${red}, ${green}, ${blue})`,
    textShadow: `${
      redSubmit === 255 && greenSubmit === 255 && blueSubmit === 255
        ? "-1px 1px 0 #000, 1px 1px 0 #000, 1px -1px 0 #000, -1px -1px 0 #000"
        : "0"
    }`,
  };

  const playerColorText = {
    color: `rgb(${redSubmit}, ${greenSubmit}, ${blueSubmit})`,
    textShadow: `${
      redSubmit === 255 && greenSubmit === 255 && blueSubmit === 255
        ? "-1px 1px 0 #000, 1px 1px 0 #000, 1px -1px 0 #000, -1px -1px 0 #000"
        : "0"
    }`,
  };

  useEffect(() => {
    findNameByRGB(red, green, blue).then((response) => setName(response));
    findImageByRGB(red, green, blue).then((response) => setImage(response));
  }, [red, green, blue]);

  useEffect(() => {
    findNameByRGB(redSubmit, greenSubmit, blueSubmit).then((response) =>
      setPlayerColorName(response)
    );
    findImageByRGB(redSubmit, greenSubmit, blueSubmit).then((response) =>
      setPlayerImage(response)
    );
  }, [redSubmit, greenSubmit, blueSubmit]);

  const checkAnswers = () => {
    setCorrect(red === redInput && green === greenInput && blue === blueInput);
    setSubmitted(true);
    setRedSubmit(redInput);
    setGreenSubmit(greenInput);
    setBlueSubmit(blueInput);
  };

  const newColor = () => {
    setRed(Math.floor(Math.random() * 256));
    setGreen(Math.floor(Math.random() * 256));
    setBlue(Math.floor(Math.random() * 256));
    setRedInput(0);
    setGreenInput(0);
    setBlueInput(0);
    setRedSubmit(0);
    setGreenSubmit(0);
    setBlueSubmit(0);
    setCorrect(false);
    setGiveUp(false);
    setSubmitted(false);
  };

  const giveUpHandler = () => {
    setGiveUp(true);
    setSubmitted(true);
  };

  const onColorChange = (setColor) => {
    return (value) => {
      setColor(Math.min(parseInt(value) || 0, 255));
    };
  };

  return (
    <Container className="my-5 text-center">
      <Row className="my-3">
        <h1>Color Curator/Chooser?</h1>
      </Row>
      <Row className="my-3">
        <Col>
          <Image src={playerImage} className="m-3 border border-dark" />
        </Col>
        <Col>
          <Image src={image} className="m-3 border border-dark" />
        </Col>
      </Row>
      <Row className="mb-2">
        <InputField
          colorSubmit={redSubmit}
          color={red}
          colorInput={redInput}
          onColorChange={onColorChange(setRedInput)}
          name={"Red"}
        />
        <InputField
          colorSubmit={greenSubmit}
          color={green}
          colorInput={greenInput}
          onColorChange={onColorChange(setGreenInput)}
          name={"Green"}
        />
        <InputField
          colorSubmit={blueSubmit}
          color={blue}
          colorInput={blueInput}
          onColorChange={onColorChange(setBlueInput)}
          name={"Blue"}
        />
      </Row>
      <Container className="mt-0">
        <ButtonGroup>
          {(!giveUp && !correct) && <Button className="m-1" onClick={() => checkAnswers()}>
            Submit
          </Button>}
          <Button className="m-1" onClick={() => newColor()}>
            New Color
          </Button>
          {(!giveUp && !correct) && <Button className="m-1" onClick={() => giveUpHandler()}>
            Give Up
          </Button>}
        </ButtonGroup>
      </Container>
      <Container className="my-3 text-center">
        {submitted && correct && (
          <h1 style={answerColorText}>
            Correct!
            <br></br>
            Answer: rgb({red}, {green}, {blue})<br></br>
            Color: {name}
          </h1>
        )}
        {submitted && !correct && !giveUp && (
          <h1 style={playerColorText}>
            Incorrect
            <br></br>
            Color: {playerColorName}
          </h1>
        )}
        {submitted && !correct && giveUp && (
          <h1 style={answerColorText}>
            Answer: rgb({red}, {green}, {blue})<br></br>
            Color: {name}
          </h1>
        )}
      </Container>
    </Container>
  );
};

export default Home;
