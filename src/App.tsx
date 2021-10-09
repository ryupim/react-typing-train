import React, { useState }from 'react';
import MyButton from './components/MyButton';
import './App.scss';

export default function App() {
  const [text, setText] = useState('test text');
  const [typing, setTyping] = useState(false);
  const [position, setPosition] = useState(0);
  const [typo, setTypo] = useState(new Array(0));

  const typingToggle = () => setTyping(typing ? false : true);

  const handleKey  = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (typing) {
      // 文字の配列を取得
      let textSpans = document.querySelector("#textbox")!.children;

      if (e.key === text[position]) {
        textSpans[position].classList.add("typed-letters");
        textSpans[position].classList.remove("current-letter");
        // まだ入力していない文字がある時
        if(position <= text.length - 2){
          textSpans[position + 1].className = "current-letter";
          setPosition(position + 1);
        }else{
          setTyping(false);
        }
      }else{
        // その位置でのはじめての打ち間違えである時
        if(typo.indexOf(position) === -1) {
          // うち間違えた位置をtypo配列に追加
          setTypo([...typo, position]);
          textSpans[position].classList.add("typo");
      
        }
      }
      // if (text[position + 1] === ' '){
      //   setPosition(position + 2);
      // }else{
      //   setPosition(position + 1);
      // }
    }
  };

  const refresh = () => {
    let textSpans = document.querySelector("#textbox")!.children;
    for (const i of textSpans) {
      i.className = "waiting-letters";
    }
    textSpans[0].className = "current-letter";
    setPosition(0);
    setTypo(new Array(0));
  };

  return (
    <div className='App' onKeyPress={e => handleKey(e)} tabIndex={0}>
      <div id='textbox'>
        <span className='current-letter'>{text[0]}</span>
        {text.split('').slice(1)
          .map(char => (
            <span className="waiting-letters">{char}</span>
          ))}
      </div>
      <div>
        <MyButton onClick={typingToggle}>{typing ? 'OFF' : 'ON'}</MyButton>
        <MyButton onClick={refresh}>Refresh</MyButton>
      </div>
    </div>
  );
}


// export default App;
