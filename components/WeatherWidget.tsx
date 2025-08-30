import React, { useState, useEffect } from 'react';
import SunIcon from './icons/SunIcon';
import SunCloudIcon from './icons/SunCloudIcon';
import CloudIcon from './icons/CloudIcon';
import CloudRainIcon from './icons/CloudRainIcon';

type WeatherCondition = 'Sunny' | 'Partly Cloudy' | 'Cloudy' | 'Rainy';

interface WeatherData {
  location: string;
  current: {
    temp: number;
    condition: WeatherCondition;
  };
  forecast: {
    day: string;
    temp: number;
    condition: WeatherCondition;
  }[];
}

// Maps WMO weather codes from the API to our WeatherCondition type
function mapWmoCodeToCondition(code: number): WeatherCondition {
  if (code === 0) return 'Sunny';
  if (code >= 1 && code <= 2) return 'Partly Cloudy';
  if (code >= 3 && code <= 49) return 'Cloudy';
  if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) return 'Rainy';
  return 'Cloudy'; // Default for other codes (snow, storms etc.)
}

const WeatherIcon = ({ condition, className }: { condition: WeatherCondition, className?: string }) => {
  switch (condition) {
    case 'Sunny':
      return <SunIcon className={className} />;
    case 'Partly Cloudy':
      return <SunCloudIcon className={className} />;
    case 'Cloudy':
      return <CloudIcon className={className} />;
    case 'Rainy':
      return <CloudRainIcon className={className} />;
    default:
      return null;
  }
};

export default function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getWeatherData() {
      setError(null);
      try {
        // Coordinates for Bad Belzig
        const lat = 52.14;
        const lon = 12.59;
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&daily=weather_code,temperature_2m_max&timezone=auto&forecast_days=4`;

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch weather data.');
        }
        const data = await response.json();

        if (!data.current || !data.daily) {
          throw new Error('Invalid weather data format received.');
        }

        const formattedData: WeatherData = {
          location: 'Bad Belzig',
          current: {
            temp: Math.round(data.current.temperature_2m),
            condition: mapWmoCodeToCondition(data.current.weather_code),
          },
          forecast: data.daily.time.slice(1, 4).map((dateStr: string, index: number) => ({
            day: new Date(dateStr).toLocaleDateString('en-US', { weekday: 'short' }),
            temp: Math.round(data.daily.temperature_2m_max[index + 1]),
            condition: mapWmoCodeToCondition(data.daily.weather_code[index + 1]),
          })),
        };
        setWeather(formattedData);

      } catch (err: any) {
        console.error("Weather fetch error:", err);
        setError("Can't load weather.");
      }
    }

    getWeatherData();
  }, []);

  if (error) {
    return <div className="flex items-center justify-center h-16 text-sm text-red-600 dark:text-red-400">{error}</div>;
  }

  if (!weather) {
    return <div className="w-64 h-16 bg-slate-100 dark:bg-slate-800 rounded-lg animate-pulse"></div>;
  }

  return (
    <div className="flex items-center gap-4 text-slate-800 dark:text-slate-300">
      {/* Current Weather */}
      <div className="flex items-center gap-2">
        <div className="text-brand-green dark:text-green-400">
          <WeatherIcon condition={weather.current.condition} className="w-10 h-10" />
        </div>
        <div>
          <p className="text-xs text-slate-500 dark:text-slate-400">{weather.location}</p>
          <p className="text-2xl font-bold">{weather.current.temp}°C</p>
        </div>
      </div>
      
      {/* 3-Day Forecast */}
      <div className="flex gap-3 text-sm text-center">
        {weather.forecast.map(f => (
          <div key={f.day} className="flex flex-col items-center gap-1">
            <p className="font-semibold text-slate-600 dark:text-slate-400">{f.day}</p>
            <div className="text-slate-500 dark:text-slate-500">
              <WeatherIcon condition={f.condition} className="w-6 h-6" />
            </div>
            <p className="font-semibold">{f.temp}°</p>
          </div>
        ))}
      </div>
    </div>
  );
}