import React from "react";
import { StyleSheet,View,Text,TouchableOpacity } from "react-native";
import Buttons from "./Buttons";
import Header from "./Header";
import { TextInput } from "react-native-paper";
import { Dropdown } from 'react-native-material-dropdown-v2-fixed';


const SearchForm = ({onSubmit,initialValues}) =>{
  const[st,setSt] = useState("");
  const[cat,setCat] = useState("");
  const[wt,setWt] = useState("");
  const[pskills,setPSkill] = useState("");

  const StateDate = [
    {label: 'Select State', value: '0'},
    {label:'Andaman & Nicobar',value:'1'},
    {label:'Andhra Pradesh',value:'2'},
    {label:'Arunachal Pradesh',value:'3'},
    {label:'Assam',value:'4'},
    {label:'Bihar',value:'5'},
    {label:'Chandigarh',value:'6'},
    {label:'Chattisgarh',value:'7'},
    {label:'Dadra & Nagar Haveli',value:'8'},
    {label:'Daman & Diu',value:'9'},
    {label:'Delhi',value:'10'}
    ];
    const c = [
      { label: 'Select Category', value: '0'},
      { label: 'Aerospace', value: '1' },
      { label: 'Agriculture', value: '2'},
      { label: 'Chemical', value: '3'},
      { label: 'Computer', value: '4'},
      { label: 'Construction', value: '5'},
      { label: 'Defence', value: '6'},
      { label: 'Education', value: '7'},
      { label: 'Energy',value: '8'},
      { label: 'Entertainment', value:'9'},
      { label : 'Financial Services', value:'10'},
      { label : 'Food Industry', value:'11'},
      { label : 'Health Care', value:'12'},
      { label : 'Hospitality', value: '13'},
      { label : 'Information' , value : '14'},
      { label : 'Manufacturing' , value :'15'},
      { label : 'Mass Media', value:'16'},
      { label : 'Telecommunication',value:'17'},
      { label : 'Transport',value :'18'},
      { label : 'Others', value:'19'}
      
    ];
  
    const worktype=[
      { label: 'Select WorkType', value: '0'},
      { label: 'Remote Only', value: '1' },
      { label: 'Onsite Only', value: '2'},
      { label: 'Both Remote and Onsite', value: '3'},
    ];

    return(
   
        <View style={styles.screen}>
    
            <View style={styles.headerStyle}>
                {/* Header reusable component*/}
                <Header title="Search" style={styles.headerTitle} />
            </View>

            <Dropdown
                    style={styles.inputStyle}
                    placeholderStyle={styles.placeholderStyle}
                    //selectedTextStyle={styles.selectedTextStyle}          
                    iconStyle={styles.iconStyle}
                    data={c}         
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

            <Dropdown
                    placeholder="Select State"
                    onChangeText={(state) => setSt(state)}
                    style={styles.inputStyle}
            />

            <TextInput
                    style={styles.inputStyle}
                    placeholder="Primary Skills"
                    onChangeText={(pskills) => setPSkill(pskills)}
            />

            <Dropdown
                    placeholder="Work Type"
                    onChangeText={(wt) => setWt(wt)}
                    style={styles.inputStyle}
            />

            <View style={styles.btnHolder}>
                    <Buttons text="Submit" onPress={() => onSubmit()} />
                    <Buttons text="Cancel" />
            </View>


        </View>
    )

}

export default SearchForm;

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



    }

});