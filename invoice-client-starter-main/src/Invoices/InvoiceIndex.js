import React, {useEffect, useState} from "react";
import {apiDelete, apiGet} from "../utils/api";

import InvoiceTable from "./InvoiceTable";
import Filter from "./Filter";
import InvoiceStats from "./InvoiceStats";
import FlashMessage from "../components/FlashMessage";


const InvoiceIndex = (props) => {
    const [flashMessage, setFlashMessage] = useState(null);
    const [invoices, setInvoices] = useState([]);
    const [personListState, setPersonList] = useState([]);
    const[productListState, setProductList] = useState([]);
    const [showOverallStats, setShowOverallStats] = useState(false);
    const [showCompanyStats, setShowCompanyStats] = useState(false);
    const [filter, setFilter] = useState({
        buyerId: "",
        sellerId: "",
        product: undefined,
        minPrice: undefined,
        maxPrice: undefined,
        limit: undefined,
    });

    const deleteInvoice = async (id) => {
            await apiDelete("/api/invoices/" + id);
        setInvoices(invoices.filter((item) => item._id !== id));
        setFlashMessage({ theme: "success", text: "Faktura byla úspěšně smazána." });
    };

    useEffect(() => {
        apiGet('/api/persons').then((data) => setPersonList(data));
        apiGet('/api/invoices').then((data) => setInvoices(data));
        apiGet('/api/invoices').then((data) => setProductList(data));
            
    }, []);


    
    const handleChange = (e) => {
       
        if (e.target.value === "false" || e.target.value === "true" || e.target.value === '') {
            setFilter(prevState => {
                return {...prevState, [e.target.name]: undefined}
            });
        } else {
            setFilter(prevState => {
                return { ...prevState, [e.target.name]: e.target.value}
            });
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const params = filter;
    
        const data = await apiGet("/api/invoices", params);
        setInvoices(data);
    };
    const toggleOverallStats = () => {
        setShowOverallStats(!showOverallStats);
        if (showCompanyStats) setShowCompanyStats(false); // schová company staty
    };

    const toggleCompanyStats = () => {
        setShowCompanyStats(!showCompanyStats);
        if (showOverallStats) setShowOverallStats(false); // schová celkové staty
    };


    return (
        <div>
            <h1>Seznam faktur</h1>
            <hr />
            {flashMessage && (
                <FlashMessage
                    theme={flashMessage.theme}
                    text={flashMessage.text}
                />
            )}

            <Filter
                 handleChange={handleChange}
                 handleSubmit={handleSubmit}
                 personList={personListState} 
                 productList={productListState}
                 filter={filter}
                 confirm="Použít filtr"
            />

<hr />
            <div className="btn-group mb-3 float-right">
                <button onClick={toggleOverallStats} className="btn btn-primary">
                    {showOverallStats ? "Schovat" : "Celkové Statistiky"}
                </button>
                <button onClick={toggleCompanyStats} className="btn btn-primary">
                    {showCompanyStats ? "Schovat" : "Statistiky Firem"}
                </button>
            </div>

            {showOverallStats && <InvoiceStats type="overall" />} {/* ukaž celkové staty */}
            {showCompanyStats && <InvoiceStats type="company" />} {/* ukaž celkové staty */}

            <hr />
            <hr />
            <InvoiceTable
                deleteInvoice={deleteInvoice}
                items={invoices}
                label="Počet faktur:"
            />
        </div>
    );
};
export default InvoiceIndex;
