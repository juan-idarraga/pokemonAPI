const URL =
  "https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/pkm-msa-evaluation/pokemon/";
const AUTHOR = "23";

export const getPokemonsByAuthorApi = async (idAuthor) => {
  const urlGetPokemon = idAuthor
    ? URL + "?idAuthor=" + idAuthor
    : URL + "?idAuthor=" + AUTHOR;
  const getData = await fetch(urlGetPokemon)
    .then((response) => response.json())
    .then((data) => data)
    .catch((rejected) => {
      console.log(rejected);
    });
  return await getData;
};

export const createPokemonApi = async (newPokemon) => {
  const addResponse = fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPokemon),
  })
    .then((response) => response.json())
    .then((data) => {
      return getPokemonsByAuthorApi();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  return await addResponse;
};

export const updatePokemonApi = async (id, newData) => {
  const urlUpdate = URL + id;
  const updateResponse = fetch(urlUpdate, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newData),
  })
    .then((response) => response.json())
    .then((data) => {
      return getPokemonsByAuthorApi();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  return await updateResponse;
};

export const deletePokemonApi = async (id) => {
  const urlDelete = URL + id;
  const deleteResponse = fetch(urlDelete, {
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
  return await deleteResponse;
};
