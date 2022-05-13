from django.urls import path
from .views import user_views #, page_data_views, artwork_views
from .views.user_views import register

urlpatterns = [
      path('auth/login', user_views.CustomTokenObtainPairView.as_view(), name='token_obtain'),
      path('register', register, name="create_user")

]