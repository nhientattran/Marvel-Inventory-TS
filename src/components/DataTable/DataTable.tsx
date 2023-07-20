import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Typography,
} from '@mui/material';

import { serverCalls } from '../../api';
import { useGetData } from '../../custom-hooks';
import { CharacterForm } from '../CharacterForm';

const columns: GridColDef[] = [
    {field: 'id', headerName: 'ID', width: 90},
    {
        field: 'name',
        headerName: 'Name',
        width: 150,
        editable: true
    },
    {
        field: 'description',
        headerName: 'Description',
        width: 600,
    },
    {
        field: 'movies_appeared',
        headerName: 'Appeared in Movies',
        width: 400,
    },
    {
        field: 'super_power',
        headerName: 'Super Power',
        width: 400,
    },
    {
        field: 'date_created',
        headerName: 'Date Created',
        width: 150,
    }
];

export const DataTable = () => {
    const { characterData, getData } = useGetData()
    const [ open, setOpen ] = useState(false)
    const [ gridData, setData ] = useState<GridRowSelectionModel>([])
    
    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const deleteData = () => {
        serverCalls.delete(`${gridData[0]}`)
        getData()
    }
    
    const myAuth = localStorage.getItem('myAuth')
    if (myAuth === 'true') {
        return (
            <Box sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={characterData}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5,
                            },
                        },
                    }}
                    pageSizeOptions={[5]}
                    checkboxSelection
                    onRowSelectionModelChange={(newSelectionModel) => setData(newSelectionModel)}
                />
                <Button onClick={handleOpen} variant='contained' color='primary'>Update</Button>
                <Button variant='contained' color='warning' onClick={deleteData}>Delete</Button>
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id='form-dialog-title'>Update a Character</DialogTitle>
                    <DialogContent>
                        <DialogContentText>Character id: {gridData[0]}</DialogContentText>
                        <CharacterForm id={`${gridData[0]}`}/>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color='error'>Cancel</Button>
                    </DialogActions>
                </Dialog>
            </Box>
        )} else {
            return (
                <Box>
                    <Typography variant='h4'>Please sign in to view your Characters!</Typography>
                </Box>
            )
        }
    }
