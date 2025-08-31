/**
 * Converts a date string (YYYY-MM-DD) to a human-readable format (e.g., "9th July, 2025").
 * @param dateString - Date string (e.g., "2025-07-09")
 * @param locale - Locale for formatting (defaults to 'en-GB')
 * @param shortMonth - Use short month name (e.g., "Jul" vs. "July")
 * @param includeYear - Include the year in the output
 * @returns Formatted string (e.g., "9th July, 2025")
 */
export const formatDateToHumanReadable = (
    dateString: string | null | undefined, 
    locale: string | undefined = undefined,
    shortMonth: boolean = false,
    includeYear: boolean = true
): string => {
  // Check for a valid date string format
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateString || !dateRegex.test(dateString)) {
    return 'Invalid Date';
  }
  
  // Create a Date object from the string. We add the time component to avoid timezone issues.
  const date = new Date(`${dateString}T00:00:00Z`);
  if (isNaN(date.getTime())) {
    return 'Invalid Date';
  }
  
  // Use a temporary date object to handle day suffixes (e.g., '1st', '2nd', '3rd')
  const dateParts = dateString.split('-').map(Number);
  const day = dateParts[2];

  // Helper function to get the day suffix
  const getDaySuffix = (day: number): string => {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };

  // Format the month and year using Intl.DateTimeFormat
  const formatter = new Intl.DateTimeFormat(locale, {
    month: shortMonth ? 'short' : 'long',
    ...(includeYear ? { year: 'numeric' } : {}),
  });
  
  // Split parts to insert comma before year
  const parts = formatter.formatToParts(date);
  const month = parts.find((p) => p.type === 'month')?.value || '';
  const year = includeYear ? parts.find((p) => p.type === 'year')?.value || '' : '';
  const yearPart = year ? `, ${year}` : '';

  return `${day}${getDaySuffix(day)} ${month}${yearPart}`;
};

/**
 * Converts minutes to a human-readable hours-minutes-seconds format.
 * @param minutes - Number of minutes (e.g., 100 for 1hr 40m)
 * @param options - Formatting options
 * @returns Formatted string (e.g., "1hr 40m 0s" or "1:40")
 */
export const convertMinutesToDuration = (
    totalMinutes: number, 
    showSeconds: boolean = false, 
    shortFormat: boolean = false
): string => {
  if (typeof totalMinutes !== 'number' || totalMinutes < 0) {
    return showSeconds ? '0hr 0m 0s' : '0hr 0m';
  }

  // Calculate hours, minutes, and seconds
  const hours = Math.floor(totalMinutes / 60);
  const minutes = Math.floor(totalMinutes % 60);
  const seconds = Math.round((totalMinutes - Math.floor(totalMinutes)) * 60);

  if (shortFormat) {
      // Short format: e.g., "1:40" or "1:40:00"
      const formattedMinutes = String(minutes).padStart(2, '0');
      const formattedSeconds = showSeconds ? `:${String(seconds).padStart(2, '0')}` : '';
      return hours > 0
        ? `${hours}:${formattedMinutes}${formattedSeconds}`
        : `${minutes}${formattedSeconds}`;
  }
  
   // Long format: e.g., "1hr 40m 0s"
    const parts: string[] = [];
    if (hours > 0) parts.push(`${hours}hr`);
    parts.push(`${minutes}m`);
    if (showSeconds) parts.push(`${seconds}s`);
    return parts.join(' ') || (showSeconds ? '0hr 0m 0s' : '0hr 0m');
};

/**
 * Formats an ISO 8601 date string to a human-readable format (e.g., "July 9, 2025, 12:30 PM").
 * @param isoString - ISO 8601 date string (e.g., "2025-07-09T12:30:00Z")
 * @param options - Formatting options for Intl.DateTimeFormat
 * @param locale - Locale for formatting (defaults to 'en-US')
 * @returns Formatted string (e.g., "July 9, 2025, 12:30 PM")
 */
export function formatTime(
  isoString: string | null | undefined,
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  },
  locale: string = 'en-US'
): string {
  if (!isoString) {
    console.warn('formatTime: No ISO string provided.');
    return 'Invalid Date';
  }

  try {
    const date = new Date(isoString);
    if (isNaN(date.getTime())) {
      console.error(`formatTime: Invalid date string "${isoString}".`);
      return 'Invalid Date';
    }

    return new Intl.DateTimeFormat(locale, options).format(date);
  } catch (error) {
    console.error('formatTime: Formatting error', error);
    return 'Formatting Error';
  }
}