import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {apiGet, apiPost, apiPut} from "../utils/api";

import InputField from "../components/InputField";
import FlashMessage from "../components/FlashMessage";


const InvoiceForm = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [invoice, setInvoice] = useState({
        invoiceNumber: "",
        seller: { name: "" }, 
        buyer: { name: "" }, 
        issued: "",
        dueDate: "",
        product: "",
        price: "",
        vat: "",
        note: ""
      });
    const [sentState, setSent] = useState(false);
    const [successState, setSuccess] = useState(false);
    const [errorState, setError] = useState(null);
    const [flashMessage, setFlashMessage] = useState(null);
    

    useEffect(() => {
        if (id) {
            apiGet("/api/invoices/" + id).then((data) => {
                setInvoice(data);
            });
        }
      
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        (id ? apiPut("/api/invoices/" + id, invoice) : apiPost("/api/invoices", invoice))
            .then((data) => {
                setSent(true);
                setSuccess(true);
                navigate("/invoices");
                setFlashMessage({ theme: "success", text: "Faktura byla úspěšně uložena." });            })
            .catch((error) => {
                console.log(error.message);
                setError(error.message);
                setSent(true);
                setSuccess(false);
            });
    };

    const sent = sentState;
    const success = successState;


    return (
        <div>
            <h1>{id ? "Upravit" : "Vytvořit"} Faktury</h1>
            <hr/>
            {errorState ? (
                <div className="alert alert-danger">{errorState}</div>
            ) : null}
            <form onSubmit={handleSubmit}>
                <InputField
                    required={true}
                    type="text"
                    name="invoiceNumber"
                    min="3"
                    label="číslo Faktury"
                    prompt="Zadejte celé číslo"
                    value={invoice.invoiceNumber}
                    handleChange={(e) => {
                        setInvoice({...invoice, invoiceNumber: e.target.value});
                    }}
                />
                <InputField
  required={true}
  type="text"
  name="seller"
  label="Dodavatel"
  prompt="Zadejte dodavatele"
  value={invoice.seller.name}
  handleChange={(e) => {
    setInvoice({...invoice, seller: {name: e.target.value}});
  }}
/>
<InputField
  required={true}
  type="text"
  name="buyer"
  label="Odběratel"
  prompt="Zadejte odběratele"
  value={invoice.buyer.name}
  handleChange={(e) => {
    setInvoice({...invoice, buyer: {name: e.target.value}});
  }}
/>
                <InputField
                    required={true}
                    type="text"
                    name="issued"
                    min="3"
                    label="Vystaveno"
                    prompt="Zadejte issued"
                    value={invoice.issued}
                    handleChange={(e) => {
                        setInvoice({...invoice, issued: e.target.value});
                    }}
                />
                <InputField
                    required={true}
                    type="text"
                    name="dueDate"
                    min="3"
                    label="Zaplatit nejpozději do"
                    prompt="Zadejte dueDate"
                    value={invoice.dueDate}
                    handleChange={(e) => {
                        setInvoice({...invoice, dueDate: e.target.value});
                    }}
                />
                <InputField
                    required={true}
                    type="text"
                    name="product"
                    min="3"
                    label="Produkt"
                    prompt="Zadejte product"
                    value={invoice.product}
                    handleChange={(e) => {
                        setInvoice({...invoice, product: e.target.value});
                    }}
                />
                <InputField
                    required={true}
                    type="text"
                    name="price"
                    min="3"
                    label="Cena"
                    prompt="Zadejte price"
                    value={invoice.price}
                    handleChange={(e) => {
                        setInvoice({...invoice, price: e.target.value});
                    }}
                />
                <InputField
                    required={true}
                    type="text"
                    name="vat"
                    min="1"
                    label="VAT"
                    prompt="Zadejte vat"
                    value={invoice.vat}
                    handleChange={(e) => {
                        setInvoice({...invoice, vat: e.target.value});
                    }}
                />
                <InputField
                    required={true}
                    type="text"
                    name="note"
                    label="Poznámka"
                    value={invoice.note}
                    handleChange={(e) => {
                        setInvoice({...invoice, note: e.target.value});
                    }}
                />

<input type="submit" className="btn btn-primary" value="Uložit"/>
            </form>
        </div>
        );
    };
    export default InvoiceForm;

