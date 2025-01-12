import HeroSession from './pages/HeroSession';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import MainPage from './pages/MainPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<HeroSession />} />
          <Route path="/login" element={<Login />} />
          <Route path="/main" element={<MainPage />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
