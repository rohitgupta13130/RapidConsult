const express = require("express");
const router = express.Router();
const { sql, poolPromise } = require("../Config/db");

// CREATE a new registration
router.post("/", async (req, res) => {
  try {
    const { FirstName, MiddleName, LastName, MobileNumber, FullAddress, ProfilePic, ProfessionalId, ExpertiseLevelId } = req.body;
    
    const pool = await poolPromise;
    const result = await pool.request()
      .input("FirstName", sql.VarChar, FirstName)
      .input("MiddleName", sql.VarChar, MiddleName)
      .input("LastName", sql.VarChar, LastName)
      .input("MobileNumber", sql.VarChar, MobileNumber)
      .input("FullAddress", sql.VarChar, FullAddress)
      .input("ProfilePic", sql.VarChar, ProfilePic)
      .input("ProfessionalId", sql.Int, ProfessionalId)
      .input("ExpertiseLevelId", sql.Int, ExpertiseLevelId)
      .query(`
        INSERT INTO Registration (FirstName, MiddleName, LastName, MobileNumber, FullAddress, ProfilePic, ProfessionalId, ExpertiseLevelId)
        VALUES (@FirstName, @MiddleName, @LastName, @MobileNumber, @FullAddress, @ProfilePic, @ProfessionalId, @ExpertiseLevelId)
      `);

    res.status(201).json({ message: "Registration created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// READ all registration
router.get("/", async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT * FROM Registration");

    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: error.message });
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

    res.json(result.recordset[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE a registration
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { FirstName, MiddleName, LastName, MobileNumber, FullAddress, ProfilePic, ProfessionalId, ExpertiseLevelId } = req.body;

    const pool = await poolPromise;
    const result = await pool.request()
      .input("Id", sql.Int, id)
      .input("FirstName", sql.NVarChar, FirstName)
      .input("MiddleName", sql.NVarChar, MiddleName)
      .input("LastName", sql.NVarChar, LastName)
      .input("MobileNumber", sql.NVarChar, MobileNumber)
      .input("FullAddress", sql.NVarChar, FullAddress)
      .input("ProfilePic", sql.NVarChar, ProfilePic)
      .input("ProfessionalId", sql.Int, ProfessionalId)
      .input("ExpertiseLevelId", sql.Int, ExpertiseLevelId)
      .query(`
        UPDATE Registration
        SET FirstName = @FirstName, MiddleName = @MiddleName, LastName = @LastName, 
            MobileNumber = @MobileNumber, FullAddress = @FullAddress, ProfilePic = @ProfilePic, 
            ProfessionalId = @ProfessionalId, ExpertiseLevelId = @ExpertiseLevelId
        WHERE Id = @Id
      `);

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: "Registration not found" });
    }

    res.json({ message: "Registration updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
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
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
