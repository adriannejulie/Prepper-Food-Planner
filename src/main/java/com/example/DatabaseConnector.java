package com.example;

import java.sql.*;

import org.springframework.boot.autoconfigure.security.SecurityProperties.User;
import org.springframework.stereotype.Component;

@Component
public class DatabaseConnector {
    private Connection dbConnection;
    private Statement stmt;
    private UserInfo user;
    // private static final String JDBC_URL =
    // "jdbc:mysql://ensf401g17.mysql.database.azure.com:3306/prepper";
    private static final String JDBC_URL = "jdbc:mysql://127.0.0.1:3306/prepper";
    // private static final String USERNAME = "ensf401";
    private static final String USERNAME = "root";
    private static final String PASSWORD = "password";

    public DatabaseConnector() {
        try {

            dbConnection = DriverManager.getConnection(JDBC_URL, USERNAME, PASSWORD);
            this.stmt = dbConnection.createStatement();
            System.out.println("Connection is not null: " + (dbConnection != null));

        } catch (SQLException ex) {
            ex.printStackTrace();
        }
    }



    /**
     * User Spring functions
     * 
     * 
     * 
     * 
     */
    public boolean addUsers(UserInfo user) {

        this.user = user;

        String query = "INSERT INTO USERS (EMAIL, FIRSTNAME, LASTNAME, PASSWORD, ISGOOGLE) VALUES (?, ?, ?, ?, ?)";

        System.out.println("The SQL statement is: " + query + "\n"); // Echo for debugging

        try {
            // Disable auto-commit to start a transaction explicitly
            dbConnection.setAutoCommit(false);

            try (PreparedStatement preparedStatement = dbConnection.prepareStatement(query)) {
                // Set parameter values using setter methods
                preparedStatement.setString(0, user.getEmail());
                preparedStatement.setString(1, user.getFirstName());
                preparedStatement.setString(2, user.getLastName());
                preparedStatement.setString(3, user.getPassword());
                preparedStatement.setBoolean(4, user.getGoogleStatus());

                // Execute the insert
                int rowsInserted = preparedStatement.executeUpdate();

                if (rowsInserted > 0) {
                    System.out.println("Insert successful!");

                    // Commit the transaction
                    dbConnection.commit();

                    return true;
                } else {
                    System.out.println("No rows were inserted.");
                    return false;
                }
            }
        } catch (SQLException e) {
            e.printStackTrace(); // Handle or log the exception more gracefully

            // Rollback the transaction in case of an error
            try {
                if (dbConnection != null) {
                    dbConnection.rollback();
                }
            } catch (SQLException ex) {
                ex.printStackTrace();
            }
        } finally {
            try {
                // Enable auto-commit to return to the default behavior
                dbConnection.setAutoCommit(true);
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }

        return false;
    }

    public UserInfo getUserGoogle(String email, boolean isGoogle) {
        String query = "SELECT EMAIL, FIRSTNAME, LASTNAME, FROM USERS WHERE EMAIL = ?;";

        try (PreparedStatement preparedStatement = dbConnection.prepareStatement(query)) {
            preparedStatement.setString(1, email);

            try (ResultSet resultSet = preparedStatement.executeQuery()) {
                if (resultSet.next()) {
                    String userEmail = resultSet.getString("EMAIL");
                    String password = resultSet.getString("PASSWORD");
                    String firstname = resultSet.getString("FIRSTNAME");
                    String lastname = resultSet.getString("LASTNAME");
                    boolean google = resultSet.getBoolean("ISGOOGLE");
                    UserInfo user = new UserInfo(
                            userEmail, password, firstname, lastname, google);
                    this.user = user;
                    return user;
                }
            }
        } catch (SQLException e) {
            e.printStackTrace(); // Consider logging the error or throwing a custom exception.
        }
        return null;
    }

    public UserInfo getUser(String email, String password) {
        String query = "SELECT EMAIL, FIRSTNAME, LASTNAME, FROM USERS WHERE EMAIL = ? AND PASSWORD = ?;";

        try (PreparedStatement preparedStatement = dbConnection.prepareStatement(query)) {
            preparedStatement.setString(1, email);
            preparedStatement.setString(2, password);


            try (ResultSet resultSet = preparedStatement.executeQuery()) {
                if (resultSet.next()) {
                    String userEmail = resultSet.getString("EMAIL");
                    String userPassword = resultSet.getString("PASSWORD");
                    String firstname = resultSet.getString("FIRSTNAME");
                    String lastname = resultSet.getString("LASTNAME");
                    boolean google = resultSet.getBoolean("ISGOOGLE");
                    UserInfo user = new UserInfo(
                            userEmail, userPassword, firstname, lastname, google);
                    this.user = user;
                    return user;
                }
            }
        } catch (SQLException e) {
            e.printStackTrace(); // Consider logging the error or throwing a custom exception.
        }
        return null;
    }

    public void removeUserFromRecipe(String userID){
        //String query = "DELETE FROM SAVEDRECIPES WHERE USERID = ?;"
        String query = "UPDATE SAVEDRECIPES" + 
                        "SET USERID = NULL" + 
                        "WHERE USERID = ?;";

        try (PreparedStatement preparedStatement = dbConnection.prepareStatement(query)) {
            preparedStatement.setString(1, userID); // Corrected order

            int rowsAffected = preparedStatement.executeUpdate();

            // Optionally, check the number of rows affected
            if (rowsAffected > 0) {
                System.out.println(rowsAffected + " row(s) deleted successfully.");
            } else {
                System.out.println("No rows deleted.");
            }
        } catch (SQLException e) {
            e.printStackTrace(); // Handle the exception according to your application's needs
        }
    }
}
