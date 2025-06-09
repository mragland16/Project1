import React, { useState } from 'react';
import './App.css';

function RenderPerson(props) {
  return (
    <div
      style={{
        margin: 5,
        border: 'red 1px solid',
      }}
    >
      <p>
        {props.name} - {props.email}
      </p>
      <button
        style={{
          backgroundColor: 'green',
          color: 'white', // Added for better visibility
          padding: '5px 10px', // Added for better button styling
          border: 'none', // Added for better button styling
          borderRadius: '3px', // Added for better button styling
          cursor: 'pointer', // Added for better UX
        }}
        onClick={props.deleteHandler}
      >
        Remove
      </button>
    </div>
  );
}

const initialContacts = [
  {
    id: 0,
    name: 'Leo',
    email: 'leo@test.com',
  },
  {
    id: 1,
    name: 'Jess',
    email: 'jess@test.com', // Changed to be unique from Raymond
  },
  {
    id: 2,
    name: 'Raymond',
    email: 'raymond@test.com', // Changed to be unique from Jess
  },
];

export default function App() {
  const [searchTxt, setSearchTxt] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contacts, setContacts] = useState(initialContacts);

  const sortHandler = () => {
    const copyContacts = [...contacts];
    copyContacts.sort((x, y) => x.name.localeCompare(y.name));
    setContacts(copyContacts);
  };

  const addHandler = () => {
    if (name.trim() === '' || email.trim() === '') { // Use .trim() to handle whitespace
      return alert('Both name and email fields must be filled.');
    }

    const validateEmailRegex = /^\S+@\S+\.\S+$/;
    const isValidEmail = validateEmailRegex.test(email);

    if (!isValidEmail) {
      return alert('Please enter a valid email address.');
    }

    setContacts([
      ...contacts,
      {
        id: Math.random(), // Okay for simple examples, but consider uuid for production
        name: name.trim(), // Store trimmed name
        email: email.trim(), // Store trimmed email
      },
    ]);
    setName('');
    setEmail('');
  };

  const deleteHandler = (id) => {
    const updatedContacts = contacts.filter((contact) => contact.id !== id);
    setContacts(updatedContacts);
  };

  const filtered = contacts.filter((item) => {
    return (
      item.name.toLowerCase().includes(searchTxt.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTxt.toLowerCase()) // Also search email in lowercase
    );
  });

  return (
    <div className="container">
      <h2>Contact Search</h2>
      {/* SEARCH BAR SECTION */}
      <input
        placeholder="Search by name or email..." // More descriptive placeholder
        type="text"
        value={searchTxt}
        onChange={(event) => setSearchTxt(event.target.value)}
        style={{ marginBottom: '10px', padding: '8px' }} // Added basic styling
      />
      <button className="btn" onClick={sortHandler} style={{ marginLeft: '10px', padding: '8px 15px' }}>
        Sort A-Z
      </button>

      {/* ADD INFO SECTION */}
      <div style={{ marginTop: '20px', border: '1px solid #ccc', padding: '15px', borderRadius: '5px' }}>
        <h3>Add New Contact</h3>
        <label style={{ display: 'block', marginBottom: '10px' }}>
          Enter a name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ marginLeft: '5px', padding: '8px' }}
          />
        </label>
        <label style={{ display: 'block', marginBottom: '10px' }}>
          Enter an email:
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ marginLeft: '5px', padding: '8px' }}
          />
        </label>
        <button className="btn" onClick={addHandler} style={{ padding: '8px 15px', backgroundColor: 'blue', color: 'white' }}>
          Add Contact
        </button>
      </div>

      {/* SHOW DATA */}
      <div style={{ marginTop: '20px' }}>
        <h3>Your Contacts</h3>
        {filtered.length === 0 && <p>No contacts match your search.</p>}
        {filtered.map((person) => (
          <RenderPerson
            key={person.id} // Essential for lists in React
            name={person.name}
            email={person.email}
            deleteHandler={() => deleteHandler(person.id)}
          />
        ))}
      </div>
    </div>
  );
}
