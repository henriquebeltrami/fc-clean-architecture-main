import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import UpdateProductUseCase from "./update.product.usecase";

describe("Integration Test update product use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should update a product", async () => {
    const repository = new ProductRepository();

    const product = new Product("1", "Old Name", 100);
    await repository.create(product);

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