let token = '19478dfd4a964b3abaea3fb59f52d9522b452c6766c344a1'
import { CharacterState } from "../redux/slices/rootSlice";

export const serverCalls = {
    get: async() => {
        const response = await fetch(`https://marvel-inventory.glitch.me/api/characters`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch data'), response.status
        }

        return await response.json()
    },
    create: async(data: CharacterState) => {
        const response = await fetch(`https://marvel-inventory.glitch.me/api/characters`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            },

            body: JSON.stringify(data)
        });

        if (!response.ok){
            throw new Error('Failed to create data on Server'), response.status
        }

        return await response.json()

    },
    update: async(id:string, data:CharacterState) => {
        const response = await fetch(`https://marvel-inventory.glitch.me/api/characters/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            },

            body: JSON.stringify(data)
        });

        if (!response.ok){
            throw new Error('Failed to update data on Server'), response.status
        }

        return await response.json()
    },

    delete: async(id:string) => {
        const response = await fetch(`https://marvel-inventory.glitch.me/api/characters/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            }
        });

        if (!response.ok){
            throw new Error('Failed to delete data'), response.status
        }
    }
}