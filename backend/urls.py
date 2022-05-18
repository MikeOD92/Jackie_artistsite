from django.urls import path
from .views import user_views, artwork_views #, page_data_views, artwork_views
# from .views.user_views import register

urlpatterns = [
    path('auth/login', user_views.CustomTokenObtainPairView.as_view(), name='token_obtain'),
    path('register', user_views.UserViews.as_view(), name="create_user"),
    path('artwork', artwork_views.ArtworkAPIView.as_view(), name="view_all_work"),
    path('artwork/<str:pk>', artwork_views.ArtworkAPIView.as_view(), name="view_single_work"),
    path('create-artwork', artwork_views.ArtworkCreationProtectedAPIView.as_view(), name="add_work"),
    path('upload', artwork_views.Upload.as_view(), name='upload')

]