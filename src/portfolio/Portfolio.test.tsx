import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { afterEach, beforeAll, expect, it, vi } from "vitest";
import { useAppStore } from "../store/appStore";
import Portfolio from "./Portfolio";

beforeAll(() => {
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      observe() {}
      unobserve() {}
      disconnect() {}
    },
  );
});

afterEach(() => {
  cleanup();
  useAppStore.setState({ language: "fr" });
});
it("keeps the classic CV accessible and translates the narrative", async () => {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  render(
    <QueryClientProvider client={client}>
      <Portfolio />
    </QueryClientProvider>,
  );
  expect(
    await screen.findByRole("heading", { name: /Des interfaces/ }),
  ).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /CV classique/ })).toHaveAttribute(
    "href",
    "?view=cv&lang=fr",
  );
  fireEvent.click(screen.getByRole("button", { name: "English" }));
  expect(
    screen.getByRole("heading", { name: /Interfaces/ }),
  ).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /Classic résumé/ })).toHaveAttribute(
    "href",
    "?view=cv&lang=en",
  );
  expect(await screen.findByText(/Oreka/)).toBeInTheDocument();
});
