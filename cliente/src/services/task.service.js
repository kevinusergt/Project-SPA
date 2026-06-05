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
        return await response.json();

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

export async function updateTask(taskId, updatedTask) {
    try {
        const response = await fetch(`${baseUrl}/${taskId}`,{
            method: "PATCH",
            headers: {"Content-Type": "applicatio/json"},
            body: JSON.stringify(updatedTask)
        })
        
        return await response.json()

    } catch (error) {
        console.error(error)
    }
}

export async function deleteTask(id) {
    try {
        const response = await fetch(`${baseUrl}/${id}`,{
            method: "DELETE",
             headers: {"Content-Type": "applicatio/json"}
        });

        return await response.json()
    } catch (error) {
        
    }
}