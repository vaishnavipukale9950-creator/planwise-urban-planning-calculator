/* Pure calculation functions; usable in the browser and Node.js tests. */
function validNumber(value) { return typeof value === 'number' && Number.isFinite(value) && value >= 0; }
function ratio(numerator, denominator) {
  if (!validNumber(numerator) || !validNumber(denominator) || denominator === 0) return null;
  return numerator / denominator;
}
function calculateFsi(plotArea, floorArea) { return ratio(floorArea, plotArea); }
function calculateCoverage(plotArea, footprint) {
  const result = ratio(footprint, plotArea);
  return result === null ? null : result * 100;
}
function calculateLandUse(rows) {
  if (!Array.isArray(rows) || !rows.length || rows.some(row => !validNumber(row.area))) return null;
  const total = rows.reduce((sum, row) => sum + row.area, 0);
  if (total <= 0) return null;
  return { total, shares: rows.map(row => ({ name: row.name, area: row.area, percent: row.area / total * 100 })) };
}
function calculateParking(floorArea, spacesPer100) {
  if (!validNumber(floorArea) || !validNumber(spacesPer100)) return null;
  return Math.ceil(floorArea / 100 * spacesPer100);
}
if (typeof module !== 'undefined') module.exports = { calculateFsi, calculateCoverage, calculateLandUse, calculateParking };
