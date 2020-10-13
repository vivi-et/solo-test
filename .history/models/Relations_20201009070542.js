const User = require('./User');
const Notice = require('./Notice');

User.hasMany(Notice);
Notice.belongsTo(User);
