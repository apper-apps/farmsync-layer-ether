import fieldsData from "@/services/mockData/fields.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const fieldsService = {
  async getAll() {
    await delay(300);
    return [...fieldsData];
  },

  async getById(id) {
    await delay(200);
    const field = fieldsData.find(f => f.Id === id);
    if (!field) {
      throw new Error("Field not found");
    }
    return { ...field };
  },

  async create(fieldData) {
    await delay(400);
    const newField = {
      ...fieldData,
      Id: Math.max(...fieldsData.map(f => f.Id)) + 1
    };
    fieldsData.push(newField);
    return { ...newField };
  },

  async update(id, updates) {
    await delay(300);
    const index = fieldsData.findIndex(f => f.Id === id);
    if (index === -1) {
      throw new Error("Field not found");
    }
    
    fieldsData[index] = { ...fieldsData[index], ...updates };
    return { ...fieldsData[index] };
  },

  async delete(id) {
    await delay(300);
    const index = fieldsData.findIndex(f => f.Id === id);
    if (index === -1) {
      throw new Error("Field not found");
    }
    
    const deletedField = fieldsData.splice(index, 1)[0];
    return { ...deletedField };
  }
};