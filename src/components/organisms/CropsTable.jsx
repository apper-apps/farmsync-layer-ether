import React, { useState, useEffect } from "react";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import SearchBar from "@/components/molecules/SearchBar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { cropsService } from "@/services/api/cropsService";
import { fieldsService } from "@/services/api/fieldsService";
import { format } from "date-fns";

const CropsTable = () => {
  const [crops, setCrops] = useState([]);
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");
      const [cropsData, fieldsData] = await Promise.all([
        cropsService.getAll(),
        fieldsService.getAll()
      ]);
      setCrops(cropsData);
      setFields(fieldsData);
    } catch (err) {
      setError("Failed to load crops data");
      console.error("Crops loading error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const getFieldName = (fieldId) => {
    const field = fields.find(f => f.Id === fieldId);
    return field ? field.name : "Unknown Field";
  };

  const getStatusVariant = (status) => {
    switch (status?.toLowerCase()) {
      case "growing":
        return "success";
      case "harvested":
        return "warning";
      case "planted":
        return "info";
      case "failed":
        return "error";
      default:
        return "default";
    }
  };

  const filteredCrops = crops.filter(crop =>
    crop.variety.toLowerCase().includes(searchTerm.toLowerCase()) ||
    getFieldName(crop.fieldId).toLowerCase().includes(searchTerm.toLowerCase()) ||
    crop.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadData} />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Crops</h2>
          <p className="text-gray-600">Track your crop varieties and monitor their growth</p>
        </div>
        <Button variant="primary" className="sm:w-auto">
          <ApperIcon name="Plus" size={16} className="mr-2" />
          Add New Crop
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <SearchBar
              placeholder="Search crops..."
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
                <ApperIcon name="Download" size={16} className="mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Crops Table */}
      {filteredCrops.length === 0 ? (
        <Empty
          icon="Sprout"
          title="No crops found"
          description={searchTerm ? "Try adjusting your search terms" : "Start by planting your first crop"}
          actionLabel="Add New Crop"
          onAction={() => console.log("Add new crop")}
        />
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Variety</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Field</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Planted</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Expected Harvest</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Yield</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCrops.map(crop => (
                    <tr key={crop.Id} className="table-row border-b border-gray-100">
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center mr-3">
                            <ApperIcon name="Sprout" size={16} className="text-white" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{crop.variety}</p>
                            <p className="text-sm text-gray-500">ID: {crop.Id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-medium text-gray-900">{getFieldName(crop.fieldId)}</span>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant={getStatusVariant(crop.status)}>
                          {crop.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-gray-900">{format(new Date(crop.plantingDate), "MMM dd, yyyy")}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-gray-900">{format(new Date(crop.expectedHarvest), "MMM dd, yyyy")}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-medium text-gray-900">
                          {crop.yield ? `${crop.yield} kg` : "—"}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" className="p-1">
                            <ApperIcon name="Edit" size={16} />
                          </Button>
                          <Button variant="ghost" size="sm" className="p-1">
                            <ApperIcon name="Eye" size={16} />
                          </Button>
                          <Button variant="ghost" size="sm" className="p-1 text-error">
                            <ApperIcon name="Trash2" size={16} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Crops</p>
                <p className="text-2xl font-bold text-gray-900">{crops.length}</p>
              </div>
              <ApperIcon name="Sprout" size={24} className="text-secondary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Growing</p>
                <p className="text-2xl font-bold text-success">{crops.filter(c => c.status === "growing").length}</p>
              </div>
              <ApperIcon name="TrendingUp" size={24} className="text-success" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Harvested</p>
                <p className="text-2xl font-bold text-warning">{crops.filter(c => c.status === "harvested").length}</p>
              </div>
              <ApperIcon name="Package" size={24} className="text-warning" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Yield</p>
                <p className="text-2xl font-bold text-gray-900">
                  {crops.reduce((sum, crop) => sum + (crop.yield || 0), 0)} kg
                </p>
              </div>
              <ApperIcon name="BarChart3" size={24} className="text-accent" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CropsTable;