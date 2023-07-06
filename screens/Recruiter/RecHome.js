import React, { useEffect } from "react";
import { StyleSheet,Text,View } from "react-native";
import Header from "../../components/Header";
import * as actions from '../actions';
import appstate from '../appreducers';
import { connect } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';


const RecHome = ({User,Token,route,navigation}) => {
    //const dispatch = useDispatch();

    const {id,token} = route.params;
        
    const dispatch = useDispatch();
    dispatch(actions.action_userid(id));    
    dispatch(actions.action_token(token));   

    useEffect(()=>{
       // console.log("Inside useEffect");
        //const {id,token} = route.params;
        
        //dispatch(actions.action_userid(id));    
       // dispatch(actions.action_token(token));   
    
      },[])  
      
     


      return(
  
        <View style={styles.screen}>
        <View style={styles.headerStyle}>
                {/* Header reusable component*/}
              <Header title="Recruiter Home Page" style={styles.headerTitle} />
              
              
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
           // console.log(state);
            
            return {
              //GetGoalScore: state.appstate.GoalScore
              User:state.appstate.userid,
              Token:state.appstate.tokenid,
            }
          }
          
          export default connect(
           // mapDispatchToProps,
            mapStateToProps   
          )(RecHome)
          
        
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