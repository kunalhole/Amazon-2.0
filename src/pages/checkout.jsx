import { useSession } from "next-auth/react"
import Image from "next/image"
import { useSelector } from "react-redux"
import CheckOutProduct from "../components/CheckOutProduct"
import Header from "../components/Header"
import Product from "../components/Product"

import Currency from "react-currency-formatter"
import { selectItems, selectTotal } from "../slices/basketSlice"

const Checkout = () => {
  const items = useSelector(selectItems)
  const { data: session } = useSession()
  const total = useSelector(selectTotal)

  return (
    <div className="bg-gray-100">
      <Header />
      <main className="lg:flex max-w-screen-2xl mx-auto">
        {/* Left Section */}

        <div className="flex-grow m-5 shadow-sm">
          <Image
            src="https://links.papareact.com/ikj"
            width={1020}
            height={250}
            objectFit="contain"
          />
          <div className="flex flex-col p-5 bg-white space-y-10 ">
            <h1 className="text-3xl border-b pb-4">
              {items.length === 0
                ? "Your Amazon Basket is empty."
                : "Your Shopping Basket"}
            </h1>

            {items.map((item, i) => (
              <CheckOutProduct
                key={i}
                id={item.id}
                title={item.title}
                price={item.price}
                description={item.description}
                image={item.image}
                category={item.category}
                rating={item.rating}
                hasPrime={item.hasPrime}
              />
            ))}
          </div>
        </div>

        {/* Right Section */}

        <div className="flex flex-col bg-white p-10 shadow-md">
          {items.length > 0 && (
            <>
              <h2 className="whitespace-nowrap">
                SubTotal ({items.length} items):{" "}
                <span className="font-bold">
                  <Currency quantity={total} currency="INR" />
                </span>
              </h2>
              <button
                disabled={!session}
                className={`button mt-2 ${
                  !session &&
                  "from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed"
                }`}
              >
                {!session ? "Sign in to Checkout" : "Proceed to checkout"}
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  )
}

export default Checkout
