package com.ecom.accounting.Accounting.product;

import com.ecom.accounting.Accounting.exceptionHandling.ProductNotFoundException;
import com.ecom.accounting.Accounting.security.TokenService;
import com.ecom.accounting.dtos.ProductRequestDto;
import com.ecom.accounting.dtos.ProductResponseDto;
import com.ecom.accounting.entities.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

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

    @GetMapping("/{skuId}")
    public ResponseEntity<ProductResponseDto> getProductsBySkuId(@AuthenticationPrincipal Jwt jwt, @PathVariable("skuId") String skuId) throws ProductNotFoundException {
        String userId = TokenService.getUserIdFromToken(jwt);
        Optional<Product> products = productService.getProducts(userId, skuId);
        if(products.isPresent()) {
            return ResponseEntity.ok(ProductMapper.toProductResponseDto(products.get()));
        }
        throw new ProductNotFoundException("Could not find product with "+skuId);
    }

    @PutMapping
    public ResponseEntity<ProductResponseDto> updateProduct(@AuthenticationPrincipal Jwt jwt,@RequestBody ProductRequestDto productRequestDto) throws ProductNotFoundException {
        Product product = productService.updateProduct(ProductMapper.toProduct(productRequestDto),TokenService.getUserIdFromToken(jwt));
        return ResponseEntity.ok(ProductMapper.toProductResponseDto(product));
    }
}
