package com.example;
import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.rest.core.annotation.HandleBeforeCreate;
import org.springframework.format.annotation.DateTimeFormat;

@SpringBootApplication
@RestController
@CrossOrigin

@RequestMapping("/api/user")
public class UserInfoController{
    private final DatabaseConnector databaseConnector;
    private UserInfo user;
    public static void main(String[] args) {
        SpringApplication.run(UserInfoController.class, args);

    }
    
    @Autowired
    public UserInfoController(DatabaseConnector databaseConnector) {
        this.databaseConnector = databaseConnector;
    }

    @PostMapping("/signup")
    public ResponseEntity createAccount(@RequestBody UserInfo user)

    {
        this.user = user;
        DatabaseConnector databaseConnector = new DatabaseConnector();
        boolean userAdded = databaseConnector.addUsers(user);
        if (userAdded) {
            return new ResponseEntity<>(user, HttpStatus.CREATED);
        } else {
            // If the user already exists, return 208 (Already Reported)
            return new ResponseEntity<>("User already exists", HttpStatus.ALREADY_REPORTED);
        }
    }

    
    @GetMapping("/login")
    public ResponseEntity getCustomerLogin(@RequestParam(value = "EMAIL") String email, @RequestParam(value="PASSWORD") String password, @RequestParam(value="ISGOOGLE") boolean isGoogle) {
        DatabaseConnector databaseConnection = new DatabaseConnector();

        if (isGoogle == true){
            UserInfo user1 = databaseConnection.getUserGoogle(email, isGoogle);
            this.user = user1;
        } else {
            UserInfo user1 = databaseConnection.getUser(email, password);
            this.user = user1;
        }        
        if (user != null) {
            return new ResponseEntity<>(user, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

     /*

     //Needs functions that accesses userID, so that we can delete the recipe and/or user

    @DeleteMapping("/delete-user")
    public ResponseEntity<Void> deleteUser(@RequestParam (value = "EMAIL") String email) {
        DatabaseConnector databaseConnection = new DatabaseConnector();
        SavedRecipes userRecipe = databaseConnection.removeUserFromRecipe(email);
        //SavedRecipes userRecipe = databaseConnection.removeRecipe(email);
        userRecipe.deleteUser(email);

        UserInfo user = databaseConnection.removeUser(email);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    */

}
