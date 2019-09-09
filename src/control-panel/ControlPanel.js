import React  from 'react';
import './ControlPanel.css';

const ControlPanel = ({setWordFormat, selectedWord}) => {
    
    const apliedStyle = (type) => {
        if (!selectedWord) return 'format-action';
        return selectedWord[type] ? 'format-action selected' : 'format-action';
    }
    
    return (
        <div id="control-panel">
            <div id="format-actions">
                <button className={apliedStyle('bold')} type="button" onClick={() => setWordFormat('bold')}><b>B</b></button>
                <button className={apliedStyle('italic')} type="button" onClick={() => setWordFormat('italic')}><i>I</i></button>
                <button className={apliedStyle('underlined')} type="button" onClick={() => setWordFormat('underlined')}><u>U</u></button>
            </div>
        </div>
    );
    
}

export default ControlPanel;
