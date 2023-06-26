const AnswerPrompt = ({playerColorText, playerColorName}) => {
  return (
    <>
      <h1 style={playerColorText}>
        Incorrect
        <br></br>
        Color: {playerColorName}
      </h1>
    </>
  );
};

export default AnswerPrompt;