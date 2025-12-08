// src/utils/dateUtils.js

const calculateDuration = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();
  
    // Calculate the difference in years and months
    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
  
    // Adjust for negative month difference
    if (months < 0) {
      years--;
      months += 12;
    }
  
    // Format the duration string
    let durationString = "";
    if (years > 0) {
      durationString += `${years} yr${years > 1 ? "s" : ""}`;
    }
    if (months > 0) {
      if (durationString) durationString += " ";
      durationString += `${months} mo${months > 1 ? "s" : ""}`;
    }
  
    return durationString || "1 mo"; // Return "1 mo" if duration is less than a month
  };
  
  export const processExperiences = (experiences) => {
    return experiences
      .map(exp => {
        const start = new Date(exp.startDate);
        const end = exp.endDate ? new Date(exp.endDate) : new Date();
        
        // Format the duration string (e.g., "Jun 2025 - Present")
        const duration = `${start.toLocaleString('default', { month: 'short' })} ${start.getFullYear()} - ${exp.endDate ? `${end.toLocaleString('default', { month: 'short' })} ${end.getFullYear()}` : 'Present'}`;
        
        // Calculate the total duration in months (e.g., "7 mos")
        const durationMonths = calculateDuration(exp.startDate, exp.endDate);
  
        return {
          ...exp,
          duration,
          durationMonths
        };
      })
      .sort((a, b) => {
        // Sort by priority first (lower number is higher priority)
        if (a.priority && b.priority) {
          return a.priority - b.priority;
        }
        if (a.priority) return -1; // a has priority, b doesn't
        if (b.priority) return 1;  // b has priority, a doesn't
  
        // If no priority, sort by end date (nulls first), then by start date
        const aEndDate = a.endDate ? new Date(a.endDate) : new Date("9999-12-31");
        const bEndDate = b.endDate ? new Date(b.endDate) : new Date("9999-12-31");
        if (bEndDate - aEndDate !== 0) {
          return bEndDate - aEndDate;
        }
        return new Date(b.startDate) - new Date(a.startDate);
      });
  };