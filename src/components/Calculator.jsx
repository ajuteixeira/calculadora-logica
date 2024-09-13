import React, { useState, useEffect } from "react";
import Button from "./Button";
import Input from "./Input";
import ErrorMessage from "./ErrorMessage";
import validateInput from "../utils/validateInput";
import call from "../utils/evaluator";

export default function Calculator() {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(false);

  const addToInput = (text) => {
    setInputValue((inputValue) => inputValue + text);
  };

  const clearInput = () => {
    setInputValue((inputValue) => inputValue.slice(0, -1));
  };

  const clearAllInput = () => {
    setInputValue('');
  };

  const validInput = () => {
    if (inputValue.length == 0) return true;
    return validateInput(inputValue);
  };

  useEffect(() => {
    setError(!validInput());
  }, [inputValue]);

  return (
    <>
      <Input value={inputValue} error={error} />
      <ErrorMessage error={error} />
      <div className="grid grid-cols-6 gap-4 pt-6">
        <Button
          onClick={addToInput}
          format="default"
          color="default"
          text="A"
        />
        <Button
          onClick={addToInput}
          format="default"
          color="default"
          text="B"
        />
        <Button
          onClick={addToInput}
          format="default"
          color="default"
          text="C"
        />
        <Button
          onClick={addToInput}
          format="default"
          color="default"
          text="D"
        />
        {/* <Button
          onClick={addToInput}
          format="default"
          color="default"
          text="E"
        /> */}
        <Button
          onClick={addToInput}
          format="default"
          color="default"
          text="("
        />
        <Button
          onClick={addToInput}
          format="default"
          color="default"
          text=")"
        />
        <Button
          onClick={addToInput}
          format="default"
          color="default"
          text="∼"
        />
        <Button
          onClick={addToInput}
          format="default"
          color="default"
          text="∧"
        />
        <Button
          onClick={addToInput}
          format="default"
          color="default"
          text="∨"
        />
        <Button
          onClick={addToInput}
          format="default"
          color="default"
          text="→"
        />
        <Button
          onClick={addToInput}
          format="default"
          color="default"
          text="↔"
        />
        <Button
          onClick={addToInput}
          format="default"
          color="default"
          text="⊻"
        />
        <div className="col-end-5 col-span-4 ...">
          <Button
            onClick={() => console.log(call(inputValue))}
            format="large"
            color="dark"
            text="calcular"
            disabled={error}
          />
        </div>
        <div className="col-end-6 ">
          <Button onClick={clearAllInput} format="default" color="red" text="CL" />
        </div>
        <div className="col-end-7">
          <Button onClick={clearInput} format="default" color="red" text="⌫" />
        </div>
      </div>
    </>
  );
}
