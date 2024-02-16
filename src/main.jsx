import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { store, persistor } from './redux/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // refetchOnMount: false,
      // refetchOnWindowFocus: false,
      // refetchOnReconnect: false,
      // staleTime: 0,
      retry: 8,
      // gcTime: 100
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <PersistGate persistor={persistor}>
      <QueryClientProvider client={queryClient}>
        <App />
                                                <ReactQueryDevtools initialIsOpen={true} />
      </QueryClientProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
