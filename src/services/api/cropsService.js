const { ApperClient } = window.ApperSDK;

const apperClient = new ApperClient({
  apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
  apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
});

export const cropsService = {
  async getAll() {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "variety" } },
          { field: { Name: "planting_date" } },
          { field: { Name: "expected_harvest" } },
          { field: { Name: "actual_harvest" } },
          { field: { Name: "yield" } },
          { field: { Name: "status" } },
          { 
            field: { Name: "field_id" },
            referenceField: { field: { Name: "Name" } }
          }
        ]
      };
      
      const response = await apperClient.fetchRecords('crop', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      return response.data || [];
    } catch (error) {
      console.error("Error fetching crops:", error);
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
          { field: { Name: "variety" } },
          { field: { Name: "planting_date" } },
          { field: { Name: "expected_harvest" } },
          { field: { Name: "actual_harvest" } },
          { field: { Name: "yield" } },
          { field: { Name: "status" } },
          { 
            field: { Name: "field_id" },
            referenceField: { field: { Name: "Name" } }
          }
        ]
      };
      
      const response = await apperClient.getRecordById('crop', id, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      return response.data;
    } catch (error) {
      console.error(`Error fetching crop with ID ${id}:`, error);
      throw error;
    }
  },

  async getByFieldId(fieldId) {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "variety" } },
          { field: { Name: "planting_date" } },
          { field: { Name: "expected_harvest" } },
          { field: { Name: "actual_harvest" } },
          { field: { Name: "yield" } },
          { field: { Name: "status" } },
          { 
            field: { Name: "field_id" },
            referenceField: { field: { Name: "Name" } }
          }
        ],
        where: [
          {
            FieldName: "field_id",
            Operator: "EqualTo",
            Values: [fieldId]
          }
        ]
      };
      
      const response = await apperClient.fetchRecords('crop', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      return response.data || [];
    } catch (error) {
      console.error(`Error fetching crops for field ${fieldId}:`, error);
      throw error;
    }
  },

  async create(cropData) {
    try {
      const params = {
        records: [{
          Name: cropData.Name,
          Tags: cropData.Tags,
          Owner: cropData.Owner,
          variety: cropData.variety,
          planting_date: cropData.planting_date,
          expected_harvest: cropData.expected_harvest,
          actual_harvest: cropData.actual_harvest,
          yield: cropData.yield,
          status: cropData.status,
          field_id: cropData.field_id
        }]
      };
      
      const response = await apperClient.createRecord('crop', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create ${failedRecords.length} crops:${JSON.stringify(failedRecords)}`);
          throw new Error("Failed to create crop");
        }
        
        return successfulRecords[0]?.data;
      }
    } catch (error) {
      console.error("Error creating crop:", error);
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
      
      const response = await apperClient.updateRecord('crop', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update ${failedUpdates.length} crops:${JSON.stringify(failedUpdates)}`);
          throw new Error("Failed to update crop");
        }
        
        return successfulUpdates[0]?.data;
      }
    } catch (error) {
      console.error("Error updating crop:", error);
      throw error;
    }
  },

  async delete(id) {
    try {
      const params = {
        RecordIds: [id]
      };
      
      const response = await apperClient.deleteRecord('crop', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success);
        const failedDeletions = response.results.filter(result => !result.success);
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete ${failedDeletions.length} crops:${JSON.stringify(failedDeletions)}`);
          throw new Error("Failed to delete crop");
        }
        
        return successfulDeletions.length > 0;
      }
    } catch (error) {
      console.error("Error deleting crop:", error);
      throw error;
    }
  }
};