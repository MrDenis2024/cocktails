import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectUser} from '../../store/usersSlice';
import {selectorCocktails, selectorFetchCocktailLoading} from '../../store/cocktailsSlice';
import {changeCocktail, deleteCocktail, fetchCocktails} from '../../store/cocktailsThunks';
import Spinner from '../../components/Spinner/Spinner';
import CocktailItem from '../../components/Cocktail/CocktailItem';
import {toast} from 'react-toastify';

const Cocktails = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const cocktails = useAppSelector(selectorCocktails);
  const fetchLoading = useAppSelector(selectorFetchCocktailLoading);
  const filetCocktails = cocktails.filter(cocktail => (user?.role === 'admin' || cocktail.isPublished));

  useEffect(() => {
    dispatch(fetchCocktails());
  }, [dispatch]);

  const handleCocktailChange = async (cocktailId: string) => {
    try {
      await dispatch(changeCocktail(cocktailId)).unwrap();
      toast.success('Cocktail status successfully changed');
      dispatch(fetchCocktails());
    } catch {
      toast.error('There was an error changing cocktail status');
    }
  };

  const handleCocktailDelete = async (cocktailId: string) => {
    try {
      if(window.confirm('Вы точно хотите удалить данный коктель?')) {
        await dispatch(deleteCocktail(cocktailId)).unwrap();
        dispatch(fetchCocktails());
        toast.success('Cocktail successfully delete');
      }
    } catch {
      toast.error('There was an error delete cocktail');
    }
  };

  return (
    <div className='mt-5'>
      <h2 className='text-center'>Cocktails</h2>
      {fetchLoading && <div className='text-center mt-5'><Spinner /></div>}
      {cocktails.length > 0 && (
        <div className='mt-3 d-flex gap-4 flex-wrap'>
          {filetCocktails.map((cocktail) => (
            <CocktailItem key={cocktail._id} cocktail={cocktail} handleCocktailChange={handleCocktailChange} handleCocktailDelete={handleCocktailDelete}/>
          ))}
        </div>
      )}
      {!fetchLoading && cocktails.length === 0 && <h3 className='text-center'>No cocktails, add them</h3>}
    </div>
  );
};

export default Cocktails;