import { Employee } from "../models/employee.model.js";

class EmployeeRepository {
  async create(data) {
    return await Employee.create(data);
  }

  async findById(id) {
    return await Employee.findById(id);
  }

  async findActive(params = {}) {
    const { page = 1, limit = 10, search, department, sort, order } = params;

    const query = {
      status: "ACTIVE",
    };

    if (department) {
      query.department = department;
    }

    if (search) {
      query.$text = { $search: search };
    }

    const sortQuery = {};
    if (sort) {
      sortQuery[sort] = order === "desc" ? -1 : 1;
    }

    const skip = (page - 1) * limit;

    return await Employee.find(query).sort(sortQuery).skip(skip).limit(limit);
  }

  async updateById(id, updateData) {
    return await Employee.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
  }

  async softDelete(id) {
    return await Employee.findByIdAndUpdate(
      id,
      { status: "INACTIVE" },
      { new: true },
    );
  }

  async findByEmail(email) {
    return await Employee.findOne({ email });
  }
}

export const employeeRepository = new EmployeeRepository();
