
import React, { useState, useEffect, useMemo } from 'react';
import SunIcon from './icons/SunIcon';
import SunCloudIcon from './icons/SunCloudIcon';
import CloudIcon from './icons/CloudIcon';
import CloudRainIcon from './icons/CloudRainIcon';

interface WeatherData {
  temperature: number;
  weatherCode: number;
}

const BAD_BELZIG_LAT = 52.14;
const BAD_BELZIG_LON = 12.59;

const WeatherWidget = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchWeather() {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${BAD_BELZIG_LAT}&longitude=${BAD_BELZIG_LON}&current=temperature_2m,weather_code&temperature_unit=celsius`);
        if (!response.ok) {
          throw new Error('Failed to fetch weather data.');
        }
        const data = await response.json();
        if (data.current) {
          setWeather({
            temperature: Math.round(data.current.temperature_2m),
            weatherCode: data.current.weather_code,
          });
        } else {
          throw new Error('Invalid weather data format.');
        }
      } catch (err: any) {
        setError(err.message || 'An error occurred.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchWeather();
  }, []);

  const weatherInfo = useMemo(() => {
    if (!weather) return { icon: null, description: 'Loading weather...' };

    const code = weather.weatherCode;
    if (code === 0) return { icon: <SunIcon className="w-8 h-8 text-yellow-500" />, description: 'Clear sky' };
    if ([1, 2].includes(code)) return { icon: <SunCloudIcon className="w-8 h-8 text-slate-500" />, description: 'Mainly clear' };
    if (code === 3) return { icon: <CloudIcon className="w-8 h-8 text-slate-500" />, description: 'Overcast' };
    if ([45, 48].includes(code)) return { icon: <CloudIcon className="w-8 h-8 text-slate-500" />, description: 'Fog' };
    if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return { icon: <CloudRainIcon className="w-8 h-8 text-blue-500" />, description: 'Rain' };
    
    return { icon: <SunCloudIcon className="w-8 h-8 text-slate-500" />, description: 'Cloudy' };
  }, [weather]);
  
  const appToday = new Date();
  const formattedDate = appToday.toLocaleDateString('en-GB', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
  });


  return (
    <div className="inline-flex items-center gap-4 p-3 rounded-lg bg-light-grey dark:bg-zinc-900/50 border border-slate-200 dark:border-slate-700">
        {isLoading && <div className="text-sm text-slate-500 animate-pulse">Loading weather...</div>}
        {error && <div className="text-sm text-red-500">{error}</div>}
        {weather && !isLoading && (
            <>
                <div className="flex-shrink-0" title={weatherInfo.description}>{weatherInfo.icon}</div>
                <div>
                    <h3 className="font-semibold text-charcoal dark:text-slate-200">
                        Bad Belzig · {weather.temperature}°C
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400">{formattedDate}</p>
                </div>
            </>
        )}
    </div>
  );
};

export default WeatherWidget;
