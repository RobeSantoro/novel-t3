"use client";

import { useState } from "react";
import { Editor as NovelEditor } from "novel";

export function Editor() {

  const [saveStatus, setSaveStatus] = useState("Saved");
  const [key, setKey] = useState(0);

  /* const saveToFile = () => {
    const content = localStorage.getItem("novel__content");
    const blob = new Blob([content], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'novel__content.json';
    link.click();
    URL.revokeObjectURL(url);
  }; */

  /* const importFromFile = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = event => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result;
        if (typeof content === 'string') {
          localStorage.setItem("novel__content", content);
          setKey(prevKey => prevKey + 1);
        }
      };
      reader.readAsText(file);
    };
    input.click();
  }; */

  return (
    <div className="relative w-full max-w-screen-lg">
      <div className="absolute z-10 px-2 py-1 mb-5 text-sm rounded-lg right-5 top-5 bg-stone-100 text-stone-400">
        {saveStatus}
      </div>
      <NovelEditor
        className="w-full max-w-screen-lg"
        key={key}
        storageKey="novel__content"
        onUpdate={() => {
          setSaveStatus("Unsaved");
        }}
        onDebouncedUpdate={() => {
          setSaveStatus("Saving...");
          setTimeout(() => {
            setSaveStatus("Saved");
          }, 500);
        }}
      />
      {/* <button className="absolute z-10 px-2 py-1 mb-5 rounded-lg text-md left-2 bottom-1 bg-stone-100 text-stone-400"
        onClick={importFromFile}
        >Import from File
      </button>
      <button className="absolute z-10 px-2 py-1 mb-5 rounded-lg text-md right-2 bottom-1 bg-stone-100 text-stone-400"
        onClick={saveToFile}
        >Save to File
      </button> */}
    </div>
  );
}