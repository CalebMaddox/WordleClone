import { words, acceptableWords } from "./arrays.js";

var onInputKey = 0;
var onRowKey = 0;
var inputWord = "";

var correct = words[Math.floor(Math.random() * words.length)];
console.log(correct);

document.body.addEventListener("keydown", (e) => {
  if (e.key >= "a" && e.key <= "z") {
    if (onInputKey < 5) {
      document.getElementsByClassName("cell")[onInputKey + 5 * onRowKey].innerText = e.key;
      inputWord += e.key;
      onInputKey += 1;
    }
  } else if (e.key === "Backspace" && onInputKey > 0) {
    if (e.ctrlKey) {
      while (onInputKey > 0) {
        document.getElementsByClassName("cell")[onInputKey - 1 + 5 * onRowKey].innerText = "";
        inputWord = "";
        onInputKey -= 1;
      }
    } else {
      document.getElementsByClassName("cell")[onInputKey - 1 + 5 * onRowKey].innerText = "";
      inputWord = inputWord.substring(0, inputWord.length - 1);
      onInputKey -= 1;
    }
  } else if (e.key === "Enter") {
    if (onInputKey < 5) {
      console.log("word too short");
      return;
    }
    if (correct === inputWord) {
      console.log("yay! you win!");
      while (onInputKey > 0) {
        setTimeout(
          (cell) => {
            cell.classList.add("green");
          },
          onInputKey * 80,
          document.getElementsByClassName("cell")[onInputKey - 1 + 5 * onRowKey]
        );
        inputWord = "";
        onInputKey -= 1;
      }
      return;
    }
    if (acceptableWords.includes(inputWord) || words.includes(inputWord)) {
      let lettersForYell = correct.split("");
      let skip = [];
      for (let i = 0; i < inputWord.length; i++) {
        if (correct[i] === inputWord[i]) {
          skip.push(i);
          lettersForYell.splice(
            lettersForYell.findIndex((lett) => lett === correct[i]),
            1
          );
          setTimeout(
            (cell) => {
              cell.classList.add("green");
            },
            i * 80,
            document.getElementsByClassName("cell")[i + 5 * onRowKey]
          );
        }
      }
      for (let i = 0; i < inputWord.length; i++) {
        if (!skip.includes(i)) {
          if (lettersForYell.includes(inputWord[i])) {
            skip.push(i);
            lettersForYell.splice(
              lettersForYell.findIndex((lett) => lett === inputWord[i]),
              1
            );
            setTimeout(
              (cell) => {
                console.log(cell);
                cell.classList.add("yellow");
              },
              i * 80,
              document.getElementsByClassName("cell")[i + 5 * onRowKey]
            );
          }
        }
      }
      for (let i = 0; i < inputWord.length; i++) {
        if (!skip.includes(i)) {
          setTimeout(
            (cell) => {
              console.log(cell);
              cell.classList.add("black");
            },
            i * 80,
            document.getElementsByClassName("cell")[i + 5 * onRowKey]
          );
        }
      }
      inputWord = "";
      onRowKey += 1;
      onInputKey = 0;
    }
  }
});
