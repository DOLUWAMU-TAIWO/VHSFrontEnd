import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import MemberForm from './components/MemberForm';
import StudentRecords from './components/StudentRecords';
import PaymentPortal from './components/PaymentPortal';
import PaymentVerification from './components/PaymentVerification';
import Footer from './components/Footer';  // Import the Footer component
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [backgroundImage, setBackgroundImage] = useState('');

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get('https://api.unsplash.com/photos/random', {
          params: { query: 'school,students' },
          headers: {
            Authorization: `Client-ID 0vDKn5-zz-kLnkwEZIWUGS21vbHlGxDhL80ICxhFrEs`,
          },
        });
        if (response.data && response.data.urls && response.data.urls.full) {
          setBackgroundImage(response.data.urls.full);
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
          <Link to="/" className="text-blue-500 hover:underline font-semibold">Form Page</Link>
          <Link to="/records" className="text-blue-500 hover:underline font-semibold">Student Records</Link>
          <Link to="/payment" className="text-blue-500 hover:underline font-semibold">Pay Subscription</Link>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<MemberFormPage backgroundImage={backgroundImage} />} />
          <Route path="/records" element={<StudentRecords />} />
          <Route path="/payment" element={<PaymentPortal />} />
          <Route path="/verify-payment" element={<PaymentVerification />} />
        </Routes>

        {/* Footer added to each page */}
        <Footer />
      </div>
    </Router>
  );
}

// Wrapping the form page layout and passing the backgroundImage prop
function MemberFormPage({ backgroundImage }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="w-full max-w-4xl flex flex-col md:flex-row shadow-lg rounded-lg overflow-hidden">
        {backgroundImage ? (
          <div
            className="hidden md:block w-full md:w-1/2 bg-cover bg-center relative"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          >
            <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
              <h2 className="text-3xl font-bold">Victory High School Alumni</h2>
              <p className="mt-2 text-lg">Connecting Alumni, Capturing Moments</p>
            </div>
          </div>
        ) : (
          <div className="hidden md:block w-full md:w-1/2 bg-gray-200">
            <p className="text-center text-white">Loading Image...</p>
          </div>
        )}

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
