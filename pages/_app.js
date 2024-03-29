import { DataProvider } from "@/stores/Context";
import "@/styles/globals.css";
import Layout from "@/components/shared/Layout";

export default function App({ Component, pageProps }) {
  return (
    <>
      <DataProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </DataProvider>
    </>
  );
}
