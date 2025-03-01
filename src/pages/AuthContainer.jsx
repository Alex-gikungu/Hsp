import React, { useState } from "react";
import Register from "./Register";
import Login from "./Login";

const AuthContainer = () => {
  const [isRegister, setIsRegister] = useState(true);

  return (
    <div>
      {isRegister ? (
        <Register onSwitch={() => setIsRegister(false)} />
      ) : (
        <Login onSwitch={() => setIsRegister(true)} />
      )}
    </div>
  );
};

export default AuthContainer;
