import React,{useEffect, useState}  from "react";
import { StyleSheet,Text,View,TouchableOpacity,Button,Alert  } from "react-native";
import * as actions from '../actions';
import appstate from '../appreducers';
import { connect } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';
import Buttons from "../../components/Buttons";
import Header from "../../components/Header";
import { TextInput } from "react-native-paper";
import { Dropdown } from 'react-native-element-dropdown';
import { ScrollView } from "react-native-gesture-handler";
import DateTimePicker from '@react-native-community/datetimepicker'
//import DateTimePickerModal from "react-native-modal-datetime-picker";
import { AntDesign } from '@expo/vector-icons';
import moment from "moment";

const RecPostAd = ({User,Token,route,navigation}) => {
  const [datastate,setDatastate] =  useState([]);
  const [datagen,setDatagen] = useState([]);
  const [datacat,setDatacat] = useState([]);
  const [datawt,setDatawt] = useState([]);

  const[title,setTitle] = useState("");
  const[name,setName] = useState("");
  const[email,setEmail] = useState("");
  const[mobile,setMob] = useState("");    
  const[pskills,setPSkill] = useState("");
  const[exp,setExp] = useState("");
  const[sskills,setSSkill] = useState("");
  const[adr,setAdr] = useState("");
  const[pper,setPper] = useState("");
  const[prates,setPrates] = useState("");
  const[st,setSt] = useState("");
  const[ct,setCt] = useState("");
  const[cat,setCat] = useState("");
  const[wt,setWt] = useState("");
  const[gen,setGen] = useState("");
  const[pref,setPref] = useState("");
  const[sdate,setSdate] = useState(new Date());
  const[edate,setEdate] = useState(new Date());
  const[cdate,setCdate] = useState(new Date());
  const input = useInput(new Date())
  const input2 = useInput(new Date())
  const input3 = useInput(new Date())
  const[isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const[titleError,setTitleError] = useState("");
  const[nameError,setNameError] = useState("");
  const[eError, seteError] = useState("");
  const[mobileError,setmError] = useState("");
  const[stError,setStError] = useState("");
  const[catError,setCatError] = useState("");
  const[wtError,setWtError] = useState("");
  const[gError,setGError] = useState("");
  const[psError,setPsError] =useState("");
  const[expError,setExpError] = useState("");

 
  let d;
  let s =[];
  let state=[];
  var res=[];

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const showeDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const hideeDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    //console.warn("A date has been picked: ", date);
     console.warn(moment(date).format('YYYY-MM-DD'));
     date=moment(date).format('YYYY-MM-DD');
     setSdate(date);
     console.log(sdate);
    hideDatePicker();
  };

  function handleDateChange(date) {
    // initial change: start by setting the startDate
    if (!sdate && !edate) {
      setSdate(date);
     // startDate has been set, set the end date
    } else if (sdate && !edate) {
     setEdate(date);
    }

    // user is choosing another range => set the start date
    // and set the endDate back to null
    if (sdate && edate) {
      setSdate(date);
      setEdate("");
    }
 }


  const handleeConfirm = (d) => {
    //console.warn("A date has been picked: ", date);
     console.warn(moment(d).format('YYYY-MM-DD'));
     d=moment(d).format('YYYY-MM-DD');
     setEdate(d);
     console.log(edate);
    hideDatePicker();
  };
  
  useEffect(()=>{
    //console.log(route.params);
    //const {id,token} = route.params;    
    //dispatch(actions.action_userid(id));    
    //dispatch(actions.action_token(token));   
     
    //console.log(User+"Inside Postad")
    //console.log(Token+"token Inside Postad")

    /*State list API Call*/
  getState();
 //setSt(getState());

  /*Gender List API*/
  getGen();

  /*Category list API call*/
  getCategory();

  /*Worktype List API call*/
  getWorktype();

   },[])  

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

  const getGen = () => {
    fetch('https://reclancer.com/reclancerapi/getgender.php',{
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
          "label" : d.gender
        }))

        setDatagen(options);       

        
        
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

  const Validate= () =>{
    let startDate = moment(input.date).utc().format('YYYY-MM-DD');   
    console.log(startDate);
    let endDate = moment(input2.date).utc().format('YYYY-MM-DD');
    console.log(endDate);
    let lastDate = moment(input3.date).utc().format('YYYY-MM-DD');
    console.log(lastDate);
    if((name != ""))   
       {
       
        /*fetch('https://reclancer.com/reclancerapi/apprec_postad.php',
     {
       method: 'POST',    
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
         'Authorization': 'Bearer ' + Token
       },    
       body: JSON.stringify({   
  
         id : User,       
         name: name,
         email : email,       
         mobile :mobile, 
         ptitle : title,
         pskill : pskills,
         ex : exp,
         sskill : sskills,
         st : st,
         ct : cat,      
         wt : wt,
         gen: gen,         
         prates : prates,
         addr:adr,
         sd:startDate,
         ed:endDate,
         cd:lastDate,
         ppre:pper,        
       
       })
      
     }).then((response) => response.json())
     .then((responseJson) => {
  
       console.log(responseJson.code);
       
       if(responseJson.code === 200)
       {
        navigation.navigate('Uploads',{adid:responseJson.id});     
       }  
       else{
         Alert.alert(responseJson);
       } 
           
          }).catch((error) => {
            console.error(error);
          });   
        
      
        } 
        else{
          Alert.alert("Please enter Data into required fields");
        }  */

        navigation.navigate('Uploads',{
          id : User,       
         name: name,
         email : email,       
         mobile :mobile, 
         ptitle : title,
         pskill : pskills,
         ex : exp,
         sskill : sskills,
         st : st,
         ct : cat,      
         wt : wt,
         gen: gen,         
         prates : prates,
         addr:adr,
         sd:startDate,
         ed:endDate,
         cd:lastDate,
         ppre:pper  
        })
      }
  }


  function useInput() {
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };
    const showDatepicker = () => {
        showMode('date');
    };

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    }
    return {
        date,
        showDatepicker,
        show,
        mode,
        onChange
    }
}

  return(
  <View style={styles.screen}>
    <ScrollView>
   <View style={styles.headerStyle}>   

    <Text style={styles.headerText}>Post your Ad here</Text>
  </View>
            <Text style={styles.titleStyle}>Job Title<Text style={{color: 'red'}}> *</Text></Text>
             <TextInput
                    style={styles.textInputStyle}
                    label="Job Title"
                    //theme={{ colors: { primary: '#069A8E' } }}
                    //placeholder = "Enter Email"
                    theme={{colors: {primary: '#413C69', placeholder: '#413C69',underlineColor:"transparent"}}}
                    mode="outlined"
                    onChangeText={(title) => setTitle(title)}
                    onFocus={()=>{
                     
                      if(title === '')
                      {
                        setTitleError('Enter Job Title');
                      }
                      else{
                        setTitleError('');
                      }
                    }}
                />
                 <Text style={styles.errorText}>{titleError}</Text>

                <Text style={styles.titleStyle}>Name<Text style={{color: 'red'}}> *</Text></Text> 
                <TextInput
                    style={styles.textInputStyle}
                    label="Name"
                    //theme={{ colors: { primary: '#069A8E' } }}
                    //placeholder = "Enter Email"
                    theme={{colors: {primary: '#413C69', placeholder: '#413C69',underlineColor:"transparent"}}}
                    mode="outlined"
                    onChangeText={(name) => setName(name)}
                    onFocus={()=>{                    
                      if(name != '')
                      {
                        let reg_name = /^[a-zA-Z ]*$/;
                       if(reg_name.test(name) === false) 
                       {
                       setNameError("Only Alphabets and Space allowed");   
                       }
                       else{
                        setNameError(" "); 
                       }
                        setNameError('Enter Name');
                      }
                      else if(title === '')
                      {
                        setTitleError('Enter Job Title');
                      }
                      else{
                        setNameError('');
                        setTitleError('');
                      }
                    }}
                />
                 <Text style={styles.errorText}>{nameError}</Text>

                 <Text style={styles.titleStyle}>Email<Text style={{color: 'red'}}> *</Text></Text>
                <TextInput
                    style={styles.textInputStyle}
                    label="Email"
                    //theme={{ colors: { primary: '#069A8E' } }}
                    //placeholder = "Enter Email"
                    theme={{colors: {primary: '#413C69', placeholder: '#413C69',underlineColor:"transparent"}}}
                    mode="outlined"
                    onChangeText={(email) => setEmail(email)}
                    onFocus={()=>{               
                      let reg_name = /^[a-zA-Z ]*$/;
                  if(reg_name.test(name) === false) {
                    setNameError("Only Alphabets and Space allowed");   
                  }
                  else if(!name){
                    setNameError("Please enter name");   
                  }   
                  else if(email === '')
                  {
                    seteError('Enter Email ID');
                  } 
                  else {
                    setNameError("");   
                    setName(name);
                    seteError('');
                  }                
                 
                }}
                />
                 <Text style={styles.errorText}>{eError}</Text>

                
                 <Text style={styles.titleStyle}>Mobile<Text style={{color: 'red'}}> *</Text></Text>              
                <TextInput
                    style={styles.textInputStyle}
                    label="Mobile"
                    //theme={{ colors: { primary: '#069A8E' } }}
                    //placeholder = "Enter Email"
                    theme={{colors: {primary: '#413C69', placeholder: '#413C69',underlineColor:"transparent"}}}
                    mode="outlined"
                    onChangeText={(mobile) => setMob(mobile)}
                    onFocus={()=>{
                    let reg_mail = /^\S+@\S+\.\S+$/;
                    if(email != "" && reg_mail.test(email) === true)
                    {     
                      seteError('');            
                    }

                      else 
                        {
                          seteError('Enter Valid email ID')
                        }
                        if(mobile === '')
                        {
                          setmError('Enter Valid Mobile number');
                        }
                        else{
                          setmError('');
                        }
                      }}
        
                />
                <Text style={styles.errorText}>{mobileError}</Text>

                <Text style={styles.titleStyle}>State<Text style={{color: 'red'}}> *</Text></Text>      
                <Dropdown
          style={styles.selectStyle}
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
            onFocus={()=>{
              if(st === "" || st === null || st === 'Select State')
              {
                setStError('Select State');
              }
              else{
                setStError('');
              }
            }}
            
           />
            <Text style={styles.errorText}>{stError}</Text>

            <Text style={styles.titleStyle}>Category<Text style={{color: 'red'}}> *</Text></Text>   
            <Dropdown
                    style={styles.selectStyle}
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
                      onFocus={()=>{
                        if(cat === '' || cat === null || cat === 'Select Category')
                        {
                          setCatError('Select Category');
                        }
                        else if( st === '' || st === null || st === 'Select State')
                        {
                          setStError('Select State');
                        }
                        else{
                          setCatError('');
                          setStError('');
                        }
                      }} 
                />
                <Text style={styles.errorText}>{catError}</Text>

                <Text style={styles.titleStyle}>Gender<Text style={{color: 'red'}}> *</Text></Text>   
                <Dropdown
                     style={styles.selectStyle}
                     placeholderStyle={styles.placeholderStyle}
                     //selectedTextStyle={styles.selectedTextStyle}          
                     iconStyle={styles.iconStyle}
                     data={datagen}         
                     maxHeight={300}
                     labelField="label"
                     valueField="value"
                     placeholder='Select Gender'
                     //searchPlaceholder="Search..."
                     onChange={item => 
                       setGen(item.value)}       
                       value={gen}
                       onFocus={()=>{
                        if(gen === '' || gen === null || gen === 'Select Gender')
                        {
                          setGError('Select Gender');
                        }
                        else if(cat === '' || cat === null || cat === 'Select Category')
                        {
                          setCatError('Select Category');
                        }
                        else
                        {
                          setGError('');
                          setCatError('');
                        }
                       }}
                />
                 <Text style={styles.errorText}>{gError}</Text>

                 <Text style={styles.titleStyle}>Work Type<Text style={{color: 'red'}}> *</Text></Text>  
                 <Dropdown
                   style={styles.selectStyle}
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
                     setWt(item.value)}       
                     value={wt}
                     onFocus={()=>{
                      if(wt === '' || wt === null || wt === 'Select Worktype')
                      {
                        setWtError('Select Worktype')
                      }
                      else if(gen === '' || gen === null || gen === 'Select Gender')
                      {
                        setGError('Select Gender');
                      }
                      else{
                        setWtError('');
                        setGError('');
                      }
                     }}
                />
                <Text style={styles.errorText}>{wtError}</Text>

                <Text style={styles.titleStyle}>Primary Skills<Text style={{color: 'red'}}> *</Text></Text>  
                <TextInput
                    style={styles.textInputStyle}
                    label="Primary Skills"
                    //theme={{ colors: { primary: '#069A8E' } }}
                    //placeholder = "Enter Email"
                    theme={{colors: {primary: '#413C69', placeholder: '#413C69',underlineColor:"transparent"}}}
                    mode="outlined"
                    onChangeText={(pskills) => setPSkill(pskills)}
                    onFocus={()=>{
                      if(pskills === '')
                      {
                        setPsError('Enter Primary Skills');
                      }
                      else if(wt === '' || wt === null || wt === 'Select Worktype')
                      {
                        setWtError('Select Worktype')
                      }
                      else{
                        setPsError('');
                        setWtError('');
                      }
                    }}
                />
                <Text style={styles.errorText}>{psError}</Text>

                <Text style={styles.titleStyle}>Experience<Text style={{color: 'red'}}> *</Text></Text>  
                <TextInput
                    style={styles.textInputStyle}
                    label="Education"
                    //theme={{ colors: { primary: '#069A8E' } }}
                    //placeholder = "Enter Email"
                    theme={{colors: {primary: '#413C69', placeholder: '#413C69',underlineColor:"transparent"}}}
                    mode="outlined"
                    onChangeText={(exp) => setExp(exp)}
                    onFocus={()=>{
                      if(exp === '')
                      {
                        setExpError('Enter Experience')
                      }
                      else if(pskills === ''){
                        setPsError('Enter Primary Skills');
                      }
                      else{
                        setExpError('');
                        setPsError('');
                      }
                    }}
                />
                <Text style={styles.errorText}>{expError}</Text>

                <Text style={styles.titleStyle}>Secondary Skills</Text>  
                <TextInput
                    style={styles.textInputStyle}
                    label="Secondary Skills"
                    //theme={{ colors: { primary: '#069A8E' } }}
                    //placeholder = "Enter Email"
                    theme={{colors: {primary: '#413C69', placeholder: '#413C69',underlineColor:"transparent"}}}
                    mode="outlined"
                    onChangeText={(sskills) => setSSkill(sskills)}
                />
                
                <Text style={styles.titleStyle}>Address</Text>  
                <TextInput
                    style={styles.textInputStyle}
                    label="Address"
                    //theme={{ colors: { primary: '#069A8E' } }}
                    //placeholder = "Enter Email"
                    theme={{colors: {primary: '#413C69', placeholder: '#413C69',underlineColor:"transparent"}}}
                    mode="outlined"
                    onChangeText={(adr) => setAdr(adr)}
                />

           <Text style={styles.titleStyle}>Start Date<Text style={{color: 'red'}}> *</Text></Text>
           
                   <View style={styles.inputStyle}>
            <Text onPress={input.showDatepicker}>{moment(input.date).format('YYYY-MM-DD')}</Text>
            </View>
              {input.show && (
                   <DateTimePicker
                   style={styles.inputStyle}       
                   testID="dateTimePicker1"
                   value={input.date}
                   mode={input.mode}
                   is24Hour={true}
                   display="default"
                   onChange={input.onChange}
                   isDarkModeEnabled='false'                
                   />
               )}

            <Text style={styles.titleStyle}>End Date<Text style={{color: 'red'}}> *</Text></Text>
           
                <View style={styles.inputStyle}>
            <Text  onPress={input2.showDatepicker}>{moment(input2.date).format('YYYY-MM-DD')}</Text>
            </View>
              {input2.show && (
                   <DateTimePicker
                   style={styles.inputStyle}                       
                   testID="dateTimePicker2"
                   value={input2.date}
                   mode={input2.mode}
                   is24Hour={true}
                   display="default"
                   onChange={input2.onChange}
                    />

            
              )}


                 <Text style={styles.titleStyle}>Project Period</Text>  
                <TextInput
                    style={styles.textInputStyle}
                    label="Project Period"
                    theme={{colors: {primary: '#413C69', placeholder: '#413C69',underlineColor:"transparent"}}}
                    mode="outlined"
                    onChangeText={(pper) => setPper(pper)}
                />


                <Text style={styles.titleStyle}>Project Rates</Text>  
                <TextInput
                    style={styles.textInputStyle}
                    label="Project Rates"
                    theme={{colors: {primary: '#413C69', placeholder: '#413C69',underlineColor:"transparent"}}}
                    mode="outlined"
                    onChangeText={(prates) => setPrates(prates)}
                />    

                 <Text style={styles.titleStyle}>Last Date to apply<Text style={{color: 'red'}}> *</Text></Text>
           
                <View style={styles.inputStyle}>
            <Text  onPress={input3.showDatepicker}>{moment(input3.date).format('YYYY-MM-DD')}</Text>
            </View>
              {input3.show && (
                   <DateTimePicker
                   style={styles.inputStyle}                       
                   testID="dateTimePicker3"
                   value={input3.date}
                   mode={input3.mode}
                   is24Hour={true}
                   display="default"
                   onChange={input3.onChange}
                    />

            
              )}  

           
                {/*<View style={styles.btnHolder}>
                    <Buttons text="Submit" onPress={Validate} />
                    <Buttons text="Cancel" />
              </View>*/}

<View style={styles.btnCont}>
     <TouchableOpacity style={styles.button} onPress={Validate}><Text style={styles.btnText}>Next</Text></TouchableOpacity>
     <TouchableOpacity style={styles.button} ><Text style={styles.btnText}>Cancel</Text></TouchableOpacity>
     </View>




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
)(RecPostAd)

const styles = StyleSheet.create({
   screen: {
          flex: 1,
         
      },
      headerStyle: {
          justifyContent: 'center',
          alignItems: 'center',
         
      },
      headerTitle: {
          justifyContent: 'center',
          alignItems: 'center',
          fontSize:16,
          color:'black'
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
       },
       textCont:{
  
        justifyContent:'center',
        alignItems:'center'
       },
     
       textStyle:{
         fontFamily:'OpenSans-Bold',
         fontSize:18,
         fontWeight:'bold',
         color:'#FC6C85'    
     
       },

       headerText:{               
        fontFamily:'OpenSans-Bold',
        fontSize:20,
        fontWeight:'bold',       
        color:'#23211d'
        //color:'#363062'      
    },
    headerStyle: {
      justifyContent: 'center',
      alignItems: 'center',

  },
  inputStyle: {
    margin: 15,
    width: '80%',
    height: 50,
    borderColor: 'grey',
    borderRadius: 4,
    borderWidth: 1

},
titleStyle:{
  marginTop:8,
  //color:'#413C69',
  fontStyle: 'italic',
  color:'#23211d',
  fontFamily:'OpenSans-Bold',
  fontSize:18,
  fontWeight:'800'
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
selectStyle:
  {
    margin: 15,
    width: '80%',
    height: 50,
    borderColor: 'grey',
    borderRadius: 4,
    borderWidth: 1,
    backgroundColor:'#FFFFFF',
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


