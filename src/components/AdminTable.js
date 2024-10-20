import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, TextField } from '@mui/material';

const columns = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'phoneNumber', headerName: 'Phone Number', width: 150 },
  { field: 'city', headerName: 'City', width: 150 },
  { field: 'state', headerName: 'State', width: 150 },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'graduationYear', headerName: 'Graduation Year', width: 150 },
  { field: 'feePaid', headerName: 'Fee Paid', width: 150 },
];

const rows = [
  { id: 1, name: 'John Doe', phoneNumber: '123456789', city: 'New York', state: 'NY', email: 'john@example.com', graduationYear: '2010', feePaid: 'Yes' },
  { id: 2, name: 'Jane Smith', phoneNumber: '987654321', city: 'Los Angeles', state: 'CA', email: 'jane@example.com', graduationYear: '2012', feePaid: 'No' },
  // Add more mock data
];

export default function AdminTable() {
  const [searchText, setSearchText] = React.useState('');

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const filteredRows = rows.filter((row) =>
    Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <TextField
        label="Search"
        variant="outlined"
        value={searchText}
        onChange={handleSearch}
        sx={{ marginBottom: 2, width: '100%' }}
      />
      <DataGrid
        rows={filteredRows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />
    </Box>
  );
}