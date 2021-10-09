import React, { useState }from 'react';
import MyButton from './components/MyButton';
import './App.scss';

export default function App() {
  const [text, setText] = useState('test text');
  const [typing, setTyping] = useState(false);
  const [position, setPosition] = useState(0);

  const typingToggle = () => setTyping(typing ? false : true);

  const handleKey  = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (typing) {
      if (e.key === text[position]) {
        if (text[position + 1] === ' '){
          setPosition(position + 2);
        }else{
          setPosition(position + 1);
        }
      }
    }
  };

  return (
    <div className='App' onKeyPress={(e) => handleKey(e)} tabIndex={0}>
      <div id='textbox'>
        <span className='typed-letters'>{text.slice(0, position)}</span>
        <span className='wating-letters'>{text.slice(position)}</span>
      </div>
      <MyButton onClick={typingToggle}>{typing ? 'OFF' : 'ON'}</MyButton>
    </div>
  );
}


// export default App;
