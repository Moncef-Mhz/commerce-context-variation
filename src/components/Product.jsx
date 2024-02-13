import { useEffect, useState } from "react";
import { useStateContext } from "../context/StateContext";
import { product } from "../util/data";
function Product() {
  const [products, setProduct] = useState([]);
  const [checkedColor, setCheckedColor] = useState("");
  const [checkedSize, setCheckedSize] = useState("");

  const { AddToCart } = useStateContext();

  useEffect(() => {
    setProduct(product[0]);
  }, []);

  return (
    <div className="flex mx-10  h-full items-start gap-2">
      <div>
        <img
          src={products.thumbnail}
          alt=""
          className="w-[300px] rounded-md object-cover h-[300px]"
        />
      </div>
      <div className="text-white flex flex-col gap-2">
        <h1 className="text-xl">{products.title}</h1>
        <h1 className="text-xl">{products.price}$</h1>
        <p className="text-sm text-white/80">{products.description}</p>

        <h1>Color:</h1>
        <div className="flex gap-5 flex-wrap">
          {products?.colors?.map((clr) => (
            <div
              key={clr}
              className={
                checkedColor === clr
                  ? `w-10 h-10 rounded-full ${clr} cursor-pointer outline outline-1  outline-offset-1 duration-75 `
                  : `w-10 h-10 rounded-full  ${clr} cursor-pointer hover:opacity-80 `
              }
              onClick={() => setCheckedColor(clr)}
            ></div>
          ))}
        </div>
        <h1>Size:</h1>
        <div className="flex gap-5 flex-wrap">
          {products?.sizes?.map((size) => (
            <div
              key={size}
              className={
                checkedSize === size
                  ? `px-4 py-2 rounded-md  cursor-pointer border border-gray-300 duration-75 `
                  : `px-4 py-2 rounded-md   border border-gray-300/50 cursor-pointer hover:opacity-80 `
              }
              onClick={() => setCheckedSize(size)}
            >
              {size}
            </div>
          ))}
        </div>
        <button
          className="py-2 bg-zinc-50 text-black rounded-md mt-10"
          onClick={() => {
            AddToCart(products, checkedColor, checkedSize);
          }}
        >
          add to cart
        </button>
      </div>
    </div>
  );
}

export default Product;
