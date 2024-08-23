package cz.itnetwork.service;

import cz.itnetwork.dto.InvoiceDTO;
import cz.itnetwork.dto.InvoiceStatisticsDTO;
import cz.itnetwork.entity.Filter;

import java.util.List;

public interface InvoiceService {

    InvoiceDTO addInvoice(InvoiceDTO invoiceDTO);


    void removeInvoice(Long id);


    List<InvoiceDTO> getAll(Filter filter);

    InvoiceDTO getInvoiceById(long id);

    InvoiceDTO updateInvoice(long id, InvoiceDTO invoiceDTO);


    List<InvoiceDTO> getInvoiceBySeller(String identificationNumber);

    List<InvoiceDTO> getInvoiceByBuyer(String identificationNumber);

    InvoiceStatisticsDTO getInvoiceStatistics();


}
