import { Provider } from 'react-redux';
import { Poppins } from "next/font/google";
import { store } from '../store/index';
import Layout from '../components/common/Layout';
import '../styles/globals.css';
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});
export default function App({ Component, pageProps }) {
  return (
        <div className={`${poppins.variable} ${poppins.className}`}>

    <Provider store={store}>
      <Layout >
        <Component {...pageProps} />
      </Layout>
    </Provider>
    </div>
  );
}