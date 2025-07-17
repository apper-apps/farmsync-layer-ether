import React, { useState, useEffect } from "react";
import StatCard from "@/components/molecules/StatCard";
import WeatherCard from "@/components/molecules/WeatherCard";
import TaskItem from "@/components/molecules/TaskItem";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { fieldsService } from "@/services/api/fieldsService";
import { cropsService } from "@/services/api/cropsService";
import { tasksService } from "@/services/api/tasksService";
import { weatherService } from "@/services/api/weatherService";
import { toast } from "react-toastify";

const DashboardOverview = () => {
  const [fields, setFields] = useState([]);
  const [crops, setCrops] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError("");
      
      const [fieldsData, cropsData, tasksData, weatherData] = await Promise.all([
        fieldsService.getAll(),
        cropsService.getAll(),
        tasksService.getAll(),
        weatherService.getCurrentWeather()
      ]);
      
      setFields(fieldsData);
      setCrops(cropsData);
      setTasks(tasksData);
      setWeather(weatherData);
    } catch (err) {
      setError("Failed to load dashboard data");
      console.error("Dashboard data loading error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const handleCompleteTask = async (taskId) => {
    try {
      await tasksService.update(taskId, { completed: true });
      setTasks(tasks.map(task => 
        task.Id === taskId ? { ...task, completed: true } : task
      ));
      toast.success("Task completed successfully!");
    } catch (err) {
      toast.error("Failed to complete task");
    }
  };

  const handleEditTask = (task) => {
    // This would typically open a modal or navigate to edit page
    console.log("Edit task:", task);
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadDashboardData} />;

  const activeFields = fields.filter(field => field.status !== "fallow").length;
  const activeCrops = crops.filter(crop => crop.status === "growing").length;
  const pendingTasks = tasks.filter(task => !task.completed).length;
const upcomingTasks = tasks
    .filter(task => !task.completed)
    .sort((a, b) => new Date(a.due_date) - new Date(b.due_date))
    .slice(0, 5);

  return (
<div className="space-y-5">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Fields"
          value={activeFields}
          icon="Map"
          change="+2 this month"
          changeType="positive"
          gradient
        />
        <StatCard
          title="Growing Crops"
          value={activeCrops}
          icon="Sprout"
          change="+5 this season"
          changeType="positive"
          gradient
        />
        <StatCard
          title="Pending Tasks"
          value={pendingTasks}
          icon="CheckSquare"
          change="-3 from yesterday"
          changeType="positive"
          gradient
        />
        <StatCard
          title="Total Yield"
          value="1,245 kg"
          icon="Package"
          change="+12% from last season"
          changeType="positive"
          gradient
        />
      </div>

{/* Weather and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          {weather && <WeatherCard weather={weather} />}
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <ApperIcon name="Zap" size={20} className="mr-2 text-accent" />
              Quick Actions
            </CardTitle>
          </CardHeader>
<CardContent className="space-y-2">
            <Button variant="primary" className="w-full justify-start">
              <ApperIcon name="Plus" size={16} className="mr-2" />
              Add New Field
            </Button>
            <Button variant="secondary" className="w-full justify-start">
              <ApperIcon name="Sprout" size={16} className="mr-2" />
              Plant New Crop
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <ApperIcon name="CheckSquare" size={16} className="mr-2" />
              Add Task
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <ApperIcon name="FileText" size={16} className="mr-2" />
              View Reports
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Tasks */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <ApperIcon name="Clock" size={20} className="mr-2 text-accent" />
              Upcoming Tasks
            </div>
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </CardTitle>
        </CardHeader>
<CardContent className="space-y-3">
          {upcomingTasks.length === 0 ? (
            <div className="text-center py-6 text-gray-500">
              <ApperIcon name="CheckCircle" size={48} className="mx-auto mb-4 text-success" />
              <p>No pending tasks! Great job!</p>
            </div>
          ) : (
            upcomingTasks.map(task => (
              <TaskItem
                key={task.Id}
                task={task}
                onComplete={handleCompleteTask}
                onEdit={handleEditTask}
              />
            ))
          )}
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <ApperIcon name="Activity" size={20} className="mr-2 text-accent" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
<div className="space-y-3">
            <div className="flex items-center space-x-3 py-1">
              <div className="w-8 h-8 rounded-full bg-success flex items-center justify-center">
                <ApperIcon name="Check" size={16} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-medium">Watering completed for North Field</p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 py-2">
              <div className="w-8 h-8 rounded-full bg-info flex items-center justify-center">
                <ApperIcon name="Sprout" size={16} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-medium">Tomatoes planted in South Field</p>
                <p className="text-xs text-gray-500">1 day ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 py-2">
              <div className="w-8 h-8 rounded-full bg-warning flex items-center justify-center">
                <ApperIcon name="Package" size={16} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-medium">Wheat harvest completed - 450kg yield</p>
                <p className="text-xs text-gray-500">3 days ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardOverview;