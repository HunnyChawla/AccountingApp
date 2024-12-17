package com.ecom.accounting.Accounting.product;

import com.ecom.accounting.Accounting.order365.CompleteOrderData;
import com.ecom.accounting.Accounting.order365.CompleteOrderMapper;
import com.ecom.accounting.Accounting.order365.dto.CompleteOrderDto;
import org.springframework.data.domain.Page;

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

    public static Page<ProductResponseDto> toDtoPage(Page<Product> products) {
        if (products == null) {
            return Page.empty();
        }

        return products.map(ProductMapper::toProductResponseDto);
    }

    public static ProductRequestDto toProductRequestDto(Product product) {
        ProductRequestDto productRequestDto = new ProductRequestDto();
        productRequestDto.setSku(product.getSkuId());
        productRequestDto.setCost(product.getCost());
        productRequestDto.setName(product.getProductName());
        return productRequestDto;
    }

    public static Product toProduct(ProductRequestDto productRequestDto) {
        Product product = new Product();
        product.setSkuId(productRequestDto.getSku());
        product.setCost(productRequestDto.getCost());
        product.setProductName(productRequestDto.getName());
        return product;
    }
}
