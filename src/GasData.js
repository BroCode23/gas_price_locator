import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

// Generate Order Data
function createData(id, date, name, location, ppg) {
    return { id, date, name, location, ppg };
}

const rows = [
    createData(
        0,
        '16 Mar, 2019',
        'HEB Fuel',
        '3501 Clear Lake City Blvd',
        2.96,
    ),
    createData(
        1,
        '16 Mar, 2019',
        'Motu 2395 Chevron',
        '2395 Clear Lake City Blvd',
        3.30,
    ),
    createData(
        2,
        '16 Mar, 2019', 'Chevron',
        '3407 Genoa Red Bluff Rd',
        3.30
    ),
    createData(
        3,
        '16 Mar, 2019',
        'Pitstop Express #11',
        '11302 Space Center Blvd',
        2.97,
    ),
    createData(
        4,
        '15 Mar, 2019',
        'Exxon',
        '11302 Space Center Blvd',
        2.75,
    ),
];

function preventDefault(event) {
    event.preventDefault();
}

export default function GasData() {
    return (
        <React.Fragment>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Local Gas Prices
            </Typography>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Date Submitted</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Address</TableCell>
                        <TableCell align="right">Price Per Gallon</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell>{row.date}</TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.location}</TableCell>
                            <TableCell align="right">{`$${row.ppg.toFixed(2)}`}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <br />
            <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
                See more orders
            </Link>
        </React.Fragment>
    );
}