import cropsData from "@/services/mockData/crops.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const cropsService = {
  async getAll() {
    await delay(300);
    return [...cropsData];
  },

  async getById(id) {
    await delay(200);
    const crop = cropsData.find(c => c.Id === id);
    if (!crop) {
      throw new Error("Crop not found");
    }
    return { ...crop };
  },

  async getByFieldId(fieldId) {
    await delay(250);
    return cropsData.filter(c => c.fieldId === fieldId).map(c => ({ ...c }));
  },

  async create(cropData) {
    await delay(400);
    const newCrop = {
      ...cropData,
      Id: Math.max(...cropsData.map(c => c.Id)) + 1
    };
    cropsData.push(newCrop);
    return { ...newCrop };
  },

  async update(id, updates) {
    await delay(300);
    const index = cropsData.findIndex(c => c.Id === id);
    if (index === -1) {
      throw new Error("Crop not found");
    }
    
    cropsData[index] = { ...cropsData[index], ...updates };
    return { ...cropsData[index] };
  },

  async delete(id) {
    await delay(300);
    const index = cropsData.findIndex(c => c.Id === id);
    if (index === -1) {
      throw new Error("Crop not found");
    }
    
    const deletedCrop = cropsData.splice(index, 1)[0];
    return { ...deletedCrop };
  }
};