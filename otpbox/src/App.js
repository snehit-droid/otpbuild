import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [otp, setOtp] = useState(new Array(3).fill(""));
  const [resendCntr, setResendCntr] = useState(3);
  const url = "http://localhost:5000/verify";

  const handleCount = (event) => {
    setOtp([...otp.map(e => "")]);
    setResendCntr(resendCntr - 1);
  }
  
  const handleChange = (element, index) => {
    if(isNaN(element.value)) return false;
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
    if(element.nextSibling){
      element.nextSibling.focus();
    }
  }

  const handleFocus = (event) => {
    event.select();
  }

  const handleSubmit = () => {
    let val = otp.join("");
    let cnt;
    otp.map((d, idx) => (d === "") && (cnt=idx))
    cnt ? alert("no empty spaces allowed") :
    fetch(url, {
      method: 'POST',
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        pin: val,
      })
    })
    .then(resp => resp.json())
    .then(res => {
      alert(res.message);
    })
    .catch((error) => {
      console.log(error);
    })
    setOtp([...otp.map(e => "")]);
  }

  return (
    <div className="App">
      <h1>Login</h1>
      <h4>Enter the OTP we just sent</h4>

      {otp.map((data, index) => {
        return(
          <input
            className="otp-field"
            type="text"
            name="otp"
            maxLength="1"
            key={index}
            value={data}
            onChange={e => handleChange(e.target, index)}
            onFocus={e => handleFocus(e.target)}
          />  
        )
      })}
      <div className="butn">
        <button onClick={e => handleCount(e)} disabled={!resendCntr} >
          Resend
        </button>
        <button onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default App;