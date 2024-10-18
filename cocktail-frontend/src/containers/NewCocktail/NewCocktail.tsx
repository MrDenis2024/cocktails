import {useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import CocktailForm from '../../components/Forms/CocktailForm';
import {selectorCreateCocktailLoading} from '../../store/cocktailsSlice';
import {CocktailMutation} from '../../types';
import {toast} from 'react-toastify';
import {createCocktail} from '../../store/cocktailsThunks';

const NewCocktail = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const createLoading = useAppSelector(selectorCreateCocktailLoading);

  const onFormSubmit = async (cocktail: CocktailMutation) => {
    try {
      await dispatch(createCocktail(cocktail)).unwrap();
      navigate('/');
      toast.success('Cocktail successfully created');
    } catch {
      toast.error('Error creating Cocktail');
    }
  };

  return (
    <div>
      <CocktailForm onSubmit={onFormSubmit} createLoading={createLoading} />
    </div>
  );
};

export default NewCocktail;