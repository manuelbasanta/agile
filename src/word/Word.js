import React from "react";
import './Word.css';

const Word = ({word, handleClick, selectedWord}) => {
    
    const style = {
        fontWeight: word.bold ? 'bold' : 'normal',
        fontStyle: word.italic ? 'italic' : 'normal',
        textDecoration: word.underlined ? 'underline' : 'none',
        backgroundColor: word.id === selectedWord ? '#d4d4d4' : 'transparent'
    }

    // Divide puntuation from actual words
    const block = word.text.match(/[.,:!?]/) ?
                    <span className="punctuation">{word.text}</span> :
                    <span className="word" onClick={() => handleClick(word.id)} style={style}>{word.text}</span> ;
                    

    return block;
}

export default Word;