import React, { useState } from 'react';
import { useSound } from 'use-sound';
import { ReactMic } from 'react-mic';
import UseShowToast from '../../UseShowToast';
import { Button, Flex } from '@chakra-ui/react';
import axios from 'axios';

const RecordButton = () => {
  const [record, setRecord] = useState(false);
  const [audio, setAudio] = useState('');
  const [play, { stop }] = useSound('/path/to/audio/file.mp3');
  const ShowToast = UseShowToast();

  const startRecording = () => {
    setRecord(true);
  };

  const stopRecording = () => {
    setRecord(false);
  };

  const onData = (recordedBlob) => {
    setAudio(recordedBlob.blobURL);
  };

  const onStop = async () => {
    stopRecording();
  
    const formData = new FormData();
    formData.append('audio', audio);
    formData.append('title', 'Recording Title');
    formData.append('description', 'Recording Description');
    formData.append('userId', '1'); 
  
    try {
      await axios.post('/api', formData);
      ShowToast("Success", "Audio uploaded successfully", "success");
    } catch (error) {
      ShowToast("Error",error.message, "error")
      
    }
  };
  const playAudio = () => {
    play();
  };

  const stopAudio = () => {
    stop();
  };

  return (
    <Flex display={"flex"} flexDir={"column"} gap={5}>
      <ReactMic
        record={record}
        className="sound-wave"
        onStop={onStop}
        onData={onData}
        strokeColor="#000000"
        backgroundColor="#445566"
      />
      <Button colorScheme='blue' onClick={record ? stopRecording : startRecording}>
        {record ? 'Stop' : 'Start'}
      </Button>
      {audio && (
        <Flex width={300}  m={5} >
          <audio src={audio} controls />
          <Button onClick={playAudio} colorScheme='blue'>Play</Button>
          <Button onClick={stopAudio} colorScheme='blue'>Stop</Button>
        </Flex>
      )}
    </Flex>
  );
};

export default RecordButton;
// import React, { useState } from 'react'
// import { ReactMic } from 'react-mic';

// function RecordButton() {
//     const [isRecord , setIsRecord]= useState(false);
//     const [audioData , setAudio] = useState('');

//     const startRecord =()=>{
//         setIsRecord(true);

//     };
//     const stopRecording = () =>{
//         setIsRecord(false);

//     };
//     const onData = recordData => {
//         console.log('recordDat of onStop :', recordData);

//     };
//     const onStop = recordData => {
//         console.log('recordData of onStop ', recordData);
//         setAudio(recordData.blobURL);

//     };
    

//    return (
//     <div>
//          <ReactMic
//         record={isRecord}
//         className="sound-wave"
//         onStop={onStop}
//         onData={onData}
//         strokeColor="#000000"
//         backgroundColor="#445566"
//       />
//       <button onClick={startRecord} type="button">Start</button>
//       <button onClick={stopRecording} type="button">Stop</button>
//       {audioData && <audio src={audioData} controls />}
//     </div>
//   )
// }

// export default RecordButton
