package com.ecom.accounting.Accounting.product;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;
    public Page<Product> getProducts(Pageable page, String sellerId) {
        return productRepository.findBySellerId(page,sellerId);
    }

    public Product updateProduct(Product product,String sellerId) {
        Product bySellerIdAndSkuId = productRepository.findBySellerIdAndSkuId(sellerId, product.getSkuId());
        bySellerIdAndSkuId.setProductName(product.getProductName());
        bySellerIdAndSkuId.setCost(product.getCost());
        return productRepository.save(bySellerIdAndSkuId);
    }
}
