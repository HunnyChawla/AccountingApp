package com.ecom.accounting.Accounting.meeshoFileupload;

import com.ecom.accounting.Accounting.dto.FileUploadDataKafkaDto;
import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvValidationException;
import jakarta.transaction.Transactional;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.math.BigDecimal;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class FileUploadService {

    @Autowired
    private MeeshoOrderRepository meeshoOrderRepository;
    @Autowired
    private MeeshoPaymentsRepository meeshoPaymentsRepository;

    private KafkaTemplate<String, List<MeeshoPaymentData>> meeshoPaymentDataKafkaTemplate;

    @Autowired
    private KafkaTemplate<String, FileUploadDataKafkaDto> fileUploadDataKafkaDtoKafkaTemplate;

    @Autowired
    private KafkaTemplate<String, String> processDataKafkaTemplate;

    @Value("${file.upload-dir}")
    private String uploadDir;

    @Transactional
    public void saveDataFromExcel(MultipartFile file) {
        try (InputStream is = file.getInputStream();
             Workbook workbook = new XSSFWorkbook(is)) {

            Sheet sheet = workbook.getSheetAt(0);
            List<MeeshoOrderData> meeshoOrderData = new ArrayList<>();
            boolean isFirstRow = true;

            for (Row row : sheet) {
                if(isFirstRow) {
                    isFirstRow = false;
                    continue;
                }
                MeeshoOrderData record = new MeeshoOrderData();
                record.setReasonForCreditEntry(row.getCell(0).getStringCellValue());
                record.setSubOrderNo(row.getCell(1).getStringCellValue());
                record.setOrderDate(dateToLocalDateTime(row.getCell(2).getDateCellValue()));
                record.setCustomerState(row.getCell(3).getStringCellValue());
                record.setProductName(row.getCell(4).getStringCellValue());
                record.setSku(row.getCell(5).getStringCellValue());
                record.setSize(row.getCell(6).getStringCellValue());
                record.setQuantity((int)row.getCell(7).getNumericCellValue());
                record.setSupplier_listed_price(new BigDecimal(row.getCell(8).getStringCellValue()));
                record.setSupplier_discounted_price(new BigDecimal(row.getCell(9).getStringCellValue()));
//                record.setPacketId(row.getCell(10).getStringCellValue());
                // Set other fields as necessary
                meeshoOrderData.add(record);
            }

            meeshoOrderRepository.saveAll(meeshoOrderData);

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to parse Excel file: " + e.getMessage());
        }
    }



    @Transactional
    public void saveCSVData(MultipartFile file) throws IOException, CsvValidationException {
        try (CSVReader reader = new CSVReader(new InputStreamReader(file.getInputStream()))) {
            String[] line;
            boolean isFirstRow = true;
            List<MeeshoOrderData> meeshoOrderData = new ArrayList<>();
            while ((line = reader.readNext()) != null) {
                if(isFirstRow) {
                    isFirstRow = false;
                    continue;
                }
                MeeshoOrderData record = new MeeshoOrderData();
                record.setReasonForCreditEntry(line[0]);
                record.setSubOrderNo(line[1]);
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
                LocalDate localDate = LocalDate.parse(line[2], formatter);
                record.setOrderDate(localDate);
                record.setCustomerState(line[3]);
                record.setProductName(line[4]);
                record.setSku(line[5]);
                record.setSize(line[6]);
                record.setQuantity(Integer.parseInt(line[7]));
                record.setSupplier_listed_price(new BigDecimal(line[8]));
                record.setSupplier_discounted_price(new BigDecimal(line[9]));
//                record.setPacketId(row.getCell(10).getStringCellValue());
                // Set other fields as necessary
                meeshoOrderData.add(record);
            }
            meeshoOrderRepository.saveAll(meeshoOrderData);
        }
    }

    @Transactional
    public void saveMeeshoOrderData(String filePath, String sellerId) throws IOException, CsvValidationException {
        File file = new File(filePath);
        try (CSVReader reader = new CSVReader(new FileReader(file))) {
            List<MeeshoOrderData> meeshoOrderData = getMeeshoOrderData(sellerId, reader);
            meeshoOrderRepository.saveAll(meeshoOrderData);
        }
        processDataKafkaTemplate.send("meesho.order.data.process",sellerId);
    }

    private static List<MeeshoOrderData> getMeeshoOrderData(String sellerId, CSVReader reader) throws IOException, CsvValidationException {
        String[] line;
        boolean isFirstRow = true;
        List<MeeshoOrderData> meeshoOrderData = new ArrayList<>();
        while ((line = reader.readNext()) != null) {
            if(isFirstRow) {
                isFirstRow = false;
                continue;
            }
            MeeshoOrderData record = new MeeshoOrderData();
            record.setReasonForCreditEntry(line[0]);
            record.setSubOrderNo(line[1]);
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            LocalDate localDate = LocalDate.parse(line[2], formatter);
            record.setOrderDate(localDate);
            record.setCustomerState(line[3]);
            record.setProductName(line[4]);
            record.setSku(line[5]);
            record.setSize(line[6]);
            record.setQuantity(Integer.parseInt(line[7]));
            record.setSupplier_listed_price(new BigDecimal(line[8]));
            record.setSupplier_discounted_price(new BigDecimal(line[9]));
//                record.setPacketId(row.getCell(10).getStringCellValue());
            record.setSellerId(sellerId);
            // Set other fields as necessary
            meeshoOrderData.add(record);
        }
        return meeshoOrderData;
    }

    @Transactional
    public void savePaymentDataFromExcel(MultipartFile file) {
        try (InputStream is = file.getInputStream();
             Workbook workbook = new XSSFWorkbook(is)) {

            Sheet sheet = workbook.getSheetAt(0);
            List<MeeshoPaymentData> meeshoPaymentDataList = new ArrayList<>();
            int rowNumber = 1;
            boolean isFirstRow = true;

            for (Row row : sheet) {
                if(rowNumber < 4) {
                    rowNumber++;
                    continue;
                }
                MeeshoPaymentData meeshoPaymentData = new MeeshoPaymentData();
                meeshoPaymentData.setSubOrderNo(row.getCell(0).getStringCellValue());
                meeshoPaymentData.setOrderDate(dateTimeToLocalDateTime(row.getCell(1).getStringCellValue()));
                meeshoPaymentData.setDispatchDate(dateToLocalDateTime(row.getCell(2).getStringCellValue()));
                meeshoPaymentData.setProductName(row.getCell(3).getStringCellValue());
                meeshoPaymentData.setSku(row.getCell(4).getStringCellValue());
                meeshoPaymentData.setOrderStatus(row.getCell(5).getStringCellValue());
                meeshoPaymentData.setGst_percentage(Double.parseDouble(row.getCell(6).getStringCellValue()));
                meeshoPaymentData.setListingPrice(new BigDecimal(row.getCell(7).getStringCellValue()));
                meeshoPaymentData.setQuantity(Integer.parseInt(row.getCell(8).getStringCellValue()));
                meeshoPaymentData.setTransactionId(row.getCell(9).getStringCellValue());
                meeshoPaymentData.setPaymentDate(dateToLocalDateTime(row.getCell(10).getStringCellValue()));
                meeshoPaymentData.setFinal_settlementAmount(new BigDecimal(row.getCell(11).getStringCellValue()));
                meeshoPaymentData.setPriceType(row.getCell(12).getStringCellValue());
                meeshoPaymentData.setTotalSaleAmount(new BigDecimal(row.getCell(13).getStringCellValue()));
                meeshoPaymentData.setSaleReturnAmount(new BigDecimal(row.getCell(14).getStringCellValue()));
                meeshoPaymentData.setFixedFeeInclGst(new BigDecimal(row.getCell(15).getStringCellValue()));
                meeshoPaymentData.setWareHousingFee(new BigDecimal(row.getCell(16).getStringCellValue()));
                meeshoPaymentData.setShippingRevenue(new BigDecimal(row.getCell(17).getStringCellValue()));
                meeshoPaymentData.setShippingReturnAmount(new BigDecimal(row.getCell(18).getStringCellValue()));
                meeshoPaymentData.setReturnPremium(new BigDecimal(row.getCell(19).getStringCellValue()));
                meeshoPaymentData.setReturnPremiumOfReturn(new BigDecimal(row.getCell(20).getStringCellValue()));
                meeshoPaymentData.setMeeshoCommissionPercentage(new BigDecimal(row.getCell(21).getStringCellValue()));
                meeshoPaymentData.setMeeshoCommissionExclGst(new BigDecimal(row.getCell(22).getStringCellValue()));
                meeshoPaymentData.setMeeshoGoldPlatformFee(new BigDecimal(row.getCell(23).getStringCellValue()));
                meeshoPaymentData.setMeeshoMallPlatformFee(new BigDecimal(row.getCell(24).getStringCellValue()));
                meeshoPaymentData.setFixedFeeExclGst(new BigDecimal(row.getCell(25).getStringCellValue()));
                meeshoPaymentData.setWarehousingFeeExclGst(BigDecimal.valueOf(row.getCell(26).getNumericCellValue()));
                meeshoPaymentData.setReturnShippingChargeExclGst(new BigDecimal(row.getCell(27).getStringCellValue()));
                meeshoPaymentData.setGstCompensation(new BigDecimal(row.getCell(28).getStringCellValue()));
                meeshoPaymentData.setShippingChargeExclGst(new BigDecimal(row.getCell(29).getStringCellValue()));
                meeshoPaymentData.setOtherSupportServiceChargesExclGst(new BigDecimal(row.getCell(30).getStringCellValue()));
                meeshoPaymentData.setWaiversExclGst(new BigDecimal(row.getCell(31).getStringCellValue()));
                meeshoPaymentData.setNetOtherSupportServiceChargesExclGst(new BigDecimal(row.getCell(32).getStringCellValue()));
                meeshoPaymentData.setGstOnMeeshoCommission(new BigDecimal(row.getCell(33).getStringCellValue()));
                meeshoPaymentData.setGstOnWareHousingFee(BigDecimal.valueOf(row.getCell(34).getNumericCellValue()));
                meeshoPaymentData.setGstOnMeeshoGold(new BigDecimal(row.getCell(35).getStringCellValue()));
                meeshoPaymentData.setGstOnMeeshoMallPlatformFee(new BigDecimal(row.getCell(36).getStringCellValue()));
                meeshoPaymentData.setGstOnMeeshoShippingCharges(new BigDecimal(row.getCell(37).getStringCellValue()));
                meeshoPaymentData.setGstOnReturnShippingCharges(new BigDecimal(row.getCell(38).getStringCellValue()));
                meeshoPaymentData.setGstOnNetOtherSupportServiceCharges(new BigDecimal(row.getCell(39).getStringCellValue()));
                meeshoPaymentData.setGstOnFixedFee(new BigDecimal(row.getCell(40).getStringCellValue()));
                meeshoPaymentData.setTcs(new BigDecimal(row.getCell(41).getStringCellValue()));
                meeshoPaymentData.setTdsRate(new BigDecimal(row.getCell(42).getStringCellValue()));
                meeshoPaymentData.setTds(new BigDecimal(row.getCell(43).getStringCellValue()));
                meeshoPaymentData.setCompensation(new BigDecimal(row.getCell(44).getStringCellValue()));
                meeshoPaymentData.setClaims(new BigDecimal(row.getCell(45).getStringCellValue()));
                meeshoPaymentData.setRecovery(new BigDecimal(row.getCell(46).getStringCellValue()));
                meeshoPaymentData.setCompensationReason(row.getCell(47).getStringCellValue());
                meeshoPaymentData.setClaimsReason(row.getCell(48).getStringCellValue());
                meeshoPaymentData.setRecoveryReason(row.getCell(49).getStringCellValue());
                meeshoPaymentDataList.add(meeshoPaymentData);
            }

            meeshoPaymentsRepository.saveAll(meeshoPaymentDataList);
            meeshoPaymentDataKafkaTemplate.send("process-meesho-payment-data", meeshoPaymentDataList);

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to parse Excel file: " + e.getMessage());
        }
    }

    @Transactional
    public void savePaymentDataFromExcel(String filePath, String sellerId) {
        File file = new File(filePath);
        try (InputStream is = new FileInputStream(file);
             Workbook workbook = new XSSFWorkbook(is)) {

            Sheet sheet = workbook.getSheetAt(0);
            List<MeeshoPaymentData> meeshoPaymentDataList = new ArrayList<>();
            int rowNumber = 1;
            boolean isFirstRow = true;

            for (Row row : sheet) {
                if(rowNumber < 4) {
                    rowNumber++;
                    continue;
                }
                MeeshoPaymentData meeshoPaymentData = new MeeshoPaymentData();
                meeshoPaymentData.setSubOrderNo(row.getCell(0).getStringCellValue());
                meeshoPaymentData.setOrderDate(dateTimeToLocalDateTime(row.getCell(1).getStringCellValue()));
                meeshoPaymentData.setDispatchDate(dateToLocalDateTime(row.getCell(2).getStringCellValue()));
                meeshoPaymentData.setProductName(row.getCell(3).getStringCellValue());
                meeshoPaymentData.setSku(row.getCell(4).getStringCellValue());
                meeshoPaymentData.setOrderStatus(row.getCell(5).getStringCellValue());
                meeshoPaymentData.setGst_percentage(Double.parseDouble(row.getCell(6).getStringCellValue()));
                meeshoPaymentData.setListingPrice(new BigDecimal(row.getCell(7).getStringCellValue()));
                meeshoPaymentData.setQuantity(Integer.parseInt(row.getCell(8).getStringCellValue()));
                meeshoPaymentData.setTransactionId(row.getCell(9).getStringCellValue());
                meeshoPaymentData.setPaymentDate(dateToLocalDateTime(row.getCell(10).getStringCellValue()));
                meeshoPaymentData.setFinal_settlementAmount(new BigDecimal(row.getCell(11).getStringCellValue()));
                meeshoPaymentData.setPriceType(row.getCell(12).getStringCellValue());
                meeshoPaymentData.setTotalSaleAmount(new BigDecimal(row.getCell(13).getStringCellValue()));
                meeshoPaymentData.setSaleReturnAmount(new BigDecimal(row.getCell(14).getStringCellValue()));
                meeshoPaymentData.setFixedFeeInclGst(new BigDecimal(row.getCell(15).getStringCellValue()));
                meeshoPaymentData.setWareHousingFee(new BigDecimal(row.getCell(16).getStringCellValue()));
                meeshoPaymentData.setShippingRevenue(new BigDecimal(row.getCell(17).getStringCellValue()));
                meeshoPaymentData.setShippingReturnAmount(new BigDecimal(row.getCell(18).getStringCellValue()));
                meeshoPaymentData.setReturnPremium(new BigDecimal(row.getCell(19).getStringCellValue()));
                meeshoPaymentData.setReturnPremiumOfReturn(new BigDecimal(row.getCell(20).getStringCellValue()));
                meeshoPaymentData.setMeeshoCommissionPercentage(new BigDecimal(row.getCell(21).getStringCellValue()));
                meeshoPaymentData.setMeeshoCommissionExclGst(new BigDecimal(row.getCell(22).getStringCellValue()));
                meeshoPaymentData.setMeeshoGoldPlatformFee(new BigDecimal(row.getCell(23).getStringCellValue()));
                meeshoPaymentData.setMeeshoMallPlatformFee(new BigDecimal(row.getCell(24).getStringCellValue()));
                meeshoPaymentData.setFixedFeeExclGst(new BigDecimal(row.getCell(25).getStringCellValue()));
                meeshoPaymentData.setWarehousingFeeExclGst(BigDecimal.valueOf(row.getCell(26).getNumericCellValue()));
                meeshoPaymentData.setReturnShippingChargeExclGst(new BigDecimal(row.getCell(27).getStringCellValue()));
                meeshoPaymentData.setGstCompensation(new BigDecimal(row.getCell(28).getStringCellValue()));
                meeshoPaymentData.setShippingChargeExclGst(new BigDecimal(row.getCell(29).getStringCellValue()));
                meeshoPaymentData.setOtherSupportServiceChargesExclGst(new BigDecimal(row.getCell(30).getStringCellValue()));
                meeshoPaymentData.setWaiversExclGst(new BigDecimal(row.getCell(31).getStringCellValue()));
                meeshoPaymentData.setNetOtherSupportServiceChargesExclGst(new BigDecimal(row.getCell(32).getStringCellValue()));
                meeshoPaymentData.setGstOnMeeshoCommission(new BigDecimal(row.getCell(33).getStringCellValue()));
                meeshoPaymentData.setGstOnWareHousingFee(BigDecimal.valueOf(row.getCell(34).getNumericCellValue()));
                meeshoPaymentData.setGstOnMeeshoGold(new BigDecimal(row.getCell(35).getStringCellValue()));
                meeshoPaymentData.setGstOnMeeshoMallPlatformFee(new BigDecimal(row.getCell(36).getStringCellValue()));
                meeshoPaymentData.setGstOnMeeshoShippingCharges(new BigDecimal(row.getCell(37).getStringCellValue()));
                meeshoPaymentData.setGstOnReturnShippingCharges(new BigDecimal(row.getCell(38).getStringCellValue()));
                meeshoPaymentData.setGstOnNetOtherSupportServiceCharges(new BigDecimal(row.getCell(39).getStringCellValue()));
                meeshoPaymentData.setGstOnFixedFee(new BigDecimal(row.getCell(40).getStringCellValue()));
                meeshoPaymentData.setTcs(new BigDecimal(row.getCell(41).getStringCellValue()));
                meeshoPaymentData.setTdsRate(new BigDecimal(getStringValueFromRow(row,42)));
                meeshoPaymentData.setTds(new BigDecimal(getStringValueFromRow(row,43)));
                meeshoPaymentData.setCompensation(new BigDecimal(row.getCell(44).getStringCellValue()));
                meeshoPaymentData.setClaims(new BigDecimal(row.getCell(45).getStringCellValue()));
                meeshoPaymentData.setRecovery(new BigDecimal(row.getCell(46).getStringCellValue()));
                meeshoPaymentData.setCompensationReason(row.getCell(47).getStringCellValue());
                meeshoPaymentData.setClaimsReason(row.getCell(48).getStringCellValue());
                meeshoPaymentData.setRecoveryReason(row.getCell(49).getStringCellValue());
                meeshoPaymentData.setSellerId(sellerId);
                meeshoPaymentDataList.add(meeshoPaymentData);
            }
            meeshoPaymentsRepository.saveAll(meeshoPaymentDataList);
            processDataKafkaTemplate.send("meesho.payment.data.process",sellerId);

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to parse Excel file: " + e.getMessage());
        }
    }

    public String uploadFile(MultipartFile file,String fileType) throws IOException {
        Path uploadPath = Paths.get(uploadDir);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }
        String filePath = uploadPath.resolve(UUID.randomUUID() + file.getOriginalFilename()).toString();
        file.transferTo(new File(filePath));
        publishFileUploadKafkaEvents(fileType,filePath);
        return filePath;
    }

    private static LocalDate dateToLocalDateTime(Date date) {
        return date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
    }

    private static LocalDateTime dateTimeToLocalDateTime(String dateString) {
        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        return LocalDateTime.parse(dateString,dateTimeFormatter);

    }

    private static LocalDateTime dateToLocalDateTime(String dateString) {
        LocalDate localDate = LocalDate.parse(dateString);
        return localDate.atStartOfDay();

    }

    private void publishFileUploadKafkaEvents(String fileType,String filePath) {
        if (fileType.equals("MEESHO_ORDER_DATA")) {
            fileUploadDataKafkaDtoKafkaTemplate.send("meesho.order.data.file.upload", new FileUploadDataKafkaDto("hunnychawla", filePath));
        } else if (fileType.equals("MEESHO_PAYMENTS_DATA")) {
            fileUploadDataKafkaDtoKafkaTemplate.send("meesho.payments.data.file.upload", new FileUploadDataKafkaDto("hunnychawla", filePath));
        }
    }

    private String getStringValueFromRow(Row row, int rowNumber) {
        String value = row.getCell(rowNumber).getStringCellValue();
        return Objects.isNull(value) || value.isEmpty()? "0" : value;
    }

}
