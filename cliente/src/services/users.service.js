export async function createUser(user) {
    try {
        const response = await fetch('http://localhost:3000/users',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            }
        );

        if (!response.ok) {
            throw new Error("hubo un error");

        };
        const data = await response.json()
        return data
    }

    catch (error) {
        console.error('se presentó el error:', error)
    }
}


export async function getUserByEmail(email) {
    try {
        const response = await fetch(`http://localhost:3000/users${email}`)

        if (!response.ok) {
            throw new Error("Hubo un error");
        }
        const data = await response.json()
        return data
    }
    catch (error) {
        console.error('se presentó el error:', error)
    }
}


export async function deleteUser(email) {
    try {
        const response = await fetch(`http://localhost:3000/users${email}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            }
        );
    }
    catch (error) {
        console.error('se presentó el error:', error)
    }

}

export async function updateUser(updates) {
    try {
        const response = await fetch('http://localhost:3000/users',
            {
                method: 'PATCH',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updates)
            }
        )
    } catch (error) {
        
    }
    
}