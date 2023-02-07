const request = require("supertest");
describe("services => Pokemon API", () => {
  it("Get list of pokemons", async () => {
    const response = await request("https://pokeapi.co/").get(
      "api/v2/pokemon/1"
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.error).toBe(undefined);
  });
});
