import { useState } from 'react';

function MemberForm() {
  const [member, setMember] = useState({
    name: '',
    phoneNumber: '',
    city: '',
    state: '',
    email: '',
    graduationYear: '',
    feePaid: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setMember({
      ...member,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(member);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="text-sm font-semibold text-gray-700">Name</label>
        <input
          type="text"
          name="name"
          value={member.name}
          onChange={handleChange}
          className="mt-1 p-3 rounded-lg border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your name"
        />
      </div>

      <div>
        <label className="text-sm font-semibold text-gray-700">Phone Number</label>
        <input
          type="text"
          name="phoneNumber"
          value={member.phoneNumber}
          onChange={handleChange}
          className="mt-1 p-3 rounded-lg border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your phone number"
        />
      </div>

      <div>
        <label className="text-sm font-semibold text-gray-700">City</label>
        <input
          type="text"
          name="city"
          value={member.city}
          onChange={handleChange}
          className="mt-1 p-3 rounded-lg border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your city"
        />
      </div>

      <div>
        <label className="text-sm font-semibold text-gray-700">State</label>
        <input
          type="text"
          name="state"
          value={member.state}
          onChange={handleChange}
          className="mt-1 p-3 rounded-lg border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your state"
        />
      </div>

      <div>
        <label className="text-sm font-semibold text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={member.email}
          onChange={handleChange}
          className="mt-1 p-3 rounded-lg border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your email"
        />
      </div>

      <div>
        <label className="text-sm font-semibold text-gray-700">Graduation Year</label>
        <input
          type="text"
          name="graduationYear"
          value={member.graduationYear}
          onChange={handleChange}
          className="mt-1 p-3 rounded-lg border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your graduation year"
        />
      </div>

      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          name="feePaid"
          checked={member.feePaid}
          onChange={handleChange}
          className="h-5 w-5"
        />
        <label className="text-sm font-semibold text-gray-700">Fee Paid</label>
      </div>

      <button
        type="submit"
        className="w-full py-3 px-6 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300 ease-in-out font-semibold tracking-wider"
      >
        Submit
      </button>
    </form>
  );
}

export default MemberForm;