import React,{useState,useEffect}from "react";
import { StyleSheet,Text,View,FlatList,TouchableOpacity,Alert,Button } from "react-native";
import Header from "../../components/Header";
import * as actions from '../actions';
import appstate from '../appreducers';
import { connect } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import Buttons from "../../components/Buttons";

const RHide = ({User,Token,route,navigation}) => 
{
    //const dispatch = useDispatch();

    const [data,setData] = useState(null);
    console.log(User+"Manage Ads")
    console.log(Token+"manage Ads")

    useEffect(()=>{
        fetch('https://reclancer.com/reclancerapi/Radlists.php',
        {
          method: 'POST',    
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + Token
          },    
          body: JSON.stringify({      
            id : User,
   
          })
         
        }).then((response) => response.json())
        .then((responseJson) => { 
          
          if(responseJson === '400'){

            Alert.alert("No Matching Records");
          }  
          else if(responseJson != "" || responseJson != 400)
          {
          console.log(responseJson);  
          setData(responseJson);
          }
          
             
             }).catch((error) => {
               console.error(error);
             });
        
       },[])  

       const editAd = (userid) => {

        //Alert.alert(userid);
         
        navigation.navigate('Freelancer Edit Ad',{adid:userid});  
           
        }

        const statusAd = (userid) => {

            //Alert.alert(userid);
             
            navigation.navigate('Recruiter Ad Status',{adid:userid});  
               
            }
          
        const editImg = (userid) => {

          navigation.navigate('Freelancer Edit Image',{id:userid});  

        }


       _renderItem=({item,index})=>{
  
        return(
            <TouchableOpacity style={styles.listItem} >              
                        <Text style={styles.itemText}>AdId:<Text style={styles.title}>{item.ad_id}</Text></Text>
                        <Text style={styles.itemText}>Name:<Text style={styles.title}>{item.name}</Text></Text>                      
                        <Text style={styles.itemText}>Skills:<Text style={styles.title}>{item.skills}</Text></Text>
                       {/* <Button title="Edit Ad" onPress={()=> editAd(item.ad_id)}/>
                        <Button title="Change Status" onPress={()=> statusAd(item.ad_id)}/> */}

                         {/*<View style={styles.btnHolder}>
             
             <Buttons text="Hide Profile" onPress={()=> statusAd(item.ad_id)}/>
            
                      </View> */}

           <View style={styles.btnCont}>
     <TouchableOpacity style={styles.button} onPress={()=> statusAd(item.ad_id)}><Text style={styles.btnText}>Hide Profile</Text></TouchableOpacity>
     
     </View>                                        
             </TouchableOpacity>
            
        )
      }

return(
<View>    
    {/*<View style={styles.headerStyle}>
    <Header title="Manage Ads" style={styles.headerTitle} />
</View>*/}
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
)
}

const mapDispatchToProps = dispatch => {
    return {
      userId: (id) => dispatch(actions.action_userid(id)),  
      TokenId:(token) => dispatch(actions.action_token(token)),  
    }
  }    
  const mapStateToProps = (state /*, ownProps*/) => {
   
    return {
      //GetGoalScore: state.appstate.GoalScore
      User:state.appstate.userid,
      Token:state.appstate.tokenid,
    }
  }  
  export default connect(  
    mapStateToProps,
    mapDispatchToProps    
  )(RHide)

const styles = StyleSheet.create({
  screen:{
    flex:1
   },
   headerStyle: {
       justifyContent: 'center',
       alignItems: 'center',
       marginTop:40
   
   },
   headerTitle: {
       justifyContent: 'center',
       alignItems: 'center',
       fontFamily:'OpenSans-bold',
       fontSize:20,
       color:'white'
       
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