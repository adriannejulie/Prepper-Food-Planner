package com;
import java.sql.*;

public class DatabaseConnector{ 
    private Connection dbConnection;
    private static final String JDBC_URL = "jdbc:mysql://ensf401g17.mysql.database.azure.com:3306/prepper";
    private static final String USERNAME = "ensf401";
    private static final String PASSWORD = "password";
    
    public DatabaseConnector() {
        try {

            dbConnection = DriverManager.getConnection(JDBC_URL, USERNAME, PASSWORD);
            System.out.println("Connection is not null: " + (dbConnection != null));

        } catch(SQLException ex) {
                ex.printStackTrace();
            }
    }
}
