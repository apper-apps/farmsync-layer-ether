const { ApperClient } = window.ApperSDK;

const apperClient = new ApperClient({
  apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
  apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
});

export const expensesService = {
  async getAll() {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "category" } },
          { field: { Name: "amount" } },
          { field: { Name: "date" } },
          { field: { Name: "description" } },
          { 
            field: { Name: "crop_id" },
            referenceField: { field: { Name: "Name" } }
          }
        ]
      };
      
      const response = await apperClient.fetchRecords('expense', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      return response.data || [];
    } catch (error) {
      console.error("Error fetching expenses:", error);
      throw error;
    }
  },

  async getById(id) {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "category" } },
          { field: { Name: "amount" } },
          { field: { Name: "date" } },
          { field: { Name: "description" } },
          { 
            field: { Name: "crop_id" },
            referenceField: { field: { Name: "Name" } }
          }
        ]
      };
      
      const response = await apperClient.getRecordById('expense', id, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      return response.data;
    } catch (error) {
      console.error(`Error fetching expense with ID ${id}:`, error);
      throw error;
    }
  },

  async getByCropId(cropId) {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "category" } },
          { field: { Name: "amount" } },
          { field: { Name: "date" } },
          { field: { Name: "description" } },
          { 
            field: { Name: "crop_id" },
            referenceField: { field: { Name: "Name" } }
          }
        ],
        where: [
          {
            FieldName: "crop_id",
            Operator: "EqualTo",
            Values: [cropId]
          }
        ]
      };
      
      const response = await apperClient.fetchRecords('expense', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      return response.data || [];
    } catch (error) {
      console.error(`Error fetching expenses for crop ${cropId}:`, error);
      throw error;
    }
  },

  async getByCategory(category) {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "category" } },
          { field: { Name: "amount" } },
          { field: { Name: "date" } },
          { field: { Name: "description" } },
          { 
            field: { Name: "crop_id" },
            referenceField: { field: { Name: "Name" } }
          }
        ],
        where: [
          {
            FieldName: "category",
            Operator: "EqualTo",
            Values: [category]
          }
        ]
      };
      
      const response = await apperClient.fetchRecords('expense', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      return response.data || [];
    } catch (error) {
      console.error(`Error fetching expenses for category ${category}:`, error);
      throw error;
    }
  },

  async create(expenseData) {
    try {
      const params = {
        records: [{
          Name: expenseData.Name,
          Tags: expenseData.Tags,
          Owner: expenseData.Owner,
          category: expenseData.category,
          amount: expenseData.amount,
          date: expenseData.date,
          description: expenseData.description,
          crop_id: expenseData.crop_id
        }]
      };
      
      const response = await apperClient.createRecord('expense', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create ${failedRecords.length} expenses:${JSON.stringify(failedRecords)}`);
          throw new Error("Failed to create expense");
        }
        
        return successfulRecords[0]?.data;
      }
    } catch (error) {
      console.error("Error creating expense:", error);
      throw error;
    }
  },

  async update(id, updates) {
    try {
      const params = {
        records: [{
          Id: id,
          ...updates
        }]
      };
      
      const response = await apperClient.updateRecord('expense', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update ${failedUpdates.length} expenses:${JSON.stringify(failedUpdates)}`);
          throw new Error("Failed to update expense");
        }
        
        return successfulUpdates[0]?.data;
      }
    } catch (error) {
      console.error("Error updating expense:", error);
      throw error;
    }
  },

  async delete(id) {
    try {
      const params = {
        RecordIds: [id]
      };
      
      const response = await apperClient.deleteRecord('expense', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success);
        const failedDeletions = response.results.filter(result => !result.success);
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete ${failedDeletions.length} expenses:${JSON.stringify(failedDeletions)}`);
          throw new Error("Failed to delete expense");
        }
        
        return successfulDeletions.length > 0;
      }
    } catch (error) {
      console.error("Error deleting expense:", error);
      throw error;
    }
  }
};