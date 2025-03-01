// src/config.ts

export const CONFIG = {
    API_BASE_URL: process.env.REACT_APP_API_BASE_URL || 'https://api.example.com',
    DEFAULT_DAILY_GOAL: 30,
    SQUAT_ANGLES: {
      STANDING: 160,
      SQUATTING: 110
    },
    COLORS: {
      PRIMARY: '#4CAF50',
      SECONDARY: '#45a049'
    }
  };
  