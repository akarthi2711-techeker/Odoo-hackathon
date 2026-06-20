import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Product extends Model {
  public id!: number;
  public name!: string;
  public price!: number;
  public status!: string;
}

Product.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    status: { type: DataTypes.STRING, defaultValue: 'active' }
  },
  { sequelize, tableName: 'products' }
);

export default Product;
