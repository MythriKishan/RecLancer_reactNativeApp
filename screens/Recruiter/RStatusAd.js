import React,{useState,useEffect} from "react";
import { Alert, StyleSheet,Text,View } from "react-native";
import Header from "../../components/Header";
import * as actions from '../actions';
import appstate from '../appreducers';
import { connect } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';
import { Dropdown } from 'react-native-element-dropdown';
import Buttons from "../../components/Buttons";



const RStatusAd = ({User,Token,route,navigation}) => {

    const {adid} = route.params;
    console.log(adid)

    console.log(User+"Status")
    console.log(Token+"Status")

    const[sta,setSt] = useState("");
    const[adstatus,setStatus] = useState("")
    const status=[
        { label: 'Select Status', value: '0'},
        { label: 'Open', value: 'open' },
        { label: 'Close', value: 'closed'},        
      ];

    useEffect(()=>{
        fetch('https://reclancer.com/reclancerapi/app_recad_status.php',
        {
          method: 'POST',    
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + Token
          },    
          body: JSON.stringify({      
            id : adid,
   
          })
         
        }).then((response) => response.json())
        .then((responseJson) => {  

          console.log(responseJson); 
          const adstatus = responseJson 
          //console.log(adstatus[0].status)
          setSt(adstatus[0].status)
         
              
             }).catch((error) => {
               console.error(error);
             });
        
       },[])  

       const validate=()=>{

        console.log(adstatus);

        fetch('https://reclancer.com/reclancerapi/apprecad_status_update.php',
        {
          method: 'POST',    
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + Token
          },    
          body: JSON.stringify({      
            id : adid,
            st : adstatus
   
          })
         
        }).then((response) => response.json())
        .then((responseJson) => {     
          //console.log(responseJson);  
          //setData(responseJson);

          if(responseJson.code === 200)
          {
            Alert.alert("Successfully edited")
          }
              
             }).catch((error) => {
               console.error(error);
             });  
       

       }

       return(
        <View style={styles.screen}> 
        <View style={styles.headerStyle}>
                        {/* Header reusable component*/}
                        <Header title="Search" style={styles.headerTitle} />
                    </View>

                    
                      <Text style={styles.headerTitle}>Current Profile Status :{sta} </Text>
                      
        
                    <Dropdown
                            style={styles.inputStyle}
                            placeholderStyle={styles.placeholderStyle}
                            //selectedTextStyle={styles.selectedTextStyle}          
                            iconStyle={styles.iconStyle}
                            data={status}         
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder='Select Status'
                            //searchPlaceholder="Search..."
                            onChange={item => 
                              setStatus(item.value)}       
                              value={adstatus}
                        />                 
                      
        
        
                    <View style={styles.btnHolder}>
                            <Buttons text="Submit" onPress={validate}/>
                            <Buttons text="Cancel" />
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
   
    return {
      //GetGoalScore: state.appstate.GoalScore
      User:state.appstate.userid,
      Token:state.appstate.tokenid,
    }
  }  
  export default connect(  
    mapStateToProps,
    mapDispatchToProps    
  )(RStatusAd)


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        margin: 20
    },
    headerStyle: {
        justifyContent: 'center',
        alignItems: 'center',

    },
    headerTitle: {
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily:'OpenSans-bold',
        fontSize:20,
        color:'white',
        marginTop:10,
        marginBottom:10
        
    },
    inputStyle: {
        margin: 15,
        width: 250,
        height: 50,
        borderColor: 'grey',
        borderRadius: 4,
        borderWidth: 1

    },
    btnHolder: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'stretch'  

    },
    dropdown: {
      margin: 16,
      height: 50,
      borderBottomColor: 'gray',
      borderBottomWidth: 0.5,
    }, 

    icon: {
      marginRight: 5,
    },
    label: {
      position: 'absolute',
      backgroundColor: 'white',
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
    errorText:{
      fontSize:12,
      fontFamily:'OpenSans-bold',
      color:'red',
      paddingLeft:20
     }


});