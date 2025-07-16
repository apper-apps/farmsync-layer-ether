import React, { useState, useEffect } from "react";
import FieldStatusCard from "@/components/molecules/FieldStatusCard";
import Button from "@/components/atoms/Button";
import SearchBar from "@/components/molecules/SearchBar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { fieldsService } from "@/services/api/fieldsService";

const FieldsGrid = () => {
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const loadFields = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await fieldsService.getAll();
      setFields(data);
    } catch (err) {
      setError("Failed to load fields");
      console.error("Fields loading error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFields();
  }, []);

  const filteredFields = fields.filter(field =>
    field.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    field.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    field.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFieldClick = (field) => {
    console.log("Field clicked:", field);
    // This would typically navigate to field details or open a modal
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadFields} />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Fields</h2>
          <p className="text-gray-600">Manage your farm fields and monitor their status</p>
        </div>
        <Button variant="primary" className="sm:w-auto">
          <ApperIcon name="Plus" size={16} className="mr-2" />
          Add New Field
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <SearchBar
              placeholder="Search fields..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <ApperIcon name="Filter" size={16} className="mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <ApperIcon name="ArrowUpDown" size={16} className="mr-2" />
                Sort
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Fields Grid */}
      {filteredFields.length === 0 ? (
        <Empty
          icon="Map"
          title="No fields found"
          description={searchTerm ? "Try adjusting your search terms" : "Start by adding your first field"}
          actionLabel="Add New Field"
          onAction={() => console.log("Add new field")}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFields.map(field => (
            <FieldStatusCard
              key={field.Id}
              field={field}
              onClick={() => handleFieldClick(field)}
            />
          ))}
        </div>
      )}

      {/* Summary Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <ApperIcon name="BarChart3" size={20} className="mr-2 text-accent" />
            Field Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-success">{fields.filter(f => f.status === "healthy").length}</p>
              <p className="text-sm text-gray-600">Healthy</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-info">{fields.filter(f => f.status === "growing").length}</p>
              <p className="text-sm text-gray-600">Growing</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-warning">{fields.filter(f => f.status === "harvested").length}</p>
              <p className="text-sm text-gray-600">Harvested</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-500">{fields.filter(f => f.status === "fallow").length}</p>
              <p className="text-sm text-gray-600">Fallow</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-error">{fields.filter(f => f.status === "maintenance").length}</p>
              <p className="text-sm text-gray-600">Maintenance</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FieldsGrid;