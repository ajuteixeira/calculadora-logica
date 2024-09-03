import React, { useState } from "react";
import Button from "./Button";
import Input from "./Input";

export default function Calculator() {
  const [inputValue, setInputValue] = useState("");

  const addToInput = (text) => {
    setInputValue((inputValue) => inputValue + text);
  };

  const clearInput = () => {
    setInputValue((inputValue) => inputValue.slice(0, -1));
  };

  return (
    <>
      <Input value={inputValue} />
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
            onClick={clearInput}
            format="large"
            color="dark"
            text="calcular"
          />
        </div>
        <div className="col-end-7 col-span-2 ...">
          <Button onClick={clearInput} format="medium" color="red" text="⌫" />
        </div>
      </div>
    </>
  );
}
