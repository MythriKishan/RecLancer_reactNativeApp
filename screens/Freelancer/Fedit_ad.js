import React,{useEffect,useState} from "react";
import { StyleSheet,Text,View,Button,Alert,TouchableOpacity,ScrollView } from "react-native";
import Header from "../../components/Header";
import * as actions from '../actions';
import appstate from '../appreducers';
import { connect } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';
import { TextInput } from "react-native-paper";
//import { ScrollView } from "react-native-gesture-handler";
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment";
import Buttons from "../../components/Buttons";

const Fedit_ad = ({User,Token,route,navigation}) => {

  const {adid} =  route.params
  console.log(adid)

  const[data,setData] = useState("")

  const[name,setName] = useState("");
  const[email,setEmail] = useState("");
  const[mobile,setMob] = useState("");
  const[ptitle,setPtitle] = useState("");
  const[st,setSt] = useState("");
  const[city,setCity] = useState("");
  const[cat,setCat] = useState("");
  const[sub,setSub] = useState("");
  const[wt,setWt] = useState("");
  const[gen,setGen] = useState("");
  const[pskills,setPSkill] = useState("");
  const[exp,setExp] = useState("");
  const[sskills,setSSkill] = useState("");
  const[prates,setPrates] = useState("");
  const[pref,setPref] = useState("");
  const[sdate,setSdate] = useState(new Date());
  const[edate,setEdate] = useState(new Date());
  
  const[isDatePickerVisible, setDatePickerVisibility] = useState(false);


  const[psError,setPsError] = useState("");
  const[expError,setExpError] = useState("");
  const[pratesError,setPratesError] = useState("");

  useEffect(()=>{
    fetch('https://reclancer.com/reclancerapi/app_freead.php',
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
      const d = responseJson;
      
      
      setData(responseJson[0])

      setPtitle(responseJson[0].profession_title)
      setCity(responseJson[0].city)
      setSub(responseJson[0].subcategory)
      setPSkill(responseJson[0].skills)
      setExp(responseJson[0].exp)
      setSSkill(responseJson[0].sskills)
      setPrates(responseJson[0].project_rates)
      setSt(responseJson[0].start_date)     
      setPref(responseJson[0].ref)
      
          
         }).catch((error) => {
           console.error(error);
         });
    
   },[])  

   console.log(data)
   console.log(data.start_date)
   
   const input = useInput(new Date(data.start_date))   
   const input2 = useInput(new Date(data.end_date))

   const Validate=()=>{
   
    let startDate = moment(input.date).utc().format('YYYY-MM-DD');   
    let endDate = moment(input2.date).utc().format('YYYY-MM-DD');
    console.log(endDate);

    let reg_psk = /^[a-zA-Z]{1,}/;
    if (pskills === "") {
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

   
    let reg_expr = /^(\d+(?:\.\d+)?\+?)\s*(years?)/;
    if (exp === "") {
      setExpError("Experience is Required Field.");  
    } 
    else
    {
     
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

    if((pskills != "") && (exp != ""))
    {
      

    fetch('https://reclancer.com/reclancerapi/appfreead_update.php',
   {
     method: 'POST',    
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
       'Authorization': 'Bearer ' + Token
     },    
     body: JSON.stringify({   

       adid : adid, 
       ptitle:ptitle,  
       ct:city,     
       subcat: sub,
       pskill:pskills,
       sskill : sskills,
       exp:exp,      
       sd : startDate,
       pr : prates,
       ed : endDate,
       pre:pref
             
     })
    
   }).then((response) => response.json())
   .then((responseJson) => {

    // console.log(responseJson.code);
     
     //this.props.navigation.navigate('Second');

     if(responseJson.code === 200)
     {
     Alert.alert("Success");
     }
     else
     {
      Alert.alert("Failure! Retry");
     }
    
         
        }).catch((error) => {
          console.error(error);
        });   

      

      }
else
{
Alert.alert("Enter all mandatory fields");
}
  
}
 
return(
<View style={styles.screen}>  
<ScrollView>  
    <View style={styles.headerStyle}>
                 
    <Text style={styles.headerText}>Freelancer Edit Ad</Text>
    </View>
    
       <Text style={styles.titleStyle}>Name<Text style={{color: 'red'}}> *</Text></Text>
        <TextInput
             style={styles.textInputRN}
             theme={{colors: {primary: '#413C69', placeholder: '#413C69',underlineColor:"transparent"}}}             
             defaultValue = {data.name} 
             editable = {false}
             onChangeText={(name) => setName(name)}
        />

        <Text style={styles.titleStyle}>Email<Text style={{color: 'red'}}> *</Text></Text>
          <TextInput
                    style={styles.textInputRN}                
                    theme={{ colors: { primary: '#069A8E' } }}
                    defaultValue = {data.email} 
                    editable = {false}
                    onChangeText={(email) => setEmail(email)}
                />

          <Text style={styles.titleStyle}>Mobile<Text style={{color: 'red'}}> *</Text></Text>
          <TextInput
                    style={styles.textInputRN} 
                    theme={{ colors: { primary: '#069A8E' } }}
                    defaultValue = {data.mobilenumber} 
                    editable = {false}
                    onChangeText={(mobile) => setMob(mobile)}
                />

           <Text style={styles.titleStyle}>Professional Title</Text>
           <TextInput
                    style={styles.inputStyle}
                    defaultValue = {data.profession_title} 
                    onChangeText={(ptitle) => setPtitle(ptitle)}
                />
            
          <Text style={styles.titleStyle}>State<Text style={{color: 'red'}}> *</Text></Text>
          <TextInput
                    style={styles.textInputRN} 
                    theme={{ colors: { primary: '#069A8E' } }}
                    defaultValue = {data.Name} 
                    editable = {false}
                    onChangeText={(st) => setSt(st)}
                />

          <Text style={styles.titleStyle}>City</Text>
          <TextInput
                    style={styles.inputStyle} 
                    //theme={{ colors: { primary: '#069A8E' } }}
                    defaultValue = {data.city}  
                    onChangeText={(city) => setCity(city)}                
                />

          <Text style={styles.titleStyle}>Category<Text style={{color: 'red'}}> *</Text></Text>
          <TextInput
                    style={styles.textInputRN} 
                    //theme={{ colors: { primary: '#069A8E' } }}
                    defaultValue = {data.category_name} 
                    editable = {false}
                    onChangeText={(cat) => setCat(cat)}
                />

          <Text style={styles.titleStyle}>Subcategory</Text>
          <TextInput
                    style={styles.inputStyle} 
                    //theme={{ colors: { primary: '#069A8E' } }}
                    defaultValue = {data.subcategory}                   
                    onChangeText={(sub) => setSub(sub)}
                />


          <Text style={styles.titleStyle}>Work Type<Text style={{color: 'red'}}> *</Text></Text>
          <TextInput
                    style={styles.textInputRN} 
                    theme={{ colors: { primary: '#069A8E' } }}
                    defaultValue = {data.type}
                    editable = {false}                   
                    onChangeText={(wt) => setWt(wt)}
                />

          <Text style={styles.titleStyle}>Gender<Text style={{color: 'red'}}> *</Text></Text>
          <TextInput
                    style={styles.textInputRN} 
                    theme={{ colors: { primary: '#069A8E' } }}
                    defaultValue = {data.gender_type}
                    editable = {false}                   
                    onChangeText={(gen) => setGen(gen)}
                />

            <Text style={styles.titleStyle}>Primary Skills<Text style={{color: 'red'}}> *</Text></Text>
            <TextInput
                    style={styles.inputStyle}
                    //theme={{ colors: { primary: '#069A8E' } }}
                    defaultValue= {data.skills}                  
                    onChangeText={(pskills) => setPSkill(pskills)}
                    onFocus={()=>{
                      if(pskills === '')
                      {
                        setPsError('Enter Primary Skills');
                      }                     
                     
                      else{
                          
                          setPsError('');
                      }
                    }
                    }
                />
                 <Text style={styles.errorText}>{psError}</Text>  
             
             <Text style={styles.titleStyle}>Experience<Text style={{color: 'red'}}> *</Text></Text>
                <TextInput
                    style={styles.inputStyle}
                    //theme={{ colors: { primary: '#069A8E' } }}
                    defaultValue = {data.exp}                   
                    onChangeText={(exp) => setExp(exp)}
                    onFocus={()=>{
                      if(pskills === '')
                      {
                        setPsError('Enter Primary Skills');
                      }  
                      if(exp === '')  
                      {
                        setExpError('Enter Experience in Years');
                      }                 
                     
                      else{
                          
                          setPsError('');
                          setExpError('');
                      }
                    }
                    }
                />
                 <Text style={styles.errorText}>{expError}</Text>  
                

              <Text style={styles.titleStyle}>Secondary Skills</Text>
                <TextInput
                    style={styles.inputStyle}
                    //theme={{ colors: { primary: '#069A8E' } }}
                    defaultValue = {data.sskills}
                    onChangeText={(sskills) => setSSkill(sskills)}
                />

              <Text style={styles.titleStyle}>Project Rates</Text>
                <TextInput
                    style={styles.inputStyle}
                   // theme={{ colors: { primary: '#069A8E' } }}
                    defaultValue = {data.project_rates}                    
                    onChangeText={(prates) => setPrates(prates)}
                    onFocus={()=>{
                      if(exp === '')
                      {
                        setExpError('Enter Experience in years');
                      }  
                      else if(prates === '')
                      {
                        setPratesError('Enter Project rates per month');
                      }                     
                      else{
                          
                          setExpError('');
                          setPratesError('');
                      }
                    }
                    }
                />
                 <Text style={styles.errorText}>{pratesError}</Text>  

             <Text style={styles.titleStyle}>Start Date<Text style={{color: 'red'}}> *</Text></Text>
            <View style={styles.inputStyle}>
            <Text onPress={input.showDatepicker}>{moment(input.date).format('YYYY-MM-DD')}</Text>
            </View>
              {input.show && (
                   <DateTimePicker
                   style={styles.inputStyle}       
                   testID="dateTimePicker1"   
                   defaultValue={st}                
                   value={input.date}
                   mode={input.mode}
                   is24Hour={true}
                   //display="default"
                   onChange={input.onChange}
                   isDarkModeEnabled='false'                
                   onFocus={()=>{
                    if(prates === '')
                    {
                      setPratesError('Enter Project Rates per hour');
                    }  

                   
                    else{
                        
                        setPratesError('');
                    }
                  }
                  }
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
          
          {/*<Text style={styles.textStyle}>Start Date</Text>
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

            <Text style={styles.textStyle}>End Date</Text>
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

<Text style={styles.titleStyle}>Project References</Text>
            <TextInput
                    style={styles.inputStyle}
                    defaultValue = {data.ref}                  
                    onChangeText={(pref) => setPref(pref)}
                /> 

{/*<View style={styles.btnHolder}>
                    <Buttons text="Submit" onPress={Validate} />
                    <Buttons text="Cancel" />
            </View>*/}

<View style={styles.btnCont}>
     <TouchableOpacity style={styles.button} onPress={Validate}><Text style={styles.btnText}>Submit</Text></TouchableOpacity>
     <TouchableOpacity style={styles.button} ><Text style={styles.btnText}>Cancel</Text></TouchableOpacity>
     </View>




</ScrollView>         
</View>
)
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
  )(Fedit_ad)

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
        color:'white',
        fontFamily:'OpenSans-bold'
    },

    textStyle:{
     fontSize:16,
     color:'green',
     fontFamily:'OpenSans-bold',
     marginLeft:20
    },

inputStyle: {
  margin: 15,
  width: '80%',
  height: 50,
  backgroundColor:'#FFFFFF',
  borderColor:'#C5DFF8',
  borderRadius: 1,
  borderWidth: 1, 
  borderColor:'#C5DFF8',
  outlineColor:'white',
  activeoutlineColor:'#6B240C',  
},
textInputRN:{
    margin: 15,
    width: '80%',
    height: 50,
    borderColor: 'grey',
    borderRadius: 1,
    borderWidth: 1,
    backgroundColor:'#D3D3D3',
    borderColor:'#C5DFF8',
    outlineColor:'white',
    activeoutlineColor:'#6B240C',   
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
 headerText:{               
  fontFamily:'OpenSans-Bold',
  fontSize:20,
  fontWeight:'bold',       
  color:'#23211d'
  //color:'#363062'      
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