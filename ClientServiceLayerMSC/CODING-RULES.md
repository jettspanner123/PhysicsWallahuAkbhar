# Coding Rules

## 1. Core Philosophy

This project follows a strict, class-oriented, strongly typed architecture.

The codebase must prioritize:

- Strong typing over implicit typing.
- Explicit contracts over inferred behavior.
- Classes over standalone functions.
- Clear separation of concerns.
- One class per file.
- Consistent PascalCase naming.
- Predictable file and directory structure.
- Dependency injection where appropriate.
- Small, focused classes with a single responsibility.
- Singleton-by-default application architecture.

When in doubt, prefer the more explicit and strongly typed implementation.

---

# 2. Language Rules

## 2.1 TypeScript Only

All application code must use TypeScript.

Do not introduce JavaScript files.

Allowed:

```text
.ts
.tsx
```

Avoid:

```text
.js
.jsx
```

---

# 3. Strict Typing

Everything must be strongly typed.

Do not use:

```typescript
any
```

unless there is an extremely specific and documented reason.

Prefer:

```typescript
unknown
```

when the type is genuinely unknown.

Bad:

```typescript
const user: any = response.data;
```

Good:

```typescript
const user: UserModel = response.data;
```

## 3.1 No Implicit Types for Public APIs

All public class methods must explicitly define:

- Parameter types.
- Return types.

Bad:

```typescript
public getUser(id) {
    return this.userRepository.find(id);
}
```

Good:

```typescript
public getUser(id: string): UserModel {
    return this.userRepository.find(id);
}
```

This applies to:

- Controllers.
- Services.
- Models.
- Repositories.
- Utility classes.
- Factories.
- Managers.
- Adapters.
- Providers.

---

# 4. Naming Convention

All classes, interfaces, types, enums, and files must use PascalCase unless the framework requires a specific filename convention.

Examples:

```text
UserModel.ts
UserController.ts
UserServices.ts
UserRepository.ts
AuthenticationServices.ts
DatabaseServices.ts
ApplicationConfig.ts
```

Do not use:

```text
userModel.ts
user-controller.ts
user_service.ts
```

---

# 5. Class Naming

Classes must communicate their responsibility through a suffix.

## Models

Models must end with:

```text
Model
```

Examples:

```text
UserModel
ProductModel
OrderModel
AuthenticationModel
```

File:

```text
UserModel.ts
```

## Controllers

Controllers must end with:

```text
Controller
```

Examples:

```text
UserController
AuthenticationController
ProductController
OrderController
```

File:

```text
UserController.ts
```

## Services

Services must end with:

```text
Services
```

Examples:

```text
UserServices
AuthenticationServices
PaymentServices
EmailServices
DatabaseServices
```

File:

```text
UserServices.ts
```

Do NOT use:

```text
UserService
```

Use:

```text
UserServices
```

## Repositories

Repositories must end with:

```text
Repository
```

Examples:

```text
UserRepository
ProductRepository
OrderRepository
```

## Providers

Providers must end with:

```text
Provider
```

Examples:

```text
DatabaseProvider
EmailProvider
StorageProvider
AuthenticationProvider
```

## Managers

Managers must end with:

```text
Manager
```

Examples:

```text
CacheManager
SessionManager
FileManager
```

## Factories

Factories must end with:

```text
Factory
```

Examples:

```text
UserFactory
TokenFactory
DatabaseFactory
```

## Adapters

Adapters must end with:

```text
Adapter
```

Examples:

```text
StripeAdapter
StorageAdapter
DatabaseAdapter
```

---

# 6. One Class Per File

Every application file must contain exactly one class.

Bad:

```typescript
export class UserModel {
}

export class UserFactory {
}
```

Good:

```text
UserModel.ts
UserFactory.ts
```

Each file contains exactly one class.

If an interface, enum, or type is required as a separate contract, it must be placed in its own file.

---

# 7. Everything Should Be a Class

Application-level behavior must be represented through classes.

Avoid standalone functions for business/application logic.

Bad:

```typescript
export function calculateTotal(
    price: number,
    quantity: number
): number {
    return price * quantity;
}
```

Good:

```typescript
export class PricingServices {

    public calculateTotal(
        price: number,
        quantity: number
    ): number {
        return price * quantity;
    }
}
```

Pure utility behavior should also be placed inside a dedicated class.

---

# 8. Constants Must Also Be Classes

Do not create standalone exported constants for application configuration or business constants.

Bad:

```typescript
export const MAX_LOGIN_ATTEMPTS = 5;
```

Preferred:

```typescript
export class AuthenticationConstants {

    public static readonly MAX_LOGIN_ATTEMPTS: number = 5;

    private constructor() {
    }
}
```

Constants must be immutable.

Use `static readonly` for values that do not require instance state.

---

# 9. Singleton Architecture

## 9.1 Singleton by Default

All stateless application-level classes must use the Singleton pattern by default.

This includes:

- Controllers
- Services
- Repositories
- Providers
- Managers
- Factories
- Adapters
- Configuration classes
- Utility classes
- Infrastructure classes

A new instance must NOT be created with `new` throughout the application when the class is intended to be a singleton.

Bad:

```typescript
const userServices: UserServices = new UserServices();
const anotherUserServices: UserServices = new UserServices();
```

Good:

```typescript
const userServices: UserServices =
    UserServices.getInstance();
```

There must be exactly one shared instance for each singleton class during the application lifecycle.

---

# 10. Singleton Implementation

For classes where singleton behavior is managed manually, the class must:

1. Have a private constructor.
2. Have a private static instance.
3. Expose a public static `getInstance()` method.
4. Return the same instance on every call.
5. Avoid publicly accessible constructors.

Example:

```typescript
export class UserServices {

    private static instance: UserServices | null = null;

    private constructor() {
    }

    public static getInstance(): UserServices {

        if (UserServices.instance === null) {
            UserServices.instance = new UserServices();
        }

        return UserServices.instance;
    }

    public getUser(
        id: string
    ): Promise<UserModel | null> {
        // Implementation
    }
}
```

## Framework DI Exception

If the framework already provides a reliable singleton dependency-injection lifecycle, use the framework's DI container instead of manually implementing `getInstance()`.

For example, in NestJS, the default provider scope is singleton. Do not add redundant manual singleton logic to NestJS providers unless there is a specific architectural reason.

The architectural requirement remains:

```text
One application-level instance
+
Framework-managed lifecycle
```

---

# 11. Singleton Dependency Resolution

Singleton dependencies should resolve to their existing singleton instance.

When using manual singleton management:

```typescript
export class UserServices {

    private static instance: UserServices | null = null;

    private readonly userRepository: UserRepository;

    private constructor() {
        this.userRepository =
            UserRepository.getInstance();
    }

    public static getInstance(): UserServices {

        if (UserServices.instance === null) {
            UserServices.instance =
                new UserServices();
        }

        return UserServices.instance;
    }
}
```

When using a DI framework, prefer constructor injection:

```typescript
export class UserServices {

    public constructor(
        private readonly userRepository: UserRepository
    ) {
    }
}
```

Do not instantiate DI-managed dependencies manually.

---

# 12. Exceptions to Singleton

Not every class should be a singleton.

Classes representing data that must have multiple independent instances are explicitly exempt.

These include:

- Models
- DTOs
- Request objects
- Response objects
- Value objects
- Error instances
- Entities

Example:

```typescript
export class UserModel {

    public readonly id: string;
    public readonly name: string;
    public readonly email: string;

    public constructor(
        id: string,
        name: string,
        email: string
    ) {
        this.id = id;
        this.name = name;
        this.email = email;
    }
}
```

Multiple instances are expected:

```typescript
const userOne: UserModel =
    new UserModel(
        '1',
        'John',
        'john@example.com'
    );

const userTwo: UserModel =
    new UserModel(
        '2',
        'Jane',
        'jane@example.com'
    );
```

Models MUST NOT be forced into singleton behavior merely to satisfy the singleton rule.

---

# 13. Singleton Lifecycle

Singletons must live for the lifetime of the application process unless explicitly designed otherwise.

Do not:

- Recreate singleton instances per request.
- Reset singleton instances during normal application execution.
- Store request-specific state in singleton instances.
- Create temporary singleton replacements.

---

# 14. Stateless Singleton Rule

Singleton services, controllers, repositories, providers, managers, factories, and adapters must not store mutable request-specific state.

Bad:

```typescript
export class UserServices {

    private currentUser: UserModel | null = null;
}
```

Good:

```typescript
export class UserServices {

    public async getUser(
        id: string
    ): Promise<UserModel | null> {
        // Request-specific data stays local.
    }
}
```

Request-specific state belongs in:

- Method-local variables.
- Request-scoped objects.
- Models.
- DTOs.
- Explicitly request-scoped dependencies.

---

# 15. Controllers

Controllers are responsible only for handling external requests.

Controllers may:

- Receive requests.
- Validate request input.
- Call services.
- Return responses.
- Map external data to internal models.

Controllers must NOT contain business logic.

Bad:

```typescript
export class UserController {

    public createUser(
        name: string,
        email: string
    ): UserModel {

        if (email.includes('@') === false) {
            throw new Error('Invalid email');
        }

        return new UserModel();
    }
}
```

Good:

```typescript
export class UserController {

    private readonly userServices: UserServices;

    public constructor(
        userServices: UserServices
    ) {
        this.userServices = userServices;
    }

    public createUser(
        name: string,
        email: string
    ): UserModel {
        return this.userServices.createUser(name, email);
    }
}
```

Controllers should normally be singleton-scoped.

---

# 16. Services

Services contain application and business logic.

Services may:

- Execute business rules.
- Coordinate repositories.
- Coordinate providers.
- Perform calculations.
- Execute workflows.
- Transform domain data.

Services must NOT:

- Handle HTTP-specific concerns.
- Directly access request/response objects.
- Contain controller logic.

Services should normally be singleton-scoped and stateless.

Example:

```typescript
export class UserServices {

    private readonly userRepository: UserRepository;

    public constructor(
        userRepository: UserRepository
    ) {
        this.userRepository = userRepository;
    }

    public async createUser(
        name: string,
        email: string
    ): Promise<UserModel> {

        const userModel: UserModel =
            new UserModel(
                crypto.randomUUID(),
                name,
                email
            );

        return this.userRepository.create(userModel);
    }
}
```

---

# 17. Models

Models represent application/domain data.

Models may contain:

- Properties.
- Constructors.
- Domain-specific behavior.
- Validation directly related to the model.
- Serialization/deserialization logic when appropriate.

Models should NOT:

- Make HTTP requests.
- Access databases directly.
- Depend on controllers.
- Contain application workflows.

Models are normally non-singleton because the application needs multiple independent model instances.

---

# 18. Repository Rules

Repositories are responsible for persistence.

Repositories may:

- Read data.
- Write data.
- Update data.
- Delete data.
- Query databases.

Repositories must NOT contain business rules.

Repositories should normally be singleton-scoped.

Example:

```typescript
export class UserRepository {

    private readonly databaseProvider: DatabaseProvider;

    public constructor(
        databaseProvider: DatabaseProvider
    ) {
        this.databaseProvider = databaseProvider;
    }

    public async findById(
        id: string
    ): Promise<UserModel | null> {

        return this.databaseProvider.findUserById(id);
    }
}
```

---

# 19. Provider Rules

Providers should normally be singleton-scoped.

Examples:

```text
DatabaseProvider
StorageProvider
EmailProvider
AuthenticationProvider
CacheProvider
```

Providers represent shared infrastructure resources.

Do not create a new database client, cache client, HTTP client, or SDK client for every request unless the underlying library explicitly requires it.

---

# 20. Manager Rules

Managers should normally be singleton-scoped.

Examples:

```text
CacheManager
SessionManager
ConfigurationManager
LoggingManager
```

Managers should coordinate shared application resources and remain stateless with respect to individual requests.

---

# 21. Factory Rules

Factories should normally be singleton-scoped.

The factory is singleton; the objects it creates are not.

Example:

```typescript
export class UserFactory {

    public create(
        id: string,
        name: string,
        email: string
    ): UserModel {

        return new UserModel(
            id,
            name,
            email
        );
    }
}
```

---

# 22. Adapter Rules

Adapters should normally be singleton-scoped.

Third-party APIs must be isolated behind adapters.

Architecture:

```text
Services
    ↓
Adapter
    ↓
Third-Party API
```

Business logic must not depend directly on third-party SDK implementation details.

---

# 23. Dependency Direction

Dependencies should flow downward:

```text
Controller
    ↓
Services
    ↓
Repository
    ↓
Provider
    ↓
Infrastructure
```

Models should remain independent of infrastructure.

Avoid:

```text
Controller → Database
Controller → Provider
Model → Database
Model → Controller
Repository → Controller
```

---

# 24. Dependency Injection

Prefer constructor dependency injection.

Good:

```typescript
export class UserServices {

    public constructor(
        private readonly userRepository: UserRepository
    ) {
    }
}
```

Avoid creating dependencies internally when a DI container is available.

Bad:

```typescript
export class UserServices {

    private readonly userRepository: UserRepository =
        new UserRepository();
}
```

For NestJS, use constructor injection and allow NestJS to manage singleton lifecycle.

---

# 25. Access Modifiers

Explicitly define access modifiers.

Prefer:

```text
public
private
protected
```

Bad:

```typescript
export class UserServices {

    userRepository: UserRepository;
}
```

Good:

```typescript
export class UserServices {

    private readonly userRepository: UserRepository;
}
```

---

# 26. Immutability

Prefer immutable properties whenever possible.

Use:

```typescript
readonly
```

Example:

```typescript
private readonly userRepository: UserRepository;
```

Avoid mutable state unless required.

---

# 27. Async Code

Use `async` / `await`.

Always explicitly type asynchronous return values.

Good:

```typescript
public async getUser(
    id: string
): Promise<UserModel | null> {

    return this.userRepository.findById(id);
}
```

Avoid unnecessary promise chaining.

---

# 28. Error Handling

Errors must be represented by classes.

For domain/application errors, create dedicated classes.

Example:

```typescript
export class UserNotFoundError extends Error {

    public constructor() {
        super('User was not found.');
    }
}
```

Errors should follow the one-class-per-file rule.

Error instances are NOT singletons.

---

# 29. No Magic Values

Avoid hard-coded values inside business logic.

Bad:

```typescript
if (attempts > 5) {
}
```

Good:

```typescript
if (
    attempts >
    AuthenticationConstants.MAX_LOGIN_ATTEMPTS
) {
}
```

---

# 30. Functions vs Methods

Standalone functions should generally not exist in application code.

Prefer class methods.

Bad:

```typescript
export function formatUserName(
    firstName: string,
    lastName: string
): string {
    return `${firstName} ${lastName}`;
}
```

Good:

```typescript
export class StringServices {

    public formatUserName(
        firstName: string,
        lastName: string
    ): string {
        return `${firstName} ${lastName}`;
    }
}
```

Application-level behavior belongs to classes.

---

# 31. Avoid God Classes

Although everything is class-based, do not create massive classes.

Each class must have one clear responsibility.

Bad:

```text
ApplicationServices
    ├── Authentication
    ├── Payments
    ├── Users
    ├── Emails
    ├── Files
    └── Analytics
```

Prefer:

```text
AuthenticationServices
PaymentServices
UserServices
EmailServices
FileServices
AnalyticsServices
```

---

# 32. File Naming

File names must match the primary class exactly.

Correct:

```text
UserController.ts
UserServices.ts
UserModel.ts
UserRepository.ts
DatabaseProvider.ts
CacheManager.ts
```

Incorrect:

```text
user.controller.ts
userService.ts
user_model.ts
database-provider.ts
```

---

# 33. Imports

Use explicit imports.

Prefer:

```typescript
import { UserModel } from '../Models/UserModel';
import { UserRepository } from '../Repositories/UserRepository';
```

Avoid wildcard imports:

```typescript
import * as Models from '../Models';
```

Avoid unnecessary barrel files unless there is a strong architectural reason.

---

# 34. No Circular Dependencies

Circular dependencies are prohibited.

Avoid:

```text
UserServices
    ↓
OrderServices
    ↓
UserServices
```

If two classes require each other, extract the shared responsibility into another class.

---

# 35. Type Assertions

Avoid unnecessary type assertions.

Avoid:

```typescript
const user = response.data as UserModel;
```

Prefer validation and explicit model construction.

Never use:

```typescript
as any
```

as a workaround for typing problems.

---

# 36. Nullability

Handle nullable values explicitly.

Good:

```typescript
const userModel: UserModel | null =
    await this.userRepository.findById(id);

if (userModel === null) {
    throw new UserNotFoundError();
}
```

Avoid unnecessary non-null assertions:

```typescript
userModel!.name
```

---

# 37. Configuration

Configuration must be strongly typed.

Avoid scattering environment variable access throughout the application.

Prefer a dedicated configuration class:

```typescript
export class DatabaseConfig {

    public readonly url: string;

    public constructor(
        url: string
    ) {
        this.url = url;
    }
}
```

Configuration classes should normally be singleton-scoped when managed by the application container.

---

# 38. Environment Variables

Environment variables must be validated when the application starts.

Never assume an environment variable exists.

Bad:

```typescript
const apiKey: string = process.env.API_KEY!;
```

Prefer explicit validation and configuration initialization.

---

# 39. DTOs

DTOs must be strongly typed.

DTOs are data contracts and are normally non-singleton.

Example:

```typescript
export class CreateUserDto {

    public readonly name: string;
    public readonly email: string;

    public constructor(
        name: string,
        email: string
    ) {
        this.name = name;
        this.email = email;
    }
}
```

Do not use loosely typed request bodies.

Bad:

```typescript
const body: any = request.body;
```

---

# 40. API Response Types

Every API response must have an explicit type.

For structured responses, define a dedicated contract or model.

Bad:

```typescript
return response.json(data);
```

when the response contract is unknown.

Good:

```typescript
const responseModel: UserModel =
    await this.userServices.getUser(id);

return response.json(responseModel);
```

---

# 41. Business Logic Location

Use the following decision rule:

```text
HTTP / Request handling
        ↓
Controller

Business / Application logic
        ↓
Services

Domain state / Domain behavior
        ↓
Model

Persistence
        ↓
Repository

External infrastructure
        ↓
Provider

External third-party integration
        ↓
Adapter
```

Do not mix these responsibilities.

---

# 42. Third-Party APIs

Third-party services must be isolated behind adapters or providers.

Bad:

```typescript
export class PaymentServices {

    public async charge(): Promise<void> {
        await StripeApi.charge();
    }
}
```

Prefer:

```text
PaymentServices
      ↓
PaymentAdapter
      ↓
Stripe
```

---

# 43. Testing

Tests must follow the same naming conventions.

Examples:

```text
UserServices.test.ts
UserController.test.ts
UserRepository.test.ts
UserModel.test.ts
```

Tests should be strongly typed.

Avoid:

```typescript
const mock: any = {};
```

Prefer properly typed mocks.

Singletons should be tested for:

- Single-instance behavior.
- Dependency resolution.
- State isolation.
- Correct lifecycle behavior.

---

# 44. Comments

Do not write comments explaining obvious code.

Bad:

```typescript
// Create a new user
const userModel: UserModel =
    new UserModel();
```

Comments should explain:

- Why something exists.
- Architectural decisions.
- Non-obvious behavior.
- External constraints.
- Important business rules.

---

# 45. AI Coding Agent Rules

When modifying this repository, AI coding agents MUST follow this document.

Before creating or modifying code:

1. Inspect the existing architecture.
2. Follow existing naming conventions.
3. Reuse existing classes where appropriate.
4. Do not introduce a new architectural pattern without justification.
5. Keep everything strongly typed.
6. Ensure each application file contains exactly one class.
7. Ensure class names use the required suffixes.
8. Ensure public methods have explicit parameter and return types.
9. Do not use `any`.
10. Do not introduce standalone application functions.
11. Do not introduce standalone application constants.
12. Do not put business logic inside controllers.
13. Do not put persistence logic inside services.
14. Do not put infrastructure logic inside models.
15. Do not create unnecessary abstractions.
16. Do not modify unrelated files.
17. Preserve the existing architecture unless explicitly instructed otherwise.
18. Treat stateless application classes as singleton-scoped by default.
19. Do not manually implement singleton logic when the framework's DI container already provides singleton lifecycle management.
20. Never store request-specific mutable state in singleton classes.
21. Do not instantiate singleton-managed classes directly with `new`.

---

# 46. Required Naming Summary

| Responsibility | Required Suffix | Example | Default Lifecycle |
|---|---|---|---|
| Model | `Model` | `UserModel` | New instance |
| Controller | `Controller` | `UserController` | Singleton |
| Service | `Services` | `UserServices` | Singleton |
| Repository | `Repository` | `UserRepository` | Singleton |
| Provider | `Provider` | `DatabaseProvider` | Singleton |
| Manager | `Manager` | `CacheManager` | Singleton |
| Factory | `Factory` | `UserFactory` | Singleton |
| Adapter | `Adapter` | `StripeAdapter` | Singleton |
| Constants | `Constants` | `ApplicationConstants` | Static |
| Configuration | `Config` | `DatabaseConfig` | Singleton |
| Error | `Error` | `UserNotFoundError` | New instance |
| DTO | `Dto` | `CreateUserDto` | New instance |

---

# 47. Final Architecture

The default architecture is:

```text
                         Application
                              │
                 ┌────────────┴────────────┐
                 │                         │
           Controllers                 Managers
            Singleton                  Singleton
                 │
                 ▼
             Services
             Singleton
                 │
                 ▼
           Repositories
             Singleton
                 │
                 ▼
             Providers
             Singleton
                 │
                 ▼
           Infrastructure


Models / DTOs / Entities / Errors
        are independent
        request/domain data
        and are NOT singletons.
```

The fundamental rules are:

```text
Strong typing
+
PascalCase
+
One class per file
+
One clear responsibility per class
+
Singleton application services
+
Dependency injection
+
Explicit contracts
+
No request-specific state in singletons
+
No `any`
+
No unnecessary standalone functions
+
No direct instantiation of DI-managed singletons
```

Consistency is more important than cleverness.

When implementing new functionality, the resulting code should look as though it was written by the same developer who created the rest of the system.
