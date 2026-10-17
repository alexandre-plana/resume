import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { DesignLab, MaritimeLab, WorkflowLab } from "./Labs";

afterEach(cleanup);
describe("interactive laboratories", () => {
  it("selects a vessel and changes the replay time", () => {
    render(<MaritimeLab language="fr" paused />);
    fireEvent.click(
      screen.getByRole("button", { name: "Sélectionner NEREIS" }),
    );
    expect(screen.getByTestId("vessel-detail")).toHaveTextContent("NEREIS");
    fireEvent.change(screen.getByLabelText("Rejeu temporel"), {
      target: { value: "60" },
    });
    expect(screen.getByTestId("replay-time")).toHaveTextContent("01:00");
  });
  it("changes component state and theme", () => {
    render(<DesignLab language="fr" paused />);
    fireEvent.click(screen.getByRole("button", { name: "Thème sombre" }));
    expect(screen.getByTestId("design-preview")).toHaveAttribute(
      "data-theme",
      "dark",
    );
    fireEvent.click(screen.getByRole("switch", { name: "Notifications" }));
    expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "false");
    fireEvent.click(screen.getByRole("button", { name: /Enregistrer/ }));
    expect(screen.getByText("Modifications enregistrées")).toBeInTheDocument();
  });
  it("runs a correction loop then resets the execution", () => {
    render(<WorkflowLab language="fr" paused />);
    for (let i = 0; i < 7; i++)
      fireEvent.click(screen.getByRole("button", { name: "Étape suivante" }));
    expect(screen.getByRole("status")).toHaveTextContent("Accepté");
    fireEvent.click(screen.getByRole("button", { name: "Réinitialiser" }));
    expect(screen.getByRole("status")).toHaveTextContent("Prêt");
    fireEvent.click(screen.getByLabelText("Simuler un écart"));
    for (let i = 0; i < 4; i++)
      fireEvent.click(screen.getByRole("button", { name: "Étape suivante" }));
    expect(screen.getByRole("status")).toHaveTextContent("Accepté");
  });
});
