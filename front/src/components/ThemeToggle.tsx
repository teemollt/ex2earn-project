// src/components/ThemeToggle.tsx
import React from 'react';
import { useAppContext } from '../context/AppContext';

const ThemeToggle: React.FC = () => {
  const { state, dispatch } = useAppContext();

  return (
    <button onClick={() => dispatch({ type: 'TOGGLE_DARK_MODE' })}>
      Toggle Dark Mode (Current: {state.isDarkMode ? 'Dark' : 'Light'})
    </button>
  );
};

export default ThemeToggle;
