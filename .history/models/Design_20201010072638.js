const { Sequelize } = require("sequelize");
const db = require("../config/db");

const Design = db.define("design", {
  id: { 
    type: Sequelize.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  },
  image_main: { // 상품대표이미지
    type: Sequelize.STRING,
  },
  category: { // 카테고리 1>2>3 , 디자인>로고>문양로고
    type: Sequelize.JSON,
  },
  title: {  // 상품명
    type: Sequelize.STRING,
  },
  images_sub: { // 제품 상세 이미지
    type: Sequelize.JSON,
  },
  format: { // 기본제공 결과물형식
    type: Sequelize.JSON,
  },
  resolution: { // 해상도 w, h, DPI
    type: Sequelize.JSON,
  },

  required_time: {  // 
    type: Sequelize.STRING,
  },
  rushed: {
    type: Sequelize.BOOLEAN
  }


  title: {
    type: Sequelize.STRING,
  },

  
  title: {
    type: Sequelize.STRING,
  },

  
  title: {
    type: Sequelize.STRING,
  },

  
  title: {
    type: Sequelize.STRING,
  },

  
});

module.exports = Design;
