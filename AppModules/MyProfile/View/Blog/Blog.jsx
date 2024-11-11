import { Nunito_400Regular, Nunito_500Medium, Nunito_600SemiBold, Nunito_700Bold } from '@expo-google-fonts/nunito';
import { Raleway_700Bold, useFonts } from '@expo-google-fonts/raleway';
import { Feather, Fontisto } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import CustomDrawerHeader from '../../../../BaseModule/Custom/CustomDrawerHeader';
import { blogData } from '../../../../nadiswaraPro/Data/BlogData';
import { styles } from '../../Style/BlogScreenStyles/BlogScreen.styles';

const Blog = () => {
    const [isLoading, setIsLoading] = useState(true);
    const navigation = useNavigation();

    const handleBlogDetails = (item) => {
        navigation.navigate('Blog Details', {
            blogDetails: item
        });
    };

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);

    let [fontsLoaded, fontError] = useFonts({
        Raleway_700Bold,
        Nunito_400Regular,
        Nunito_500Medium,
        Nunito_600SemiBold,
        Nunito_700Bold
    });

    if (!fontsLoaded && !fontError) {
        return null;
    }

    return (
        <>
            <LinearGradient colors={['#E5ECF9', '#F6F7F9']} style={styles.container}>
                <CustomDrawerHeader>Blogs</CustomDrawerHeader>
                <ScrollView>
                    <View>
                        {blogData.map((item) => {
                            return (
                                <TouchableOpacity onPress={() => handleBlogDetails(item)} key={item.id} style={styles.blogContainer}>
                                    <TouchableOpacity onPress={() => handleBlogDetails(item)}>
                                        <Image source={item.image} style={styles.blogImage} />
                                    </TouchableOpacity>

                                    <View style={styles.infoContainer}>
                                        <View style={styles.infoItem}>
                                            <Fontisto name="date" size={15} color={'gray'} />
                                            <Text style={[styles.infoText, { fontFamily: 'Nunito_400Regular' }]}>
                                                {item.blog_post_date}
                                            </Text>
                                        </View>

                                        <View style={styles.infoItem}>
                                            <Feather name="user" size={17} color={'gray'} />
                                            <Text style={[styles.infoText, { fontFamily: 'Nunito_600SemiBold' }]}>{item.blogger_name}</Text>
                                        </View>
                                    </View>

                                    <TouchableOpacity onPress={() => handleBlogDetails(item)}>
                                        <Text style={[styles.blogTitle, { fontFamily: 'Raleway_700Bold' }]}>{item.title}</Text>
                                    </TouchableOpacity>

                                    <Text style={[styles.blogText, { fontFamily: 'Nunito_400Regular' }]}>
                                        {item.description ? item.description.slice(0, 100) + '...' : 'No Information'}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </ScrollView>
            </LinearGradient>
        </>
    );
};

export default Blog;
