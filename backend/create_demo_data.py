import os
import django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'community_platform.settings')
django.setup()

from django.contrib.auth import get_user_model
from posts.models import Category, Post, Tag
from comments.models import Comment

User = get_user_model()

def create_demo_data():
    # 创建用户
    users = []
    for user_data in [
        {'username': 'admin', 'email': 'admin@example.com', 'password': 'admin123'},
        {'username': '张三', 'email': 'zhangsan@example.com', 'password': 'demo123'},
        {'username': '李四', 'email': 'lisi@example.com', 'password': 'demo123'},
    ]:
        user, created = User.objects.get_or_create(
            username=user_data['username'],
            defaults={'email': user_data['email']}
        )
        if created:
            user.set_password(user_data['password'])
            user.save()
        users.append(user)
    
    # 创建分类
    categories = []
    for cat_data in [
        {'name': '技术讨论', 'description': '编程技术讨论'},
        {'name': '生活分享', 'description': '日常生活分享'},
    ]:
        category, created = Category.objects.get_or_create(**cat_data)
        categories.append(category)
    
    # 创建帖子
    posts_data = [
        {
            'title': '欢迎来到社区平台',
            'content': '这是一个基于Vue和Django的社区平台演示项目',
            'author': users[0],
            'category': categories[0],
        },
        {
            'title': 'Vue 3 使用心得',
            'content': 'Vue 3的Composition API很好用...',
            'author': users[1],
            'category': categories[0],
        },
    ]
    
    for post_data in posts_data:
        post, created = Post.objects.get_or_create(**post_data)
        if created:
            # 创建评论
            Comment.objects.create(
                post=post,
                author=users[1],
                content='很好的分享！'
            )
    
    print("演示数据创建完成！")

if __name__ == '__main__':
    create_demo_data()