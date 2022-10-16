import Image from "next/image"
import {
  MenuIcon,
  SearchIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline"

import { signIn, signOut, useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useSelector } from "react-redux"
import { selectItems } from "../slices/basketSlice"

const Header = () => {
  const { data: session } = useSession()
  const router = useRouter()

  //redux part to access the values from the basketSlice

  const items = useSelector(selectItems)
  return (
    <header>
      {/* Top nav */}

      <div className="flex bg-amazon_blue py-2 items-center p-1 flex-grow">
        <div className="mt-2 flex items-center flex-grow sm:flex-grow-0">
          <Image
            onClick={() => router.push("/")}
            src="https://links.papareact.com/f90"
            width={150}
            height={40}
            objectFit="contain"
            className="cursor-pointer"
          />
        </div>

        {/* searchInput */}

        <div className="hidden sm:flex items-center flex-grow h-10 rounded-md cursor-pointer bg-yellow-400 hover:bg-yellow-500">
          <input
            type="text"
            className="p-2 h-full w-6 flex-grow rounded-l-md flex-shrink px-4 focus:outline-none"
          />
          <SearchIcon className="h-12 p-4" />
        </div>

        {/* right */}

        <div className="text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap">
          <div onClick={!session ? signIn : signOut} className="link">
            <p>{session ? `Hello, ${session.user.name}` : "SingIn"}</p>
            <p className="font-extrabold md:text-sm">Accounts & Lists</p>
          </div>
          <div className="link">
            <p>Returns</p>
            <p className="font-extrabold md:text-sm">& Orders</p>
          </div>
          <div
            onClick={() => router.push("/checkout")}
            className="link relative flex items-center"
          >
            <span className="absolute top-0 right-0 md:right-10  h-4 w-4 bg-yellow-400 text-center text-black font-bold rounded-full">
              {items.length ? `${items.length}` : 0}
            </span>
            <ShoppingCartIcon className="h-10" />
            <p className="hidden md:inline font-extrabold md:text-sm  mt-2">
              Basket
            </p>
          </div>
        </div>
      </div>

      {/* Bottom nav  */}
      <div className="flex text-sm space-x-3 p-2 pl-6 items-center bg-amazon_blue-light text-white ">
        <p className="link flex items-center">
          <MenuIcon className="h-6 mr-1" />
          All
        </p>
        <p className="link">Prime Video</p>
        <p className="link">Amazon Business</p>
        <p className="link">Today's Deals</p>
        <p className="link hidden lg:inline-flex">Electonics</p>
        <p className="link hidden lg:inline-flex">Food & Grocery</p>
        <p className="link hidden lg:inline-flex">Prime</p>
        <p className="link hidden lg:inline-flex">Buy Again</p>
        <p className="link hidden lg:inline-flex">Shopper Toolkit</p>
        <p className="link hidden lg:inline-flex">Health & Personal Care</p>
      </div>

      <div></div>
    </header>
  )
}

export default Header
