// 1. Make sure to run the installation command:
// npm install @formspree/react

import React from 'react';
import { useForm, ValidationError } from '@formspree/react';

const formStyles = {
  container: {
    maxWidth: '400px',
    margin: '40px auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
  },
  group: {
    marginBottom: '15px',
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '5px',
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '16px',
  },
  textarea: {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '16px',
    minHeight: '100px',
    resize: 'vertical',
  },
  button: {
    padding: '12px 20px',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: 'white',
    cursor: 'pointer',
    marginTop: '10px',
    transition: 'background-color 0.3s',
  },
  buttonHover: { // For demonstration, actual :hover needs CSS file or state logic
    backgroundColor: '#0056b3',
  },
  error: {
    color: '#dc3545',
    fontSize: '14px',
    marginTop: '5px',
  },
  success: {
    textAlign: 'center',
    padding: '20px',
    color: '#28a745',
    backgroundColor: '#d4edda',
    borderRadius: '4px',
    fontWeight: 'bold',
  }
};

function ContactForm() {
  const [state, handleSubmit] = useForm("mldpokqp");

  if (state.succeeded) {
      return (
        <div style={formStyles.container}>
          <p style={formStyles.success}>Thank you for submitting!</p>
        </div>
      );
  }

  return (
    <form onSubmit={handleSubmit} style={formStyles.container}>
      
      {/* Full Name Input Group */}
      <div style={formStyles.group}>
        <label htmlFor="fullName" style={formStyles.label}>
          Your Name
        </label>
        <input
          id="fullName"
          type="text" 
          name="fullName"
          style={formStyles.input}
        />
        <ValidationError 
          prefix="Full Name" 
          field="fullName"
          errors={state.errors}
          style={formStyles.error}
        />
      </div>

      {/* Game Name Textarea Group */}
      <div style={formStyles.group}>
        {/* Added a clear label for the textarea */}
        <label htmlFor="gameName" style={formStyles.label}>
          Bug Description. (name, steps to reproduce, etc.)
        </label>
        <textarea
          id="gameName"
          name="gameName"
          style={formStyles.textarea}
        />
        <ValidationError 
          prefix="Game Name" 
          field="gameName"
          errors={state.errors}
          style={formStyles.error}
        />
      </div>

      {/* Submission Button */}
      <button 
        type="submit" 
        disabled={state.submitting}
        style={state.submitting ? {...formStyles.button, opacity: 0.7} : formStyles.button}
      >
        {state.submitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}

function App() {
  return (
    <div style={{backgroundColor: '#f4f7f6', minHeight: '100vh', paddingTop: '1px'}}>
        <ContactForm />
    </div>
  );
}

export default App;