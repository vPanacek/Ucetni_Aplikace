package cz.itnetwork.entity.repository;

import cz.itnetwork.entity.Filter;
import cz.itnetwork.entity.InvoiceEntity;
import cz.itnetwork.entity.PersonEntity;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface InvoiceRepository extends PagingAndSortingRepository<InvoiceEntity, Long>, JpaRepository<InvoiceEntity, Long> {

    List<InvoiceEntity> findByHidden(boolean hidden);

    List<InvoiceEntity> findBySeller(PersonEntity seller);

    //filtrace faktur
    @Query(value = "SELECT i FROM invoice i WHERE" +
            " (:#{#filter.buyerId} is null OR i.buyer.id = :#{#filter.buyerId}) " +
            "AND (:#{#filter.sellerId} is null OR i.seller.id = :#{#filter.sellerId}) " +
            "AND (:#{#filter.product} is null OR i.product LIKE %:#{#filter.product}%) " +
            "AND (:#{#filter.maxPrice} is null OR i.price <= :#{#filter.maxPrice}) " +
            "AND (:#{#filter.minPrice} is null OR i.price >= :#{#filter.minPrice})")
    List<InvoiceEntity> getFilteredInvoices(Filter filter, Pageable pageable);


}
