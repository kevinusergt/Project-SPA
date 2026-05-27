export async function createUser(user) {
    const response = await fetch('http://localhost:3000/users',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }
    );

    if(!response.ok){
        throw new Error("hubo un error");
        
    };
    return await response.json();
}
