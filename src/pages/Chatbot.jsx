import React, { useState, useRef, useEffect } from "react";
import { FaComments, FaTimes, FaPaperPlane } from "react-icons/fa"; // Import icons
import "../styles/chatbot.css"; // Import the styling

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [showTopics, setShowTopics] = useState(false);
  const messagesEndRef = useRef(null);

  const handleSend = () => {
    if (input.trim() === "") return;

    setMessages((prevMessages) => [
      ...prevMessages,
      { text: input, sender: "user" },
    ]);

    const botResponse = getBotResponse(input);
    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: botResponse, sender: "bot" },
      ]);
    }, 1000); // Simulate bot response delay

    setInput("");
  };
  const getBotResponse = (userInput) => {
    const lowerInput = userInput.toLowerCase();

    // Greeting responses
    if (lowerInput.includes("hi") || lowerInput.includes("hello")) {
      setShowTopics(true); // Show topics after greeting
      return "Welcome to Kericho Hospital! How can I assist you today? Please choose a topic: \n1. Emergency\n2. Working Hours\n3. Diet\n4. Vaccinations\n5. Appointments\n6. Contact";
    }

    // Topic responses
    if (showTopics) {
      if (lowerInput.includes("emergency")) {
        return "In case of an emergency, please contact our emergency hotline at +254 712 345 678 for immediate assistance. If necessary, visit our emergency department for urgent care.";
      } else if (lowerInput.includes("working hours")) {
        return "Our working hours are Monday to Friday, 8 AM to 8 PM. We are closed on weekends.";
      } else if (lowerInput.includes("diet")) {
        return (
          "We provide dietary advice for different groups based on their health needs:\n" +
          "1. Breastfeeding Mothers: Eat a balanced diet rich in fruits, vegetables, whole grains, and lean proteins. Drink plenty of fluids to stay hydrated and limit caffeine intake.\n" +
          "2. Children: Ensure a nutrient-rich diet including fresh fruits, vegetables, whole grains, dairy, and lean proteins. Avoid excessive sugary snacks and processed foods.\n" +
          "3. Adults: Maintain a balanced diet with a variety of proteins, healthy fats, whole grains, and fiber. Drink enough water and limit fast food consumption.\n" +
          "4. Seniors: Focus on foods rich in calcium, fiber, and essential vitamins. Stay hydrated and consider supplements based on medical advice.\n" +
          "For personalized diet plans, visit our nutrition department at Kericho Hospital."
        );
      } else if (lowerInput.includes("vaccination") || lowerInput.includes("vaccines")) {
        return "We offer a variety of vaccinations for both children and adults. Please consult with our healthcare providers for more information on available vaccines.";
      } else if (lowerInput.includes("appointment")) {
        return "You can make an appointment by calling our office at +254 712 345 678 or using the online appointment system on our website.";
      } else if (lowerInput.includes("contact")) {
        return "You can contact us at +254 712 345 678 or email us at info@hospital.com for any inquiries.";
      } else {
        return "I'm sorry, I didn't understand that. Can you please choose a topic from the list?";
      }
    }

    // Default response
    return "I'm sorry, I didn't understand that. Can you please rephrase?";
  };


  // Auto-scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chatbot-container">
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <h3>💬 HealthBot</h3>
            <button className="close-btn" onClick={() => setIsOpen(false)}>
              <FaTimes />
            </button>
          </div>
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                {msg.text.split("\n").map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="chatbot-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
            />
            <button onClick={handleSend}>
              <FaPaperPlane />
            </button>
          </div>
        </div>
      )}
      <button className="chatbot-icon" onClick={() => setIsOpen(!isOpen)}>
        <FaComments />
      </button>
    </div>
  );
};

export default Chatbot;
