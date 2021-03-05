import React, { useCallback, useState, useEffect } from 'react';
import logo from "./logo.svg";
import "./App.css";
import myClient, { MyHelloDto } from './networking/my-client'

function App() {

  const [myData, setMyData] = useState<MyHelloDto>({hello: ''});
  
  const fetchMyData = useCallback(async() => {
    const response = await myClient.getData();
  if (response) setMyData(response);
  }, [])

  useEffect(() => {
    fetchMyData();
  }, [fetchMyData]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>You can see this on mobile</div>
          {myData.hello}
      </header>
    </div>
  );
}

export default App;
