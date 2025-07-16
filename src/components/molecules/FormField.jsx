import React from "react";
import { cn } from "@/utils/cn";
import Label from "@/components/atoms/Label";
import Input from "@/components/atoms/Input";
import Textarea from "@/components/atoms/Textarea";
import Select from "@/components/atoms/Select";

const FormField = ({ 
  label, 
  type = "text", 
  error, 
  className,
  options = [],
  ...props 
}) => {
  const renderInput = () => {
    if (type === "textarea") {
      return <Textarea {...props} className={cn(error && "form-error")} />;
    }
    
    if (type === "select") {
      return (
        <Select {...props} className={cn(error && "form-error")}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      );
    }
    
    return <Input type={type} {...props} className={cn(error && "form-error")} />;
  };

return (
    <div className={cn("space-y-0.5", className)}>
      {label && <Label>{label}</Label>}
      {renderInput()}
      {error && <p className="text-sm text-error">{error}</p>}
    </div>
  );
};

export default FormField;