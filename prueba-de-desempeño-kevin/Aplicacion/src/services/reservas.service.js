const baseUrl = "http://localhost:3000/reservations"

export async function getUserReservas(userId) {
    try {
        const response = await fetch(`${baseUrl}?userId=${userId}`)

        return await response.json()

    } catch (error) {
        console.error(error)
    }

}

export async function getReservas() {
    try {
        const response = await fetch(`${baseUrl}`)

        return await response.json()

    } catch (error) {
        console.error(error)
    }

}

export async function createReserva(createdReserva) {
    try {
        const response = await fetch(`${baseUrl}`,{
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(createdReserva)
        })

        return await response.json()
    } catch (error) {
        
    }
}