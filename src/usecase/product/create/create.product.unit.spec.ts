import CreateProductUseCase from "./create.product.usecase";

describe("Unit Test create product use case", () => {
  const MockRepository = () => ({
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  });

  it("should create a product", async () => {
    const repository = MockRepository();
    const usecase = new CreateProductUseCase(repository);

    const input = {
      name: "Product 1",
      price: 100,
    };

    const result = await usecase.execute(input);

    expect(result).toMatchObject({
      name: input.name,
      price: input.price,
    });
    expect(result.id).toBeDefined();
  });

  it("should throw an error when name is empty", async () => {
    const repository = MockRepository();
    const usecase = new CreateProductUseCase(repository);

    const input = {
      name: "",
      price: 100,
    };

    expect(() => {
      return usecase.execute(input);
    }).rejects.toThrow("Name is required");
  });

  it("should throw an error when price is less than or equal to zero", async () => {
    const repository = MockRepository();
    const usecase = new CreateProductUseCase(repository);

    const input = {
      name: "Product 1",
      price: 0,
    };

    expect(() => {
      return usecase.execute(input);
    }).rejects.toThrow("Price must be greater than zero");
  });
});