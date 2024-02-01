import React,{useEffect, useState}from "react";
import { StyleSheet,Text,View,FlatList,TouchableOpacity,Alert,Button,ScrollView} from "react-native";
import Header from "../../components/Header";
import { connect } from "react-redux";

const Success = ({User,navigation,Token,route}) => {
  const {id,wt,pskill,ex} = route.params;

  const[data,setData] = useState(null);

  useEffect(()=>{

    fetch('https://reclancer.com/reclancerapi/fsuggest.php',
   {
     method: 'POST',    
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
       'Authorization': 'Bearer ' + Token
     },    
     body: JSON.stringify({   

      id:User,        
      wt:wt,
      pskills:pskill,         
      ex:ex
             
     })
    
   }).then((response) => response.json())
   .then((responseJson) => {

     console.log(responseJson);
     
     //this.props.navigation.navigate('Second');

     if(responseJson === '400')
     {
       Alert.alert('No Matching Records');
     }
     else if(responseJson != "" || responseJson != '400')
     {
      setData(responseJson);
     //console.log("Success");
     }
     else
     {
      console.log("Error,Retry!");
     }
    
         
        }).catch((error) => {
          console.error(error);
        });   



   
   

   },[]) 

   const getItem = (userid) => {
         
    navigation.navigate('Rec Ad Details',{adid:userid});  
       
    } 
   
   _renderItem=({item,index})=>{
  
    return(
        <TouchableOpacity style={styles.listItem} onPress={()=> getItem(item.ad_id)}>              
                    <Text style={styles.itemText}>AdId:<Text style={styles.title}>{item.ad_id}</Text></Text>
                    <Text style={styles.itemText}>Name:<Text style={styles.title}>{item.name}</Text></Text>                        
                    <Text style={styles.itemText}>Skills:<Text style={styles.title}>{item.skills}</Text></Text>
                    
                    
         </TouchableOpacity>
        
    )
  }


return(
 <View>
<View>
   <View  style={styles.headerStyle}>
    <Text style={styles.headerText}>Suggestions </Text>
</View>  
    <ScrollView>
    <FlatList
    data={data}
    scrollEnabled={false}
    style={styles.flatlist}
    //ItemSeparatorComponent = {this.FlatListItemSeparator}
    renderItem={_renderItem}   
    //renderItem={({item}) => <Text style={styles.FlatListItemStyle} onPress={this.GetFlatListItem.bind(this, item.ad_id)} > {item.ad_id} </Text>}
    keyExtractor={item => item.ad_id}
   />  
   </ScrollView>
</View>
</View>
)
}

const mapDispatchToProps = (dispatch) => {
    return {
      userId: (id) => dispatch(actions.action_userid(id)),
      TokenId: (token) => dispatch(actions.action_token(token)),
    };
  };
  
  const mapStateToProps = (state) => {
    return {
      User: state.appstate.userid,
      Token: state.appstate.tokenid,
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Success);

const styles = StyleSheet.create({
screen:{
 flex:1,
 margin:20
},
headerStyle:{    
  justifyContent:'center',
  alignItems:'center'
 },
 headerText:{               
     fontFamily:'OpenSans-Bold',
     fontSize:20,
     fontWeight:'bold',       
     color:'#23211d'
     //color:'#363062'      
 },
listItem: {
  borderRadius: 6,
  paddingHorizontal: 8,
  paddingVertical: 8,
  marginVertical: 4,
  marginHorizontal: 12,
  backgroundColor: '#EEEEEE',
},
itemText: {
  color: '#65451F',
  fontSize:20,
  fontStyle:'normal',
  fontWeight:'bold',
  textAlign: 'left',
},
flatlist:{
  padding:0
},
btnHolder: {
flexDirection: 'row',
justifyContent: 'space-evenly',
alignItems: 'stretch'  

}, 
title:{
fontSize:18,
fontWeight:'bold',
color:'#413C69',      
fontStyle: 'italic',
textAlign:'center'
},
btnText:{
color:'#FFFFFF',
fontWeight:'bold',
fontSize:16
},
btnCont:{
flexDirection:"row",
justifyContent:'space-evenly',
alignItems:'center'
},
button: {
marginTop: 30,
width: '40%',
padding: 20,
justifyContent:'center',
alignItems:'center',        
//backgroundColor: '#413C69',
backgroundColor:'#413C69',
borderRadius:8,
shadowColor: 'rgba(0,0,0, .4)', // IOS
shadowOffset: { height: 1, width: 1 }, // IOS
shadowOpacity: 1, // IOS
shadowRadius: 1, //IOS        
elevation: 2, // Android
},

});