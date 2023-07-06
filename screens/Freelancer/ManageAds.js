import React,{useState,useEffect}from "react";
import { StyleSheet,Text,View,FlatList,TouchableOpacity,Alert,Button } from "react-native";
import Header from "../../components/Header";
import * as actions from '../actions';
import appstate from '../appreducers';
import { connect } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import Buttons from "../../components/Buttons";

const ManageAds = ({User,Token,route,navigation}) => 
{
    //const dispatch = useDispatch();

    const [data,setData] = useState(null);
    console.log(User+"Manage Ads")
    console.log(Token+"manage Ads")

    useEffect(()=>{
        fetch('https://reclancer.com/reclancerapi/Fadlists.php',
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
          console.log(responseJson);  
          setData(responseJson);
              
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
             
            navigation.navigate('Freelancer Ad Status',{adid:userid});  
               
            }
          
        const editImg = (userid) => {

          navigation.navigate('Freelancer Edit Image',{id:userid});  

        }


       _renderItem=({item,index})=>{
  
        return(
            <TouchableOpacity style={styles.listItem} >              
                        <Text style={styles.itemText}>{item.ad_id}</Text>
                        <Text style={styles.itemText}>{item.name}</Text>                        
                        <Text style={styles.itemText}>{item.skills}</Text>
                       {/* <Button title="Edit Ad" onPress={()=> editAd(item.ad_id)}/>
                        <Button title="Change Status" onPress={()=> statusAd(item.ad_id)}/> */}

                         <View style={styles.btnHolder}>
             <Buttons text="Edit Ad" onPress={()=> editAd(item.ad_id)}/>
             <Buttons text="Status" onPress={()=> statusAd(item.ad_id)}/>
             <Buttons text="Edit Images" onPress={()=> editImg(item.ad_id)}/>
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
  )(ManageAds)

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
    paddingVertical: 4,
    marginVertical: 4,
    marginHorizontal: 12,
    backgroundColor: '#e2b497',
  },
  itemText: {
    color: '#351401',
    textAlign: 'center',
  },
  flatlist:{
    padding:0
 },
 btnHolder: {
  flexDirection: 'row',
  justifyContent: 'space-evenly',
  alignItems: 'stretch'  

},


});