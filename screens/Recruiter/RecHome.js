import React, { useEffect } from "react";
import { StyleSheet,Text,View,ScrollView,SafeAreaView } from "react-native";
import Header from "../../components/Header";
import * as actions from '../actions';
import appstate from '../appreducers';
import { connect } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';
import Card from '../../components/Card';


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
          <ScrollView>
        <View style={styles.headerStyle}>
        <Text style={styles.headerText}>Recruiter Home</Text>
        </View>
        <SafeAreaView style={styles.container}>
        <Card style={styles.card}>          
          <Text style={styles.sectionTitle}>Mythri</Text>
          <Text style={styles.sectionTitle}>mythri.kishan4@gmail.com</Text>
          <Text style={styles.sectionTitle}>+918050929944</Text>
        </Card>
        

      </SafeAreaView>
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
            
            },
            headerText:{               
              fontFamily:'OpenSans-Bold',
              fontSize:20,
              fontWeight:'bold',       
              color:'#23211d'
              //color:'#363062'      
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