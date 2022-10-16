import { Provider } from "react-redux"
import { store } from "../app/store"
import "../styles/globals.css"
import { SessionProvider as AuthProvider } from "next-auth/react"
import nprogress from "nprogress"
import Router from "next/router"

nprogress.configure({ showSpinner: false })
Router.events.on("routeChangeStart", () => nprogress.start())
Router.events.on("routeChangeComplete", () => nprogress.done())
Router.events.on("routeChangeError", () => nprogress.done())

const MyApp = ({ Component, pageProps }) => {
  return (
    <AuthProvider session={pageProps.session}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </AuthProvider>
  )
}

export default MyApp
