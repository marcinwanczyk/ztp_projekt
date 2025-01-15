package com.example.demo.component;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
import jakarta.annotation.PostConstruct;

@Component
public class SessionInitializer {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public SessionInitializer(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @PostConstruct
    public void init() {
        // Create SPRING_SESSION table
        jdbcTemplate.execute("CREATE TABLE IF NOT EXISTS SPRING_SESSION (" +
                "PRIMARY_ID CHAR(36) NOT NULL, " +
                "SESSION_ID CHAR(36) NOT NULL, " +
                "CREATION_TIME BIGINT NOT NULL, " +
                "LAST_ACCESS_TIME BIGINT NOT NULL, " +
                "MAX_INACTIVE_INTERVAL INT NOT NULL, " +
                "EXPIRY_TIME BIGINT NOT NULL, " +
                "PRINCIPAL_NAME VARCHAR(100), " +
                "CONSTRAINT SPRING_SESSION_PK PRIMARY KEY (PRIMARY_ID)" +
                ") ENGINE=InnoDB ROW_FORMAT=DYNAMIC;");

        // Create indexes for SPRING_SESSION table
        createIndexIfNotExists("SPRING_SESSION_IX1", "SPRING_SESSION", "SESSION_ID");
        createIndexIfNotExists("SPRING_SESSION_IX2", "SPRING_SESSION", "EXPIRY_TIME");
        createIndexIfNotExists("SPRING_SESSION_IX3", "SPRING_SESSION", "PRINCIPAL_NAME");

        // Create SPRING_SESSION_ATTRIBUTES table
        jdbcTemplate.execute("CREATE TABLE IF NOT EXISTS SPRING_SESSION_ATTRIBUTES (" +
                "SESSION_PRIMARY_ID CHAR(36) NOT NULL, " +
                "ATTRIBUTE_NAME VARCHAR(200) NOT NULL, " +
                "ATTRIBUTE_BYTES BLOB NOT NULL, " +
                "CONSTRAINT SPRING_SESSION_ATTRIBUTES_PK PRIMARY KEY (SESSION_PRIMARY_ID, ATTRIBUTE_NAME), " +
                "CONSTRAINT SPRING_SESSION_ATTRIBUTES_FK FOREIGN KEY (SESSION_PRIMARY_ID) REFERENCES SPRING_SESSION(PRIMARY_ID) ON DELETE CASCADE" +
                ") ENGINE=InnoDB ROW_FORMAT=DYNAMIC;");
    }

    private void createIndexIfNotExists(String indexName, String tableName, String columnName) {
        Integer count = jdbcTemplate.queryForObject(
                "SELECT COUNT(1) FROM INFORMATION_SCHEMA.STATISTICS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ? AND INDEX_NAME = ?",
                new Object[]{tableName, indexName},
                Integer.class
        );
        if (count == null || count == 0) {
            jdbcTemplate.execute(String.format("CREATE INDEX %s ON %s (%s)", indexName, tableName, columnName));
        }
    }
}