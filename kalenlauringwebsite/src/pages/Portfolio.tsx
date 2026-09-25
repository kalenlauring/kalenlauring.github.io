import Layout from "../components/Layout";
import TileGrid from "../components/TileGrid";
import { portfolioPage } from "../data/homepage";

export default function Portfolio() {
  return (
    <Layout>
      <TileGrid page={portfolioPage} />
    </Layout>
  );
}
