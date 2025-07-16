import React, { useState, useEffect } from "react";
import TaskItem from "@/components/molecules/TaskItem";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import SearchBar from "@/components/molecules/SearchBar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { tasksService } from "@/services/api/tasksService";
import { fieldsService } from "@/services/api/fieldsService";
import { toast } from "react-toastify";

const TasksList = () => {
  const [tasks, setTasks] = useState([]);
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");
      const [tasksData, fieldsData] = await Promise.all([
        tasksService.getAll(),
        fieldsService.getAll()
      ]);
      setTasks(tasksData);
      setFields(fieldsData);
    } catch (err) {
      setError("Failed to load tasks data");
      console.error("Tasks loading error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
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
    console.log("Edit task:", task);
    // This would typically open a modal or navigate to edit page
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === "all" || 
                         (filterStatus === "completed" && task.completed) ||
                         (filterStatus === "pending" && !task.completed);
    
    const matchesPriority = filterPriority === "all" || task.priority === filterPriority;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const sortedTasks = filteredTasks.sort((a, b) => {
    // Sort by completion status first, then by due date
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    return new Date(a.dueDate) - new Date(b.dueDate);
  });

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadData} />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Tasks</h2>
          <p className="text-gray-600">Manage your daily farm operations and track progress</p>
        </div>
        <Button variant="primary" className="sm:w-auto">
          <ApperIcon name="Plus" size={16} className="mr-2" />
          Add New Task
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <SearchBar
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <div className="flex gap-2">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-6 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/20"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-6 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/20"
              >
                <option value="all">All Priority</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tasks List */}
      {sortedTasks.length === 0 ? (
        <Empty
          icon="CheckSquare"
          title="No tasks found"
          description={searchTerm ? "Try adjusting your search terms" : "Start by adding your first task"}
          actionLabel="Add New Task"
          onAction={() => console.log("Add new task")}
        />
      ) : (
        <div className="space-y-4">
          {sortedTasks.map(task => (
            <TaskItem
              key={task.Id}
              task={task}
              onComplete={handleCompleteTask}
              onEdit={handleEditTask}
            />
          ))}
        </div>
      )}

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Tasks</p>
                <p className="text-2xl font-bold text-gray-900">{tasks.length}</p>
              </div>
              <ApperIcon name="CheckSquare" size={24} className="text-secondary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-warning">{tasks.filter(t => !t.completed).length}</p>
              </div>
              <ApperIcon name="Clock" size={24} className="text-warning" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-success">{tasks.filter(t => t.completed).length}</p>
              </div>
              <ApperIcon name="CheckCircle" size={24} className="text-success" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">High Priority</p>
                <p className="text-2xl font-bold text-error">{tasks.filter(t => t.priority === "high").length}</p>
              </div>
              <ApperIcon name="AlertCircle" size={24} className="text-error" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TasksList;