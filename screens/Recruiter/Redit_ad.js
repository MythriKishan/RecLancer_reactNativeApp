import React,{useEffect,useState} from "react";
import { StyleSheet,Text,View,Button,Alert } from "react-native";
import Header from "../../components/Header";
import * as actions from '../actions';
import appstate from '../appreducers';
import { connect } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';
import { TextInput } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment";
import Buttons from "../../components/Buttons";

const Redit_ad = ({User,Token,route,navigation}) => {

  const {adid} =  route.params
  console.log(adid)

  const[data,setData] = useState("")

  const[title,setTitle] = useState("");
  const[name,setName] = useState("");
  const[email,setEmail] = useState("");
  const[mobile,setMob] = useState("");  
  const[st,setSt] = useState("");
  const[city,setCity] = useState("");
  const[cat,setCat] = useState("");
  const[sub,setSub] = useState("");
  const[wt,setWt] = useState("");
  const[gen,setGen] = useState("");
  const[adr,setAdr] = useState("");
  const[pper,setPper] = useState("");
  const[pskills,setPSkill] = useState("");
  const[exp,setExp] = useState("");
  const[sskills,setSSkill] = useState("");
  const[prates,setPrates] = useState("");
  const[sdate,setSdate] = useState(new Date());
  const[edate,setEdate] = useState(new Date());
  const input3 = useInput(new Date())
  
  const[isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const[titleError,setTitleError] = useState("");
  const[psError,setPsError] = useState("");
  const[expError,setExpError] = useState("");

  useEffect(()=>{
    fetch('https://reclancer.com/reclancerapi/app_recad.php',
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

      setCity(data.city)
      setSub(data.subcategory)
      setSSkill(data.sskills)
      
          
         }).catch((error) => {
           console.error(error);
         });
    
   },[])  

   console.log(data)
   
   const input = useInput(new Date(data.start_date))
   const input2 = useInput(new Date(data.end_date))
   //const input3 = useInput(new Date(data.last_date))

   const Validate=()=>{
   
    let startDate = moment(input.date).utc().format('YYYY-MM-DD');   
    let endDate = moment(input2.date).utc().format('YYYY-MM-DD');
    let lastDate = moment(input3.date).utc().format('YYYY-MM-DD');
    console.log(lastDate)

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

    fetch('https://reclancer.com/reclancerapi/apprecad_update.php',
   {
     method: 'POST',    
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
       'Authorization': 'Bearer ' + Token
     },    
     body: JSON.stringify({   

       adid : adid,        
       subcat: sub,
       ct:city, 
       sskill : sskills,      
       sd : startDate,
       pr : prates,       
       ed : endDate,
       ldate : lastDate
             
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
 
return(
<View style={styles.screen}>  
<ScrollView>  
    <View style={styles.headerStyle}>
                    {/* Header reusable component*/}
    {/*<Header title="Freelancer Ad Post Successful" style={styles.headerTitle} />*/}
    <Text style={styles.headerTitle}>Recruiter Edit Ad</Text>
    </View>

       <Text style={styles.textStyle}>Job Title</Text>
       <TextInput
                    style={styles.inputStyle}                   
                    theme={{ colors: { primary: '#069A8E' } }}
                    defaultValue = {data.job_title} 
                    onChangeText={(title) => setTitle(title)}
                />
                 <Text style={styles.errorText}>{titleError}</Text>
    
       <Text style={styles.textStyle}>Name</Text>
        <TextInput
             style={styles.textInputRN}
             //label="Name"
             theme={{ colors: { primary: '#069A8E' } }}
             defaultValue = {data.name} 
             editable = {false}
             onChangeText={(name) => setName(name)}
        />

        <Text style={styles.textStyle}>Email</Text>
          <TextInput
                    style={styles.textInputRN}                
                    theme={{ colors: { primary: '#069A8E' } }}
                    defaultValue = {data.email} 
                    editable = {false}
                    onChangeText={(email) => setEmail(email)}
                />

          <Text style={styles.textStyle}>Mobile</Text>
          <TextInput
                    style={styles.textInputRN} 
                    theme={{ colors: { primary: '#069A8E' } }}
                    defaultValue = {data.mobilenumber} 
                    editable = {false}
                    onChangeText={(mobile) => setMob(mobile)}
                />          
            
          <Text style={styles.textStyle}>State</Text>
          <TextInput
                    style={styles.textInputRN} 
                    theme={{ colors: { primary: '#069A8E' } }}
                    defaultValue = {data.Name} 
                    editable = {false}
                    onChangeText={(st) => setSt(st)}
                />

          <Text style={styles.textStyle}>City</Text>
          <TextInput
                    style={styles.inputStyle} 
                    theme={{ colors: { primary: '#069A8E' } }}
                    defaultValue = {data.city_name}  
                    onChangeText={(city) => setCity(city)}                
                />

          <Text style={styles.textStyle}>Category</Text>
          <TextInput
                    style={styles.textInputRN} 
                    theme={{ colors: { primary: '#069A8E' } }}
                    defaultValue = {data.category} 
                    editable = {false}
                    onChangeText={(cat) => setCat(cat)}
                />

          <Text style={styles.textStyle}>Subcategory</Text>
          <TextInput
                    style={styles.inputStyle} 
                    theme={{ colors: { primary: '#069A8E' } }}
                    defaultValue = {data.subcategory}                   
                    onChangeText={(sub) => setSub(sub)}
                />


          <Text style={styles.textStyle}>Work Type</Text>
          <TextInput
                    style={styles.textInputRN} 
                    theme={{ colors: { primary: '#069A8E' } }}
                    defaultValue = {data.type}
                    editable = {false}                   
                    onChangeText={(wt) => setWt(wt)}
                />

          <Text style={styles.textStyle}>Gender</Text>
          <TextInput
                    style={styles.textInputRN} 
                    theme={{ colors: { primary: '#069A8E' } }}
                    defaultValue = {data.gender_type}
                    editable = {false}                   
                    onChangeText={(gen) => setGen(gen)}
                />

            <Text style={styles.textStyle}>Primary Skills</Text>
            <TextInput
                    style={styles.inputStyle}
                    theme={{ colors: { primary: '#069A8E' } }}
                    defaultValue = {data.skills}
                    onChangeText={(pskills) => setPSkill(pskills)}
                />
             
             <Text style={styles.textStyle}>Experience</Text>
                <TextInput
                    style={styles.inputStyle}
                    theme={{ colors: { primary: '#069A8E' } }}
                    defaultValue = {data.exp}
                    onChangeText={(exp) => setExp(exp)}
                />
                

              <Text style={styles.textStyle}>Secondary Skills</Text>
                <TextInput
                    style={styles.inputStyle}
                    theme={{ colors: { primary: '#069A8E' } }}
                    defaultValue = {data.sskills}
                    onChangeText={(sskills) => setSSkill(sskills)}
                />

               <Text style={styles.textStyle}>Project Address</Text>
               <TextInput
                    style={styles.inputStyle}
                    theme={{ colors: { primary: '#069A8E' } }}
                    defaultValue = {data.project_address}
                    onChangeText={(adr) => setAdr(adr)}
                />

               <Text style={styles.textStyle}>Project Period</Text>
               <TextInput
                    style={styles.inputStyle}
                    theme={{ colors: { primary: '#069A8E' } }}
                    defaultValue = {data.project_period}
                    onChangeText={(pper) => setPper(pper)}
                />              
                

              <Text style={styles.textStyle}>Project Rates</Text>
                <TextInput
                    style={styles.inputStyle}
                    theme={{ colors: { primary: '#069A8E' } }}
                    defaultValue = {data.project_rates}
                    onChangeText={(prates) => setPrates(prates)}
                />
          
          <Text style={styles.textStyle}>Start Date</Text>
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

           
             )}

              <Text style={styles.textStyle}>Last Date</Text>
              <Button    
                      
              onPress={input3.showDatepicker}
              title={input3.date.toLocaleDateString()} />
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


<View style={styles.btnHolder}>
                    <Buttons text="Submit" onPress={Validate} />
                    <Buttons text="Cancel" />
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
  )(Redit_ad)

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
     color:'white',
     fontFamily:'OpenSans-bold',
     marginLeft:20
    },

inputStyle: {
    margin: 15,
    width: 250,
    height: 50,
    borderColor: 'grey',
    borderRadius: 4,
    borderWidth: 1

},
textInputRN:{
  margin: 15,
    width: 250,
    height: 50,
    borderColor: 'grey',
    borderRadius: 4,
    borderWidth: 1,
    backgroundColor:'lightgreen'
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