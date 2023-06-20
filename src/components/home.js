import { useEffect, useState } from "react";
import {
  Container,
  InputGroup,
  Form,
  Button,
  Image,
  Row,
  ButtonGroup,
  Col,
} from "react-bootstrap";
import { findImageByRGB, findNameByRGB } from "./colors/colors-service";
import AnswerPrompt from "./answer-prompt";

const Home = () => {
  const [red, setRed] = useState(Math.floor(Math.random() * 256));
  const [green, setGreen] = useState(Math.floor(Math.random() * 256));
  const [blue, setBlue] = useState(Math.floor(Math.random() * 256));
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [playerImage, setPlayerImage] = useState("");

  const [redAns, setRedAns] = useState(0);
  const [greenAns, setGreenAns] = useState(0);
  const [blueAns, setBlueAns] = useState(0);
  const [finalRed, setFinalRed] = useState(0);
  const [finalGreen, setFinalGreen] = useState(0);
  const [finalBlue, setFinalBlue] = useState(0);

  const [correct, setCorrect] = useState(false);
  const [giveUp, setGiveUp] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const answerColor = {
    color: `rgb(${red}, ${green}, ${blue})`,
  };

  const playerColor = {
    color: `rgb(${finalRed}, ${finalGreen}, ${finalBlue})`,
    textShadow:
      "-1px 1px 0 #000, 1px 1px 0 #000, 1px -1px 0 #000, -1px -1px 0 #000",
  };

  useEffect(() => {
    findNameByRGB(red, green, blue).then((response) => setName(response));
    findImageByRGB(red, green, blue).then((response) => setImage(response));
  }, [red, green, blue]);

  useEffect(() => {
    findNameByRGB(finalRed, finalGreen, finalBlue).then((response) =>
      setPlayerName(response)
    );
    findImageByRGB(finalRed, finalGreen, finalBlue).then((response) =>
      setPlayerImage(response)
    );
  }, [finalRed, finalGreen, finalBlue]);

  const checkAnswers = () => {
    setCorrect(red === redAns && green === greenAns && blue === blueAns);
    setSubmitted(true);
    setFinalRed(redAns);
    setFinalGreen(greenAns);
    setFinalBlue(blueAns);
  };

  const newColor = () => {
    setRed(Math.floor(Math.random() * 256));
    setGreen(Math.floor(Math.random() * 256));
    setBlue(Math.floor(Math.random() * 256));
    setRedAns(0);
    setGreenAns(0);
    setBlueAns(0);
    setFinalRed(0);
    setFinalGreen(0);
    setFinalBlue(0);
    setCorrect(false);
    setGiveUp(false);
    setSubmitted(false);
  };

  const giveUpHandler = () => {
    setGiveUp(true);
    setSubmitted(true);
  };

  return (
    <Container className="my-5 text-center">
      <Row className="my-3">
        <h1>Color Curator/Chooser?</h1>
      </Row>
      <Row>
        <Col>
          <InputGroup className="mb-3">
            <InputGroup.Text
              className={`fw-bold ${
                finalRed === red
                  ? "text-success"
                  : finalRed > red
                  ? "text-primary"
                  : "text-danger"
              }`}
            >
              R
            </InputGroup.Text>
            <Form.Control
              aria-label="Red value"
              value={redAns}
              onChange={(event) =>
                setRedAns(Math.min(parseInt(event.target.value) || 0, 255))
              }
            />
          </InputGroup>
        </Col>
        <Col>
          <InputGroup className="mb-3">
            <InputGroup.Text
              className={`fw-bold ${
                finalGreen === green
                  ? "text-success"
                  : finalGreen > green
                  ? "text-primary"
                  : "text-danger"
              }`}
            >
              G
            </InputGroup.Text>
            <Form.Control
              aria-label="Green value"
              value={greenAns}
              onChange={(event) =>
                setGreenAns(Math.min(parseInt(event.target.value) || 0, 255))
              }
            />
          </InputGroup>
        </Col>
        <Col>
          <InputGroup className="mb-3">
            <InputGroup.Text
              className={`fw-bold ${
                finalBlue === blue
                  ? "text-success"
                  : finalBlue > blue
                  ? "text-primary"
                  : "text-danger"
              }`}
            >
              B
            </InputGroup.Text>
            <Form.Control
              aria-label="Blue value"
              value={blueAns}
              onChange={(event) =>
                setBlueAns(Math.min(parseInt(event.target.value) || 0, 255))
              }
            />
          </InputGroup>
        </Col>
      </Row>
      <Row className="">
        <Col>
          <Image src={playerImage} className="m-3"></Image>
        </Col>
        <Col>
          <Image src={image} className="m-3"></Image>
        </Col>
      </Row>
      <Container className="mt-3">
        <ButtonGroup>
          <Button className="m-1" onClick={() => checkAnswers()}>
            Submit
          </Button>
          <Button className="m-1" onClick={() => newColor()}>
            New Color
          </Button>
          <Button className="m-1" onClick={() => giveUpHandler()}>
            Give Up
          </Button>
        </ButtonGroup>
      </Container>
      <Container className="my-3 text-center">
        {submitted && correct && (
          <h1 style={answerColor}>
            Correct!
            <br></br>
            Answer: rgb({red}, {green}, {blue}).
            <br></br>
            Color: {name}
          </h1>
        )}
        {submitted && !correct && !giveUp && (
          <AnswerPrompt playerColor={playerColor} playerName={playerName} />
        )}
        {submitted && !correct && giveUp && (
          <h1 style={answerColor}>
            Answer: rgb({red}, {green}, {blue})<br></br>
            Color: {name}
          </h1>
        )}
      </Container>
    </Container>
  );
};

export default Home;
