import React from 'react';
import { useForm } from 'react-hook-form';
import "../styles/components/CreatePokemon.css";
import swal from 'sweetalert';
import { addPokemon } from '../actions/pokemon';
import { useDispatch, useSelector } from 'react-redux';

export default function CreatePokemon() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const types = useSelector((state) => state.types);
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    console.log('Dats to send', data);
    if (Object.keys(errors).length === 0) {
      dispatch(addPokemon(data));
      reset(data);
      swal("Good job!", "Your pokemon has been created!", "success");
    }
    else swal("Oh no!", "Please fill all required fields", "error");

  };
  console.log(errors, Object.keys(errors).length === 0);


  return (
    <div className="bg-createPokemon">
      <h1>Create Tu Pokemon</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="Nombre" {...register("name", { required: true })} />
        <input type="number" placeholder="Altura" {...register("height", { required: true })} />
        <input type="number" placeholder="Peso" {...register("weight", { required: true })} />
        <input type="number" placeholder="Hp" {...register("hp", { required: true })} />
        <input type="number" placeholder="Ataque" {...register("attack", { required: true })} />
        <input type="number" placeholder="Defensa" {...register("defense", { required: true })} />
        <input type="number" placeholder="Velocidad" {...register("speed", { required: true })} />
        <div>
           <select {...register("type1", { required: true })}>
            {types.map((types) =>
              <option value={types.id} key={types.name}>{types.name}</option>
            )}
          </select>
          <select {...register("type2")}>
            {types.map((types) =>
              <option value={types.id} key={types.name}>{types.name}</option>
            )}
          </select> 
        </div>


        <input className="submit" type="submit" />
      </form>
    </div>

  );
}