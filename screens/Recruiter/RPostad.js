import React,{useEffect, useState}  from "react";
import { StyleSheet,Text,View,TouchableOpacity,Button  } from "react-native";
import * as actions from '../actions';
import appstate from '../appreducers';
import { connect } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';
import Buttons from "../../components/Buttons";
import Header from "../../components/Header";
import { TextInput } from "react-native-paper";
//import { Dropdown } from 'react-native-material-dropdown-v2-fixed';
import { Dropdown } from 'react-native-element-dropdown';
import { ScrollView } from "react-native-gesture-handler";
import DateTimePicker from '@react-native-community/datetimepicker'
//import DateTimePickerModal from "react-native-modal-datetime-picker";
import { AntDesign } from '@expo/vector-icons';
import moment from "moment";
//import { getStateFromPath } from "@react-navigation/native";
import axios from 'axios';

const RPostad = ({User,Token,route,navigation}) => {

    const [datastate,setDatastate] =  useState([]);
    const [datagen,setDatagen] = useState([]);
    const [datacat,setDatacat] = useState([]);
    const [datawt,setDatawt] = useState([]);
  
    
      const dispatch = useDispatch();
  
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

      useEffect(()=>{
       
       },[])  
    
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
      
                <View style={styles.headerStyle}>
                    {/* Header reusable component*/}
                    <Header title="Recruiter Post Ad" style={styles.headerTitle} />

                </View>

                <TextInput
                    style={styles.inputStyle}
                    label="Job Title"
                    theme={{ colors: { primary: '#069A8E' } }}
                    //placeholder = "Enter Email"
                    onChangeText={(title) => setTitle(title)}
                />
                 <Text style={styles.errorText}>{titleError}</Text>
                 
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

                <Dropdown
                    placeholder="Select City"
                    onChangeText={(city) => setCt(city)}
                    style={styles.inputStyle}
                />
                
              


               
                <View style={styles.btnHolder}>
                    <Buttons text="Submit" />
                    <Buttons text="Cancel" />
                </View>

              
        </View>



    )

}

export default RPostad;

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
