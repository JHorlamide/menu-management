from django.urls import path
from .views import (
    MenuListCreateView,
    MenuDetailView,
    MenuItemListCreateView,
    MenuItemDetailView,
)

urlpatterns = [
    path("menus/", MenuListCreateView.as_view(), name="menu-list-create"),
    path("menus/<int:pk>/", MenuDetailView.as_view(), name="menu-detail"),
    path("menu-items/", MenuItemListCreateView.as_view(), name="menu-item-list-create"),
    path("menu-items/<int:pk>/", MenuItemDetailView.as_view(), name="menu-item-detail"),
]
