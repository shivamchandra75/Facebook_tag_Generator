import { useState } from "react";
import "./index.scss";
import { useRef } from "react";
import CrossIcon from "./assets/CrossIcon";

function App() {
  const [tag, setTag] = useState("");
  const inputRef = useRef(null);

  function handleChange(e) {
    setTag(e.target.value);
  }

  function handleDelete() {
    setTag("");
    inputRef.current.focus();
  }

  function handleClick() {
    const tagGroup = inputRef.current.value;
    if (tagGroup.length === 0) return;

    const keywords = tagGroup.split("#");
    keywords.shift();

    const mainKeyword = keywords.shift();
    const mainTag = "#".concat("", mainKeyword).trim();

    const tags = keywords.map((word) => {
      const hash = "#";
      const finalTag = hash.concat("", word);
      return finalTag;
    });

    let tagsString = "";

    for (let step = 0; step < 4; step++) {
      const index = Math.floor(Math.random() * tags.length);
      const tag = tags.splice(index, 1);
      tagsString = tagsString.concat(" ", tag);
    }

    console.log("🔥", mainTag.concat(" ", tagsString));
    const resultTag = mainTag.concat(" ", tagsString);
    copyToClipboard(resultTag);
  }

  async function copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <div className="app">
      <h1>🙏SATGURU DEV KI JAY🙏</h1>
      <div className="input-container">
        <input
          ref={inputRef}
          type="text"
          value={tag}
          onChange={(e) => handleChange(e)}
          className="input"
        />
        <button className="clear-btn" onClick={handleDelete}>
          <CrossIcon />
        </button>
      </div>
      <button className="generate-btn" onClick={handleClick}>
        Make Tag
      </button>
    </div>
  );
}

export default App;
