const baseUrl = 'http://localhost:3000/tasks'

export async function createTasks(tasks) {
    const response = await fetch(baseUrl,{
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(tasks)
    });

    return await response.json()
}