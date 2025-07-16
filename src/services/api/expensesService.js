import expensesData from "@/services/mockData/expenses.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const expensesService = {
  async getAll() {
    await delay(300);
    return [...expensesData];
  },

  async getById(id) {
    await delay(200);
    const expense = expensesData.find(e => e.Id === id);
    if (!expense) {
      throw new Error("Expense not found");
    }
    return { ...expense };
  },

  async getByCropId(cropId) {
    await delay(250);
    return expensesData.filter(e => e.cropId === cropId).map(e => ({ ...e }));
  },

  async getByCategory(category) {
    await delay(250);
    return expensesData.filter(e => e.category === category).map(e => ({ ...e }));
  },

  async create(expenseData) {
    await delay(400);
    const newExpense = {
      ...expenseData,
      Id: Math.max(...expensesData.map(e => e.Id)) + 1
    };
    expensesData.push(newExpense);
    return { ...newExpense };
  },

  async update(id, updates) {
    await delay(300);
    const index = expensesData.findIndex(e => e.Id === id);
    if (index === -1) {
      throw new Error("Expense not found");
    }
    
    expensesData[index] = { ...expensesData[index], ...updates };
    return { ...expensesData[index] };
  },

  async delete(id) {
    await delay(300);
    const index = expensesData.findIndex(e => e.Id === id);
    if (index === -1) {
      throw new Error("Expense not found");
    }
    
    const deletedExpense = expensesData.splice(index, 1)[0];
    return { ...deletedExpense };
  }
};