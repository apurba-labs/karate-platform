import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from './contexts/AuthContext';
import { DojoProvider } from '@/contexts/DojoContext';
import Layout from './components/ui/Layout';


const App: React.FC = () => {
  return (
    <AuthProvider>
      <DojoProvider>
        <BrowserRouter>
          <Layout>
            <AppRoutes />
          </Layout>
        </BrowserRouter>
      </DojoProvider>
    </AuthProvider>
  );
};

export default App;