import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {fetchMyCockTails} from '../../store/cocktailsThunks';
import {selectUser} from '../../store/usersSlice';
import {selectorMyCocktails, selectorMyCocktailsFetchLoading} from '../../store/cocktailsSlice';
import Spinner from '../../components/Spinner/Spinner';
import CocktailItem from '../../components/Cocktail/CocktailItem';

const MyCocktails = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const myCocktails = useAppSelector(selectorMyCocktails);
  const myCocktailsLoading = useAppSelector(selectorMyCocktailsFetchLoading);

  useEffect(() => {
    if(user) {
      dispatch(fetchMyCockTails(user._id));
    }
  }, [dispatch, user]);

  return (
    <div className='my-4'>
      <h2 className='text-center'>My added cocktails</h2>
      {myCocktailsLoading && <div className='text-center mt-5'><Spinner/></div>}
      {myCocktails.length > 0 && (
        <div className='mt-3 d-flex gap-4 flex-wrap'>
          {myCocktails.map((cocktail) => (
            <CocktailItem key={cocktail._id} cocktail={cocktail} />
          ))}
        </div>
      )}
      {!myCocktailsLoading && myCocktails.length === 0 && <h3 className='text-center'>No cocktails, add them</h3>}
    </div>
  );
};

export default MyCocktails;