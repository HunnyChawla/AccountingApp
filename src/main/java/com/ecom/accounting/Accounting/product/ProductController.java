package com.ecom.accounting.Accounting.product;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {

    @Autowired
    private ProductService productService;
    @GetMapping
    public ResponseEntity<List<ProductResponseDto>> getProducts() {
        List<Product> products = productService.getProducts();
        return ResponseEntity.ok(ProductMapper.toProductResponseDto(products));
    }

//    @PutMapping
//    public ResponseEntity<ProductResponseDto> updateProduct() {
//        List<Product> products = productService.getProducts();
//        return ResponseEntity.ok(ProductMapper.toProductResponseDto(products));
//    }
}
