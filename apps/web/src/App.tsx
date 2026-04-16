import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { RecipesPage } from './pages/RecipesPage';
import { RecipeDetailPage } from './pages/RecipeDetailPage';
import { NewsPage } from './pages/NewsPage';
import { NewsDetailPage } from './pages/NewsDetailPage';
import { NutritionPage } from './pages/NutritionPage';
import { NutritionDetailPage } from './pages/NutritionDetailPage';
import { LoginPage } from './pages/LoginPage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage, AdminNewRecipePage } from './pages/AdminPage';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route
              path="recettes/saison"
              element={<Navigate to="/recettes?view=saison" replace />}
            />
            <Route
              path="recettes/fete"
              element={<Navigate to="/recettes?view=fete" replace />}
            />
            <Route path="recettes" element={<RecipesPage />} />
            <Route path="recettes/:id" element={<RecipeDetailPage />} />
            <Route path="news" element={<NewsPage />} />
            <Route path="news/:id" element={<NewsDetailPage />} />
            <Route path="nutrition" element={<NutritionPage />} />
            <Route path="nutrition/:id" element={<NutritionDetailPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="admin" element={<AdminPage />} />
            <Route path="admin/nouvelle-recette" element={<AdminNewRecipePage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
