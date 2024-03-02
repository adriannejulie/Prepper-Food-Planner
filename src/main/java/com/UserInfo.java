package com;

import org.springframework.stereotype.Component;
import com.fasterxml.jackson.annotation.JsonProperty;

@Component
public class UserInfo {
    @JsonProperty("EMAIL")
    private String email;

    @JsonProperty("PASSWORD")
    private String password;

    @JsonProperty("NAME")
    private String name;

    @JsonProperty("ISGOOGLE")
    private boolean isGoogle;

    public UserInfo(String email, String password, String name, boolean isGoogle){
        this.password = password;
        this.name = name;
        this.email = email;
        this.isGoogle = isGoogle;
    }

    public UserInfo(){
        this.email = "";
        this.password = "";
        this.name = "";
        this.google = false;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean getGoogleStatus(){
        return isGoogle;
    }

    public void setGoogleStatus(boolean google){
        this.isGoogle = google;
    }
}