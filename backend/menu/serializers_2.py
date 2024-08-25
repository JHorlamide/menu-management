from rest_framework import serializers
from .models import Menu, MenuItem


class MenuItemSerializer(serializers.ModelSerializer):
    children = serializers.SerializerMethodField()

    class Meta:
        model = MenuItem
        fields = ["id", "name", "parent", "children"]

    def get_children(self, obj):
        # Retrieve child menu items for this menu item
        children = MenuItem.objects.filter(parent=obj)
        return MenuItemSerializer(children, many=True).data

    def create(self, validated_data):
        children_data = validated_data.pop("children", [])
        menu_item = MenuItem.objects.create(**validated_data)

        # Recursively create children
        for child_data in children_data:
            child_data["parent"] = menu_item
            self.create(child_data)

        return menu_item

    def update(self, instance, validated_data):
        children_data = validated_data.pop("children", [])

        # Update instance fields
        instance.name = validated_data.get("name", instance.name)
        instance.save()

        # Handle children (you can implement update logic here as needed)
        for child_data in children_data:
            child_id = child_data.get("id")
            if child_id:
                child_item = MenuItem.objects.get(id=child_id)
                self.update(child_item, child_data)
            else:
                child_data["parent"] = instance
                self.create(child_data)

        return instance


class MenuSerializer(serializers.ModelSerializer):
    items = MenuItemSerializer(many=True, required=False)

    class Meta:
        model = Menu
        fields = ["id", "name", "items"]

    def create(self, validated_data):
        items_data = validated_data.pop("items", [])
        menu = Menu.objects.create(**validated_data)

        for item_data in items_data:
            item_data["menu"] = menu
            MenuItemSerializer().create(item_data)

        return menu

    def update(self, instance, validated_data):
        items_data = validated_data.pop("items", [])

        # Update Menu fields
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
