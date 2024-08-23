import React, { useEffect, useState } from "react";
import { apiGet } from "../utils/api";


const InvoiceStats = ({ type }) => {

    const [overallStats, setOverallStats] = useState({});
const [companyStats, setCompanyStats] = useState([]);

useEffect(() => {
    if (type === "overall") {
        // Fetch overall statistics
        apiGet("/api/invoices/statistics").then((data) => {
            setOverallStats(data);
        });
    } else if (type === "company") {
        // Fetch statistics for each company
        apiGet("/api/persons/statistics").then((data) => {
            setCompanyStats(data);
        });
    }
}, [type]);

if (type === "overall") {
    return (
        <div>
            <h2>Celkové Statistiky</h2>
            <ul>
                <li>Příjmy Za Tento Rok: {overallStats.currentYearSum}</li>
                <li>Celkové Příjmy: {overallStats.allTimeSum}</li>
                <li>Celkový Počet Faktur: {overallStats.invoicesCount}</li>
            </ul>
        </div>
    );
} else if (type === "company") {
    return (
        <div>
            <h2>Statistiky Všech Firem</h2>
            {companyStats.map(company => (
                <div key={company.personId}>
                    <h3>{company.personName}</h3>
                    <ul>
                        <li>Příjmy: {company.revenue}</li>
                    </ul>
                </div>
            ))}
        </div>
    );
}

return null;
};
export default InvoiceStats;

