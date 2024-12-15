package com.ecom.accounting.Accounting.meeshoFileupload;

import com.ecom.accounting.Accounting.constants.DbConstants;
import com.ecom.accounting.Accounting.order365.CompleteOrderData;
import com.ecom.accounting.Accounting.order365.CompleteOrderDataRepository;
import com.ecom.accounting.Accounting.ordermanagement.Order;
import com.ecom.accounting.Accounting.ordermanagement.OrderStatus;
import com.ecom.accounting.Accounting.ordermanagement.OrdersService;
import com.ecom.accounting.Accounting.ordermanagement.Platform;
import com.ecom.accounting.Accounting.product.Product;
import com.ecom.accounting.Accounting.product.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class MeeshoOrderPaymentDataProcessing {
    @Autowired
    private MeeshoPaymentsRepository meeshoPaymentsRepository;
    @Autowired
    private MeeshoOrderRepository meeshoOrderRepository;

    @Autowired
    private CompleteOrderDataRepository completeOrderDataRepository;

    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private OrdersService ordersService;


    @KafkaListener(topics = "meesho.payment.data.process", groupId = "meesho-payment-data-group-1", containerFactory = "processDataKafkaListenerContainerFactory")
    public void populatePaymentData(String sellerId) {
        System.out.println("Received meeshoPaymentDataProcess Event for seller: " + sellerId);
        List<MeeshoPaymentData> meeshoPaymentData = meeshoPaymentsRepository.findByProcessingStatus(DbConstants.NOT_PROCESSED);
        List<String> subOrderNos = meeshoPaymentData.stream().map(MeeshoPaymentData::getSubOrderNo).toList();
        List<String> skuIds = meeshoPaymentData.stream().map(MeeshoPaymentData::getSku).toList();

        Map<String, CompleteOrderData> existingOrdersMap = completeOrderDataRepository
                .findAllById(subOrderNos)
                .stream()
                .collect(Collectors.toMap(CompleteOrderData::getOrderId, order -> order));

        Map<String, Product> productMap = productRepository.findAllById(skuIds).stream().collect(Collectors.toMap(Product::getSkuId, product -> product));

        // Prepare updated or new CompleteOrderData records
        List<CompleteOrderData> completeOrdersToSave = new ArrayList<>();

        meeshoPaymentData.forEach(meeshoPayment -> {
            CompleteOrderData completeOrder = existingOrdersMap.get(meeshoPayment.getSubOrderNo());

            if (completeOrder != null && Objects.nonNull(productMap.get(meeshoPayment.getSku()))) {
                // Update existing record
                updatePaymentDataInCompleteOrderData(completeOrder, meeshoPayment, productMap);
                completeOrdersToSave.add(completeOrder);
                meeshoPayment.setProcessingStatus(DbConstants.PROCESSED);
            } else {
                // Create new record
                // publish a event for order details not found
            }
        });

        List<CompleteOrderData> completeOrderData = completeOrderDataRepository.saveAll(completeOrdersToSave);
        List<MeeshoPaymentData> updatedPaymentData = meeshoPaymentsRepository.saveAll(meeshoPaymentData);
        System.out.println("Complete order data is saved size :: "+completeOrderData.size());
        System.out.println("MeeshoPaymentData is saved size :: "+updatedPaymentData.size());
    }


    @KafkaListener(topics = "meesho.order.data.process", groupId = "meesho-order-data-group-1", containerFactory = "processDataKafkaListenerContainerFactory")
    public void populateCompleteOrderData(String sellerId) {
        System.out.println("Received meeshoOrderDataProcess Event for seller: " + sellerId);
        // Fetch unprocessed MeeshoOrderData
        List<MeeshoOrderData> meeshoOrders = meeshoOrderRepository.findByProcessingStatus(DbConstants.NOT_PROCESSED);

        List<String> subOrderNos = getSubOrderNos(meeshoOrders);

        Map<String, CompleteOrderData> existingOrdersMap = completeOrderDataRepository
                .findAllById(subOrderNos)
                .stream()
                .collect(Collectors.toMap(CompleteOrderData::getOrderId, order -> order));

        // Prepare updated or new CompleteOrderData records
        List<CompleteOrderData> completeOrdersToSave = new ArrayList<>();


        meeshoOrders.forEach(meeshoOrder -> {
            CompleteOrderData completeOrder = existingOrdersMap.get(meeshoOrder.getSubOrderNo());

            if (completeOrder != null) {
                // Update existing record
                updateCompleteOrderData(completeOrder, meeshoOrder);
            } else {
                // Create new record
                completeOrder = mapToCompleteOrderData(meeshoOrder);
            }

            completeOrdersToSave.add(completeOrder);

            // Update processing status in MeeshoOrderData
            meeshoOrder.setProcessingStatus(1);
        });
        List<Order> ordersToSave = mapToOrder(meeshoOrders);

        ordersService.saveAll(ordersToSave);

        // Save all updates/new records in one go
        completeOrderDataRepository.saveAll(completeOrdersToSave);

        // Save updated MeeshoOrderData
        meeshoOrderRepository.saveAll(meeshoOrders);
    }

    private static List<String> getSubOrderNos(List<MeeshoOrderData> meeshoOrders) {
        return meeshoOrders.stream()
                .map(MeeshoOrderData::getSubOrderNo)
                .toList();
    }

    private CompleteOrderData mapToCompleteOrderData(MeeshoOrderData meeshoOrderData) {
        CompleteOrderData completeOrderData = new CompleteOrderData();
        completeOrderData.setOrderId(meeshoOrderData.getSubOrderNo());
        completeOrderData.setSellerId(meeshoOrderData.getSellerId());
        completeOrderData.setSkuId(meeshoOrderData.getSku());
        completeOrderData.setOrderAmount(meeshoOrderData.getSupplier_discounted_price());
        completeOrderData.setOrderDate(meeshoOrderData.getOrderDate());
        completeOrderData.setOrderStatus(OrderStatus.fromString(meeshoOrderData.getReasonForCreditEntry()));
        return completeOrderData;
    }

    private Order mapToOrder(MeeshoOrderData meeshoOrderData) {
        Order completeOrderData = new Order();
        completeOrderData.setOrderId(meeshoOrderData.getSubOrderNo());
        completeOrderData.setSellerId(meeshoOrderData.getSellerId());
        completeOrderData.setSku(meeshoOrderData.getSku());
        completeOrderData.setAmount(meeshoOrderData.getSupplier_discounted_price());
        completeOrderData.setOrderDate(meeshoOrderData.getOrderDate());
        completeOrderData.setOrderStatus(OrderStatus.fromString(meeshoOrderData.getReasonForCreditEntry()));
        completeOrderData.setDispatchDate(meeshoOrderData.getOrderDate());
        completeOrderData.setQuantity(meeshoOrderData.getQuantity());
        completeOrderData.setPlatform(Platform.MEESHO);
        return completeOrderData;
    }

    private void updateCompleteOrderData(CompleteOrderData existingOrder, MeeshoOrderData meeshoOrderData) {
        existingOrder.setSellerId(meeshoOrderData.getSellerId());
        existingOrder.setSkuId(meeshoOrderData.getSku());
        existingOrder.setOrderAmount(meeshoOrderData.getSupplier_discounted_price());
        existingOrder.setOrderDate(meeshoOrderData.getOrderDate());
        existingOrder.setOrderStatus(OrderStatus.fromString(meeshoOrderData.getReasonForCreditEntry()));
    }

    private void updateOrderData(Order existingOrder, MeeshoOrderData meeshoOrderData) {
        existingOrder.setSellerId(meeshoOrderData.getSellerId());
        existingOrder.setSku(meeshoOrderData.getSku());
        existingOrder.setAmount(meeshoOrderData.getSupplier_discounted_price());
        existingOrder.setOrderDate(meeshoOrderData.getOrderDate());
        existingOrder.setOrderStatus(OrderStatus.fromString(meeshoOrderData.getReasonForCreditEntry()));
        existingOrder.setDispatchDate(meeshoOrderData.getOrderDate());
        existingOrder.setQuantity(meeshoOrderData.getQuantity());
        existingOrder.setPlatform(Platform.MEESHO);
    }

    private void updatePaymentDataInCompleteOrderData(CompleteOrderData existingOrder, MeeshoPaymentData meeshoPaymentData, Map<String, Product> productMap) {
        OrderStatus orderStatus = OrderStatus.fromString(meeshoPaymentData.getOrderStatus());
        existingOrder.setBankSettlement(meeshoPaymentData.getFinal_settlementAmount());
        existingOrder.setProfit(
                calculateProfit(orderStatus,meeshoPaymentData.getFinal_settlementAmount(),productMap.get(meeshoPaymentData.getSku()).getCost())
        );
        existingOrder.setOrderDate(LocalDate.from(meeshoPaymentData.getOrderDate()));
        existingOrder.setOrderStatus(orderStatus);

    }

    private BigDecimal calculateProfit(OrderStatus orderStatus,BigDecimal bankSettlementAmount, BigDecimal cost) {
        if(orderStatus == OrderStatus.DELIVERED) {
            return bankSettlementAmount.subtract(cost);
        }
        return bankSettlementAmount;
    }

    private List<Order> mapToOrder(List<MeeshoOrderData> meeshoOrderData) {
        List<String> subOrderNos = getSubOrderNos(meeshoOrderData);
        Map<String, Order> existingOrdersMap = ordersService
                .findAllById(subOrderNos)
                .stream()
                .collect(Collectors.toMap(Order::getOrderId, order -> order));

        List<Order> ordersToSave = new ArrayList<>();

        meeshoOrderData.forEach(meeshoOrder -> {
            Order order = existingOrdersMap.get(meeshoOrder.getSubOrderNo());

            if (order != null) {
                // Update existing record
                updateOrderData(order, meeshoOrder);
            } else {
                // Create new record
                order = mapToOrder(meeshoOrder);
            }

            ordersToSave.add(order);
        });
        return ordersToSave;

    }
}
