import React, { useEffect, useState } from "react";
import "./App.css";
import ControlPanel from "./control-panel/ControlPanel";
import FileZone from "./file-zone/FileZone";
import getMockText from "./text.service";
import axios from 'axios';

const synUrl = 'http://api.datamuse.com/words?rel_syn=';

const App = () => {
  const [text, setText] = useState([]);
  const [selectedWord, setSelectedWord] = useState('');
  const [synonyms, setSynonyms] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Get text on first mount
    getText();
  }, []);

  const getText = () => {
    getMockText().then(function(result) {

        // Regexp used to separete puncuation
        const text = result.match(/[\w-’']+|[^\w\s]+/g).map( (text, i) => {

            let word = {
                id: i,
                bold: false,
                italic: false,
                undrlined: false,
                text
            }
            return word;
        });
        
        setText(text);

    });
  };

  const getSynonyms = word => {
    setLoading(true)

    const response = axios.get(`${synUrl}${word.text}`);
    response.then(response => {
        setLoading(false)
        setSynonyms(response.data)
    })
  }

  const changeWord = word => {
    const newWord = {
        ...text[selectedWord],
        text: word
    }

    const newText = [...text]
    newText.splice(newWord.id, 1, newWord);
    setText(newText);
    getSynonyms(newWord);
  }


  const setWordFormat = type => {
      if (selectedWord !== '') {
        let modifiedWord = text[selectedWord];
        modifiedWord[type] = !modifiedWord[type];
        const newText = [...text]
        newText.splice(selectedWord, 1, modifiedWord);
        setText(newText);
      }
  }

  const handleSelection = id => {
      setSelectedWord(id);
      id !== '' && getSynonyms(text[id]);
  }

  return (
    <div className="App">
      <header>
        <span>Simple Text Editor</span>
      </header>
      <main>
        <ControlPanel setWordFormat={setWordFormat} selectedWord={text[selectedWord]}/>
        <FileZone loading={loading} handleClick={handleSelection} selectedWord={selectedWord} text={text} synonyms={synonyms} changeWord={changeWord}/>
      </main>
    </div>
  );
};

export default App;