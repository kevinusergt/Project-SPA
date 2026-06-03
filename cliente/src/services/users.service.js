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
        const response = await fetch(`http://localhost:3000/users?email=${email}`)

        if (!response.ok) {
            throw new Error("Hubo un error");
        }
        const data = await response.json();
        return data
    }
    catch (error) {
        console.error('se presentó el error:', error)
    }
}


export async function deleteUser(id) {
    try {
        const response = await fetch(`http://localhost:3000/users/${id}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            }
        );
        return response.json()
    }
    catch (error) {
        console.error('se presentó el error:', error)
    }

}

export async function updateUser( id, updates) {
    try {
        const response = await fetch(`http://localhost:3000/users/${id}`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updates)
            }
        )
        return await response.json()

    } catch (error) {

    }

}

export async function fetchUsers() {
    try {
        const response = await fetch(`http://localhost:3000/users`)
        if (!response.ok) {
            throw new Error("Hubo un error");
        }
        const data = await response.json();
        return data

    } catch (error) {
        console.error('se presentó el error:', error)
    }
}