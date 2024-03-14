package com.example;

import org.springframework.stereotype.Component;
import com.fasterxml.jackson.annotation.JsonProperty;

@Component
public class UserInfo {
    @JsonProperty("EMAIL")
    private String email;

    @JsonProperty("PASSWORD")
    private String password;

    @JsonProperty("FIRSTNAME")
    private String firstname;

    @JsonProperty("LASTNAME")
    private String lastname;

    @JsonProperty("ISGOOGLE")
    private boolean isGoogle;

    public UserInfo(String email, String password, String firstname, String lastname, boolean isGoogle){
        this.password = password;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.isGoogle = isGoogle;
    }

    public UserInfo(){
        this.email = "";
        this.firstname = "";
        this.lastname = "";
        this.isGoogle = false;
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

    public String getFirstName() {
        return firstname;
    }

    public String getLastName() {
        return lastname;
    }

    public void setFirstName(String firstname) {
        this.firstname = firstname;
    }

    public void setLastName(String lastname) {
        this.lastname = lastname;
    }

    public boolean getGoogleStatus(){
        return isGoogle;
    }

    public void setGoogleStatus(boolean google){
        this.isGoogle = google;
    }
}