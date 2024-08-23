
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";


import PersonIndex from "./persons/PersonIndex";
import PersonDetail from "./persons/PersonDetail";
import PersonForm from "./persons/PersonForm";


import InvoiceIndex from "./Invoices/InvoiceIndex";
import InvoiceDetail from "./Invoices/InvoiceDetail";
import InvoiceForm from "./Invoices/InvoiceForm";

export function App() {
  return (
    <Router>
      <div className="container" style={{ backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
        <nav className="navbar navbar-expand-sm navbar-light bg-light">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/persons"} className="nav-link" style={{ fontWeight: 'bold', color: '#000000' }}>
                Osoby
              </Link>
              <Link to={"/invoices"} className="nav-link" style={{ fontWeight: 'bold',  color: '#000000' }}>
                Faktury
              </Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route index element={<Navigate to={"/persons"} />} />
          <Route path="/persons">
            <Route index element={<PersonIndex />} />
            <Route path="show/:id" element={<PersonDetail />} />
            <Route path="create" element={<PersonForm />} />
            <Route path="edit/:id" element={<PersonForm />} />
          </Route>

          <Route index element={<Navigate to={"/invoices"} />} />
          <Route path="/invoices">
            <Route index element={<InvoiceIndex />} />
            <Route path="show/:id" element={<InvoiceDetail />} />
            <Route path="create" element={<InvoiceForm />} />
            <Route path="edit/:id" element={<InvoiceForm />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
