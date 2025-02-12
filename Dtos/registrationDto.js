class RegistrationDTO {
  constructor({ Id, FirstName, MiddleName, LastName, MobileNumber, FullAddress, Profilepic, ProfessionId, ExpertiseLevelId }) {
    this.Id = Id;
    this.FirstName = FirstName;
    this.MiddleName = MiddleName;
    this.LastName = LastName;
    this.MobileNumber = MobileNumber;
    this.FullAddress = FullAddress;
    this.Profilepic = Profilepic;
    this.ProfessionId = ProfessionId;
    this.ExpertiseLevelId = ExpertiseLevelId;
  }
}

module.exports = RegistrationDTO;
