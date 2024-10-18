import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectorCocktail, selectorFetchOneLoading} from '../../store/cocktailsSlice';
import {useParams} from 'react-router-dom';
import {useEffect} from 'react';
import {fetchOneCocktail} from '../../store/cocktailsThunks';
import {API_URL} from '../../constants';
import Spinner from '../../components/Spinner/Spinner';

const Cocktail = () => {
  const {id} = useParams() as {id: string};
  const dispatch = useAppDispatch();
  const cocktail = useAppSelector(selectorCocktail);
  const cocktailLoading = useAppSelector(selectorFetchOneLoading);

  useEffect(() => {
    dispatch(fetchOneCocktail(id));
  }, [dispatch, id]);

  return (
    <div className='mt-5'>
      {cocktailLoading && (<div className='text-center'><Spinner /></div>)}
      {cocktail && (
        <div>
          <div className='d-flex gap-5'>
            <img className='rounded-4' style={{width: '400px', maxHeight: '400px'}} src={`${API_URL}/${cocktail.image}`} alt={cocktail.name}/>
            <div className='flex-grow-1'>
              <h2>{cocktail.name}</h2>
              <h4 className='mt-4'>Ingredients:</h4>
              <ul>
                {cocktail.ingredients.map((ingredient) => (
                  <li key={ingredient._id}>{ingredient.ingredientName} - {ingredient.amount}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className='mt-5'>
            <h4>Recipe:</h4>
            <p>{cocktail.recipe}</p>
          </div>
        </div>
      )}
      {!cocktailLoading && !cocktail && <h3 className="mt-5 text-center">There is no such cocktail</h3>}
    </div>
  );
};

export default Cocktail;