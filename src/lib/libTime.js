export default function timeAgo(setTime, now = new Date()) {
  if (/^\d{8}T\d{6}\.?\d*Z?$/.test(setTime)) {
    setTime = setTime.replace(
      /^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})(.*)$/,
      "$1-$2-$3T$4:$5:$6$7"
    );
  }

  const setDate = new Date(setTime);
  const diffMs = now - setDate;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);
  const diffMonth = Math.floor(diffDay / 30);
  const diffYear = Math.floor(diffDay / 365);

  if (diffSec < 10) return "just now";
  if (diffSec < 60) return `${diffSec} second${diffSec !== 1 ? "s" : ""} ago`;
  if (diffMin < 60) return `${diffMin} minute${diffMin !== 1 ? "s" : ""} ago`;
  if (diffHour < 24) return `${diffHour} hour${diffHour !== 1 ? "s" : ""} ago`;
  if (diffDay < 30) return `${diffDay} day${diffDay !== 1 ? "s" : ""} ago`;
  if (diffMonth < 12)
    return `${diffMonth} month${diffMonth !== 1 ? "s" : ""} ago`;
  return `${diffYear} year${diffYear !== 1 ? "s" : ""} ago`;
}

export const formatDate = (dateString) => {
        const monthNames = [
          "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ];
        
        try {
          const date = new Date(dateString);
          if (isNaN(date.getTime())) {
            const year = dateString.substring(0, 4);
            const month = parseInt(dateString.substring(4, 6), 10) - 1; 
            const day = dateString.substring(6, 8);
            return `${day}/${monthNames[month]}/${year}`;
          }
        } catch (e) {
          return ""
        }
      };