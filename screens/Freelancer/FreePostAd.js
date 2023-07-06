import React,{useEffect, useState} from "react";
import { StyleSheet, Text, View,TouchableOpacity,Button, Alert } from "react-native";
import FPostForm from "../../components/FPostForm";
import * as actions from '../actions';
import appstate from '../appreducers';
import { connect } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';
import Buttons from "../../components/Buttons";
import Header from "../../components/Header";
import { getCombinedStyles, TextInput } from "react-native-paper";
//import { Dropdown } from 'react-native-material-dropdown-v2-fixed';
import { Dropdown } from 'react-native-element-dropdown';
import SelectDropdown from 'react-native-select-dropdown'
import { ScrollView } from "react-native-gesture-handler";
import DateTimePicker from '@react-native-community/datetimepicker'
//import DateTimePickerModal from "react-native-modal-datetime-picker";
import { AntDesign } from '@expo/vector-icons';
import moment from "moment";
//import { getStateFromPath } from "@react-navigation/native";
import axios from 'axios';
//import ReactDatePicker from "react-datepicker";

//import "react-datepicker/dist/react-datepicker.css";
//import MultipleDatePicker from 'react-multiple-datepicker';

const FreePostAd = ({User,Token,route,navigation}) => {

  const [datastate,setDatastate] =  useState([]);
  const [datagen,setDatagen] = useState([]);
  const [datacat,setDatacat] = useState([]);
  const [datawt,setDatawt] = useState([]);

  
  const dispatch = useDispatch();

  const[name,setName] = useState("");
  const[email,setEmail] = useState("");
  const[mobile,setMob] = useState("");
  const[ptitle,setPtitle] = useState("");
  const[pskills,setPSkill] = useState("");
  const[exp,setExp] = useState("");
  const[sskills,setSSkill] = useState("");
  const[prates,setPrates] = useState("");
  const[st,setSt] = useState("");
  const[ct,setCt] = useState("");
  const[cat,setCat] = useState("");
  const[sub,setSub] = useState("");
  const[wt,setWt] = useState("");
  const[gen,setGen] = useState("");
  const[pref,setPref] = useState("");
  const[sdate,setSdate] = useState(new Date());
  const[edate,setEdate] = useState(new Date());
  const input = useInput(new Date())
  const input2 = useInput(new Date())
  const[isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const[nameError,setNameError] = useState("");
  const [eError, seteError] = useState("");
  const[mobileError,setmError] = useState("");
  const[stError,setStError] = useState("");
  const[catError,setCatError] = useState("");
  const[wtError,setWtError] = useState("");
  const[gError,setGError] = useState("");
  const[psError,setPsError] =useState("");
  const[expError,setExpError] = useState("");


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

 const handleState = e =>{
  console.log(e)
  //setSt(e.target.value);

  //console.log(st)
 }
  
  useEffect(()=>{
    //console.log(route.params);
    //const {id,token} = route.params;    
    //dispatch(actions.action_userid(id));    
    //dispatch(actions.action_token(token));   
     
    console.log(User+"Inside Postad")
    console.log(Token+"token Inside Postad")

    /*State list API Call*/
    getState();
    
    /*Gender List API*/
    getGen();

    /*Category list API call*/
    getCategory();

    /*Worktype List API call*/
    getWorktype();

    //getCity(st);


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

  const getCity = (st) =>
{
  fetch('https://reclancer.com/reactnative/getCity.php',
  {
    method: 'POST',    
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
     
    },    
    body: JSON.stringify({       
      id:st
      
    })
   
  }).then((response) => response.json())
  .then((responseJson) => {

    console.log(responseJson)
        
       }).catch((error) => {
         console.error(error);
       });     
   
     } 
       
  
  const Validate=()=>{
   
    let startDate = moment(input.date).utc().format('YYYY-MM-DD');   
    let endDate = moment(input2.date).utc().format('YYYY-MM-DD');
   
    /**Name Validation**/
    let reg_name = /^[a-zA-Z ]*$/;
    if (name.trim() === "") {
      setNameError("Name is Required Field.");  
    } 
    else
    {
     // let reg_name = /^[a-zA-Z ]*$/;
      if(reg_name.test(name) === false)
    {
      setNameError("Enter Valid Name.");
      //this.setState({email:text}) 
      return false; 
      }    
     else{
      console.log(name);
      setNameError("");
     }
    }


    /**Email Validation **/
    let reg_mail = /^\S+@\S+\.\S+$/; 
    if(email.trim() === "")
    {
      seteError('Email is Required!');
    }
    else if(reg_mail.test(email) === false)    
    {
      seteError('Enter Valid email Id!');
      }  
    else{
      seteError('');
    }

    /**Mobile Validation **/
    let reg_mob = /^[0-9]{10}$/;
    if(mobile.trim() === "")
    {
      setmError('Mobile is Required!');
    }
    else if(reg_mob.test(mobile) === false)    
    {
      setmError('Enter Valid Mobile Number!');
      }  
    else{
      setmError('');
    }

    /**State Validation**/
   // console.log(st);
    if(st === "" || '0')
    {      
      setStError('State is Required!');
    }

    /**Category Validation**/
    if(cat === "" || '0')
    {      
      setCatError('Category is Required!');
    }

    /**WorkType Validation**/
    if(wt === "" || '0')
    {
      setWtError('WorkType is Required!');
    }

    /**Gender Validation**/
    if(gen === "" || '0')
    {
      setGError('Gender is Required!');
    }
     
    /**Primary skills Validation**/
    let reg_psk = /^[a-zA-Z]{1,}/;
    if (pskills.trim() === "") {
      setPsError("Primary Skills is Required Field.");  
    } 
    else
    {
     // let reg_name = /^[a-zA-Z ]*$/;
      if(reg_psk.test(pskills) === false)
    {
      setPsError("Enter Valid Skills.");
      //this.setState({email:text}) 
      return false; 
      }    
     else{      
      setPsError("");
     }
    }

   /**Experience Validation**/
    let reg_expr = /^(\d+(?:\.\d+)?\+?)\s*(years?)/;
    if (exp.trim() === "") {
      setExpError("Experience is Required Field.");  
    } 
    else
    {
     // let reg_name = /^[a-zA-Z ]*$/;
      if(reg_expr.test(exp) === false)
    {
      setExpError("Enter Valid Experience.");
      //this.setState({email:text}) 
      return false; 
      }    
     else{      
      setExpError("");
     }
    }

    if((name != ""))   
     {
      console.log(Token);
      fetch('https://reclancer.com/reclancerapi/appfree_postad.php',
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
       sd:startDate,
       ed:endDate,
       prof : ptitle,
       pskill : pskills,
       ex : exp,
       sskill : sskills,
       st : st,
       ct : cat,
       wt : wt,
       gen: gen,      
       pr : prates,       
       pre : pref 
     })
    
   }).then((response) => response.json())
   .then((responseJson) => {

     //console.log(responseJson);
     
     if(responseJson.code === 200)
     {
         //navigation.navigate('Success Page',{adid:responseJson.id});
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

    return (
        <View style={styles.screen}>
          
             <ScrollView>
                <View style={styles.headerStyle}>
                    {/* Header reusable component*/}
                    <Header title="Freelancer Post Ad" style={styles.headerTitle} />

                </View>
                 
                <TextInput
                    style={styles.inputStyle}
                    label="Name"
                    theme={{ colors: { primary: '#069A8E' } }}
                    //placeholder = "Enter Email"
                    onChangeText={(name) => setName(name)}
                />
                 <Text style={styles.errorText}>{nameError}</Text>

                <TextInput
                    style={styles.inputStyle}
                    label="Email"
                    theme={{ colors: { primary: '#069A8E' } }}
                    //placeholder = "Enter Email"
                    onChangeText={(email) => setEmail(email)}
                />
                 <Text style={styles.errorText}>{eError}</Text>

                <TextInput
                    style={styles.inputStyle}
                    placeholder="Mobile"
                    onChangeText={(mobile) => setMob(mobile)}
                />
                <Text style={styles.errorText}>{mobileError}</Text>

                <TextInput
                    style={styles.inputStyle}
                    placeholder="Professional Title"
                    onChangeText={(ptitle) => setPtitle(ptitle)}
                />
                        
        <Dropdown
          style={styles.inputStyle}
          placeholderStyle={styles.placeholderStyle}
          //selectedTextStyle={styles.selectedTextStyle}          
          iconStyle={styles.iconStyle}          
          data={datastate}
          //data={StateDate}         
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder='Select State'
          //searchPlaceholder="Search..."
          onChange={item => 
           setSt(item.value)} 
            //onChange={handleState(item=>item.value)}            
            //value={item=>item.value}
            value={st}

           />       
          <Text style={styles.errorText}>{stError}</Text>

                {/*<Dropdown
                    placeholder="Select City"
                    onChangeText={(city) => setCt(city)}
                    style={styles.inputStyle}
          />*/}

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
                    <Text style={styles.errorText}>{catError}</Text>


                <TextInput
                    style={styles.inputStyle}
                    placeholder="Subcatgory"
                    onChangeText={(sub) => setSub(sub)}
                />

                <Dropdown
                     style={styles.inputStyle}
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
                       setCat(item.value)}       
                       value={cat}
                />
                 <Text style={styles.errorText}>{gError}</Text>

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
                   <Text style={styles.errorText}>{wtError}</Text>

                <TextInput
                    style={styles.inputStyle}
                    placeholder="Primary Skills"
                    onChangeText={(pskills) => setPSkill(pskills)}
                />
                <Text style={styles.errorText}>{psError}</Text>

                <TextInput
                    style={styles.inputStyle}
                    placeholder="Experience"
                    onChangeText={(exp) => setExp(exp)}
                />
                <Text style={styles.errorText}>{expError}</Text>

                <TextInput
                    style={styles.inputStyle}
                    placeholder="Secondary Skills"
                    onChangeText={(sskills) => setSSkill(sskills)}
                />

                <TextInput
                    style={styles.inputStyle}
                    placeholder="Project Rates"
                    onChangeText={(prates) => setPrates(prates)}
                />      
          
          {/*<Text style={{marginLeft:30,color:'white'}}>Start Date</Text>
           <Button     
             
              onPress={input.showDatepicker}
              title={input.date.toLocaleDateString()} />
              {input.show && (
                   <DateTimePicker
                   style={styles.inputStyle}       
                   testID="dateTimePicker1"
                   value={input.date}
                   mode={input.mode}
                   is24Hour={true}
                   display="default"
                   onChange={input.onChange}
                   />
               )}

            <Text style={{marginLeft:30,color:'white'}}>End Date</Text>
            <Button    
                      
              onPress={input2.showDatepicker}
              title={input2.date.toLocaleDateString()} />
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

            
              )}*/}

            <TextInput
                    style={styles.inputStyle}
                    placeholder="Project References"
                    onChangeText={(pref) => setPref(pref)}
                /> 

             
 {/*<View>
 
      <DatePicker
        onChange={(date) => handleDateChange(date)}
        selectsStart={true}
        selected={sdate}
        startDate={sdate}
        endDate={edate}
        inline={true}
      />
    
    </View>*/}

        {/*<Text>{sdate}</Text>
          <Button title="Show Date Picker" onPress={showDatePicker} />
         <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"        
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
          />
         <TextInput
                    style={styles.inputStyle}
                    placeholder="Start Date"
                    onChangeText={(sdate) => setSdate(sdate)}
                    value={sdate}
  />*/}


               {/*<DateTimePickerModal                   
                    mode="date"                    
                />
                <View style={{ flexDirection: "row" }}>
                <TextInput placeholder="Start Date" 
                        onChangeText={UserSdate => this.setSdate({ UserSdate})}
                        // Making the Under line Transparent.
                        underlineColorAndroid='transparent'
                        style={styles.inputStyle} />

                <TouchableOpacity style={{ position: "absolute", left: "75%", top: "25%" }}
                       //</View> onPress={() => this.setState({ show: !this.state.show })}
                       >
                <AntDesign name="calendar" size={24} color="black" />
                </TouchableOpacity>

                </View>

               
                <DateTimePickerModal                   
                    mode="date"                    
                />
                <View style={{ flexDirection: "row" }}>
                <TextInput placeholder="End Date" 
                        onChangeText={UserEdate => this.setSdate({ UserEdate})}
                        // Making the Under line Transparent.
                        underlineColorAndroid='transparent'
                        style={styles.inputStyle} />

                <TouchableOpacity style={{ position: "absolute", left: "75%", top: "25%" }}
                       //</View> onPress={() => this.setState({ show: !this.state.show })}
                       >
                <AntDesign name="calendar" size={24} color="black" />
                </TouchableOpacity>

    </View>*/}

                {/*<Text style={styles.inputStyle}>End Date: </Text>*/}


                {/*<Button title="Login" 
          onPress={LoginHandle}/>*/}
                <View style={styles.btnHolder}>
                    <Buttons text="Submit" onPress={Validate} />
                    <Buttons text="Cancel" />
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
    mapStateToProps,
    mapDispatchToProps  
  )(FreePostAd)
  
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