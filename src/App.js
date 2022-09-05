import React, { useState } from "react";
import { CalculatorContainer } from "./components/CalculatorContainer";
import { Result } from "./components/Result";
import { ButtonContainer } from "./components/ButtonContainer";
import { Button } from "./components/Button";
import "./css/App.css";
const { ipcRenderer } = window.require("electron");

export const App = () => {
  const [inuptValue, setInputValue] = useState("");

  const ops = ["/", "*", "+", "-", "."]

  const handleClick = (val) => {
    if(
      (ops.includes(val) && inuptValue === '') || (ops.includes(val) && ops.includes(inuptValue.slice(-1)))
    ){
      return
    }
    setInputValue(inuptValue.toString() + val);
  };

  const calculate = () => {
    ipcRenderer.send("calculate:calc", inuptValue);
    ipcRenderer.on("calculate:calc", (_, value) => {
      setInputValue(value);
    });
  };

  const clear = () => {
    ipcRenderer.send("calculate:clear");
    ipcRenderer.on("calculate:clear", () => {
      setInputValue("");
    });
  };

  const back = () => {
    ipcRenderer.send("calculate:back", inuptValue);
    ipcRenderer.on("calculate:back", (_, value) => {
      setInputValue(value);
    });
  };

  return (
    <CalculatorContainer>
      <Result value={inuptValue} />
      <ButtonContainer>
      {/* <Button value="back" click={back} />
      <Button value="clear" click={clear} /> */}
        {[7, 8, 9, "/", 4, 5, 6, "*", 1, 2, 3, "-", 0, ".", "+"].map(
          (value) => (
            <Button
              value={value}
              key={value}
              click={() => handleClick(value)}
            />
          )
        )}
        <Button value="=" click={calculate} />
      </ButtonContainer>
    </CalculatorContainer>
  );
};
