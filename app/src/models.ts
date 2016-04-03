namespace ContactManagerApp {

  export class Contact {
    constructor(
      public firstName: string,
      public lastName: string,
      public avatar: string,
      public bio: string,
      public notes: Note[]
    ) {}
  }
  
  export class User {
    constructor(
      public name: string,
      public avatar: string,
      public bio: string,
      public notes: Note[]
    ) {}
    
    static createContact(contact: Contact): User {
      return new User(
        `${contact.firstName} ${contact.lastName}`,
        contact.avatar,
        contact.bio,
        []
      );
    }
  }

  export class Note {
    constructor(
      public title: string,
      public date: Date
    ) {}
  }
  
}

