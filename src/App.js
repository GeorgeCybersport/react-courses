import { Container } from '@mui/material';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Chat } from './components/Chat';
import { Header } from './components/Header/Header';
import { Message } from './components/Message';
import { ROUTES, SINGLE_CHAT } from './constants/routes';
import { Chats } from './pages/Chats';
import { MainPage } from './pages/MainPage';
import { Messages } from './pages/Messages';

function App() {
  return (
    <Container className="App">
      <Header />
      <Routes>
        <Route path={ROUTES.MESSAGES.path} element={<Messages />} exact />
        <Route path={ROUTES.MAIN.path} element={<MainPage />} exact />
        <Route path={ROUTES.CHATS.path} element={<Chats />} exact />
        <Route path={SINGLE_CHAT.path} element={<Chat />} exact />
        <Route path="*" element={<Navigate to={ROUTES.MAIN.path} replace />} />
      </Routes>
    </Container>
  );
}

export default App;
