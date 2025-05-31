import React, { useState, useEffect } from "react";

export default function HomePage() {
  const [value, setValue] = useState("");
  const [submittedValue, setSubmittedValue] = useState("");
  const [tentativi, setTentativi] = useState([]);

  const [randomNumber, setRandomNumber] = useState("");

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
      setTentativi((prev) => [...prev, value]);
      setSubmittedValue(value);
      verifica(); // usa direttamente lo state
      setValue("");
    } else {
      alert("Inserisci esattamente 4 cifre.");
    }
  };

  const verifica = () => {
    if (randomNumber.includes(value)) {
      console.log("✅ giusto (è incluso)");
    } else {
      console.log("❌ sbagliato");
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
            <div>{tentativo}</div>
            <div>qui ci vanno i simboli</div>
          </div>
        ))}
    </>
  );
}
