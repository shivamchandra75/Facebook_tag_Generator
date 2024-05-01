import { useState } from "react";
import "./index.scss";
import { useRef } from "react";

function App() {
  const [tag, setTag] = useState("");
  const inputRef = useRef(null);

  function handleChange(e) {
    setTag(e.target.value);
  }

  function handleClick() {
    const tagGroup = inputRef.current.value;
    const keywords = tagGroup.split("#");
    keywords.shift();
    const mainKeyword = keywords.shift();
    const mainTag = "#".concat("", mainKeyword).trim();
    // console.log("🥶", mainTag, "🥶");

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
      <h1>Sant Rampal Ji Bhagwaan Ji Ki Jay</h1>
      <input
        ref={inputRef}
        type="text"
        value={tag}
        onChange={(e) => handleChange(e)}
      />
      <button className="generate" onClick={handleClick}>
        Tag
      </button>
    </div>
  );
}

export default App;
