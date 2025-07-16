import React, { useState, useEffect } from "react";
import WeatherCard from "@/components/molecules/WeatherCard";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { weatherService } from "@/services/api/weatherService";
import { format } from "date-fns";

const WeatherDashboard = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadWeatherData = async () => {
    try {
      setLoading(true);
      setError("");
      const [current, forecastData] = await Promise.all([
        weatherService.getCurrentWeather(),
        weatherService.getForecast()
      ]);
      setCurrentWeather(current);
      setForecast(forecastData);
    } catch (err) {
      setError("Failed to load weather data");
      console.error("Weather loading error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWeatherData();
  }, []);

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

  const getWeatherRecommendation = (weather) => {
    if (!weather) return null;
    
    const temp = weather.temperature;
    const condition = weather.condition.toLowerCase();
    
    if (condition === "rainy") {
      return {
        type: "warning",
        message: "Rain expected - postpone outdoor activities like spraying or harvesting"
      };
    }
    
    if (temp > 30) {
      return {
        type: "info",
        message: "High temperature - ensure adequate irrigation for crops"
      };
    }
    
    if (temp < 5) {
      return {
        type: "error",
        message: "Low temperature - protect sensitive crops from frost"
      };
    }
    
    return {
      type: "success",
      message: "Good weather conditions for most farm activities"
    };
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadWeatherData} />;

  const recommendation = getWeatherRecommendation(currentWeather);

  return (
<div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Weather Dashboard</h2>
          <p className="text-gray-600">Stay informed about weather conditions for optimal farming</p>
        </div>
      </div>

      {/* Current Weather */}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <WeatherCard weather={currentWeather} />
        
        {/* Weather Recommendation */}
        {recommendation && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ApperIcon name="Lightbulb" size={20} className="mr-2 text-accent" />
                Farm Recommendation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`p-4 rounded-6 ${
                recommendation.type === "success" ? "bg-success/10 border border-success/20" :
                recommendation.type === "warning" ? "bg-warning/10 border border-warning/20" :
                recommendation.type === "error" ? "bg-error/10 border border-error/20" :
                "bg-info/10 border border-info/20"
              }`}>
                <p className={`text-sm font-medium ${
                  recommendation.type === "success" ? "text-success" :
                  recommendation.type === "warning" ? "text-warning" :
                  recommendation.type === "error" ? "text-error" :
                  "text-info"
                }`}>
                  {recommendation.message}
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* 5-Day Forecast */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <ApperIcon name="Calendar" size={20} className="mr-2 text-accent" />
            5-Day Forecast
          </CardTitle>
        </CardHeader>
        <CardContent>
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
            {forecast.map((day, index) => (
              <div key={index} className="text-center p-3 rounded-6 bg-gray-50 hover:bg-gray-100 transition-colors">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  {format(new Date(day.date), "EEE, MMM d")}
                </p>
                <div className="flex justify-center mb-2">
                  <ApperIcon name={getWeatherIcon(day.condition)} size={32} className="text-gray-600" />
                </div>
                <p className="text-lg font-bold text-gray-900 mb-1">{day.high}°C</p>
                <p className="text-sm text-gray-600">{day.low}°C</p>
                <p className="text-xs text-gray-500 mt-1 capitalize">{day.condition}</p>
                <p className="text-xs text-gray-500">Rain: {day.precipitation}%</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Weather Details */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <ApperIcon name="Wind" size={20} className="mr-2 text-accent" />
              Wind & Humidity
            </CardTitle>
          </CardHeader>
          <CardContent>
<div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <ApperIcon name="Wind" size={18} className="text-gray-600" />
                  <span className="text-sm text-gray-600">Wind Speed</span>
                </div>
                <span className="font-medium">{currentWeather?.windSpeed} km/h</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <ApperIcon name="Droplets" size={18} className="text-gray-600" />
                  <span className="text-sm text-gray-600">Humidity</span>
                </div>
                <span className="font-medium">{currentWeather?.humidity}%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <ApperIcon name="Eye" size={18} className="text-gray-600" />
                  <span className="text-sm text-gray-600">Visibility</span>
                </div>
                <span className="font-medium">{currentWeather?.visibility || "10"} km</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <ApperIcon name="Gauge" size={18} className="text-gray-600" />
                  <span className="text-sm text-gray-600">Pressure</span>
                </div>
                <span className="font-medium">{currentWeather?.pressure || "1013"} hPa</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <ApperIcon name="Sun" size={20} className="mr-2 text-accent" />
              Sun & Moon
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <ApperIcon name="Sunrise" size={18} className="text-gray-600" />
                  <span className="text-sm text-gray-600">Sunrise</span>
                </div>
                <span className="font-medium">6:45 AM</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <ApperIcon name="Sunset" size={18} className="text-gray-600" />
                  <span className="text-sm text-gray-600">Sunset</span>
                </div>
                <span className="font-medium">7:30 PM</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <ApperIcon name="Moon" size={18} className="text-gray-600" />
                  <span className="text-sm text-gray-600">Moon Phase</span>
                </div>
                <span className="font-medium">Waxing Crescent</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <ApperIcon name="Sun" size={18} className="text-gray-600" />
                  <span className="text-sm text-gray-600">UV Index</span>
                </div>
                <span className="font-medium">7 (High)</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weather Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <ApperIcon name="AlertTriangle" size={20} className="mr-2 text-accent" />
            Weather Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start space-x-3 p-3 bg-warning/10 border border-warning/20 rounded-6">
              <ApperIcon name="AlertTriangle" size={20} className="text-warning mt-0.5" />
              <div>
                <p className="text-sm font-medium text-warning">Heat Warning</p>
                <p className="text-xs text-gray-600">High temperatures expected tomorrow. Ensure adequate water supply for crops.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-3 bg-info/10 border border-info/20 rounded-6">
              <ApperIcon name="Info" size={20} className="text-info mt-0.5" />
              <div>
                <p className="text-sm font-medium text-info">Optimal Conditions</p>
                <p className="text-xs text-gray-600">Perfect conditions for planting this weekend. Light rain expected Monday.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WeatherDashboard;