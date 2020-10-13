const User = require('./User');
const Notice = require('./Notice');
const Article = require('./Article');

User.hasMany(Notice);
Notice.belongsTo(User);
User.hasMany(Article);
Article.belongsTo(User);
