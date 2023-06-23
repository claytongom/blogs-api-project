module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory',
    {
      postId: DataTypes.INTEGER,
      categoryId: DataTypes.INTEGER,
    },
    {
      timestamps: false,
      tableName: 'posts_categories',
      underscored: true,
    });

  PostCategory.associate = ({
    BlogPost,
    Category,
  }) => {
    Category.belongsToMany(BlogPost, {
      through: PostCategory,
      foreignKey: 'postId',
      as: 'blogPost'
    });
    BlogPost.belongsToMany(Category, {
      through: PostCategory,
      foreignKey: 'categoryId',
      as: 'categories'
    });
  }

  return PostCategory;
};