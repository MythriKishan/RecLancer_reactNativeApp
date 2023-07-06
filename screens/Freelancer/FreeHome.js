import React, { useEffect } from "react";
import { StyleSheet,Text,View,Button } from "react-native";
import Header from "../../components/Header";
import * as actions from '../actions';
import appstate from '../appreducers';
import { connect } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';
import RecSearch from "./RecSearch";


const FreeHome = ({User,Token,route,navigation}) => {

  
  useEffect(()=>{
    console.log("Inside useEffect");
    const {id,token} = route.params;
    
    dispatch(actions.action_userid(id));    
    dispatch(actions.action_token(token));   

  },[])

  const dispatch = useDispatch();
  
   /*passValues=()=>{
    console.log(User);
    console.log(Token);
    navigation.navigate('Drawer',
        {screen: 'Freelancer PostAd',
        params:{          
           id:User,
           token:Token
          },            
        });

   }

   searchPage=()=>{
    console.log(User);
    console.log(Token);
    navigation.navigate('Drawer',
        {screen: 'Recruiter Search',
        params:{          
           id:User,
           token:Token
          },            
        });

   }*/


return(
  
<View style={styles.screen}>
<View style={styles.headerStyle}>
        {/* Header reusable component*/}
      <Header title="Freelancer Home Page" style={styles.headerTitle} />
      {/*<Text style={{marginTop:20,color:'white'}}>{User}</Text>
      <Text style={{marginTop:20,color:'white'}}>{Token}</Text>
      <Button title="Freelancer Post Ad" onPress={passValues}/>
<Button title="Search Recruiter" onPress={searchPage}/>*/}
      
</View>
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
    console.log(state);
    //console.log(state.appstate.userid+"userjkdjfasdkjfakj")
    //console.log(state.appstate.tokenid+"userjkdjfasdkjfakj")
    return {
      //GetGoalScore: state.appstate.GoalScore
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
    
    
    });