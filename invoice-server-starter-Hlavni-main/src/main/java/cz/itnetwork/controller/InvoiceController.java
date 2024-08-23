package cz.itnetwork.controller;



import cz.itnetwork.dto.InvoiceDTO;
import cz.itnetwork.dto.InvoiceStatisticsDTO;
import cz.itnetwork.entity.Filter;
import cz.itnetwork.service.InvoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class InvoiceController {

    @Autowired
    private InvoiceService invoiceService;


    // přidání faktury
    @PostMapping("/invoices")
    public InvoiceDTO addInvoice(@RequestBody InvoiceDTO invoiceDTO) {
        return invoiceService.addInvoice(invoiceDTO);
    }

    // vypsání faktury
    @GetMapping({"/invoices", "/invoices/"})
    public List<InvoiceDTO> getAllInvoices(Filter filter) {
        return invoiceService.getAll(filter);
    }

    // smazání faktury
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/invoices/{invoiceId}")
    public void deleteInvoice(@PathVariable Long invoiceId) {
        invoiceService.removeInvoice(invoiceId);
    }


    // vyhledání faktury podle ID
    @GetMapping("/invoices/{invoiceId}")
    public InvoiceDTO getInvoiceById(@PathVariable Long invoiceId) {
        return invoiceService.getInvoiceById(invoiceId);
    }


    //vyhledání faktury podle prodejce
    @GetMapping("/identification/{identificationNumber}/sales")
    public List<InvoiceDTO> getInvoiceBySeller(@PathVariable String identificationNumber) {
        return invoiceService.getInvoiceBySeller(identificationNumber);
    }


    //vyhledání faktury podle kupce
    @GetMapping("/identification/{identificationNumber}/purchases")
    public List<InvoiceDTO> getInvoiceByBuyer(@PathVariable String identificationNumber) {
        return invoiceService.getInvoiceByBuyer(identificationNumber);
    }

    // upravení faktury
    @PutMapping("/invoices/{invoiceId}")
    public InvoiceDTO updateInvoice(@PathVariable long invoiceId, @RequestBody InvoiceDTO invoiceDTO) {
        return invoiceService.updateInvoice(invoiceId, invoiceDTO);
    }

    // statistiky faktur
    @GetMapping("/invoices/statistics")
    public InvoiceStatisticsDTO getInvoiceStatistics() {
        return invoiceService.getInvoiceStatistics();
    }

}
