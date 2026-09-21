import { createEvent, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import MovieForm from "./MovieForm";

function setup() {
  const onAddMovie = vi.fn();
  const user = userEvent.setup();
  render(<MovieForm onAddMovie={onAddMovie} />);

  return {
    user,
    onAddMovie,
    input: screen.getByRole("textbox", { name: "Movie or show title" }),
    button: screen.getByRole("button", { name: /add to list/i }),
  };
}

describe("MovieForm", () => {
  it("renders a labeled, empty input and an enabled submit button", () => {
    const { input, button, onAddMovie } = setup();

    expect(input).toHaveValue("");
    expect(input).toHaveAttribute("placeholder", "Example: The Dark Knight");
    expect(button).toHaveAttribute("type", "submit");
    expect(button).toBeEnabled();
    expect(onAddMovie).not.toHaveBeenCalled();
  });

  it("updates the input as the user types without adding a movie", async () => {
    const { user, input, onAddMovie } = setup();

    await user.type(input, "The Dark Knight");

    expect(input).toHaveValue("The Dark Knight");
    expect(onAddMovie).not.toHaveBeenCalled();
  });

  it.each([
    ["a movie title", "The Dark Knight", "The Dark Knight"],
    ["a show title", "Breaking Bad", "Breaking Bad"],
    ["surrounding spaces", "   Arrival   ", "Arrival"],
    ["internal spaces", "  Spider-Man:  No Way Home  ", "Spider-Man:  No Way Home"],
    ["a single character", "X", "X"],
    ["a numeric title", "1917", "1917"],
    ["Unicode and punctuation", "  Amélie — 千と千尋 🎬!  ", "Amélie — 千と千尋 🎬!"],
  ])("submits %s once and clears the input", async (_case, value, expected) => {
    const { user, input, button, onAddMovie } = setup();

    await user.type(input, value);
    await user.click(button);

    expect(onAddMovie).toHaveBeenCalledExactlyOnceWith(expected);
    expect(input).toHaveValue("");
  });

  it("submits the trimmed title when Enter is pressed", async () => {
    const { user, input, onAddMovie } = setup();

    await user.type(input, "  Dune  {Enter}");

    expect(onAddMovie).toHaveBeenCalledExactlyOnceWith("Dune");
    expect(input).toHaveValue("");
  });

  it.each([
    ["an empty value", ""],
    ["spaces only", "     "],
    ["tabs only", "\t\t"],
    ["Unicode whitespace only", "\u00a0\u2003\u00a0"],
  ])("rejects %s without clearing or calling the callback", async (_case, value) => {
    const { user, input, button, onAddMovie } = setup();

    // Change events allow tabs/Unicode whitespace without keyboard navigation.
    fireEvent.change(input, { target: { value } });
    await user.click(button);

    expect(onAddMovie).not.toHaveBeenCalled();
    expect(input).toHaveValue(value);
  });

  it("rejects a whitespace-only title submitted with Enter", async () => {
    const { user, input, onAddMovie } = setup();

    await user.type(input, "   {Enter}");

    expect(onAddMovie).not.toHaveBeenCalled();
    expect(input).toHaveValue("   ");
  });

  it("trims mixed surrounding whitespace without changing internal whitespace", async () => {
    const { user, input, button, onAddMovie } = setup();
    fireEvent.change(input, { target: { value: "\t\u00a0Dune\tPart Two\u2003 " } });

    await user.click(button);

    expect(onAddMovie).toHaveBeenCalledExactlyOnceWith("Dune\tPart Two");
    expect(input).toHaveValue("");
  });

  it("submits a long title without truncating it", async () => {
    const { user, input, button, onAddMovie } = setup();
    const title = "A".repeat(1000);
    await user.click(input);
    await user.paste(title);

    await user.click(button);

    expect(onAddMovie).toHaveBeenCalledExactlyOnceWith(title);
    expect(input).toHaveValue("");
  });

  it("uses the edited title rather than a previously entered value", async () => {
    const { user, input, button, onAddMovie } = setup();
    await user.type(input, "Old title");
    await user.clear(input);
    await user.type(input, "New title");

    await user.click(button);

    expect(onAddMovie).toHaveBeenCalledExactlyOnceWith("New title");
    expect(input).toHaveValue("");
  });

  it("accepts a valid title after a rejected submission", async () => {
    const { user, input, button, onAddMovie } = setup();
    await user.type(input, "   ");
    await user.click(button);
    expect(onAddMovie).not.toHaveBeenCalled();

    await user.clear(input);
    await user.type(input, "Arrival");
    await user.click(button);

    expect(onAddMovie).toHaveBeenCalledExactlyOnceWith("Arrival");
    expect(input).toHaveValue("");
  });

  it("does not resubmit the previous title after the input is reset", async () => {
    const { user, input, button, onAddMovie } = setup();
    await user.type(input, "Arrival");
    await user.click(button);
    await user.click(button);

    expect(onAddMovie).toHaveBeenCalledExactlyOnceWith("Arrival");
    expect(input).toHaveValue("");
  });

  it("supports successive submissions with independent titles", async () => {
    const { user, input, button, onAddMovie } = setup();
    await user.type(input, "Arrival");
    await user.click(button);
    expect(input).toHaveValue("");

    await user.type(input, "  Dune  ");
    await user.click(button);

    expect(onAddMovie).toHaveBeenCalledTimes(2);
    expect(onAddMovie).toHaveBeenNthCalledWith(1, "Arrival");
    expect(onAddMovie).toHaveBeenNthCalledWith(2, "Dune");
    expect(input).toHaveValue("");
  });

  it.each(["", "   ", "Arrival"])(
    "prevents native form submission for %j",
    (value) => {
      const { input, button, onAddMovie } = setup();
      fireEvent.change(input, { target: { value } });
      // A cancelable event checks navigation prevention, which jsdom cannot display.
      const event = createEvent.submit(button.form, { cancelable: true });

      fireEvent(button.form, event);

      expect(event.defaultPrevented).toBe(true);
      if (value.trim()) {
        expect(onAddMovie).toHaveBeenCalledExactlyOnceWith(value);
        expect(input).toHaveValue("");
      } else {
        expect(onAddMovie).not.toHaveBeenCalled();
        expect(input).toHaveValue(value);
      }
    },
  );
});
