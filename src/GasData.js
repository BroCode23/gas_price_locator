import * as React from 'react';
import { useSelector } from 'react-redux'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

export default function GasData() {
    const rows = useSelector((state) => state.database.rows);

    return (
        <React.Fragment>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Local Gas Prices
            </Typography>
            <Table size="small">
                <TableHead>
                    <TableRow >
                        <TableCell sx={{ "font-weight": "bold" }} >Date Submitted</TableCell>
                        <TableCell sx={{ "font-weight": "bold" }}>Name</TableCell>
                        <TableCell sx={{ "font-weight": "bold" }}>Address</TableCell>
                        <TableCell sx={{ "font-weight": "bold" }} align="right">Price Per Gallon</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell>{row.date}</TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.address}</TableCell>
                            <TableCell align="right">{`$${parseFloat(row.ppg).toFixed(2)}`}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </React.Fragment>
    );
}