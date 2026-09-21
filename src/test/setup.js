import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// Explicit cleanup keeps each test isolated without relying on global hooks.
afterEach(cleanup);
