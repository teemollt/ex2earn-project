// config.ts
export const CONFIG = {
  SYSTEM: {
    API_BASE_URL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000',
    SOLANA_NETWORK_URL: process.env.REACT_APP_SOLANA_NETWORK_URL || 'https://api.devnet.solana.com',
    DEFAULT_DAILY_GOAL: parseInt(process.env.REACT_APP_DEFAULT_DAILY_GOAL || '30', 10),
    SQUAT_ANGLES: {
      STANDING: parseInt(process.env.REACT_APP_SQUAT_ANGLES_STANDING || '160', 10),
      SQUATTING: parseInt(process.env.REACT_APP_SQUAT_ANGLES_SQUATTING || '110', 10),
    },
  },
  THEME: {
    COLORS: {
      PRIMARY: '#4CAF50',
      SECONDARY: '#45a049',
      BACKGROUND: '#f0f0f0',
      TEXT: '#333',
    },
  },
  SOLANA_RPC_URL: process.env.SOLANA_RPC_URL || 'https://api.devnet.solana.com',
  PROGRAM_ID: process.env.PROGRAM_ID || 'your_program_id',
  SOLANA_PAYER_SECRET: process.env.SOLANA_PAYER_SECRET || 'your_secret_key',
};
