const { ApperClient } = window.ApperSDK;

const apperClient = new ApperClient({
  apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
  apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
});

export const fieldsService = {
  async getAll() {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "size" } },
          { field: { Name: "unit" } },
          { field: { Name: "status" } },
          { field: { Name: "soil_type" } },
          { field: { Name: "location" } }
        ]
      };
      
      const response = await apperClient.fetchRecords('field', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      return response.data || [];
    } catch (error) {
      console.error("Error fetching fields:", error);
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
          { field: { Name: "size" } },
          { field: { Name: "unit" } },
          { field: { Name: "status" } },
          { field: { Name: "soil_type" } },
          { field: { Name: "location" } }
        ]
      };
      
      const response = await apperClient.getRecordById('field', id, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      return response.data;
    } catch (error) {
      console.error(`Error fetching field with ID ${id}:`, error);
      throw error;
    }
  },

  async create(fieldData) {
    try {
      const params = {
        records: [{
          Name: fieldData.Name,
          Tags: fieldData.Tags,
          Owner: fieldData.Owner,
          size: fieldData.size,
          unit: fieldData.unit,
          status: fieldData.status,
          soil_type: fieldData.soil_type,
          location: fieldData.location
        }]
      };
      
      const response = await apperClient.createRecord('field', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create ${failedRecords.length} fields:${JSON.stringify(failedRecords)}`);
          throw new Error("Failed to create field");
        }
        
        return successfulRecords[0]?.data;
      }
    } catch (error) {
      console.error("Error creating field:", error);
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
      
      const response = await apperClient.updateRecord('field', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update ${failedUpdates.length} fields:${JSON.stringify(failedUpdates)}`);
          throw new Error("Failed to update field");
        }
        
        return successfulUpdates[0]?.data;
      }
    } catch (error) {
      console.error("Error updating field:", error);
      throw error;
    }
  },

  async delete(id) {
    try {
      const params = {
        RecordIds: [id]
      };
      
      const response = await apperClient.deleteRecord('field', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success);
        const failedDeletions = response.results.filter(result => !result.success);
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete ${failedDeletions.length} fields:${JSON.stringify(failedDeletions)}`);
          throw new Error("Failed to delete field");
        }
        
        return successfulDeletions.length > 0;
      }
    } catch (error) {
      console.error("Error deleting field:", error);
      throw error;
    }
  }
};