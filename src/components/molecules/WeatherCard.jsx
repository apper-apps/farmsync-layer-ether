import React from "react";
import { Card, CardContent } from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const WeatherCard = ({ weather, className }) => {
  const getWeatherIcon = (condition) => {
    switch (condition?.toLowerCase()) {
      case "sunny":
        return "Sun";
      case "cloudy":
        return "Cloud";
      case "rainy":
        return "CloudRain";
      case "stormy":
        return "CloudLightning";
      case "snowy":
        return "CloudSnow";
      default:
        return "Sun";
    }
  };

  const getWeatherGradient = (condition) => {
    switch (condition?.toLowerCase()) {
      case "sunny":
        return "weather-sunny";
      case "cloudy":
        return "weather-cloudy";
      case "rainy":
        return "weather-rainy";
      case "stormy":
        return "weather-rainy";
      default:
        return "weather-sunny";
    }
  };

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-0">
<div className={cn("p-5 text-white", getWeatherGradient(weather.condition))}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-0.5">Current Weather</h3>
              <p className="text-sm opacity-90">{weather.location}</p>
            </div>
            <ApperIcon name={getWeatherIcon(weather.condition)} size={32} className="text-white" />
          </div>
          
<div className="mt-3 flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold">{weather.temperature}°C</p>
              <p className="text-sm opacity-90 capitalize">{weather.condition}</p>
            </div>
            <div className="text-right text-sm opacity-90 space-y-0.5">
              <p>Humidity: {weather.humidity}%</p>
              <p>Wind: {weather.windSpeed} km/h</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;