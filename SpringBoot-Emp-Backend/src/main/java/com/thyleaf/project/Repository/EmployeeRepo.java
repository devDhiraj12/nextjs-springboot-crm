package com.thyleaf.project.Repository;

import com.thyleaf.project.Entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public interface EmployeeRepo extends CrudRepository<Employee, Long> {



}
