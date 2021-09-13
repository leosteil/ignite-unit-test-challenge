import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserError } from "./CreateUserError";
import { CreateUserUseCase } from "./CreateUserUseCase";

let createUserUseCase: CreateUserUseCase;
let userRepositoryInMemory: InMemoryUsersRepository;

describe("Create user", () => {

  beforeEach(()=> {
    userRepositoryInMemory = new InMemoryUsersRepository;
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
  })

  it("should be able to create a user", async () => {
    const user = await createUserUseCase.execute({
      name: "Test",
      email: "test@email.com",
      password: "1234"
    });

    expect(user).toHaveProperty("id");
  });


  it("should not be able to create a user with same email", async () => {
    expect(async() => {
      await createUserUseCase.execute({
        name: "Test",
        email: "test@email.com",
        password: "1234"
      });

      await createUserUseCase.execute({
        name: "Test2",
        email: "test@email.com",
        password: "1234"
      });
    }).rejects.toBeInstanceOf(CreateUserError);
  });

})
