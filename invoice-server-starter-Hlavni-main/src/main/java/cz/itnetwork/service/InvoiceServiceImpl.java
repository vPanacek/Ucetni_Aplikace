package cz.itnetwork.service;


import cz.itnetwork.dto.InvoiceDTO;
import cz.itnetwork.dto.InvoiceStatisticsDTO;
import cz.itnetwork.dto.mapper.InvoiceMapper;
import cz.itnetwork.entity.Filter;
import cz.itnetwork.entity.InvoiceEntity;
import cz.itnetwork.entity.PersonEntity;
import cz.itnetwork.entity.repository.InvoiceRepository;
import cz.itnetwork.entity.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.webjars.NotFoundException;

import java.time.Year;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class InvoiceServiceImpl implements InvoiceService {


    @Autowired
    private InvoiceMapper invoiceMapper;
    @Autowired
    private InvoiceRepository invoiceRepository;
    @Autowired
    private PersonRepository personRepository;

    public InvoiceDTO addInvoice(InvoiceDTO invoiceDTO) {
        InvoiceEntity entity = invoiceMapper.toEntity(invoiceDTO);

        PersonEntity buyer = entity.getBuyer();
        Long buyerId = buyer.getId();
        PersonEntity buyerFromDatabase = personRepository.getReferenceById(buyerId);
        entity.setBuyer(buyerFromDatabase);


        PersonEntity seller = entity.getSeller();
        Long sellerId = seller.getId();
        PersonEntity sellerFromDatabase = personRepository.getReferenceById(sellerId);
        entity.setSeller(sellerFromDatabase);


        entity = invoiceRepository.save(entity);

        return invoiceMapper.toDTO(entity);
    }

    @Override
    public void removeInvoice(Long invoiceId) {
        try {
            InvoiceEntity invoice = fetchInvoiceById(invoiceId);
            invoice.setHidden(true);

            invoiceRepository.save(invoice);
        } catch (NotFoundException ignored) {
            // The contract in the interface states, that no exception is thrown, if the entity is not found.
        }
    }

    @Override
    public List<InvoiceDTO> getAll(Filter filter) {
        return invoiceRepository.getFilteredInvoices(filter, PageRequest.of(0, filter.getLimit()))
                .stream()
                .map(invoiceMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public InvoiceDTO getInvoiceById(long id) {
        InvoiceEntity invoiceEntity = fetchInvoiceById(id);
        return invoiceMapper.toDTO(invoiceEntity);
    }

    @Override
    public List<InvoiceDTO> getInvoiceBySeller(String identificationNumber) {
        return invoiceRepository.findAll()
                .stream()
                .filter(invoiceEntity -> invoiceEntity.getSeller().getIdentificationNumber().equals(identificationNumber))
                .map(seller -> invoiceMapper.toDTO(seller))
                .collect(Collectors.toList());
    }


    // private region

    @Override
    public List<InvoiceDTO> getInvoiceByBuyer(String identificationNumber) {
        return invoiceRepository.findAll()
                .stream()
                .filter(invoiceEntity -> invoiceEntity.getBuyer().getIdentificationNumber().equals(identificationNumber))
                .map(buyer -> invoiceMapper.toDTO(buyer))
                .collect(Collectors.toList());
    }

    public InvoiceDTO updateInvoice(long id, InvoiceDTO invoiceDTO) {
        InvoiceEntity updateEntityInvoice = invoiceRepository.getReferenceById(id);
        updateEntityInvoice.setHidden(true);
        invoiceRepository.save(updateEntityInvoice);

        InvoiceEntity newEntity = invoiceMapper.toEntity(invoiceDTO);
        Long buyerId = invoiceDTO.getBuyer().getId();
        PersonEntity buyerFromDatabase = personRepository.findById(buyerId)
                .orElseThrow(() -> new NotFoundException("Buyer not found"));
        newEntity.setBuyer(buyerFromDatabase);


        Long sellerId = invoiceDTO.getSeller().getId();
        PersonEntity sellerFromDatabase = personRepository.findById(sellerId)
                .orElseThrow(() -> new NotFoundException("Seller not found"));
        newEntity.setSeller(sellerFromDatabase);


        newEntity = invoiceRepository.save(newEntity);

        return invoiceMapper.toDTO(newEntity);


    }

    public InvoiceStatisticsDTO getInvoiceStatistics() {
        List<InvoiceEntity> allinvoices = invoiceRepository.findByHidden(false);

        long currentYear = Year.now().getValue();
        long currentYearSum = allinvoices.stream()
                .filter(invoice -> invoice.getIssued().getYear() == currentYear)
                .mapToLong(InvoiceEntity::getPrice)
                .sum();

        long allTimeSum = allinvoices.stream()
                .mapToLong(InvoiceEntity::getPrice)
                .sum();

        long invoicesCount = allinvoices.size();

        return new InvoiceStatisticsDTO(currentYearSum, allTimeSum, invoicesCount);
    }

    private InvoiceEntity fetchInvoiceById(long id) {
        return invoiceRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Invoice with id" + id + "wasnt found in the database."));
    }


}
