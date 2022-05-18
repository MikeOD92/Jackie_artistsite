from django.urls import path
from .views import user_views, artwork_views, page_data_views

urlpatterns = [
    path('auth/login', user_views.CustomTokenObtainPairView.as_view(), name='token_obtain'),
    path('auth/password', user_views.UserViews.as_view(), name="update_password"),
    path('register', user_views.UserViews.as_view(), name="create_user"),
    #########
    path('site-data', page_data_views.PagesAPIView.as_view(), name="get_data"),
    path('site-data/create', page_data_views.PagesProtectedAPIView.as_view(), name="create_data"),
    path('site-data/edit/<str:pk>', page_data_views.PagesProtectedAPIView.as_view(), name="edit_data"),
    path('external-links', page_data_views.ExternalLinksAdminAPIView.as_view(), name='create_links'),
    path('external-links/edit/<str:pk>', page_data_views.ExternalLinksAdminAPIView.as_view(), name='edit_links'),
    ############
    path('artwork', artwork_views.ArtworkAPIView.as_view(), name="view_all_work"),
    path('artwork/<str:pk>', artwork_views.ArtworkAPIView.as_view(), name="view_single_work"),
    path('create-artwork', artwork_views.ArtworkCreationProtectedAPIView.as_view(), name="add_work"),
    path('edit-artwork/<str:pk>', artwork_views.ArtworkProtectedAPIView.as_view(), name="edit_work"),
    path('artwork-media', artwork_views.ArtworkMediaProtectedAPIView.as_view(), name="add_media"),
    path('artwork-media/<str:pk>', artwork_views.ArtworkMediaProtectedAPIView.as_view(), name="delete_media"),
    path('upload', artwork_views.Upload.as_view(), name='upload')

]