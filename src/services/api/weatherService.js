import weatherData from "@/services/mockData/weather.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const weatherService = {
  async getCurrentWeather() {
    await delay(300);
    return { ...weatherData.current };
  },

  async getForecast() {
    await delay(250);
    return weatherData.forecast.map(day => ({ ...day }));
  },

  async getWeatherAlerts() {
    await delay(200);
    // Mock weather alerts
    return [
      {
        Id: 1,
        type: "warning",
        title: "Heat Warning",
        message: "High temperatures expected tomorrow. Ensure adequate water supply for crops.",
        severity: "moderate",
        validUntil: "2024-06-16T23:59:59Z"
      },
      {
        Id: 2,
        type: "info",
        title: "Optimal Conditions",
        message: "Perfect conditions for planting this weekend. Light rain expected Monday.",
        severity: "low",
        validUntil: "2024-06-17T12:00:00Z"
      }
    ];
  }
};