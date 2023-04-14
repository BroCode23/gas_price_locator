import reducer, { addDatapoint, rows } from '../util/Database'

test('should return the initial state', () => {
    expect(reducer(undefined, { type: undefined })).toEqual(
        { rows: rows, currentId: 5 }
    )
})

test('should handle a datapoint being added to an empty list', () => {
    const previousState = { rows: [], currentId: 0 };

    expect(reducer(previousState, addDatapoint({
        date: 'DATE',
        name: 'NAME',
        address: 'ADDRESS',
        ppg: 2.22,
    }))).toEqual({
        rows: [{
            id: 0,
            date: 'DATE',
            name: 'NAME',
            address: 'ADDRESS',
            ppg: 2.22,
        }],
        currentId: 1
    });
})

test('should handle a datapoint being added to an existing list', () => {
    const previousState = { rows: rows, currentId: rows.length }

    expect(reducer(previousState, addDatapoint({
        date: 'DATE',
        name: 'NAME',
        address: 'ADDRESS',
        ppg: 2.22,
    }))).toEqual({
        rows: [...rows,
        {
            id: rows.length,
            date: 'DATE',
            name: 'NAME',
            address: 'ADDRESS',
            ppg: 2.22,
        }],
        currentId: rows.length + 1
    });
})
