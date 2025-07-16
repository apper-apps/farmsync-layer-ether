import tasksData from "@/services/mockData/tasks.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const tasksService = {
  async getAll() {
    await delay(300);
    return [...tasksData];
  },

  async getById(id) {
    await delay(200);
    const task = tasksData.find(t => t.Id === id);
    if (!task) {
      throw new Error("Task not found");
    }
    return { ...task };
  },

  async getByFieldId(fieldId) {
    await delay(250);
    return tasksData.filter(t => t.fieldId === fieldId).map(t => ({ ...t }));
  },

  async getPendingTasks() {
    await delay(250);
    return tasksData.filter(t => !t.completed).map(t => ({ ...t }));
  },

  async getCompletedTasks() {
    await delay(250);
    return tasksData.filter(t => t.completed).map(t => ({ ...t }));
  },

  async create(taskData) {
    await delay(400);
    const newTask = {
      ...taskData,
      Id: Math.max(...tasksData.map(t => t.Id)) + 1,
      completed: false
    };
    tasksData.push(newTask);
    return { ...newTask };
  },

  async update(id, updates) {
    await delay(300);
    const index = tasksData.findIndex(t => t.Id === id);
    if (index === -1) {
      throw new Error("Task not found");
    }
    
    tasksData[index] = { ...tasksData[index], ...updates };
    return { ...tasksData[index] };
  },

  async delete(id) {
    await delay(300);
    const index = tasksData.findIndex(t => t.Id === id);
    if (index === -1) {
      throw new Error("Task not found");
    }
    
    const deletedTask = tasksData.splice(index, 1)[0];
    return { ...deletedTask };
  }
};