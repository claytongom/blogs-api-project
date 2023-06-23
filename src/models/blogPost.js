module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  },
    {
      timestamps: false,
      tableName: 'blog_posts',
      underscored: true,
    });
  BlogPost.associate = ({ User }) => {
    BlogPost.belongsTo(User, {
      foreignKey: 'user_id',
      as: 'user',
      targetKey: 'id',
    });
  }
  // correção nome arquivo
  return BlogPost;
};
