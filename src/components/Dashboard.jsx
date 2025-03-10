import React, { useState } from 'react';
import './Dashboard.css';

const Dashboard = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // For modal state
  const [recordedCommand, setRecordedCommand] = useState(""); // Store recorded command

  const toggleRecording = () => {
    if (isRecording) {
      // If recording stops, show the confirmation modal
      setIsModalOpen(true);
      // Simulate setting a recorded command (this should come from your speech recognition logic)
      setRecordedCommand("Sample recorded command");
    } else {
      // If recording starts, reset the command
      setRecordedCommand("");
    }
    setIsRecording(!isRecording);
  };

  const handleConfirm = () => {
    // Handle confirmation (e.g., save the command)
    console.log("Command confirmed:", recordedCommand);
    setIsModalOpen(false); // Close the modal
  };

  const handleReRecord = () => {
    // Handle re-recording
    setIsModalOpen(false); // Close the modal
    setIsRecording(true); // Start recording again
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Dashboard</h2>
      </div>
      <div className="dashboard-content">
        {/* Voice Assistant Section - Now at the top */}
        <div className="voice-assistant-section">
          <div className="recording-instructions">
            <h3>Voice Assistant</h3>
            <p>Press the button below and start speaking to your AI Assistant.</p>
            <div className="features-card">
              <ul>
                <li> Turn your voice commands into actions</li>
                <li>Feature 1: Try "Create product "Iphone 14" in my list </li>
                <li>Feature 2: Speak "Generate invoice for purchase of 3 Samsung Ulta 346P"</li>
                <li>Feature 3: Say "Delete vendor SkinCare Asthetics from list."</li>
                <li>Feature 3: Statw "Update client deatils of Ranveer Sharma."</li>
              </ul>
            </div>
            <p className="recording-status">
              {isRecording
                ? "I'm listening... Speak clearly into your microphone"
                : "Click to start speaking"}
            </p>
          </div>

          <button
            onClick={toggleRecording}
            className={`recording-button ${isRecording ? 'recording' : ''}`}
          >
            <span className="recording-indicator"></span>
            {isRecording ? 'Stop Recording' : 'Start Recording'}
          </button>

          {isRecording && (
            <div className="listening-bubble">
              <div className="orb"></div>
            </div>
          )}
        </div>

        {/* Modal for Satisfaction Confirmation */}
        {isModalOpen && (
          <div className="confirmation-modal">
            <div className="modal-content">
              <h3>Are you satisfied with your command?</h3>
              <p><strong>Recorded Command:</strong></p>
              
              {/* Audio Player to Play the Recorded Command */}
              <audio controls>
  <source src={require('../assets/sample-recording.mp3')} type="audio/mp3" />
  Your browser does not support the audio element.
</audio>


              <div className="modal-buttons">
                <button onClick={handleConfirm} className="modal-button confirm">
                  Confirm
                </button>
                <button onClick={handleReRecord} className="modal-button re-record">
                  Re-record
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="dashboard-info">
          <div className="activity-section">
            <h3>Activity</h3>
            <ul>
              <li>5/Feb/2025 - Smith added Product "Sunscreen SPF50"</li>
              <li>20/Feb/2025 - Smith deleted vendor Sunshine Asthetics </li>
            </ul>
          </div>
          <div className="recent-payments">
            <h3>Recent Payments</h3>
            <table>
              <thead>
                <tr>
                  <th>Number</th>
                  <th>Client</th>
                  <th>Amount</th>
                  <th>Invoice</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="5">No records found</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
