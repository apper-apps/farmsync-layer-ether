import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { fieldsService } from "@/services/api/fieldsService";
import { cropsService } from "@/services/api/cropsService";
import { tasksService } from "@/services/api/tasksService";
import { format } from "date-fns";

const ReportsDashboard = () => {
  const [fields, setFields] = useState([]);
  const [crops, setCrops] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");
      const [fieldsData, cropsData, tasksData] = await Promise.all([
        fieldsService.getAll(),
        cropsService.getAll(),
        tasksService.getAll()
      ]);
      setFields(fieldsData);
      setCrops(cropsData);
      setTasks(tasksData);
    } catch (err) {
      setError("Failed to load reports data");
      console.error("Reports loading error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadData} />;

  // Calculate statistics
  const totalFields = fields.length;
  const activeFields = fields.filter(f => f.status !== "fallow").length;
  const totalCrops = crops.length;
  const harvestedCrops = crops.filter(c => c.status === "harvested").length;
  const totalYield = crops.reduce((sum, crop) => sum + (crop.yield || 0), 0);
  const completedTasks = tasks.filter(t => t.completed).length;
  const pendingTasks = tasks.filter(t => !t.completed).length;

  const fieldStatusData = [
    { status: "Healthy", count: fields.filter(f => f.status === "healthy").length, color: "text-success" },
    { status: "Growing", count: fields.filter(f => f.status === "growing").length, color: "text-info" },
    { status: "Harvested", count: fields.filter(f => f.status === "harvested").length, color: "text-warning" },
    { status: "Fallow", count: fields.filter(f => f.status === "fallow").length, color: "text-gray-500" },
    { status: "Maintenance", count: fields.filter(f => f.status === "maintenance").length, color: "text-error" }
  ];

  const cropVarieties = crops.reduce((acc, crop) => {
    acc[crop.variety] = (acc[crop.variety] || 0) + 1;
    return acc;
  }, {});

  const taskCategories = tasks.reduce((acc, task) => {
    acc[task.category] = (acc[task.category] || 0) + 1;
    return acc;
  }, {});

  return (
<div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Reports & Analytics</h2>
          <p className="text-gray-600">Comprehensive insights into your farm operations</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <ApperIcon name="Download" size={16} className="mr-2" />
            Export PDF
          </Button>
          <Button variant="outline" size="sm">
            <ApperIcon name="FileSpreadsheet" size={16} className="mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Fields</p>
                <p className="text-3xl font-bold text-gradient">{totalFields}</p>
                <p className="text-sm text-success">+{activeFields} active</p>
              </div>
              <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                <ApperIcon name="Map" size={24} className="text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Crops</p>
                <p className="text-3xl font-bold text-gradient">{totalCrops}</p>
                <p className="text-sm text-success">+{harvestedCrops} harvested</p>
              </div>
              <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                <ApperIcon name="Sprout" size={24} className="text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Yield</p>
                <p className="text-3xl font-bold text-gradient">{totalYield} kg</p>
                <p className="text-sm text-success">This season</p>
              </div>
              <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                <ApperIcon name="Package" size={24} className="text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Task Completion</p>
                <p className="text-3xl font-bold text-gradient">{Math.round((completedTasks / tasks.length) * 100)}%</p>
                <p className="text-sm text-success">{completedTasks}/{tasks.length} tasks</p>
              </div>
              <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                <ApperIcon name="CheckCircle" size={24} className="text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Field Status Report */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <ApperIcon name="PieChart" size={20} className="mr-2 text-accent" />
            Field Status Distribution
</CardTitle>
        </CardHeader>
        <CardContent>
<div className="space-y-2">
            {fieldStatusData.map((item) => (
              <div key={item.status} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className={`w-4 h-4 rounded-full ${item.color.replace('text-', 'bg-')}`} />
<span className="text-sm font-medium">{item.status}</span>
                </div>
                <div className="flex items-center space-x-1 md:space-x-1">
                  <span className="text-sm text-gray-600">{item.count} fields</span>
                  <span className={`text-sm font-medium ${item.color}`}>
                    {totalFields > 0 ? Math.round((item.count / totalFields) * 100) : 0}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Crop Varieties Report */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <ApperIcon name="BarChart3" size={20} className="mr-2 text-accent" />
            Crop Varieties
</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {Object.entries(cropVarieties).map(([variety, count]) => (
              <div key={variety} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                    <ApperIcon name="Sprout" size={16} className="text-white" />
                  </div>
                  <span className="text-sm font-medium">{variety}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">{count} crops</span>
                  <span className="text-sm font-medium text-secondary">
                    {totalCrops > 0 ? Math.round((count / totalCrops) * 100) : 0}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Task Categories Report */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <ApperIcon name="Target" size={20} className="mr-2 text-accent" />
            Task Categories
</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {Object.entries(taskCategories).map(([category, count]) => (
              <div key={category} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                    <ApperIcon name="CheckSquare" size={16} className="text-white" />
                  </div>
                  <span className="text-sm font-medium capitalize">{category}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">{count} tasks</span>
                  <span className="text-sm font-medium text-accent">
                    {tasks.length > 0 ? Math.round((count / tasks.length) * 100) : 0}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <ApperIcon name="Activity" size={20} className="mr-2 text-accent" />
            Recent Activity Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-success/10 rounded-6">
                <h4 className="font-medium text-success mb-1">Completed This Week</h4>
                <p className="text-2xl font-bold text-success">{completedTasks}</p>
                <p className="text-sm text-gray-600">Tasks completed</p>
              </div>
              <div className="p-4 bg-warning/10 rounded-6">
                <h4 className="font-medium text-warning mb-2">Pending Tasks</h4>
                <p className="text-2xl font-bold text-warning">{pendingTasks}</p>
                <p className="text-sm text-gray-600">Tasks remaining</p>
              </div>
              <div className="p-4 bg-info/10 rounded-6">
                <h4 className="font-medium text-info mb-2">Active Fields</h4>
                <p className="text-2xl font-bold text-info">{activeFields}</p>
                <p className="text-sm text-gray-600">Fields in production</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Print Summary */}
      <Card className="print-only">
        <CardHeader>
          <CardTitle>Farm Report Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p><strong>Report Generated:</strong> {format(new Date(), "MMMM dd, yyyy 'at' HH:mm")}</p>
            <p><strong>Total Fields:</strong> {totalFields}</p>
            <p><strong>Total Crops:</strong> {totalCrops}</p>
            <p><strong>Total Yield:</strong> {totalYield} kg</p>
            <p><strong>Task Completion Rate:</strong> {Math.round((completedTasks / tasks.length) * 100)}%</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsDashboard;