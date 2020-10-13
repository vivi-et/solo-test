const User = require('./User');
const Notice = require('./Notice');
const Article = require('./Article');

User.hasMany(Article);
User.hasMany(Notice);
Notice.belongsTo(User);
