import React, { useState } from 'react';
import { FaEdit, FaTrashAlt, FaSave, FaSearch } from 'react-icons/fa';

const AlumniRecords = () => {
  const [alumni, setAlumni] = useState([
    {
      id: 1,
      name: 'Olufemi Ajayi',
      graduationYear: '1982',
      currentCity: 'Lagos',
      occupation: 'Engineer',
      email: 'olufemi.ajayi@example.com',
      phoneNumber: '08031234567',
      feePaid: true,
    },
    {
      id: 2,
      name: 'Bola Adeyemi',
      graduationYear: '1980',
      currentCity: 'Ibadan',
      occupation: 'Lawyer',
      email: 'bola.adeyemi@example.com',
      phoneNumber: '08031234568',
      feePaid: false,
    },
    {
      id: 3,
      name: 'Ngozi Nwankwo',
      graduationYear: '1979',
      currentCity: 'Abuja',
      occupation: 'Teacher',
      email: 'ngozi.nwankwo@example.com',
      phoneNumber: '08031234569',
      feePaid: true,
    },
    {
      id: 4,
      name: 'Emeka Okafor',
      graduationYear: '1981',
      currentCity: 'Enugu',
      occupation: 'Doctor',
      email: 'emeka.okafor@example.com',
      phoneNumber: '08031234570',
      feePaid: true,
    },
    {
      id: 5,
      name: 'Funmi Ogunleye',
      graduationYear: '1978',
      currentCity: 'Lagos',
      occupation: 'Architect',
      email: 'funmi.ogunleye@example.com',
      phoneNumber: '08031234571',
      feePaid: false,
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [editingAlumni, setEditingAlumni] = useState(null);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredAlumni = alumni.filter(
    (alumnus) =>
      alumnus.name.toLowerCase().includes(searchQuery) ||
      alumnus.graduationYear.includes(searchQuery)
  );

  const handleEdit = (alumnus) => {
    setEditingAlumni(alumnus);
  };

  const saveEdit = (id) => {
    setEditingAlumni(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingAlumni({ ...editingAlumni, [name]: value });
  };

  const deleteAlumni = (id) => {
    setAlumni(alumni.filter((alumnus) => alumnus.id !== id));
  };

  return (
    <div className="p-8 bg-gray-100">
      {/* Search Bar */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-4 flex items-center">
        <FaSearch className="text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Search alumni by name or graduation year"
          value={searchQuery}
          onChange={handleSearch}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>

      {/* Alumni Records Table */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-[#0056d6] mb-4">Alumni Records</h2>
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-[#0056d6] text-white">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Graduation Year</th>
              <th className="px-4 py-2">Current City</th>
              <th className="px-4 py-2">Occupation</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Phone Number</th>
              <th className="px-4 py-2">Fee Paid</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAlumni.map((alumnus) => (
              <tr key={alumnus.id} className="border-t">
                <td className="px-4 py-2">
                  {editingAlumni?.id === alumnus.id ? (
                    <input
                      type="text"
                      name="name"
                      value={editingAlumni.name}
                      onChange={handleChange}
                      className="w-full p-1 border"
                    />
                  ) : (
                    alumnus.name
                  )}
                </td>
                <td className="px-4 py-2">
                  {editingAlumni?.id === alumnus.id ? (
                    <input
                      type="text"
                      name="graduationYear"
                      value={editingAlumni.graduationYear}
                      onChange={handleChange}
                      className="w-full p-1 border"
                    />
                  ) : (
                    alumnus.graduationYear
                  )}
                </td>
                <td className="px-4 py-2">
                  {editingAlumni?.id === alumnus.id ? (
                    <input
                      type="text"
                      name="currentCity"
                      value={editingAlumni.currentCity}
                      onChange={handleChange}
                      className="w-full p-1 border"
                    />
                  ) : (
                    alumnus.currentCity
                  )}
                </td>
                <td className="px-4 py-2">
                  {editingAlumni?.id === alumnus.id ? (
                    <input
                      type="text"
                      name="occupation"
                      value={editingAlumni.occupation}
                      onChange={handleChange}
                      className="w-full p-1 border"
                    />
                  ) : (
                    alumnus.occupation
                  )}
                </td>
                <td className="px-4 py-2">
                  {editingAlumni?.id === alumnus.id ? (
                    <input
                      type="email"
                      name="email"
                      value={editingAlumni.email}
                      onChange={handleChange}
                      className="w-full p-1 border"
                    />
                  ) : (
                    alumnus.email
                  )}
                </td>
                <td className="px-4 py-2">
                  {editingAlumni?.id === alumnus.id ? (
                    <input
                      type="text"
                      name="phoneNumber"
                      value={editingAlumni.phoneNumber}
                      onChange={handleChange}
                      className="w-full p-1 border"
                    />
                  ) : (
                    alumnus.phoneNumber
                  )}
                </td>
                <td className="px-4 py-2">
                  {editingAlumni?.id === alumnus.id ? (
                    <input
                      type="checkbox"
                      name="feePaid"
                      checked={editingAlumni.feePaid}
                      onChange={(e) =>
                        setEditingAlumni({ ...editingAlumni, feePaid: e.target.checked })
                      }
                    />
                  ) : alumnus.feePaid ? (
                    'Yes'
                  ) : (
                    'No'
                  )}
                </td>
                <td className="px-4 py-2">
                  {editingAlumni?.id === alumnus.id ? (
                    <FaSave
                      className="inline-block text-green-500 mr-4 cursor-pointer"
                      onClick={() => saveEdit(alumnus.id)}
                    />
                  ) : (
                    <FaEdit
                      className="inline-block text-blue-500 mr-4 cursor-pointer"
                      onClick={() => handleEdit(alumnus)}
                    />
                  )}
                  <FaTrashAlt
                    className="inline-block text-red-500 cursor-pointer"
                    onClick={() => deleteAlumni(alumnus.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AlumniRecords;
