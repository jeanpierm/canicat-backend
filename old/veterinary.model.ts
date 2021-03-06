// import { Model, DataTypes } from 'sequelize';
// import db from '../config/db.config';
// import { PostVeterinaryDto } from '../interfaces/veterinary/post.veterinary.dto';
// import DiseaseRecord from './disease.record.model';
// import TreatmentRecord from './treatment.record.model';
// import VaccineRecord from './vaccine.record.model';

// class Veterinary extends Model<PostVeterinaryDto> { }

// Veterinary.init(
//   {
//     id: {
//       type: DataTypes.UUID,
//       primaryKey: true,
//       allowNull: false,
//       defaultValue: DataTypes.UUIDV4,
//     },
//     dni: {
//       type: DataTypes.STRING,
//       unique: true,
//       allowNull: false,
//     },
//     firstname: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     lastname: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     phone: { type: DataTypes.STRING },
//   },
//   {
//     sequelize: db, // connection instance
//     modelName: 'veterinary',
//     // tableName: "veterinaries", // by default is the plural of modelName
//   },
// );
// Veterinary.hasMany(DiseaseRecord);
// Veterinary.hasMany(TreatmentRecord);
// Veterinary.hasMany(VaccineRecord);

// export default Veterinary;
