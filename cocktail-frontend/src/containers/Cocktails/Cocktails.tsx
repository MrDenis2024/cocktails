import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectUser} from '../../store/usersSlice';
import {selectorCocktails, selectorFetchCocktailLoading} from '../../store/cocktailsSlice';
import {fetchCocktails} from '../../store/cocktailsThunks';
import Spinner from '../../components/Spinner/Spinner';
import CocktailItem from '../../components/Cocktail/CocktailItem';

const Cocktails = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const cocktails = useAppSelector(selectorCocktails);
  const fetchLoading = useAppSelector(selectorFetchCocktailLoading);
  const filetCocktails = cocktails.filter(cocktail => (user?.role === 'admin' || cocktail.isPublished));

  useEffect(() => {
    dispatch(fetchCocktails());
  }, [dispatch]);

  return (
    <div className='my-4'>
      <h2 className='text-center'>Cocktails</h2>
      {fetchLoading && <div className='text-center mt-5'><Spinner /></div>}
      {cocktails.length > 0 && (
        <div className='mt-3 d-flex gap-4 flex-wrap'>
          {filetCocktails.map((cocktail) => (
            <CocktailItem key={cocktail._id} cocktail={cocktail} />
          ))}
        </div>
      )}
      {!fetchLoading && cocktails.length === 0 && <h3 className='text-center'>No cocktails, add them</h3>}
    </div>
  );
};

export default Cocktails;