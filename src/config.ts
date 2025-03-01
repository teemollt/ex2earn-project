// src/config.ts

export const CONFIG = {
    API_BASE_URL: process.env.REACT_APP_API_BASE_URL || 'https://api.example.com',
    SOLANA_NETWORK_URL: 'https://api.devnet.solana.com',
    DEFAULT_DAILY_GOAL: 30,
    SQUAT_ANGLES: {
      STANDING: 160,
      SQUATTING: 110
    },
    COLORS: {
      PRIMARY: '#4CAF50',
      SECONDARY: '#45a049',
      BACKGROUND: '#f0f0f0',
      TEXT: '#333'
    },
    CAMERA: {
      WIDTH: 640,
      HEIGHT: 480
    },
    FONT_SIZES: {
      LARGE: '48px',
      MEDIUM: '24px',
      SMALL: '18px'
    },
    SPACING: {
      SMALL: '10px',
      MEDIUM: '20px',
      LARGE: '30px'
    }
  };
  