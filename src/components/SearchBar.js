import React, { useState, useRef } from "react";
import { useSearchBox } from "react-instantsearch";

function CustomSearchBox(props) {
  const { query, refine, stalledSearchDelay } = useSearchBox(props);
  const [inputValue, setInputValue] = useState(query);
  const inputRef = useRef(null);

  function setQuery(newQuery) {
    setInputValue(newQuery);

    refine(newQuery);
  }

  return (
    <div>
      <form
        action=""
        role="search"
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();

          if (inputRef.current) {
            inputRef.current.blur();
          }
        }}
        onReset={(event) => {
          event.preventDefault();
          event.stopPropagation();

          setQuery("");

          if (inputRef.current) {
            inputRef.current.focus();
          }
        }}>
        <input
          ref={inputRef}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          placeholder="Search for products"
          spellCheck={false}
          maxLength={512}
          type="search"
          value={inputValue}
          onChange={(event) => {
            setQuery(event.currentTarget.value);
          }}
          //   autoFocus
          style={{ width: "30%", height: "40px", borderRadius: "10px" }}
        />
        <button
          type="submit"
          style={{
            marginLeft: "10px",
            /* height: revert; */
            padding: "9px",
            borderRadius: "5px",
            width: "7%",
            background: "lightseagreen",
          }}>
          Submit
        </button>
        {/* <button
          type="reset"
          hidden={inputValue.length === 0 || stalledSearchDelay}>
          Reset
        </button> */}
        <span hidden={!stalledSearchDelay}>Searching…</span>
      </form>
    </div>
  );
}

export default CustomSearchBox;
