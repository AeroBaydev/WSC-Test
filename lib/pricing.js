// lib/pricing.js (uses Zoho-visible labels as keys)
const CATEGORY_PRICES_INR = {
    "STARS & BEYOND": 499,
    "IDEA TANK": 665,
    "ESPORTS SHOWDOWN": 1665,
    "MYSTERY MAKERS": 2499,
    "TECH FOR GOOD": 3332,
    "TECH THROTTLE -> RC CAR": 5999,
    "TECH THROTTLE -> BATTLEBOT": 5999,
    "TECH THROTTLE -> BATTLEBOT: FOOTBALL EDITION": 5999,
    "Wing-shot Championship": 2499,
    "RocketMania": 2499,
    "DroneX Kids": 2499,
    "Wing Warriors": 4165,
    "Throttle Titans": 4165,
    "DroneX": 5999,
  };
  export function getBasePriceInPaise(category) {
    const p = CATEGORY_PRICES_INR[category];
    if (typeof p !== 'number') throw new Error(`Unknown category price for category: ${category}`);
    return Math.round(p * 100);
  }
  export default CATEGORY_PRICES_INR;