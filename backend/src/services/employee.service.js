import createError from "http-errors";
import { employeeRepository } from "../repositories/employee.repository.js";

class EmployeeService {
  async createEmployee(data) {
    const existing = await employeeRepository.findByEmail(data.email);
    if (existing) {
      throw createError.Conflict("Email already exists");
    }

    const employee = await employeeRepository.create(data);
    return employee;
  }

  async getEmployeeById(id) {
    const employee = await employeeRepository.findById(id);
    if (!employee) {
      throw createError.NotFound("Employee not found");
    }
    return employee;
  }

  async getActiveEmployees(params) {
    const employees = await employeeRepository.findActive(params);
    return employees;
  }

  async updateEmployee(id, updateData) {
    const existing = await employeeRepository.findById(id);
    if (!existing) {
      throw createError.NotFound("Employee not found");
    }

    if (updateData.email && updateData.email !== existing.email) {
      const emailExists = await employeeRepository.findByEmail(
        updateData.email,
      );
      if (emailExists) {
        throw createError.Conflict("Email already exists");
      }
    }

    const updated = await employeeRepository.updateById(id, updateData);
    return updated;
  }

  async deleteEmployee(id) {
    const existing = await employeeRepository.findById(id);
    if (!existing) {
      throw createError.NotFound("Employee not found");
    }

    const deleted = await employeeRepository.softDelete(id);
    return deleted;
  }
}

export const employeeService = new EmployeeService();
