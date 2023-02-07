import { useState, useEffect } from "react";
import styles from "./index.module.css";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";

export default function Index({ initData }) {
  const [pokemon, setPokemon] = useState("");
  const [search, setSearch] = useState("");
  const [listPokemons, setListPokemons] = useState(initData);
  const [inEdition, setInEdition] = useState(false);
  const [inCreation, setInCreation] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    attack: "0",
    sprites: "",
    defense: "0",
  });

  useEffect(() => {
    if (pokemon !== "") {
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .then((res) => res.json())
        .then((data) => {
          setSearch(data);
        })
        .catch((err) => {});
    }
  }, [pokemon]);

  const handleFormChange = (e) => {
    setFormData((prevValues) => {
      return { ...prevValues, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inCreation) {
      const newPokemon = {
        id: Math.floor(Math.random() * (10000 - 2000 + 1) + 2000).toString,
        name: formData.name,
        sprites: formData.sprites,
        attack: formData.attack,
        defense: formData.defense,
      };
      setListPokemons([...listPokemons, newPokemon]);
      setInCreation(false);
    } else {
      let newListPokemons = listPokemons.map((element) => {
        let currentElement = { ...element };

        if (currentElement.id == formData.id) {
          currentElement.name = formData.name;
          currentElement.sprites = formData.sprites;
          currentElement.attack = formData.attack;
          currentElement.defense = formData.defense;
        }

        return currentElement;
      });
      setListPokemons([...newListPokemons]);
      setInEdition(false);
    }

    Object.keys(formData).forEach(function (index) {
      formData[index] = "";
    });
  };

  const addPokemon = (pokemon) => {
    const newPokemon = {
      id: pokemon.id,
      name: pokemon.name,
      sprites: pokemon.sprites.other.dream_world.front_default,
      attack: pokemon.stats[1].base_stat,
      defense: pokemon.stats[2].base_stat,
    };
    setListPokemons([...listPokemons, newPokemon]);
    setPokemon("");
    setSearch("");
  };

  const editPokemon = (pokemon) => {
    setInEdition(true);
    setFormData((prevValues) => {
      return {
        ...prevValues,
        id: pokemon.id,
        name: pokemon.name,
        sprites: pokemon.sprites,
        attack: pokemon.attack,
        defense: pokemon.defense,
      };
    });
  };

  const removePokemon = (pokemon) => {
    const newListPokemon = listPokemons.filter((item) => item.id !== pokemon);
    setListPokemons(newListPokemon);
  };

  return (
    <>
      <div className={styles.container}>
        <div>
          <h1>Listado de Pokemon</h1>
        </div>
        <div className={styles.search}>
          <form
            className={styles.inputSearch}
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="text"
              name="pokemon"
              value={pokemon}
              placeholder="Buscar"
              onChange={(e) => setPokemon(e.target.value)}
              autoComplete="off"
              role="textbox"
            />
          </form>

          {search.name && (
            <table className={styles.table} id="listPokemons">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Imagen</th>
                  <th>Ataque</th>
                  <th>Defensa</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tr>
                <td> {search.name} </td>
                <td>
                  <img
                    src={search.sprites.other.dream_world.front_default}
                    alt={search.name}
                    width={30}
                    height={30}
                    className={styles.imagen}
                  />
                </td>
                <td> {search.stats[1].base_stat} </td>
                <td> {search.stats[2].base_stat} </td>
                <td>
                  <a
                    onClick={(e) => addPokemon(search)}
                    className={styles.link}
                  >
                    <FaPlus></FaPlus>
                  </a>
                </td>
              </tr>
            </table>
          )}
        </div>

        <button
          className={styles.newButton}
          onClick={(e) => setInCreation(true)}
          role="buttonNew"
          id="buttonNew"
        >
          <FaPlus></FaPlus>Nuevo
        </button>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Imagen</th>
              <th>Ataque</th>
              <th>Defensa</th>
              <th>Acciones</th>
            </tr>
          </thead>
          {listPokemons ? (
            <tbody>
              {listPokemons.map((pokemon) => (
                <tr key={pokemon.id}>
                  <td>{pokemon.name}</td>
                  <td>
                    <img
                      src={pokemon.sprites}
                      alt={pokemon.name}
                      width={30}
                      height={30}
                      className={styles.imagen}
                    />
                  </td>
                  <td>{pokemon.attack}</td>
                  <td>{pokemon.defense}</td>
                  <td>
                    <a
                      onClick={(e) => editPokemon(pokemon)}
                      className={styles.link}
                    >
                      <FaEdit></FaEdit>
                    </a>
                    <a
                      onClick={(e) => removePokemon(pokemon.id)}
                      className={styles.link}
                    >
                      <FaTrash></FaTrash>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td colSpan="5">Loading</td>
              </tr>
            </tbody>
          )}
        </table>
        {(inEdition || inCreation) && (
          <div className={styles.addContainer}>
            <h3 className={styles.center}>
              {" "}
              {inEdition ? <>Editando a {formData.name}</> : <>Nuevo Pokemon</>}
            </h3>
            <form onSubmit={handleSubmit} aria-label="addPokemon">
              <div className={styles.addForm}>
                <div>
                  <div className={styles.addInput}>
                    <label htmlFor="name">Nombre</label>
                    <input
                      type="text"
                      onChange={handleFormChange}
                      name="name"
                      value={formData.name}
                    />
                  </div>
                  <div className={styles.addInput}>
                    <label htmlFor="sprites">Imagen</label>
                    <input
                      type="text"
                      onChange={handleFormChange}
                      name="sprites"
                      placeholder="URL"
                      value={formData.sprites}
                    />
                  </div>
                </div>
                <div>
                  <div className={styles.addInput + " slidecontainer"}>
                    <label htmlFor="name">Ataque</label>
                    <input
                      type="range"
                      min="1"
                      max="100"
                      value={formData.attack}
                      onChange={handleFormChange}
                      name="attack"
                      className="slider"
                    />
                    {formData.attack}
                  </div>
                  <div className={styles.addInput}>
                    <label htmlFor="name">Defensa</label>
                    <input
                      type="range"
                      min="1"
                      max="100"
                      value={formData.defense}
                      onChange={handleFormChange}
                      name="defense"
                      className="slider"
                    />
                    {formData.defense}
                  </div>
                </div>
              </div>
              <div className={styles.center}>
                <button className={styles.newButton} type="submit">
                  Guardar
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
}

export async function getStaticProps() {
  const getPokemons = async (porPokemon) => {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${porPokemon}?limit=10&offset=0/`
    );
    const data = await response.json();

    return data;
  };
  let pokemons = [];
  for (let i = 1; i <= 10; i++) {
    let data = await getPokemons(i);
    pokemons.push(data);
  }

  let initData = pokemons.map((pokemon) => {
    return {
      id: pokemon.id,
      name: pokemon.name,
      sprites: pokemon.sprites.other.dream_world.front_default,
      attack: pokemon.stats[1].base_stat,
      defense: pokemon.stats[2].base_stat,
    };
  });

  return {
    props: {
      initData,
    },
  };
}
