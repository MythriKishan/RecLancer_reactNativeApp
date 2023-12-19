import React, {useState, useEffect } from "react";
import { StyleSheet,Text,View,Alert,TouchableOpacity } from "react-native";
import * as actions from '../actions';
import appstate from '../appreducers';
import { connect } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';
import Buttons from "../../components/Buttons";
import Header from "../../components/Header";
import { TextInput } from "react-native-paper";
import { Dropdown } from 'react-native-element-dropdown';

const FreeSearch = ({User,Token,route,navigation}) => {

  const [datastate,setDatastate] =  useState([]);  
  const [datacat,setDatacat] = useState([]);
  const [datawt,setDatawt] = useState([]);

    useEffect(()=>{
       
      
          console.log(User+"Inside Search")
          console.log(Token+"token Search")

/*State list API Call*/
getState();
    
/*Category list API call*/
getCategory();

/*Worktype List API call*/
getWorktype();


      
      },[])



      const dispatch = useDispatch();

  const[st,setSt] = useState("");
  const[cat,setCat] = useState("");
  const[wt,setWt] = useState("");
  const[pskills,setPSkill] = useState("");

  
    const getState= () => {
      fetch('https://reclancer.com/reclancerapi/getstate.php',{
        method: "Get",
        headers: {
            Accept: "application/json",
            "Content-Type": "aplication/json"
        },  
      }).then((response) => response.json())
        .then((responseJson) => {       
      
          const data = responseJson;
          console.log(data);
  
          const options = data.map(d => ({
            "value" : d.id,
            "label" : d.name
          }))
  
          setDatastate(options);       
  
          
          
             }).catch((error) => {
               console.error(error);
             });
  
             
    }  
   
  
    const getCategory = () => {
      fetch('https://reclancer.com/reclancerapi/getcategory.php',{
        method: "Get",
        headers: {
            Accept: "application/json",
            "Content-Type": "aplication/json"
        },  
      }).then((response) => response.json())
        .then((responseJson) => {   
      
          const data = responseJson;
          console.log(data);
  
          const options = data.map(d => ({
            "value" : d.id,
            "label" : d.name
          }))
  
          setDatacat(options);       
  
          
          
             }).catch((error) => {
               console.error(error);
             });
  
             
    }
  
    const getWorktype = () => {
      fetch('https://reclancer.com/reclancerapi/getworktype.php',{
        method: "Get",
        headers: {
            Accept: "application/json",
            "Content-Type": "aplication/json"
        },  
      }).then((response) => response.json())
        .then((responseJson) => {   
      
          const data = responseJson;
          console.log(data);
  
          const options = data.map(d => ({
            "value" : d.id,
            "label" : d.type
          }))
  
          setDatawt(options);       
  
          
          
             }).catch((error) => {
               console.error(error);
             });
  
             
    }
  

    const Validate=()=>{

      //console.log("Validate");
        fetch('https://reclancer.com/reclancerapi/appfree_search.php',
        {
          method: 'POST',    
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + Token
          },    
          body: JSON.stringify({   
     
            id : User,       
            cat: cat,
            st: st,       
            skill :pskills,    
            wtype : wt
           
          })
         
        }).then((response) => response.json())
        .then((responseJson) => {
     
          //console.log(responseJson);

          if(responseJson === '400'){

            Alert.alert("No Matching Records");
          }  
  
          else if(responseJson != "" || responseJson != 400)
        { 
          navigation.navigate('Freelancer Result',
           {
            d: responseJson
        });
        
        }
    
              
             }).catch((error) => {
               console.error(error);
             });
            }  
      

    return(
        <View style={styles.screen}> 
        <View style={styles.headerStyle}>
        <Text style={styles.headerText}>Freelancer Search</Text>
                    </View>
        
                    <Dropdown
                            style={styles.inputStyle}
                            placeholderStyle={styles.placeholderStyle}
                            //selectedTextStyle={styles.selectedTextStyle}          
                            iconStyle={styles.iconStyle}
                            data={datacat}         
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder='Select Category'
                            //searchPlaceholder="Search..."
                            onChange={item => 
                              setCat(item.value)}       
                              value={cat}
                        />
                        
                        <Dropdown
                  style={styles.inputStyle}
                  placeholderStyle={styles.placeholderStyle}
                  //selectedTextStyle={styles.selectedTextStyle}          
                  iconStyle={styles.iconStyle}
                  data={datastate}         
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder='Select State'
                  //searchPlaceholder="Search..."
                  onChange={item => 
                    setSt(item.value)}       
                    value={st}
                   />
        
                    <TextInput
                            style={styles.textInputStyle}
                            label={ <Text>
                              Primary Skills
                              <Text style={{color: 'red'}}> *</Text>
                         </Text>
                  }
                            theme={{colors: {primary: '#413C69', placeholder: '#413C69',underlineColor:"transparent"}}}
                            mode="outlined"
                            onChangeText={(pskills) => setPSkill(pskills)}
                    />
        
                     <Dropdown
                           style={styles.inputStyle}
                           placeholderStyle={styles.placeholderStyle}
                           //selectedTextStyle={styles.selectedTextStyle}          
                           iconStyle={styles.iconStyle}
                           data={datawt}         
                           maxHeight={300}
                           labelField="label"
                           valueField="value"
                           placeholder='Select Worktype'
                           //searchPlaceholder="Search..."
                           onChange={item => 
                             setCat(item.value)}       
                             value={cat}
                        />
        
                   {/* <View style={styles.btnHolder}>
                            <Buttons text="Submit" onPress={Validate} />
                            <Buttons text="Cancel" />
                           </View>*/}

<View style={styles.btnCont}>
     <TouchableOpacity style={styles.button} onPress={Validate}><Text style={styles.btnText}>Search</Text></TouchableOpacity>
     <TouchableOpacity style={styles.button} ><Text style={styles.btnText}>Cancel</Text></TouchableOpacity>
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
          )(FreeSearch)
        
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
               },
               headerText:{               
                fontFamily:'OpenSans-Bold',
                fontSize:20,
                fontWeight:'bold',       
                color:'#23211d'
                //color:'#363062'      
            },
               inputStyle: {
                margin: 15,
                width: '80%',
                height: 50,
                borderColor: 'grey',
                borderRadius: 4,
                borderWidth: 1,
                backgroundColor:'#FFFFFF',
        
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
                },
                textInputStyle:{  
                  margin: 15,          
                  width:'80%',
                  height:50,        
                  backgroundColor:'#FFFFFF',
                  outlineColor:'white',
                  activeoutlineColor:'#6B240C',
                  borderRadius:1,
                  borderColor:'#C5DFF8'    
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