package com.thyleaf.project.Entity;

import jakarta.persistence.*;

@Entity
public class Employee {

    @Id@GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Long id;

    @Column(name="name")
    private String name;
    @Column(name="status")
    private String status;


    @Column(name="department")
    private String department;

    @Column(name="email", nullable=false, length=200)
    private String email;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }



    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
