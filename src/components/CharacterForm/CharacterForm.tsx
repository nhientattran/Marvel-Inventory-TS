import React from 'react';
import { useDispatch, useStore } from 'react-redux';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '@mui/material';

import {
    chooseName,
    chooseDescription,
    chooseMovie,
    choosePower,
    chooseDate
} from '../../redux/slices/rootSlice';
import { CharacterState } from '../../redux/slices/rootSlice';
import { Input } from '../sharedComponents/Input';
import { serverCalls } from '../../api';

interface CharacterFormProps {
    id?: string,
    data?: CharacterState
}

export const CharacterForm = (props: CharacterFormProps) => {
    const dispatch = useDispatch();
    const store = useStore()
    const { register, handleSubmit } = useForm<CharacterState>({})

    const onSubmit: SubmitHandler<CharacterState> = async(data, event) => {
        if (event) event.preventDefault();

        if (props.id) {
            console.log(props.id)
            await serverCalls.update(props.id, data);
            console.log(`Update Character: ${data.name}`);
            window.location.reload()
            if (event) event.currentTarget.reset()
        } else {
            dispatch(chooseName(data.name))
            dispatch(chooseDescription(data.description))
            dispatch(chooseMovie(data.movies_appeared))
            dispatch(choosePower(data.super_power))
            dispatch(chooseDate(data.date_created))

            console.log(store.getState())

            await serverCalls.create(store.getState() as CharacterState)
            window.location.reload()
            if (event) event.currentTarget.reset()
        }
    }
    return (
        <div>
            <form onSubmit = {handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor='name'>Character Name</label>
                    <Input {...register('name')} name='name' placeholder='Character Name Here'/>
                </div>
                <div>
                    <label htmlFor='description'>Description</label>
                    <Input {...register('description')} name='description' placeholder='Description Here'/>
                </div>
                <div>
                    <label htmlFor='movie'>Appeared in Movies</label>
                    <Input {...register('movies_appeared')} name='movie' placeholder='Movies Appeared Here'/>
                </div>
                <div>
                    <label htmlFor='power'>Super Power</label>
                    <Input {...register('super_power')} name='power' placeholder='Super Power Here'/>
                </div>
                <div>
                    <label htmlFor='date'>Date Created</label>
                    <Input {...register('date_created')} name='date' placeholder='Date Created Here'/>
                </div>
                <Button type='submit' variant='contained' color='primary'>Submit</Button>
            </form>
        </div>
    )
}
