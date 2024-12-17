package com.ecom.accounting.Accounting.product;

import com.ecom.accounting.Accounting.security.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {

    @Autowired
    private ProductService productService;
    @GetMapping
    public ResponseEntity<Page<ProductResponseDto>> getProducts(@AuthenticationPrincipal Jwt jwt, Pageable page) {
        String userId = TokenService.getUserIdFromToken(jwt);
        Page<Product> products = productService.getProducts(page, userId);
        return ResponseEntity.ok(ProductMapper.toDtoPage(products));
    }

    @PutMapping
    public ResponseEntity<ProductResponseDto> updateProduct(@AuthenticationPrincipal Jwt jwt,@RequestBody ProductRequestDto productRequestDto) {
        Product product = productService.updateProduct(ProductMapper.toProduct(productRequestDto),TokenService.getUserIdFromToken(jwt));
        return ResponseEntity.ok(ProductMapper.toProductResponseDto(product));
    }
}
