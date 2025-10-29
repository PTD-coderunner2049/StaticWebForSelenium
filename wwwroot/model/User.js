class User {
  constructor(name, lname, email, password) {
    this.name = name;
    this.lname = lname; // Corrected property name for consistency
    this.email = email;
    this.password = password;
    this.id = Date.now();
  }
  getItemInfo() {
    return `${this.name} ${this.lname} with signed email: ${this.email}.`;
  }
}