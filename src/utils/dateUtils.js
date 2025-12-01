/**
 * Calculate the number of months between two dates
 */
export function calculateMonths(startDate, endDate = null) {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();
  
  // Ensure we're comparing valid dates
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return 0;
  }
  
  // If start date is in the future, return 0
  if (start > end) {
    return 0;
  }
  
  const yearsDiff = end.getFullYear() - start.getFullYear();
  const monthsDiff = end.getMonth() - start.getMonth();
  
  let totalMonths = yearsDiff * 12 + monthsDiff;
  
  // If we're in the same month, count it as at least 1 month
  return Math.max(1, totalMonths);
}

/**
 * Format date to "MMM YYYY" format
 */
export function formatDate(dateString) {
  const date = new Date(dateString);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[date.getMonth()]} ${date.getFullYear()}`;
}

/**
 * Format duration string (e.g., "Jun 2025 - Present" or "Nov 2024 - May 2025")
 */
export function formatDuration(startDate, endDate = null) {
  const start = formatDate(startDate);
  const end = endDate ? formatDate(endDate) : 'Present';
  return `${start} - ${end}`;
}

/**
 * Format months to readable string (e.g., "7 mos", "1 yr 2 mos")
 */
export function formatMonths(months) {
  if (months < 1) return 'Less than 1 mo';
  if (months < 12) return `${months} ${months === 1 ? 'mo' : 'mos'}`;
  
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  
  if (remainingMonths === 0) {
    return `${years} ${years === 1 ? 'yr' : 'yrs'}`;
  }
  
  return `${years} ${years === 1 ? 'yr' : 'yrs'} ${remainingMonths} ${remainingMonths === 1 ? 'mo' : 'mos'}`;
}

/**
 * Process experiences to calculate duration and sort (Present first, then by priority)
 */
export function processExperiences(experiences) {
  const processed = experiences
    .map(exp => {
      const months = calculateMonths(exp.startDate, exp.endDate);
      const duration = formatDuration(exp.startDate, exp.endDate);
      const durationMonths = formatMonths(months);
      const isPresent = !exp.endDate;
      const priority = exp.priority !== undefined ? exp.priority : 999; // Default priority for items without explicit priority
      const hadPriority = exp.priority !== undefined; // Remember if priority was originally set
      
      return {
        ...exp,
        duration,
        durationMonths,
        isPresent,
        priority,
        hadPriority,
        // For sorting: present experiences get priority, then by priority field, then by start date (newest first)
        sortKey: isPresent ? new Date('2099-12-31') : new Date(exp.startDate)
      };
    })
    .sort((a, b) => {
      // Present experiences first
      if (a.isPresent && !b.isPresent) return -1;
      if (!a.isPresent && b.isPresent) return 1;
      
      // If both are present, sort by priority first (lower number = higher priority)
      if (a.isPresent && b.isPresent) {
        const priorityDiff = a.priority - b.priority;
        if (priorityDiff !== 0) {
          return priorityDiff; // Lower priority number = appears first
        }
      }
      
      // For past experiences or if priorities are equal, sort by start date (newest first)
      return new Date(b.startDate) - new Date(a.startDate);
    })
    .map(({ sortKey, isPresent, hadPriority, ...exp }) => {
      // Remove helper properties but keep priority if it was originally set
      const result = { ...exp };
      if (!hadPriority) {
        delete result.priority;
      }
      return result;
    });
  
  // Debug: Log the sorted order
  console.log('Experiences sorted order:', processed.map(e => ({ title: e.title, priority: e.priority, isPresent: e.isPresent })));
  
  return processed;
}

