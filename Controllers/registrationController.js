const express = require("express");
const router = express.Router();
const { sql, poolPromise } = require("../Config/db");
const RegistrationDTO = require("../Dtos/registrationDto");

// CREATE a new registration
router.post("/", async (req, res) => {
  try {
    const dto = new RegistrationDTO(req.body);
    const pool = await poolPromise;
    const result = await pool.request()
      .input("FirstName", sql.VarChar, dto.FirstName)
      .input("MiddleName", sql.VarChar, dto.MiddleName)
      .input("LastName", sql.VarChar, dto.LastName)
      .input("MobileNumber", sql.VarChar, dto.MobileNumber)
      .input("FullAddress", sql.VarChar, dto.FullAddress)
      .input("Profilepic", sql.VarChar, dto.Profilepic)
      .input("ProfessionId", sql.Int, dto.ProfessionId)
      .input("ExpertiseLevelId", sql.Int, dto.ExpertiseLevelId)
      .query(`
        INSERT INTO Registration (FirstName, MiddleName, LastName, MobileNumber, FullAddress, Profilepic, ProfessionId, ExpertiseLevelId)
        OUTPUT INSERTED.Id
        VALUES (@FirstName, @MiddleName, @LastName, @MobileNumber, @FullAddress, @Profilepic, @ProfessionId, @ExpertiseLevelId)
      `);

    res.status(201).json({ message: "Registration created successfully", id: result.recordset[0].Id });
  } catch (error) {
    res.status(500).json({ error: "Error creating registration", details: error.message });
  }
});

// READ all registrations
router.get("/", async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT * FROM Registration");
    const registrations = result.recordset.map(record => new RegistrationDTO(record));
    res.json(registrations);
  } catch (error) {
    res.status(500).json({ error: "Error fetching registrations", details: error.message });
  }
});

// READ a single registration by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await poolPromise;
    const result = await pool.request()
      .input("Id", sql.Int, id)
      .query("SELECT * FROM Registration WHERE Id = @Id");

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: "Registration not found" });
    }

    res.json(new RegistrationDTO(result.recordset[0]));
  } catch (error) {
    res.status(500).json({ error: "Error fetching registration", details: error.message });
  }
});

// UPDATE a registration
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const dto = new RegistrationDTO(req.body);
    const pool = await poolPromise;
    const result = await pool.request()
      .input("Id", sql.Int, id)
      .input("FirstName", sql.VarChar, dto.FirstName)
      .input("MiddleName", sql.VarChar, dto.MiddleName)
      .input("LastName", sql.VarChar, dto.LastName)
      .input("MobileNumber", sql.VarChar, dto.MobileNumber)
      .input("FullAddress", sql.VarChar, dto.FullAddress)
      .input("Profilepic", sql.VarChar, dto.Profilepic)
      .input("ProfessionId", sql.Int, dto.ProfessionId)
      .input("ExpertiseLevelId", sql.Int, dto.ExpertiseLevelId)
      .query(`
        UPDATE Registration
        SET FirstName = @FirstName, MiddleName = @MiddleName, LastName = @LastName, 
            MobileNumber = @MobileNumber, FullAddress = @FullAddress, Profilepic = @Profilepic, 
            ProfessionId = @ProfessionId, ExpertiseLevelId = @ExpertiseLevelId
        WHERE Id = @Id
      `);

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: "Registration not found" });
    }

    res.json({ message: "Registration updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error updating registration", details: error.message });
  }
});

// DELETE a registration
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await poolPromise;
    const result = await pool.request()
      .input("Id", sql.Int, id)
      .query("DELETE FROM Registration WHERE Id = @Id");

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: "Registration not found" });
    }

    res.json({ message: "Registration deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting registration", details: error.message });
  }
});

module.exports = router;
