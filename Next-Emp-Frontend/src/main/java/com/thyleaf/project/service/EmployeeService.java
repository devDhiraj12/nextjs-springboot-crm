package com.thyleaf.project.service;

import com.thyleaf.project.Entity.Employee;
import com.thyleaf.project.Repository.EmployeeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {
    @Autowired
    private EmployeeRepo employeeRepo;

    public List<Employee> getAllEmployees()
    {
        List<Employee> result = (List<Employee>) employeeRepo.findAll();

        if(result.size() > 0) {
            return result;
        } else {
            return new ArrayList<Employee>();
        }
    }

    public Employee getEmployeeById(Long id)
    {
        Optional<Employee> employee = employeeRepo.findById(id);

        if(employee.isPresent()) {
            return employee.get();
        } else {
             System.out.println("No employee record exist for given id");
            return employee.orElseThrow();

        }
    }

    public Employee createOrUpdateEmployee(Employee employee)
    {
        if(employee.getId()  == null)
        {
            employee = employeeRepo.save(employee);

            return employee;
        }
        else
        {
            Optional<Employee> employee1 = employeeRepo.findById(employee.getId());

            if(employee1.isPresent())
            {
                Employee newemployee = employee1.get();
                newemployee.setEmail(employee.getEmail());
                newemployee.setName(employee.getName());
                newemployee.setStatus(employee.getStatus());
                newemployee.setDepartment(employee.getDepartment());



                newemployee = employeeRepo.save(newemployee);

                return newemployee;
            } else {
                employee = employeeRepo.save(employee);

                return employee;
            }
        }
    }


    public Employee deleteEmployeeById(Long id)
    {
        Optional<Employee> employee = employeeRepo.findById(id);

        if(employee.isPresent())
        {
            employeeRepo.deleteById(id);
        } else {
            System.out.println("No employee record exist for given id");
        }
        return null;
    }


}
