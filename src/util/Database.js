import { createSlice } from '@reduxjs/toolkit'

export const rows = [
    {
        id: 0,
        date: '16 Mar, 2019',
        name: 'HEB Fuel',
        address: '3501 Clear Lake City Blvd',
        ppg: 2.96,
    },
    {
        id: 1,
        date: '16 Mar, 2019',
        name: 'Motu 2395 Chevron',
        address: '2395 Clear Lake City Blvd',
        ppg: 3.30,
    },
    {
        id: 2,
        date: '16 Mar, 2019',
        name: 'Chevron',
        address: '3407 Genoa Red Bluff Rd',
        ppg: 3.30
    },
    {
        id: 3,
        date: '16 Mar, 2019',
        name: 'Pitstop Express #11',
        address: '11302 Space Center Blvd',
        ppg: 2.97,
    },
    {
        id: 4,
        date: '15 Mar, 2019',
        name: 'Exxon',
        address: '11302 Space Center Blvd',
        ppg: 2.75,
    },
];

export const database = createSlice({
    name: 'database',
    initialState: { rows: rows, currentId: rows.length },
    reducers: {
        addDatapoint: (state, obj) => {
            return {
                rows: [
                    ...state.rows,
                    { id: state.currentId, ...obj.payload }
                ],
                currentId: state.currentId + 1
            };
        }
    }
})

// Action creators are generated for each case reducer function
export const { addDatapoint } = database.actions

export default database.reducer