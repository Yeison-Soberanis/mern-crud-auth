import axios from "./axios";

// Aqui lo que se hace es definir las funciones que se van a usar para hacer las peticiones a la API de tareas
// obtener las tareas
export const getTasksRequest = () => axios.get("/tasks");
// obtener una tarea en especifico
export const getTaskRequest = (id) => axios.get(`/tasks/${id}`);

export const createTaskRequest = (task) => axios.post("/tasks", task);

export const updateTaskRequest = (id, task) => axios.put(`/tasks/${id}`, task);

export const deleteTaskRequest = (id) => axios.delete(`/tasks/${id}`);
