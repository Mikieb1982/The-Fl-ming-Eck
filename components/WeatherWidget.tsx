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

  // Use a fixed "today" for consistency across the app
  const appToday = useMemo(() => new Date('2025-08-27T12:00:00Z'), []);

  const formattedDateLong = useMemo(() => {
    return appToday.toLocaleDateString('en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    });
  }, [appToday]);

  const formattedDateShort = useMemo(() => {
    return appToday.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
    });
  }, [appToday]);


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

    const iconClass = "w-6 h-6";
    const code = weather.weatherCode;
    if (code === 0) return { icon: <SunIcon className={`${iconClass} text-yellow-500`} />, description: 'Clear sky' };
    if ([1, 2].includes(code)) return { icon: <SunCloudIcon className={`${iconClass} text-slate-500`} />, description: 'Mainly clear' };
    if (code === 3) return { icon: <CloudIcon className={`${iconClass} text-slate-500`} />, description: 'Overcast' };
    if ([45, 48].includes(code)) return { icon: <CloudIcon className={`${iconClass} text-slate-500`} />, description: 'Fog' };
    if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return { icon: <CloudRainIcon className={`${iconClass} text-blue-500`} />, description: 'Rain' };
    
    return { icon: <SunCloudIcon className={`${iconClass} text-slate-500`} />, description: 'Cloudy' };
  }, [weather]);


  return (
    <div className="flex items-center gap-2" title={weatherInfo.description}>
        <span className="text-xs sm:text-sm font-semibold text-charcoal dark:text-slate-200 hidden md:inline">
            {formattedDateLong}
        </span>
        <span className="text-xs sm:text-sm font-semibold text-charcoal dark:text-slate-200 md:hidden">
            {formattedDateShort}
        </span>

        <div className="w-px h-5 bg-slate-300 dark:bg-slate-600 mx-1"></div>

        <div className="flex items-center gap-1">
            {isLoading && <div className="text-xs text-slate-500 dark:text-slate-400 animate-pulse">Loading...</div>}
            {error && null /* Silently fail in the header */}
            {weather && !isLoading && (
                <>
                    <div className="flex-shrink-0">
                        {weatherInfo.icon}
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-charcoal dark:text-slate-200">
                        {weather.temperature}°C
                    </span>
                </>
            )}
        </div>
    </div>
  );
};

export default WeatherWidget;