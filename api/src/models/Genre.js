const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('genre', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.ENUM(["Action","Indie","Adventure","RPG","Strategy","Shooter","Casual","Simulation","Puzzle","Arcade","Platformer","Racing","Massively Multiplayer","Sports","Fighting","Family","Board Games","Educational","Card"]),
      // type: DataTypes.ARRAY(DataTypes.HSTORE), 
      // type: DataTypes.ARRAY(DataTypes.STRING),   // Si pongo q el type es ARRAY, se me rompe el Back... --> 
      // SELENE LE PUSO AL name DataTypes.STRING
      allowNull: false,
    },
  
  }, {
    timestamps: false
  });
};
