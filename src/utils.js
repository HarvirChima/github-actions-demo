/**
 * Utility functions for the GitHub Actions Demo
 */

/**
 * Generates a random ID
 * @param {number} length - Length of the ID
 * @returns {string} Random ID
 */
function generateId(length = 8) {
  return Math.random().toString(36).substring(2, length + 2);
}

/**
 * Formats a date to ISO string
 * @param {Date} date - Date to format
 * @returns {string} Formatted date
 */
function formatDate(date = new Date()) {
  return date.toISOString();
}

/**
 * Validates an email address
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Calculates the uptime in a human-readable format
 * @param {number} uptimeSeconds - Uptime in seconds
 * @returns {string} Formatted uptime
 */
function formatUptime(uptimeSeconds) {
  const days = Math.floor(uptimeSeconds / 86400);
  const hours = Math.floor((uptimeSeconds % 86400) / 3600);
  const minutes = Math.floor((uptimeSeconds % 3600) / 60);
  const seconds = Math.floor(uptimeSeconds % 60);
  
  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

module.exports = {
  generateId,
  formatDate,
  isValidEmail,
  formatUptime
};