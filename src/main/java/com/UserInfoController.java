package com;
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

    @Autowired
    public UserInfoController(DatabaseConnector databaseConnector) {
        this.databaseConnector = databaseConnector;
    }

    public static void main(String[] args) {
        SpringApplication.run(UserInfoController.class, args);

    }

    @PostMapping("/signup")
    public ResponseEntity createAccount(@RequestBody UserInfo user)

    {
        this.user = user;
        DatabaseConnector databaseConnection = new DatabaseConnector();
        boolean userAdded = databaseConnection.addUsers(user);
        if (userAdded) {
            return new ResponseEntity<>(user, HttpStatus.CREATED);
        } else {
            // If the user already exists, return 208 (Already Reported)
            return new ResponseEntity<>("User already exists", HttpStatus.ALREADY_REPORTED);
        }
    }

    @GetMapping("/login")
    public ResponseEntity login(@RequestBody UserInfo user) {
        this.flight = flight;
        

        DatabaseConnection databaseConnection = new DatabaseConnection();
        boolean booking = databaseConnection.addCustomerFlight(flight);
        Customers customer1 = databaseConnection.getCustomer(flight.getUsername());
        this.customer = customer1;
        System.out.println(flight.getNumber());

        Flight flightInfo = databaseConnection.getFlightOnly(flight.getNumber());

        SimpleDateFormat dateFormat = new SimpleDateFormat("HH:mm");
        String formattedTime = dateFormat.format(flightInfo.getTimeDeparture());

        flight.setDestination(flightInfo.getDestination());
        flight.setOrigin(flightInfo.getOrigin());
        flight.setTimeDeparture(flightInfo.getTimeDeparture());


        Map<String, String> airportCityMap = createAirportCityMap();

        // Get the value associated with the key "CYYZ"
        String des = airportCityMap.get(flight.getDestination());
        String or = airportCityMap.get(flight.getOrigin());
        
        if (booking){
            String insurance = (flight.getInsurance() == 1)? "Yes" : "No";
            double cost = 0;
            double ordinary = 200;
            if(flight.getSeatType() == "Business"){
                cost = ordinary * 1.7;
            } else if (flight.getSeatType() == "Comfort"){
                cost = ordinary * 1.4;
            } else {
                cost = ordinary;
            }

            if(insurance == "Yes"){
                cost += 10.0;
            }

            String email = customer1.getEmail();
            String subject = "Air React Flight Information";
            String body = "Thank you for choosing to fly with Air React.\n"
                           + "You have booked the following: \n"
                           + "Destination: " + des
                           + "\nOrigin: " + or
                           + "\nDate and Time: " + flight.getDepartureTime().toString().split(" ")[0] + " " + formattedTime
                           + "\nSeat Type: " + flight.getSeatNumber() + " - " + flight.getSeatType() 
                           + "\nInsurance Purchased: " + insurance
                           + "\n\nTotal Payment: " + cost
                           + "\nYour boarding pass will be available to you after checking in with us." 
                           + "\n If you have any questions about your flight, please contact our Help desk. \n Have a wonderful day!";
    
    
            emailService.sendEmail(email, subject, body);
            return new ResponseEntity<>(flight, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(flight, HttpStatus.ALREADY_REPORTED);
        }
    }

    @DeleteMapping("/cancel")
    public ResponseEntity<Void> cancelFlight(@RequestParam (value = "FLIGHT_NUMBER") String flightNumber, @RequestParam (value = "USERNAME") String username) {
        DatabaseConnection databaseConnection = new DatabaseConnection();
        databaseConnection.removeCustomerFlight(flightNumber, username);
        Flight flight = databaseConnection.getFlight(flightNumber);
        System.out.println(flight.getDestination());

        Customers customer1 = databaseConnection.getCustomer(username);
        this.customer = customer1;
        Map<String, String> airportCityMap = createAirportCityMap();

        String des = airportCityMap.get(flight.getDestination());
        String or = airportCityMap.get(flight.getOrigin());

            String email = customer1.getEmail();
            String subject = "Flight Cancellation";
            String body = "Your flight " + flightNumber 
                           + " from " + or
                           + " to " + des
                           + " on " + flight.getTimeDeparture().toString().split(" ")[0]
                           + " has been cancelled. \n"
                           + "\n If you did not cancel this flight, please contact our Help desk. \n";
    
    
            emailService.sendEmail(email, subject, body);
        return new ResponseEntity<>(HttpStatus.OK);
    }


    
    /** For email costs
     * ordinary = 200
     * confmort = ordinary *  1.4
     * business = ordinary * 1.7
     * insurance = 10
     */

}
