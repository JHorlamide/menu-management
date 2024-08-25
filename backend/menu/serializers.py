from rest_framework import serializers
from .models import Menu, MenuItem


class MenuItemSerializer(serializers.ModelSerializer):
    children = serializers.SerializerMethodField()

    class Meta:
        model = MenuItem
        fields = ["id", "name", "parent", "menu", "children"]

    def get_children(self, obj):
        # Get children of the current MenuItem (those with parent=obj)
        children = MenuItem.objects.filter(parent=obj)
        return MenuItemSerializer(children, many=True).data


class MenuSerializer(serializers.ModelSerializer):
    items = serializers.SerializerMethodField()

    class Meta:
        model = Menu
        fields = ["id", "name", "items"]

    def get_items(self, obj):
        # Only include top-level items (those with parent=None)
        top_level_items = MenuItem.objects.filter(menu=obj, parent__isnull=True)
        return MenuItemSerializer(top_level_items, many=True).data

    def create(self, validated_data):
        items_data = validated_data.pop("items", [])
        menu = Menu.objects.create(**validated_data)

        # Create MenuItems and associate with the created Menu
        for item_data in items_data:
            item_data["menu"] = menu
            MenuItemSerializer().create(item_data)

        return menu

    def update(self, instance, validated_data):
        items_data = validated_data.pop("items", [])
        instance.name = validated_data.get("name", instance.name)
        instance.save()

        # Update or create MenuItems
        for item_data in items_data:
            item_id = item_data.get("id")
            if item_id:
                item = MenuItem.objects.get(id=item_id, menu=instance)
                MenuItemSerializer().update(item, item_data)
            else:
                item_data["menu"] = instance
                MenuItemSerializer().create(item_data)

        return instance


# class MenuItemSerializer(serializers.ModelSerializer):
#     children = serializers.SerializerMethodField()

#     class Meta:
#         model = MenuItem
#         fields = ["id", "name", "parent", "menu", "children"]

#     def get_children(self, obj):
#         children = MenuItem.objects.filter(parent=obj)
#         return MenuItemSerializer(children, many=True).data


# class MenuSerializer(serializers.ModelSerializer):
#     items = MenuItemSerializer(many=True, required=False)

#     class Meta:
#         model = Menu
#         fields = ["id", "name", "items"]

#     def create(self, validated_data):
#         items_data = validated_data.pop("items", [])
#         menu = Menu.objects.create(**validated_data)

#         # Create MenuItems and associate with the created Menu
#         for item_data in items_data:
#             item_data["menu"] = menu
#             MenuItemSerializer().create(item_data)

#         return menu

#     def update(self, instance, validated_data):
#         items_data = validated_data.pop("items", [])
#         instance.name = validated_data.get("name", instance.name)
#         instance.save()

#         # Update or create MenuItems
#         for item_data in items_data:
#             item_id = item_data.get("id")
#             if item_id:
#                 item = MenuItem.objects.get(id=item_id, menu=instance)
#                 MenuItemSerializer().update(item, item_data)
#             else:
#                 item_data["menu"] = instance
#                 MenuItemSerializer().create(item_data)

#         return instance
