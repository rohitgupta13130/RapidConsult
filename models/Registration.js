class Registration {
    constructor(FirstName, MiddleName, LastName, MobileNumber, FullAddress, Profilepic, ProfessionId, ExpertiseLevelId) {
      this.FirstName = FirstName;
      this.MiddleName = MiddleName;
      this.LastName = LastName;
      this.MobileNumber = MobileNumber;
      this.FullAddress = FullAddress;
      this.Profilepic = Profilepic; // Corrected casing from ProfilePic
      this.ProfessionId = ProfessionId; // Corrected from ProfessionalId
      this.ExpertiseLevelId = ExpertiseLevelId;
    }
  }
  
  module.exports = Registration;
  