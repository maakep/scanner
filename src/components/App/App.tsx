import React, { useState, useRef } from 'react';
import * as Xzing from '@zxing/library';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  justify-content: center;
  min-height: 40px;
  width: 100%
`;

const ScanButton = styled.div`
  position: absolute;
  border-radius: 50%;
  height: 60px;
  width: 60px;
  
  left: 50%;
  bottom: 50px;
  transform: TranslateX(-50%);
  
  display: flex;
  justify-content: center;
  align-items: center;

  background: orange;
`;

function App() {
  const [value, setValue] = useState<string>();
  const scanner = useRef(new Xzing.BrowserMultiFormatReader());

  const decode = async () => {
    const result = await scanner.current.decodeOnceFromVideoDevice(undefined, 'video');
    setValue(result.getText());
    scanner.current.reset();
  }

  return (
  <Container>
    <Row>Scanner value:</Row>
    <Row>{value}</Row>
    <Row><Video /></Row>
    <ScanButton onClick={() => decode()}>Scan</ScanButton>
  </Container>
  );
}

const Video = () =>
  <video
    id="video"
    width="320"
    height="320"
    autoPlay={false}
    style={{ border: "1px solid black" }}
  />;

export default App;
