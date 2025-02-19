import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.tsx'
import Login from './pages/Login.tsx'
import { store } from './state/store.ts'
import { Provider } from 'react-redux'
import Home from './pages/Home.tsx'
import WishList from './pages/WishList.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/wishlist',
        element: <WishList />
      }
    ]
  }
])
createRoot(document.getElementById('root')!).render(
  <StrictMode><Provider store={store}>
    <RouterProvider router={router}>

    </RouterProvider>
  </Provider>

  </StrictMode>,
)
