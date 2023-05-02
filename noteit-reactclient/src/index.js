import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query' // [demo, bp] installing a query provider context

// const queryClient = new QueryClient();


// document.getElementById('root').setAttribute('data-bs-theme',"dark");
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        {/* <QueryClientProvider client={queryClient}> */}
        <App />
        {/* </QueryClientProvider> */}
    </React.StrictMode>
);