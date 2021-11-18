import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { ShowUserProfileError } from "./ShowUserProfileError";
import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase";

let showUserProfileUseCase: ShowUserProfileUseCase;
let userRepositoryInMemory: InMemoryUsersRepository;

describe("Create user", () => {

  beforeEach(()=> {
    userRepositoryInMemory = new InMemoryUsersRepository;
    showUserProfileUseCase = new ShowUserProfileUseCase(userRepositoryInMemory);
  })

  it("should be able to show a user profile", async () => {
    const createdUser = await userRepositoryInMemory.create({
      name: "Test",
      email: "test@email.com",
      password: "1234"
    });

    const user = await showUserProfileUseCase.execute(createdUser.id)

    expect(user).toEqual(createdUser);
  });

  it("should not be able to show a user profile", async () => {
    expect(async() => {
      await showUserProfileUseCase.execute('not-existing-id')
    }).rejects.toBeInstanceOf(ShowUserProfileError);
  });

})
