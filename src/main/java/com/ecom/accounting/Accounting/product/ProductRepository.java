package com.ecom.accounting.Accounting.product;

import com.ecom.accounting.entities.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, String> {
    Page<Product> findBySellerId(Pageable page, String sellerId);
    Product findBySellerIdAndSkuId(String sellerId, String skuId);
}
