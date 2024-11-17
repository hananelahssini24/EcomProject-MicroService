package com.lahssini.customerservice.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix="customer.params")
public record CustomerConfigParam (int x,int y){
}
