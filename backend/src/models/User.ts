import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class User extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public password_hash!: string;
  public role_id!: number;
}

User.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password_hash: { type: DataTypes.STRING, allowNull: false },
    role_id: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 2 },
  },
  { sequelize, tableName: 'users' }
);

export default User;
