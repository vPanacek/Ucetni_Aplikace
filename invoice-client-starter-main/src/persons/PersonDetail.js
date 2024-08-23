import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiGet } from "../utils/api";
import Country from "./Country";

const PersonDetail = () => {
  const { id } = useParams();
  const [person, setPerson] = useState({});
  const [invoicesIssued, setInvoicesIssued] = useState([]);
  const [invoicesReceived, setInvoicesReceived] = useState([]);

  useEffect(() => {
    apiGet(`/api/persons/${id}`).then((data) => {
      setPerson(data);

      // Získání všech faktur a filtrování podle ID osoby
      apiGet("/api/invoices").then((invoices) => {
        setInvoicesIssued(
          invoices.filter((invoice) => invoice.seller._id === data._id)
        );
        setInvoicesReceived(
          invoices.filter((invoice) => invoice.buyer._id === data._id)
        );
      });
    });
  }, [id]);

  const country =
    Country.CZECHIA === person.country ? "Česká republika" : "Slovensko";

  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: 2, paddingRight: "20px" }}>
        <h1>Detail osoby</h1>
        <hr />
        <h3>
          {person.name} ({person.identificationNumber})
        </h3>
        <p>
          <strong>DIČ:</strong>
          <br />
          {person.taxNumber}
        </p>
        <p>
          <strong>Bankovní účet:</strong>
          <br />
          {person.accountNumber}/{person.bankCode} ({person.iban})
        </p>
        <p>
          <strong>Tel.:</strong>
          <br />
          {person.telephone}
        </p>
        <p>
          <strong>Mail:</strong>
          <br />
          {person.mail}
        </p>
        <p>
          <strong>Sídlo:</strong>
          <br />
          {person.street}, {person.city}, {person.zip}, {country}
        </p>
        <p>
          <strong>Poznámka:</strong>
          <br />
          {person.note}
        </p>
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ marginBottom: "20px" }}>
          <h4>Vystavené faktury</h4>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Číslo faktury</th>
                <th>Dodavatel</th>
                <th>Odběratel</th>
                <th>Produkt</th>
                <th>Cena</th>
              </tr>
            </thead>
            <tbody>
              {invoicesIssued.map((invoice, index) => (
                <tr key={index}>
                  <td>{invoice.invoiceNumber}</td>
                  <td>{invoice.seller.name}</td>
                  <td>{invoice.buyer.name}</td>
                  <td>{invoice.product}</td>
                  <td>{invoice.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <h4>Přijaté faktury</h4>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Číslo faktury</th>
                <th>Dodavatel</th>
                <th>Odběratel</th>
                <th>Produkt</th>
                <th>Cena</th>
              </tr>
            </thead>
            <tbody>
              {invoicesReceived.map((invoice, index) => (
                <tr key={index}>
                  <td>{invoice.invoiceNumber}</td>
                  <td>{invoice.seller.name}</td>
                  <td>{invoice.buyer.name}</td>
                  <td>{invoice.product}</td>
                  <td>{invoice.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PersonDetail;
