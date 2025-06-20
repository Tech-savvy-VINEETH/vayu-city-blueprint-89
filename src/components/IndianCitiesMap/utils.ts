
export const getAQIColor = (aqi: number) => {
  if (aqi <= 50) return '#22c55e';
  if (aqi <= 100) return '#eab308';
  if (aqi <= 150) return '#f97316';
  if (aqi <= 200) return '#ef4444';
  if (aqi <= 300) return '#a855f7';
  return '#7c2d12';
};

export const getAQICategory = (aqi: number) => {
  if (aqi <= 50) return 'Good';
  if (aqi <= 100) return 'Moderate';
  if (aqi <= 150) return 'Unhealthy for Sensitive Groups';
  if (aqi <= 200) return 'Unhealthy';
  if (aqi <= 300) return 'Very Unhealthy';
  return 'Hazardous';
};

export const createInfoWindowContent = (city: any) => {
  return `
    <div style="color: black; padding: 12px; min-width: 200px;">
      <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
        <h3 style="margin: 0; color: ${city.isVayuPodActive ? '#10b981' : '#374151'};">${city.name}, ${city.state}</h3>
        ${city.isVayuPodActive ? '<span style="background: #10b981; color: white; padding: 2px 6px; border-radius: 4px; font-size: 10px;">VAYUPOD</span>' : ''}
      </div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 12px;">
        <div><strong>AQI:</strong> <span style="color: ${getAQIColor(city.aqi)};">${city.aqi}</span></div>
        <div><strong>Weather:</strong> ${city.weather}</div>
        <div><strong>Temperature:</strong> ${city.temperature}°C</div>
        <div><strong>Humidity:</strong> ${city.humidity}%</div>
        <div><strong>Wind:</strong> ${city.windSpeed} km/h</div>
        <div><strong>Category:</strong> ${getAQICategory(city.aqi)}</div>
      </div>
      ${city.isVayuPodActive ? `
        <div style="margin-top: 8px; padding: 8px; background: #f0fdf4; border-radius: 4px;">
          <div style="font-size: 11px; color: #065f46;">
            <div><strong>VayuPods:</strong> ${city.vayuPodCount} active</div>
            <div><strong>Pollution Reduction:</strong> ${city.pollutionReduction}%</div>
          </div>
        </div>
      ` : ''}
    </div>
  `;
};
