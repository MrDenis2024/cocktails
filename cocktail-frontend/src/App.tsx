import './App.css';
import Layout from './components/Layout/Layout';
import {Route, Routes} from 'react-router-dom';
import Register from './containers/Register/Register';
import Login from './containers/Login/Login';
import Cocktails from './containers/Cocktails/Cocktails';
import MyCocktails from './containers/MyCocktails/MyCocktails';
import {useAppSelector} from './app/hooks';
import {selectUser} from './store/usersSlice';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Cocktail from './containers/Cocktail/Cocktail';
import NewCocktail from './containers/NewCocktail/NewCocktail';

const App = () => {
  const user = useAppSelector(selectUser);

  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Cocktails />} />
        <Route path='/cocktail/:id' element={<Cocktail />} />
        <Route path='/new-cocktail' element={<ProtectedRoute isAllowed={user && (user.role === 'admin' || user.role === 'user')} ><NewCocktail /> </ProtectedRoute>} />
        <Route path='/my-cocktails' element={<ProtectedRoute isAllowed={user && (user.role === 'admin' || user.role === 'user')}><MyCocktails /> </ProtectedRoute>} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<div className="text-center mt-5"><strong>Данной страницы не найдено вернитесь
          пожалуйста обратно!</strong></div>} />
      </Routes>
    </Layout>
  );
};

export default App;
