import { Container } from '@mui/material';
import { Message } from './components/Message';

function App() {
  const message = {
    author: 'Peter Pan',
    text: 'I wish to see you!',
  };
  return (
    <Container className="App">
      <Message message={message} />
    </Container>
  );
}

export default App;
