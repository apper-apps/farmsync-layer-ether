import React from "react";
import { Card, CardContent } from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";
import { format } from "date-fns";

const TaskItem = ({ task, onComplete, onEdit, className }) => {
  const getPriorityVariant = (priority) => {
    switch (priority?.toLowerCase()) {
      case "high":
        return "error";
      case "medium":
        return "warning";
      case "low":
        return "success";
      default:
        return "default";
    }
  };

  const getCategoryIcon = (category) => {
    switch (category?.toLowerCase()) {
      case "planting":
        return "Sprout";
      case "watering":
        return "Droplets";
      case "fertilizing":
        return "Beaker";
      case "harvesting":
        return "Package";
      case "maintenance":
        return "Wrench";
      default:
        return "CheckSquare";
    }
  };

  const isOverdue = new Date(task.dueDate) < new Date() && !task.completed;

  return (
    <Card className={cn("card-hover", task.completed && "opacity-60", className)}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center",
              task.completed ? "bg-success" : "bg-gray-200"
            )}>
              <ApperIcon 
                name={task.completed ? "Check" : getCategoryIcon(task.category)} 
                size={16} 
                className={task.completed ? "text-white" : "text-gray-600"} 
              />
            </div>
            <div>
              <h4 className={cn(
                "font-medium",
                task.completed ? "line-through text-gray-500" : "text-gray-900"
              )}>
                {task.title}
              </h4>
              <p className="text-sm text-gray-500">{task.description}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Badge variant={getPriorityVariant(task.priority)}>
              {task.priority}
            </Badge>
            {!task.completed && (
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onEdit(task)}
                className="p-1 h-8 w-8"
              >
                <ApperIcon name="Edit" size={14} />
              </Button>
            )}
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center">
              <ApperIcon name="Calendar" size={14} className="mr-1" />
              <span className={cn(isOverdue && "text-error font-medium")}>
                {format(new Date(task.dueDate), "MMM dd, yyyy")}
              </span>
            </div>
            <div className="flex items-center">
              <ApperIcon name="Tag" size={14} className="mr-1" />
              <span className="capitalize">{task.category}</span>
            </div>
          </div>
          
          {!task.completed && (
            <Button
              size="sm"
              variant="primary"
              onClick={() => onComplete(task.Id)}
              className="h-8"
            >
              Complete
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskItem;