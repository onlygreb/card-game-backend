// Declaring commom project errors.

export class NotEnoughCoins extends Error {
    constructor() {
        super("Not enough coins.");
        this.name = "NotEnoughCoins";
    }
}

export class EntityNotFound extends Error {
    constructor(entityName: string) {
        super(`${entityName} not found.`);
        this.name = "EntityNotFound";
    }
}

export class MissingField extends Error {
    constructor(fieldName: string) {
        super(`Missing ${fieldName} field.`);
        this.name = "MissingField";
    }
}

export class FieldMinimalCharacters extends Error {
    constructor(fieldName: string, charCount: number) {
        super(`The field ${fieldName} must have at least ${charCount} characters.`);
        this.name = "FieldMinimalCharacters";
    }
}

export class InvalidEmail extends Error {
    constructor() {
        super("Email is not valid.");
        this.name = "InvalidEmail";
    }
}

export class UserNameOrEmailIsAlreadyInUse extends Error {
    constructor() {
        super("UserName or Email is already in use.");
        this.name = "UserNameOrEmailIsAlreadyInUse";
    }
}

export class InvalidUserNameOrPassword extends Error {
    constructor() {
        super("Invalid UserName or Password.");
        this.name = "InvalidUserNameOrPassword";
    }
}

