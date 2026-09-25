import { useState } from "react";
import Layout from "../components/Layout";
import TileGrid from "../components/TileGrid";
import "./Homepage.css";

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function Homepage() {
  const [reducedMotion] = useState(prefersReducedMotion);

  return (
    <Layout>
      <TileGrid instant={reducedMotion} />
    </Layout>
  );
}
