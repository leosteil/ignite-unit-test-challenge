import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";
import { IncorrectEmailOrPasswordError } from "./IncorrectEmailOrPasswordError";

let createUserUseCase: CreateUserUseCase;
let authenticateUserUseCase: AuthenticateUserUseCase;
let userRepositoryInMemory: InMemoryUsersRepository;

describe("Authenticate user", () => {

  beforeEach(()=> {
    userRepositoryInMemory = new InMemoryUsersRepository;
    authenticateUserUseCase = new AuthenticateUserUseCase(userRepositoryInMemory);
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
  })

  it("should be able to authenticate an user", async () => {
    const user = await createUserUseCase.execute({
      name: "Test",
      email: "test@email.com",
      password: "1234"
    });

    const authData = await authenticateUserUseCase.execute({
      email: user.email,
      password: "1234"
    });

    expect(authData).toHaveProperty("token");
  });


  it("should not be able to authenticate a user with wrong pass", async () => {
    expect(async() => {
      const user = await createUserUseCase.execute({
        name: "Test",
        email: "test@email.com",
        password: "1234"
      });

      await authenticateUserUseCase.execute({
        email: user.email,
        password: "wrong pass"
      });
    }).rejects.toBeInstanceOf(IncorrectEmailOrPasswordError);
  });

})
