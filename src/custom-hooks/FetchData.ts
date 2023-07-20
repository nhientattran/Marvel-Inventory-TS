import React, { useState, useEffect } from 'react';
import { serverCalls } from '../api';
import { CharacterState } from '../redux/slices/rootSlice';

export const useGetData = () => {
    const [characterData, setData] = useState<CharacterState[]>([]);

    async function handleDataFetch() {
        const result = await serverCalls.get();
        setData(result)
        console.log(result)
    }

    useEffect(() => {
        handleDataFetch();
    },[])

    return { characterData, getData: handleDataFetch }
}