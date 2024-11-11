import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Blog from "../../AppModules/MyProfile/View/Blog/Blog";
import BlogDetails from "../../AppModules/MyProfile/View/Blog/BlogDetails";

const Stack = createNativeStackNavigator();

const BlogNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Blog Page"
        component={Blog}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Blog Details"
        component={BlogDetails}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default BlogNavigation;
