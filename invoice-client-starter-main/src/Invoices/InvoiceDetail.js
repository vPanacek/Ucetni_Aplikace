import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {apiGet} from "../utils/api";


const InvoiceDetail = () => {
    const {id} = useParams();
    const [invoice, setInvoice] = useState({});
    const [seller, setSeller] = useState({});
    const [buyer, setBuyer] = useState({});

    useEffect(() => {
        // Načtení detailů faktury
        apiGet("/api/invoices/" + id).then((data) => {
            setInvoice(data);

          setSeller(data.seller);
          setBuyer(data.buyer)
        });
    }, [id]);
   
    
    return (
        <>
            <div>
                <h1>Detail Faktury</h1>
                <hr/>
                <h3>Faktura č: ({invoice.invoiceNumber})</h3>


                <p>
                    <strong>Dodavatel:</strong>
                    <br/>
                    {seller.name}
                </p>
                <p>
                    <strong>Odběratel</strong>
                    <br/>
                    {buyer.name}
                </p>
                <p>
                    <strong>Vystaveno:</strong>
                    <br/>
                    {invoice.issued}
                </p>
                <p>
                    <strong>Platba Do:</strong>
                    <br/>
                    {invoice.dueDate}
                </p>
                <p>
                    <strong>Produkt:</strong>
                    <br/>
                    {invoice.product}
                </p>
                <p>
                    <strong>Cena:</strong>
                    <br/>
                    {invoice.price}
                </p>
                <p>
                    <strong>Vat:</strong>
                    <br/>
                    {invoice.vat}
                </p>
                <p>
                    <strong>Poznámka:</strong>
                    <br/>
                    {invoice.note}
                </p>
            </div>
        </>
    );
};

export default InvoiceDetail;
