
import { BRAND } from '../constants';

export interface CalendarEvent {
  title: string;
  description: string;
  location: string;
  startTime: Date | null;
  endTime: Date | null;
  isAllDay: boolean;
}

const YEAR = 2025;
const MONTHS: { [key: string]: number } = {
  'JAN': 0, 'FEB': 1, 'MAR': 2, 'APR': 3, 'MAY': 4, 'JUN': 5,
  'JUL': 6, 'AUG': 7, 'SEP': 8, 'OCT': 9, 'NOV': 10, 'DEC': 11
};
const DAYS: { [key: string]: number } = {
  'SUN': 0, 'MON': 1, 'TUE': 2, 'WED': 3, 'THU': 4, 'FRI': 5, 'SAT': 6
};

function parseTime(timeStr: string, date: Date): [Date, Date | null] | null {
  if (!timeStr || timeStr.toLowerCase() === 'varies') return null;

  const timeRegex = /(\d{1,2}):(\d{2})\s*(AM|PM)?/gi;
  const matches = [...timeStr.matchAll(timeRegex)];

  if (matches.length === 0) return null;

  const [h1, m1, p1] = matches[0].slice(1);
  let hour1 = parseInt(h1, 10);
  const minute1 = parseInt(m1, 10);

  if (p1 && p1.toLowerCase() === 'pm' && hour1 < 12) hour1 += 12;
  if (p1 && p1.toLowerCase() === 'am' && hour1 === 12) hour1 = 0; // Midnight case

  const startTime = new Date(date);
  startTime.setHours(hour1, minute1, 0, 0);
  
  let endTime: Date | null = null;
  if (matches.length > 1) {
    const [h2, m2, p2] = matches[1].slice(1);
    let hour2 = parseInt(h2, 10);
    const minute2 = parseInt(m2, 10);
    
    if (p2 && p2.toLowerCase() === 'pm' && hour2 < 12) hour2 += 12;
    if (p2 && p2.toLowerCase() === 'am' && hour2 === 12) hour2 = 0;
    
    endTime = new Date(date);
    endTime.setHours(hour2, minute2, 0, 0);

  } else {
    // Default to 1 hour duration if no end time is specified
    endTime = new Date(startTime);
    endTime.setHours(startTime.getHours() + 1);
  }

  return [startTime, endTime];
}


function parseDate(dateStr: string): Date | null {
    const specificDateMatch = dateStr.match(/(\d{1,2})\s+([A-Z]{3})/i);
    if (specificDateMatch) {
        const day = parseInt(specificDateMatch[1], 10);
        const month = MONTHS[specificDateMatch[2].toUpperCase()];
        if (month !== undefined) {
            return new Date(YEAR, month, day);
        }
    }

    const recurringDayMatch = dateStr.match(/every\s+(monday|tuesday|wednesday|thursday|friday|saturday|sunday)/i);
    if(recurringDayMatch) {
        const dayOfWeek = DAYS[recurringDayMatch[1].slice(0, 3).toUpperCase()];
        const today = new Date();
        today.setHours(0,0,0,0);
        const resultDate = new Date(today);
        resultDate.setDate(today.getDate() + (dayOfWeek + 7 - today.getDay()) % 7);
        if (resultDate.getTime() < today.getTime()) { // if the day is today but we want next week
             resultDate.setDate(resultDate.getDate() + 7);
        }
        return resultDate;
    }
    return null;
}

export function parseEventString(eventString: string): CalendarEvent | null {
  if (typeof eventString !== 'string') {
    return null;
  }
  const parts = eventString.split('::').map(p => p.trim());
  const [dateStr, timeStr, title, location, description] = parts;

  if (!dateStr || !timeStr || !title) return null;

  const isAllDay = timeStr.toLowerCase() === 'all day';
  const baseDate = parseDate(dateStr);
  if (!baseDate) return null;

  let startTime: Date | null = null;
  let endTime: Date | null = null;

  if (isAllDay) {
    startTime = new Date(baseDate);
    startTime.setHours(0, 0, 0, 0);
    endTime = new Date(baseDate);
    endTime.setHours(23, 59, 59, 999);
  } else {
    const times = parseTime(timeStr, baseDate);
    if (times) {
      [startTime, endTime] = times;
    }
  }

  return {
    title,
    description: description || '',
    location: location || '',
    startTime,
    endTime,
    isAllDay,
  };
}


const toUTCFormat = (date: Date) => date.toISOString().replace(/-|:|\.\d{3}/g, '');

export function generateGoogleCalendarUrl(event: CalendarEvent): string | null {
  if (!event.startTime) return null;

  const format = event.isAllDay 
    ? (d: Date) => d.toISOString().split('T')[0].replace(/-/g, '')
    : toUTCFormat;

  let dates = '';
  if (event.isAllDay && event.startTime) {
      const nextDay = new Date(event.startTime);
      nextDay.setDate(nextDay.getDate() + 1);
      dates = `${format(event.startTime)}/${format(nextDay)}`;
  } else if (event.startTime && event.endTime) {
      dates = `${format(event.startTime)}/${format(event.endTime)}`;
  } else {
    return null;
  }
  
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    dates: dates,
    details: event.description,
    location: event.location,
    crm: 'BUSY',
    trp: 'true',
  });

  return `https://www.google.com/calendar/render?${params.toString()}`;
}

export function generateIcsContent(event: CalendarEvent): string | null {
    if (!event.startTime) return null;

    const formatDate = (date: Date, isAllDay: boolean) => {
        if (isAllDay) {
            return `VALUE=DATE:${date.toISOString().split('T')[0].replace(/-/g, '')}`;
        }
        return `TZID=Europe/Berlin:${toUTCFormat(date).replace('Z', '')}`;
    };

    let dtEnd = '';
    if (event.isAllDay) {
        const nextDay = new Date(event.startTime);
        nextDay.setDate(nextDay.getDate() + 1);
        dtEnd = `DTEND;${formatDate(nextDay, true)}`;
    } else if (event.endTime) {
        dtEnd = `DTEND;${formatDate(event.endTime, false)}`;
    }

    const ics = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        `PRODID:-//${BRAND.title}//EN`,
        'BEGIN:VEVENT',
        `UID:${Date.now()}@flaeming-eck.example.com`,
        `DTSTAMP:${toUTCFormat(new Date())}`,
        `DTSTART;${formatDate(event.startTime, event.isAllDay)}`,
        dtEnd,
        `SUMMARY:${event.title}`,
        `DESCRIPTION:${event.description.replace(/\n/g, '\\n')}`,
        `LOCATION:${event.location}`,
        'END:VEVENT',
        'END:VCALENDAR'
    ].filter(Boolean).join('\r\n');

    return ics;
}

export function downloadIcsFile(icsContent: string, filename: string) {
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${filename}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}