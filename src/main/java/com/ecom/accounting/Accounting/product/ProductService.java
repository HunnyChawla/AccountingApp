package com.ecom.accounting.Accounting.product;

import com.ecom.accounting.Accounting.exceptionHandling.ProductNotFoundException;
import com.ecom.accounting.entities.Product;
import com.ecom.accounting.entities.ProductKey;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;
    public Page<Product> getProducts(Pageable page, String sellerId) {
        return productRepository.findByIdSellerId(page,sellerId);
    }

    public Optional<Product> getProducts(String sellerId, String skuId) {
        return productRepository.findById(ProductKey.builder().sellerId(sellerId).skuId(skuId).build());
    }

    public Product updateProduct(Product product,String sellerId) throws ProductNotFoundException {
        Optional<Product> bySellerIdAndSkuId = productRepository.findById(ProductKey.builder().sellerId(sellerId).skuId(product.getId().getSkuId()).build());
        if(bySellerIdAndSkuId.isPresent()) {
            bySellerIdAndSkuId.get().setProductName(product.getProductName());
            bySellerIdAndSkuId.get().setCost(product.getCost());
            return productRepository.save(bySellerIdAndSkuId.get());
        }
        throw new ProductNotFoundException("Product Not for for "+ product.getId().getSkuId());
    }
}
