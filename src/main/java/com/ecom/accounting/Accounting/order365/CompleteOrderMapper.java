package com.ecom.accounting.Accounting.order365;

import com.ecom.accounting.Accounting.order365.dto.CompleteOrderDto;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.stream.Collectors;

public class CompleteOrderMapper {

    public static CompleteOrderDto toDto(CompleteOrderData completeOrderData) {
        if (completeOrderData == null) {
            return null;
        }

        CompleteOrderDto dto = new CompleteOrderDto();
        dto.setOrderId(completeOrderData.getOrderId());
        dto.setSkuId(completeOrderData.getSkuId());
        dto.setOrderAmount(completeOrderData.getOrderAmount());
        dto.setBankSettlement(completeOrderData.getBankSettlement());
        dto.setProfit(completeOrderData.getProfit());
        dto.setOrderDate(completeOrderData.getOrderDate());
        dto.setOrderStatus(completeOrderData.getOrderStatus());
        return dto;
    }

    public static List<CompleteOrderDto> toDtoList(List<CompleteOrderData> completeOrderDataList) {
        if (completeOrderDataList == null || completeOrderDataList.isEmpty()) {
            return List.of();
        }

        return completeOrderDataList.stream()
                .map(CompleteOrderMapper::toDto)
                .collect(Collectors.toList());
    }

    public static Page<CompleteOrderDto> toDtoPage(Page<CompleteOrderData> completeOrderDataPage) {
        if (completeOrderDataPage == null) {
            return Page.empty();
        }

        return completeOrderDataPage.map(CompleteOrderMapper::toDto);
    }
}
