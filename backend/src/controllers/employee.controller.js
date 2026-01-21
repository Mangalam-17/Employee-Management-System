import { employeeService } from "../services/employee.service.js";
import {
  createEmployeeSchema,
  updateEmployeeSchema,
} from "../validations/employee.validation.js";
import createError from "http-errors";

class EmployeeController {
  async create(req, res, next) {
    try {
      // Parse & validate input via Zod
      const data = createEmployeeSchema.parse(req.body);

      const employee = await employeeService.createEmployee(data);

      return res.status(201).json({
        success: true,
        data: employee,
      });
    } catch (error) {
      // Handle Zod Validation Errors
      if (error.name === "ZodError") {
        const message = error.issues?.[0]?.message || "Invalid data";
        return next(createError.BadRequest(message));
      }

      // Handle known business conflicts (e.g., duplicate email)
      if (error.status === 409) {
        return next(createError.Conflict(error.message));
      }

      return next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const employee = await employeeService.getEmployeeById(req.params.id);

      return res.json({
        success: true,
        data: employee,
      });
    } catch (error) {
      next(error);
    }
  }

  async getActive(req, res, next) {
    try {
      const params = {
        page: Number(req.query.page) || 1,
        limit: Number(req.query.limit) || 10,
        search: req.query.search,
        department: req.query.department,
        sort: req.query.sort,
        order: req.query.order,
      };

      const employees = await employeeService.getActiveEmployees(params);

      return res.json({
        success: true,
        data: employees,
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const data = updateEmployeeSchema.parse(req.body);

      const updated = await employeeService.updateEmployee(req.params.id, data);

      return res.json({
        success: true,
        data: updated,
      });
    } catch (error) {
      if (error.name === "ZodError") {
        const message = error.issues?.[0]?.message || "Invalid data";
        return next(createError.BadRequest(message));
      }

      if (error.status === 409) {
        return next(createError.Conflict(error.message));
      }

      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const deleted = await employeeService.deleteEmployee(req.params.id);

      return res.json({
        success: true,
        message: "Employee marked INACTIVE",
        data: deleted,
      });
    } catch (error) {
      next(error);
    }
  }
}

export const employeeController = new EmployeeController();
