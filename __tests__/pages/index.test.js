import React from "react";
import user from "@testing-library/user-event";
import {
  fireEvent,
  render,
  screen,
  act,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom";

import Index from "pages/index";

jest.mock("next/router", () => ({
  push: jest.fn(),
  query: "",
}));

beforeEach(() => {
  render(<Index />);
});

describe("/ => Landing Page Unit Tests", () => {
  it("Render table list of pokemons", () => {
    const table = screen.getByRole("table", {
      id: /listPokemons/i,
    });
    expect(table).toBeInTheDocument();
  });

  it("Render search input", () => {
    const serachInput = screen.getByRole("textbox", {
      id: /pokemon/i,
    });
    expect(serachInput).toBeInTheDocument();
  });

  it("Render add form", async () => {
    const buttonNew = screen.getByRole("buttonNew", {
      id: /buttonNew/i,
    });

    await act(async () => {
      await fireEvent.click(buttonNew);
    });
    const form = screen.getByRole("form", {
      id: /addPokemon/i,
    });
    expect(form).toBeInTheDocument();
  });
});
