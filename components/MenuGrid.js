import React, { Component } from "react";
import { StyleSheet,View,Text, Pressable } from "react-native";

function MenuGrid({title,color,onPress}) {
    return  <View style={styles.gridItem}>
        <Pressable 
        style={({pressed}) => [styles.button,pressed ? styles.buttonPressed : null,]}
        onPress={onPress}
        >
            <View style={[styles.innerContainer,{backgroundColor:color}]}>
            <Text style={styles.title}>{title}</Text>
            </View>
        </Pressable>
      
    </View>
    }
    
    export default MenuGrid;
    
    const styles= StyleSheet.create({
    gridItem:{
        flex:1,
        margin:16,
        height:150,
        borderRadius:8,
        elevation:4,
        backgroundColor:'white',
        shadowColor:'black',
        shadowOpacity:0.25,
        shadowOffset:{width:0,height:2},
        shadowRadius:8,
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible'
    
    },
    innerContainer:{
        flex:1,
        padding:16,
        borderRadius :8,
        justifyContent:'center',
        alignItems:'center'
    },
    buttonPressed:{
        opacity:0.5
    },
    button:{
        flex:1
    },
    title:{
        fontSize:18,
        fontWeight:'bold',
        color:'#413C69',      
        fontStyle: 'italic',
        textAlign:'center'
    }
    })

/*class MenuGrid extends Component{
    render() {
    return (
        
        <View style={styles.gridItem}>
        <Pressable>
            <View style={styles.innerContainer}>
                <Text>{title}</Text>
            </View>         
         </Pressable>
        </View>
    )

}
}
export default MenuGrid;

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
});*/
