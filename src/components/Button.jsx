import { useNavigate } from "react-router-dom";

const Button = ({ text, onClick, type = "button", color = "blue", isBackButton = false }) => {
  const navigate = useNavigate();
  
  const buttonColors = {
    blue: "bg-blue-600 hover:bg-blue-700",
    green: "bg-green-600 hover:bg-green-700",
    red: "bg-red-600 hover:bg-red-700",
    gray: "bg-gray-600 hover:bg-gray-700",
  };

  return (
    <button
      type={type}
      onClick={isBackButton ? () => navigate(-1) : onClick}
      className={`text-white px-4 py-2 rounded-md shadow-md transition ${buttonColors[color]}`}
    >
      {text}
    </button>
  );
};

export default Button;
