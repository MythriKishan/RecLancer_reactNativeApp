import React, { Component } from "react";
import { StyleSheet,View,Text, Pressable } from "react-native";
import { FlatList } from "react-native";
import MenuGrid from "../components/MenuGrid";
import { MENULIST } from "../data/dummy-data";
import Category from "../models/category";
import FreeLogin from "./FreeLogin";


function Home({navigation}) {

    function renderItemHandler(itemData){
        function pressHandler(){
      /*navigation.navigate('Freelancer Login',{
            categoryId : itemData.item.id,
        });*/

        //const categoryId : itemData.item.id
        console.log(itemData.item.id);
        if(itemData.item.id === '1')
        {
            navigation.navigate('Freelancer Register',{
                categoryId : itemData.item.id,
            }); 
        
        }

        else if(itemData.item.id === '2')
        {
            navigation.navigate('Freelancer Login',{
                categoryId : itemData.item.id,
            });   
        }

        else if(itemData.item.id === '3')
        {
            navigation.navigate('Recruiter Register',{
                categoryId : itemData.item.id,
            });   
        }

        else if(itemData.item.id === '4'){
            navigation.navigate('Recruiter Login',{
                categoryId : itemData.item.id,
            });  

        }

        else if(itemData.item.id === '5'){
        navigation.navigate('Freelancer Mobile Login',{
            categoryId : itemData.item.id,
        });
    }
        else{
            navigation.navigate('Recruiter Mobile Login',{
                categoryId : itemData.item.id,
        });
        }
    }
        return (
            <MenuGrid
            title={itemData.item.title} 
            color={itemData.item.color} 
            onPress={pressHandler}
            />
            );
    }
    return (        
      <FlatList
      data = {MENULIST}
      keyExtractor = {(item) => item.id}
      renderItem = {renderItemHandler}
      numColumns = {2}
      />
    );
}  
   


export default Home;

const styles = StyleSheet.create({

    gridItem:{
        flex:1,
        margin:16,
        height:150,
        borderRadius:8,
        elevation:4

    },
    innerContainer:{
        flex:1,
        padding:16
    }
});
