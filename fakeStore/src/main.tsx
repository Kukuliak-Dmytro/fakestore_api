import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.tsx'
import Login from './pages/Login.tsx'
import { store } from './state/store.ts'
import { Provider } from 'react-redux'
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <h1>Home</h1>
      },
      {
        path: '/login',
        element: <Login />
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
