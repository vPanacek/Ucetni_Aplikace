package cz.itnetwork.entity;


import lombok.Data;

@Data
public class Filter {


    private Long sellerId;
    private Long buyerId;
    private String product;
    private Integer maxPrice;
    private Integer minPrice;
    private Integer limit = 10;
}
