"use client"
import { useState, useEffect } from 'react';
export default function TextToSpeech({text,setPdfText}) {
    const [voices, setVoices] = useState([]);
    const [selectedVoice, setSelectedVoice] = useState(null);
    const [speaking, setSpeaking] = useState(false);
    const [paused, setPaused] = useState(false);

  const speakText = () => {
    const speech = new SpeechSynthesisUtterance(text);
    speech.voice = selectedVoice;
    window.speechSynthesis.speak(speech);
    setSpeaking(true);
  };

  const pauseSpeech = () => {
    window.speechSynthesis.pause();
    setPaused(true);
  };

  const resumeSpeech = () => {
    window.speechSynthesis.resume();
    setPaused(false);
  };

  const stopSpeech = () => {
    window.speechSynthesis.cancel();
    setSpeaking(false);
    setPaused(false);
  };

  const repeatAgain = () => {
    stopSpeech();
    speakText();
  };

  const handleVoiceChange = (event) => {
    setSelectedVoice(voices[event.target.value]);
  };

  useEffect(() => {
    const synth = window.speechSynthesis;

    const fetchVoices = () => {
      const voices = synth.getVoices();
      setVoices(voices);
      setSelectedVoice(voices[0]);
    };

    if ('speechSynthesis' in window) {
      fetchVoices();
      synth.onvoiceschanged = fetchVoices;
    } else {
      console.warn('Speech synthesis not supported');
    }

    return () => {
      synth.onvoiceschanged = null;
    };
  }, []);

  return (
    <div className=" mx-auto mt-10 p-4 bg-orange-100 rounded shadow-lg h-[70vh] ">
      <textarea className="w-full mb-4 p-2 border border-gray-300 h-[75%] rounded outline-none"
        placeholder="Enter text to convert"  value={text} onChange={(e)=>setPdfText(e.target.value)}
        />
  
      <div className="flex justify-between ">
        <button className="w-1/4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
          onClick={speakText} disabled={speaking}>
          Speak
        </button>
        <button className="w-1/4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mx-2"
          onClick={pauseSpeech} disabled={!speaking || paused}>
          Pause
        </button>
        <button className="w-1/4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ml-2"
          onClick={resumeSpeech} disabled={!speaking || !paused}>
          Resume
        </button>
        <button className="w-1/4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ml-2"
          onClick={stopSpeech} disabled={!speaking}>
          Stop
        </button>
        <button className="w-1/4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ml-2"
          onClick={repeatAgain} disabled={!speaking}>
          Repeat Again
        </button>
      </div>
      <select className="w-full mt-4 p-3 border border-gray-300 rounded outline-none"
        onChange={handleVoiceChange}>
        {voices.map((voice, index) => (
          <option key={index} value={index} >
            {voice.name}
          </option>
        ))}
      </select>
    </div>
  );
}
