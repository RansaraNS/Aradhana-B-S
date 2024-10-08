import { Button, Paper, TableBody, TableCell, TableContainer, TableHead, TableRow, Table, styled } from "@mui/material";

// Custom styled components for TableCell and TableContainer
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
  border: `2px solid ${theme.palette.divider}`,
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  borderWidth: 2,
  borderStyle: 'solid',
  borderColor: theme.palette.divider,
  borderRadius: theme.shape.borderRadius,
}));

const RidersTable = ({ rows = [], selectedRider, deleteRider }) => { // Set default value for rows to []
  return (
    <StyledTableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell>Telephone</StyledTableCell>
            <StyledTableCell>Email</StyledTableCell>
            <StyledTableCell>Vehicle Type</StyledTableCell>
            <StyledTableCell>License Type</StyledTableCell>
            <StyledTableCell>Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length > 0 ? (
            rows.map((row) => (
              <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component='th' scope="row">{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.telephone}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.vehicletype}</TableCell>
                <TableCell>{row.licensetype}</TableCell>
                <TableCell>
                  <Button sx={{ margin: '0px 10px' }} onClick={() => selectedRider(row)}>
                    Update
                  </Button>
                  <Button sx={{ margin: '0px 10px' }} onClick={() => deleteRider({ id: row.id })}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell colSpan={7} align="center">No Data</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </StyledTableContainer>
  );
};

export default RidersTable;
