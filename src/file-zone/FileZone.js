import React from "react";
import Word from '../word/Word'
import './FileZone.css';
import Loader from "../loader/Loader";

const FileZone =  ({loading, text, handleClick, selectedWord, synonyms, changeWord}) => {

    const formatText = text => {
        return text.map( (word,i) => <Word key={word.id} handleClick={handleClick} word={word} selectedWord={selectedWord}/>)
    }

    const formatSnonyms = () => {

        if(selectedWord === '') {
            return
        } else if(synonyms.length === 0) {
            return 'No synonyms found'
        } else {
            return synonyms.map( syn => <div className="syn" key={syn.word} onClick={() => changeWord(syn.word)} >{syn.word}</div>)
        }
    }

    return (
        <div id="file-zone">
            <div>
                <div id="file" >
                    {formatText(text)}
                </div>
                <div id="synonyms">
                    { selectedWord !== '' && <h2>Synonyms</h2> }
                    { loading ? <Loader/> : formatSnonyms() }
                </div>
            </div>
        </div>
    );
}

export default FileZone;