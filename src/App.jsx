import Cart from "./components/Cart";
import Product from "./components/Product";
import { useStateContext } from "./context/StateContext";

function App() {
  const { cartItems, setShowCart } = useStateContext();
  return (
    <>
      <div className="m-10 h-16 flex items-center justify-between relative">
        <h1 className="text-white text-lg">Store</h1>
        <button
          className="px-4 py-2 rounded-md bg-zinc-200 shadow-md"
          onClick={() => setShowCart(true)}
        >
          Cart ({cartItems.length})
        </button>
        <Cart />
      </div>
      <Product />
    </>
  );
}

export default App;
