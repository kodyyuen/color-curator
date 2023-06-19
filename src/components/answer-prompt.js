const AnswerPrompt = ({playerColor, playerName}) => {
  return (
    <>
      <h1 style={playerColor}>
        Incorrect
        <br></br>
        Color: {playerName}
      </h1>
    </>
  );
};

export default AnswerPrompt;