const baseUrl = 'http://localhost:3000/tasks'

export async function createTasks(tasks) {
    const response = await fetch(baseUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(tasks)
    });

    return await response.json()
}

export async function renderFilterTasks(userId) {
    try {
        const response = await fetch(`${baseUrl}?userId=${userId}`)
        return response.json();

    } catch (error) {
        console.error(error)
    }
}
export async function renderAllTasks() {
    try {
        const response = await fetch(`${baseUrl}`)
        return response.json();

    } catch (error) {
        console.error(error)
    }
}

export async function deleteTask(id) {
    return
}