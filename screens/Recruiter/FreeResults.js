import React,{useState,useEffect} from 'react';
import { View, Text, StyleSheet,FlatList,TouchableOpacity,Alert,Button} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as actions from '../actions';
import appstate from '../appreducers';
import { connect } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';


const FreeResults = ({User,Token,route,navigation}) => {
  
  //const data = useState("");
  const {d} = route.params;

    console.log(User+"Search Result")
    console.log(Token+"Search Result Token")
  //const dispatch = useDispatch();
  //dispatch(actions.action_token(token)); 

  const getItem = (userid) => {
         
    navigation.navigate('Freelancer Details',{adid:userid});  
       
    } 

  _renderItem=({item,index})=>{
  
    return(
        <TouchableOpacity style={styles.listItem} onPress={()=> getItem(item.ad_id)}>              
                    <Text style={styles.itemText}>AdId:<Text style={styles.title}>{item.ad_id}</Text></Text>
                    <Text style={styles.itemText}>Name:<Text style={styles.title}>{item.name}</Text></Text>
                    <Text style={styles.itemText}>Email:<Text style={styles.title}>{item.email}</Text></Text>
                    <Text style={styles.itemText}>Skills:<Text style={styles.title}>{item.skills}</Text></Text>                                
         </TouchableOpacity>
    )
  }

  return (  
  
    <View>
    <ScrollView>
    <FlatList
    data={d}
    scrollEnabled={false}
    style={styles.flatlist}
    //ItemSeparatorComponent = {this.FlatListItemSeparator}
    renderItem={_renderItem}   
    //renderItem={({item}) => <Text style={styles.FlatListItemStyle} onPress={this.GetFlatListItem.bind(this, item.ad_id)} > {item.ad_id} </Text>}
    keyExtractor={item => item.ad_id}
   />  
   </ScrollView>
   </View>
  );
    /*return (
        <View>
        <ScrollView>
        <View style={styles.listItem}>
          <Text style={styles.itemText}>Murthy</Text>
          <Text style={styles.itemText}>PHP,JAVAScript</Text>
          <Text style={styles.itemText}>13 Years</Text>          
        </View>
        <View style={styles.listItem}>
          <Text style={styles.itemText}>Parimala</Text>
          <Text style={styles.itemText}>React</Text>
          <Text style={styles.itemText}>15 Years</Text>            
        </View>
        <View style={styles.listItem}>
          <Text style={styles.itemText}>Saathvik</Text>
          <Text style={styles.itemText}>.NET</Text>
          <Text style={styles.itemText}>10 Years</Text> 
         </View>
        <View style={styles.listItem}>
          <Text style={styles.itemText}>Mythri</Text>
          <Text style={styles.itemText}>Java</Text>
          <Text style={styles.itemText}>15 Years</Text>   
        </View>
        <View style={styles.listItem}>
          <Text style={styles.itemText}>Ramya</Text>
          <Text style={styles.itemText}>BI</Text>
          <Text style={styles.itemText}>12 Years</Text>   
        </View>
        <View style={styles.listItem}>
          <Text style={styles.itemText}>Murthy</Text>
          <Text style={styles.itemText}>PHP,JAVAScript</Text>
          <Text style={styles.itemText}>13 Years</Text>          
        </View>
        <View style={styles.listItem}>
          <Text style={styles.itemText}>Parimala</Text>
          <Text style={styles.itemText}>React</Text>
          <Text style={styles.itemText}>15 Years</Text>            
        </View>
        <View style={styles.listItem}>
          <Text style={styles.itemText}>Saathvik</Text>
          <Text style={styles.itemText}>.NET</Text>
          <Text style={styles.itemText}>10 Years</Text> 
         </View>
        <View style={styles.listItem}>
          <Text style={styles.itemText}>Mythri</Text>
          <Text style={styles.itemText}>Java</Text>
          <Text style={styles.itemText}>15 Years</Text>   
        </View>
        </ScrollView>
        </View>

      );*/



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
)(FreeResults)
//export default RecResults;

const styles = StyleSheet.create({
  listItem: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
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
 title:{
  fontSize:18,
  fontWeight:'bold',
  color:'#413C69',      
  fontStyle: 'italic',
  textAlign:'center'
}
});