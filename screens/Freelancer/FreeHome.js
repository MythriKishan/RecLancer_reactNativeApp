import React, { useEffect ,useState} from "react";
import { StyleSheet,Text,View,Button,Image,ScrollView,SafeAreaView} from "react-native";
import Header from "../../components/Header";
import * as actions from '../actions';
import appstate from '../appreducers';
import { connect } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';
import RecSearch from "./RecSearch";
import Card from '../../components/Card';

const FreeHome = ({User,Token,route,navigation}) => {
  const {id,token} = route.params;
    const[data,setData] = useState("");
    const dispatch = useDispatch();
    dispatch(actions.action_userid(id));    
    dispatch(actions.action_token(token));   
  
  useEffect(()=>{
    {/*fetch('https://reclancer.com/reclancerapi/Fuser_profile.php',
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
      //console.log(responseJson[0]);  
      setData(responseJson);
      //console.log(data[0].firstname)
          
         }).catch((error) => {
           console.error(error);
         });   */} 

  },[])

  

return(
  
<View style={styles.screen}>
 <ScrollView>
<View style={styles.textCont}>
      <Image
          source={require('../../assets/HomeImg.jpg')}
          style={styles.transImage}
        />   
</View>

<View style={styles.textCont}>
      <Text style={styles.textStyle}>
      Opportunities don't happen, you create them
</Text>
</View>

    {/* <SafeAreaView style={styles.container}>
        <Card style={styles.card}>          
          <Text style={styles.sectionTitle}>{data.firstname}{' '}{data.lastname}</Text>
          <Text style={styles.sectionTitle}>{data.email}</Text>
          <Text style={styles.sectionTitle}>{data.mobilenumber}</Text>
        </Card>
        

</SafeAreaView>*/}
    
      
{/*<View style={styles.headerStyle}>
        
      <Header title="Freelancer Home Page" style={styles.headerTitle} />*/}
      {/*<Text style={{marginTop:20,color:'white'}}>{User}</Text>
      <Text style={{marginTop:20,color:'white'}}>{Token}</Text>
      <Button title="Freelancer Post Ad" onPress={passValues}/>
<Button title="Search Recruiter" onPress={searchPage}/>*/}
      

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
     
      User:state.appstate.userid,
      Token:state.appstate.tokenid,
    }
  }
  
  export default connect(
   
    mapStateToProps   
  )(FreeHome)
  

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
    },
    transImage:{
      height: 250,
      width: 250,
      opacity: 0.5,
      borderRadius:4, 
      marginTop:30     
    },
    textCont:{  
      justifyContent:'center',
      alignItems:'center'
     },
     textStyle:{
      fontFamily:'OpenSans-Bold',
      fontSize:18,
      marginTop:20,
      fontWeight:'bold',
      color:'#65451F'
      //color:'#FC6C85'    
    },

    container: {
      flex: 1,
      margin: 10,
      alignItems: 'center', // Centered horizontally
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: "#413C69",
    },
    card: {
      marginBottom:10,
      height:100,
      width: '100%',
      backgroundColor: '#EEEEEE',
      //justifyContent: 'center', //Centered vertically
      //alignItems: 'center', // Centered horizontally
    },
    labelTitle: {
      fontSize:16,
      fontWeight:'700',
      color:'black'
    
    }
    
    
    });