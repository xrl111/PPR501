import React from 'react';
import { ImportQuiz } from '../components/layouts/ImportQuiz'; // Ensure the correct import path

export const renderContent = (selectedMenuItem: string) => {
  switch (selectedMenuItem) {
    case '1':
      return <ImportQuiz />;
    case '2':
      return <div>Content for nav 2</div>;
    case '3':
      return <div>Content for nav 3</div>;
    default:
      return <div>Default Content</div>;
  }
};
