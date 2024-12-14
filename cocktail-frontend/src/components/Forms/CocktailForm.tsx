import React, {useState} from 'react';
import {CocktailMutation} from '../../types';
import FileInput from './FileInput';
import ButtonSpinner from '../Spinner/ButtonSpinner';

interface Props {
  onSubmit: (cocktail: CocktailMutation) => void;
  createLoading: boolean;
}

const CocktailForm: React.FC<Props> = ({onSubmit, createLoading}) => {
  const [cocktail, setCocktail] = useState<CocktailMutation>({
    name: '',
    image: null,
    recipe: '',
    ingredients: [
      {ingredientName: '', amount: ''}
    ],
  });

  const addIngredient = () => {
    setCocktail((prevState) => ({
      ...prevState,
      ingredients: [
        ...prevState.ingredients,
        {ingredientName: '', amount: ''}
      ]
    }));
  };

  const onFieldChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = event.target;
    setCocktail((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onIngredientChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const {name, value} = event.target;
    setCocktail((prevState) => {
      const ingredientsCopy = [...prevState.ingredients];
      ingredientsCopy[index] = {...ingredientsCopy[index], [name]: value};

      return {
        ...prevState,
        ingredients: ingredientsCopy
      };
    });
  };

  const fileInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.target;
    const value = files && files[0] ? files[0] : null;

    setCocktail((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onIngredientDelete = (index: number) => {
    setCocktail((prevState) => {
      return {
        ...prevState,
        ingredients: prevState.ingredients.filter((_, i) => i !== index)
      };
    });
  };

  const submitFormHandler = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit({...cocktail});
  };

  return (
    <form className='my-5 w-75 mx-auto border rounded-4 border-2 p-4' onSubmit={submitFormHandler}>
      <h4 className='mb-5 text-center'>Add new cocktail</h4>
      <div className='form-group mb-3'>
        <label htmlFor='name' className='mb-1'>Name:</label>
        <input type='text' name='name' id='name' className='form-control' value={cocktail.name}
               onChange={onFieldChange} required/>
      </div>
      <div className='form-group mb-3'>
        <div className='d-flex gap-3'>
          <label>Ingredients:</label>
          <div>
            {cocktail.ingredients.map((ingredient, index) => (
              <div className="d-flex gap-5 mb-3" key={index}>
                <div className='d-flex gap-4'>
                  <input type="text" className="form-control" name="ingredientName" placeholder="Ingredient name"
                         value={ingredient.ingredientName} onChange={(event) => onIngredientChange(event, index)}
                         required/>
                  <input type="text" className="form-control" name="amount" placeholder="Amount"
                         value={ingredient.amount}
                         onChange={(event) => onIngredientChange(event, index)} required/>
                </div>
                {index > 0 && (
                  <button type="button" className="btn btn-danger"
                          onClick={() => onIngredientDelete(index)}>Deleteeeeeee</button>
                )}
              </div>
            ))}
            <button type="button" className="btn btn-success" onClick={addIngredient}>Add Ingredient</button>
          </div>
        </div>
      </div>
      <div className="form-group mb-3">
        <div className="d-flex flex-column">
          <label htmlFor="recipe" className="mb-2">Recipe:</label>
          <textarea id="recipe" name="recipe" cols={150} rows={3} className="border"
                    placeholder="Enter cocktail recipe" value={cocktail.recipe}
                    onChange={onFieldChange} required></textarea>
        </div>
      </div>
      <FileInput onChange={fileInputChangeHandler}/>
      <div className="d-flex">
        <button type="submit" className="btn btn-success ms-auto" disabled={createLoading}>{createLoading && <ButtonSpinner/>}Create
          cocktail
        </button>
      </div>
    </form>
  );
};

export default CocktailForm;