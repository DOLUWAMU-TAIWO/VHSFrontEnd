import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Dashboard from './components/Dashboard';  // Admin Dashboard
import MemberForm from './components/MemberForm'; // Member Form
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [backgroundImage, setBackgroundImage] = useState('');

  useEffect(() => {
    // Fetch image from Unsplash
    const fetchImage = async () => {
      try {
        const response = await axios.get('https://api.unsplash.com/photos/random', {
          params: { query: 'school,students' },  // Adjust query to fit your theme
          headers: {
            Authorization: `Client-ID 0vDKn5-zz-kLnkwEZIWUGS21vbHlGxDhL80ICxhFrEs`,  // Unsplash API Key
          },
        });
        
        // Check the response structure to make sure we're accessing the correct field
        if (response.data && response.data.urls && response.data.urls.full) {
          setBackgroundImage(response.data.urls.full); // Set the image URL from Unsplash response
        } else {
          console.error('Image URL not found in Unsplash response');
        }
      } catch (error) {
        console.error('Error fetching the image from Unsplash:', error);
      }
    };

    fetchImage();
  }, []);

  return (
    <Router>
      <div className="App">
        {/* Navigation Links */}
        <nav className="flex justify-between p-4 bg-gray-100">
          <Link to="/" className="text-blue-500 hover:underline">Form Page</Link>
          <Link to="/dashboard" className="text-blue-500 hover:underline">Go to Dashboard</Link> {/* Button for Dashboard */}
        </nav>

        {/* Routes */}
        <Routes>
          {/* Form Page Route */}
          <Route path="/" element={<MemberFormPage backgroundImage={backgroundImage} />} />

          {/* Dashboard Page Route */}
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

// Wrapping the form page layout and passing the backgroundImage prop
function MemberFormPage({ backgroundImage }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="w-full max-w-4xl flex flex-col md:flex-row shadow-lg rounded-lg overflow-hidden">
        {/* Left Column: Image Section */}
        {backgroundImage ? (
          <div
            className="hidden md:block w-full md:w-1/2 bg-cover bg-center relative"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          >
            <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
              <h2 className="text-3xl font-bold">Victory High School</h2>
              <p className="mt-2 text-lg">Connecting Alumni, Capturing Moments</p>
            </div>
          </div>
        ) : (
          <div className="hidden md:block w-full md:w-1/2 bg-gray-200">
            <p className="text-center text-white">Loading Image...</p>
          </div>
        )}

        {/* Right Column: Form Section */}
        <div className="w-full md:w-1/2 bg-white p-6 md:p-8 flex flex-col items-center">
          <div className="mb-6 text-center w-full max-w-sm">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Join the Alumni Network</h1>
            <p className="text-gray-600 mt-2">Stay connected with your classmates</p>
          </div>
          <div className="w-full max-w-sm">
            <MemberForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;