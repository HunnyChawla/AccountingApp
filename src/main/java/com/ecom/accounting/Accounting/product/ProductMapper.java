package com.ecom.accounting.Accounting.product;

import java.util.List;
import java.util.stream.Collectors;

public class ProductMapper {
    public static ProductResponseDto toProductResponseDto(Product product) {
        ProductResponseDto productResponseDto = new ProductResponseDto();
        productResponseDto.setSku(product.getSkuId());
        productResponseDto.setCost(product.getCost());
        productResponseDto.setName(product.getProductName());
        return productResponseDto;
    }

    public static List<ProductResponseDto> toProductResponseDto(List<Product> products) {
        return products.stream().map(ProductMapper::toProductResponseDto)
                .collect(Collectors.toList());
    }
}
