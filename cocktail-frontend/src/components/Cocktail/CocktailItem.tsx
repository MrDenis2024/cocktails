import React from 'react';
import {Cocktail} from '../../types';
import {Link, useLocation} from 'react-router-dom';
import {API_URL} from '../../constants';
import {useAppSelector} from '../../app/hooks';
import {selectUser} from '../../store/usersSlice';
import ButtonSpinner from '../Spinner/ButtonSpinner';
import {selectorChangeLoadingCocktail, selectorDeleteLoadingCocktail} from '../../store/cocktailsSlice';

interface Props {
  cocktail: Cocktail;
  handleCocktailChange: (id: string) => void;
  handleCocktailDelete: (id: string) => void;
}

const CocktailItem: React.FC<Props> = ({cocktail, handleCocktailChange, handleCocktailDelete}) => {
  const user = useAppSelector(selectUser);
  const cocktailChangeLoading = useAppSelector(selectorChangeLoadingCocktail);
  const cocktailDeleteLoading = useAppSelector(selectorDeleteLoadingCocktail);
  const {pathname: location} = useLocation();

  return (
    <div className='card'>
      <Link to={`/cocktails/${cocktail._id}`} className="text-decoration-none flex-grow-1" style={{width: '275px'}}>
        <img src={`${API_URL}/${cocktail.image}`} className="card-img-top" alt={cocktail.name} style={{maxHeight: '183px'}}/>
        <div className="card-body text-center">
          <h5 className="card-title text-dark">{cocktail.name}</h5>
          {!cocktail.isPublished && (
            <span className='text-secondary'>{location === '/' ? ('Not published') : ('Your cocktail is being reviewed by a moderator')}</span>
          )}
        </div>
      </Link>
      {user && user.role === 'admin' && (
        <div className="d-flex justify-content-center gap-5 mb-3">
          {!cocktail.isPublished && (
            <button onClick={() => handleCocktailChange(cocktail._id)} className="btn btn-primary"
                    disabled={cocktailChangeLoading ? cocktailChangeLoading === cocktail._id : false}>{cocktailChangeLoading && cocktailChangeLoading === cocktail._id && (
              <ButtonSpinner/>)}Publish
            </button>
          )}
          <button onClick={() => handleCocktailDelete(cocktail._id)} className="btn btn-danger"
                  disabled={cocktailDeleteLoading ? cocktailDeleteLoading === cocktail._id : false}>{cocktailDeleteLoading && cocktailDeleteLoading === cocktail._id && (
            <ButtonSpinner/>)}Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default CocktailItem;