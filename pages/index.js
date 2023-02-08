import { useState, useEffect } from "react";
import styles from "./index.module.css";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";
import {
  getPokemonsByAuthorApi,
  createPokemonApi,
  updatePokemonApi,
} from "../services/api";

export default function Index({ initData }) {
  const [author, setAuthor] = useState("");
  const [search, setSearch] = useState("");
  const [listPokemons, setListPokemons] = useState(initData);
  const [inEdition, setInEdition] = useState(false);
  const [inCreation, setInCreation] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    attack: "0",
    image: "",
    defense: "0",
  });

  useEffect(() => {
    if (author !== "") {
      searchPokemons(author);
    }
  }, [author]);

  const searchPokemons = async (author) => {
    const searchResponse = await getPokemonsByAuthorApi(author);
    setListPokemons(searchResponse);
  };

  const handleFormChange = (e) => {
    setFormData((prevValues) => {
      return { ...prevValues, [e.target.name]: e.target.value };
    });
  };

  const handleReset = (e) => {
    e.preventDefault();
    setFormData({ id: "", name: "", attack: "0", image: "", defense: "0" });
    setInCreation(false);
    setInEdition(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inCreation) {
      const newPokemon = {
        id: Math.floor(Math.random() * (10000 - 2000 + 1) + 2000).toString,
        name: formData.name,
        image: formData.image,
        attack: formData.attack,
        defense: formData.defense,
        hp: 55,
        type: "Legendario",
        idAuthor: 23,
      };
      const addResponse = await createPokemonApi(newPokemon);
      setListPokemons(addResponse);
      setInCreation(false);
    } else {
      const newData = {
        name: formData.name,
        image: formData.image,
        attack: formData.attack,
        defense: formData.defense,
        hp: 55,
        type: "Legendario",
        idAuthor: 23,
      };
      const updateResponse = await updatePokemonApi(formData.id, newData);
      setListPokemons(updateResponse);
      setInEdition(false);
    }

    Object.keys(formData).forEach(function (index) {
      formData[index] = "";
    });
  };

  const deletePokemon = async (idPokemon) => {
    const url =
      "https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/pkm-msa-evaluation/pokemon/" +
      idPokemon;
    const addResponse = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    })
      .then((response) => {
        return getPokemonsByAuthorApi();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    setListPokemons(addResponse);
  };

  const addPokemon = (pokemon) => {
    const newPokemon = {
      id: pokemon.id,
      name: pokemon.name,
      image: pokemon.image.other.dream_world.front_default,
      attack: pokemon.stats[1].base_stat,
      defense: pokemon.stats[2].base_stat,
    };
    setListPokemons([...listPokemons, newPokemon]);
    setAuthor("");
    setSearch("");
  };

  const editPokemon = (pokemon) => {
    setInEdition(true);
    setFormData((prevValues) => {
      return {
        ...prevValues,
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.image,
        attack: pokemon.attack,
        defense: pokemon.defense,
      };
    });
  };

  return (
    <>
      <div className={styles.container}>
        <div>
          <h1>Listado de Pokemon</h1>
        </div>
        <div className={styles.formContainer}>
          <div className={styles.search}>
            <form
              className={styles.inputSearch}
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="text"
                name="author"
                value={author}
                placeholder="Buscar pokemones por ID de autor"
                onChange={(e) => setAuthor(e.target.value)}
                autoComplete="off"
                role="textbox"
              />
            </form>

            {search.name && (
              <div>
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
                        src={search.image.other.dream_world.front_default}
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
              </div>
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
        </div>
        <div>
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
                        src={pokemon.image}
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
                        onClick={(e) => deletePokemon(pokemon.id)}
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
        </div>
        {(inEdition || inCreation) && (
          <div className={styles.addContainer}>
            <h3 className={styles.center}>
              {" "}
              {inEdition ? <>Editando a {formData.name}</> : <>Nuevo Pokemon</>}
            </h3>
            <form
              onSubmit={handleSubmit}
              onReset={handleReset}
              aria-label="addPokemon"
            >
              <div className={styles.addForm}>
                <div>
                  <div className={styles.addInput}>
                    <label htmlFor="name">Nombre:</label>
                    <input
                      type="text"
                      onChange={handleFormChange}
                      name="name"
                      value={formData.name}
                    />
                  </div>
                  <div className={styles.addInput}>
                    <label htmlFor="image">Imagen:</label>
                    <input
                      type="text"
                      onChange={handleFormChange}
                      name="image"
                      placeholder="URL"
                      value={formData.image}
                    />
                  </div>
                </div>
                <div>
                  <div className={styles.addInput + " slidecontainer"}>
                    <label htmlFor="name">Ataque: </label>
                    <div className={styles.tooltip}>
                      <span>0</span>
                      <input
                        type="range"
                        min="1"
                        max="100"
                        value={formData.attack}
                        onChange={handleFormChange}
                        name="attack"
                        className="slider"
                      />
                      <span>100</span>
                      <span className={styles.tooltiptext}>
                        {formData.attack}
                      </span>
                    </div>
                  </div>
                  <div className={styles.addInput}>
                    <label htmlFor="name">Defensa: </label>
                    <div className={styles.tooltip}>
                      <span>0</span>
                      <input
                        type="range"
                        min="1"
                        max="100"
                        value={formData.defense}
                        onChange={handleFormChange}
                        name="defense"
                        className="slider"
                      />
                      <span>100</span>
                      <span className={styles.tooltiptext}>
                        {formData.defense}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.center}>
                <button className={styles.newButton} type="submit">
                  Guardar
                </button>
                <input
                  type="reset"
                  value="Cancelar"
                  className={styles.newButton}
                ></input>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
}

export async function getStaticProps() {
  let initData = await getPokemonsByAuthorApi();

  return {
    props: {
      initData,
    },
  };
}
