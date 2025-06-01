import React, { useState, useEffect } from "react";

export default function HomePage() {
  const [value, setValue] = useState("");
  const [submittedValue, setSubmittedValue] = useState("");
  const [tentativi, setTentativi] = useState([]);
  const [randomNumber, setRandomNumber] = useState("");
  const [esatte, setEsatte] = useState(0);

  const verifica = (val) => {
    let esatte = 0;
    let presenti = 0;

    const secretArr = randomNumber.split("");
    const guessArr = val.split("");

    // cifre giuste e al posto giusto
    for (let i = 0; i < 4; i++) {
      if (guessArr[i] === secretArr[i]) {
        esatte++;
        secretArr[i] = null;
        guessArr[i] = null;
      }
    }

    // cifre giuste ma nel posto sbagliato
    for (let i = 0; i < 4; i++) {
      if (guessArr[i] !== null) {
        const index = secretArr.indexOf(guessArr[i]);
        if (index !== -1) {
          presenti++;
          secretArr[index] = null;
        }
      }
    }
    console.log(esatte, presenti);
    return { esatte, presenti };
  };

  const hasWon = (esatte) => {
    if (esatte === 4) {
      console.log("hai vinto");
    }
  };

  useEffect(() => {
    const randomNumber = String(Math.floor(1000 + Math.random() * 9000));
    setRandomNumber(randomNumber);
    console.log(randomNumber);
  }, []);

  const handleChange = (e) => {
    let input = e.target.value.replace(/\D/g, "");
    if (input.length > 4) input = input.slice(0, 4);
    setValue(input);
  };
  const handleInputSubmit = (e) => {
    e.preventDefault();
    if (value.length === 4) {
      const result = verifica(value); // { esatte: X, presenti: Y }
      setTentativi((prev) => [...prev, { valore: value, ...result }]);
      setSubmittedValue(value);
      setEsatte(result.esatte);
      setValue("");
      hasWon(result.esatte);
    } else {
      alert("Inserisci esattamente 4 cifre.");
    }
  };

  return (
    <>
      <div className="container mt-3 mb-5">
        <h1>Mastermind</h1>
      </div>
      <div className="container">
        <form onSubmit={handleInputSubmit} className="d-flex flex-column gap-3">
          <input
            className="form-control"
            placeholder="Inserisci 4 cifre"
            type="number"
            value={value}
            onChange={handleChange}
            id="quantity"
            name="quantity"
          />
          <button className="btn btn-primary">Submit</button>
        </form>
      </div>
      {submittedValue &&
        tentativi.map((tentativo, i) => (
          <div
            key={i}
            className="container response-container d-flex justify-content-between">
            <div>{tentativo.valore}</div>
            <div>
              {Array.from({ length: tentativo.esatte }, (_, i) => (
                <span key={"e" + i}>X</span>
              ))}
              {Array.from({ length: tentativo.presenti }, (_, i) => (
                <span key={"p" + i}>0</span>
              ))}
            </div>
          </div>
        ))}
      <div>
        {esatte === 4 && (
          <>
            <div className="container won-container">
              <div>Hai vinto! 🎉</div>
            </div>
            <div className="d-flex justify-content-center m-3">
              {" "}
              <button
                className="btn btn-primary"
                onClick={() => window.location.reload()}>
                Nuova Partita
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
