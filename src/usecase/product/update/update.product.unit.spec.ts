import Product from "../../../domain/product/entity/product";
import UpdateProductUseCase from "./update.product.usecase";

describe("Unit Test update product use case", () => {
  it("should update a product", async () => {
    const product = new Product("1", "Old Name", 100);

    const MockRepository = () => ({
      find: jest.fn().mockResolvedValue(product),
      findAll: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    });

    const repository = MockRepository();
    const usecase = new UpdateProductUseCase(repository);

    const input = {
      id: "1",
      name: "New Name",
      price: 200,
    };

    const result = await usecase.execute(input);

    expect(result).toEqual({
      id: "1",
      name: "New Name",
      price: 200,
    });
  });
});