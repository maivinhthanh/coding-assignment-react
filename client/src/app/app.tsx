import { Routes, Route } from 'react-router-dom';
import styles from './app.module.css';
import Tickets from './tickets/tickets';
import TicketDetail from './ticket/ticket';
import { Layout } from './layout';

const App = () => (
  <div className={styles['app']}>
    <h1>Ticketing App</h1>
    <Routes>
      <Route
        path="/"
        element={
          <Layout pageTitle={'Tickets'}>
            <Tickets />
          </Layout>
        }
      />
      {/* Hint: Try `npx nx g component TicketDetails --project=client --no-export` to generate this component  */}
      <Route path="/:id" element={<TicketDetail />} />
    </Routes>
  </div>
);

export default App;
