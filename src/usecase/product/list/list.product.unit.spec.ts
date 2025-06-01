import Product from "../../../domain/product/entity/product";
import ListProductUseCase from "./list.product.usecase";

describe("Unit Test list product use case", () => {
  const product1 = new Product("1", "Product 1", 100);
  const product2 = new Product("2", "Product 2", 200);

  const MockRepository = () => ({
    find: jest.fn(),
    findAll: jest.fn().mockResolvedValue([product1, product2]),
    create: jest.fn(),
    update: jest.fn(),
  });

  it("should list all products", async () => {
    const repository = MockRepository();
    const listProductUseCase = new ListProductUseCase(repository);

    const output = await listProductUseCase.execute({});

    expect(output.products.length).toBe(2);
    expect(output.products).toEqual([
      { id: "1", name: "Product 1", price: 100 },
      { id: "2", name: "Product 2", price: 200 },
    ]);
  });
});
