import React from "react";
import { StyleSheet, View, Text,TouchableOpacity } from "react-native";
import Buttons from "./Buttons";
import Header from "./Header";
import { TextInput } from "react-native-paper";
import { Dropdown } from 'react-native-material-dropdown-v2-fixed';
import { ScrollView } from "react-native-gesture-handler";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { AntDesign } from '@expo/vector-icons';


const FPostForm = ({onSubmit}) => {
    const initValues = {
    
        email: '',
        password: ''
         
      }
       const catId = route.params.categoryId;
       const [Mode,setMode] = useState(false)
       const [name , setName] = useState("");
       const [email , setEmail] = useState("");
       
       const [error,setError] = useState("");  
       
       Validate = () =>{
        if(email===" " || name===""){
           setError("Fill all the required fields")
        }
        else{
           onSubmit();
        }
       }


    return (

        <View style={styles.screen}>
            <ScrollView>
                <Text>{error}</Text>
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

                <TextInput
                    style={styles.inputStyle}
                    label="Email"
                    theme={{ colors: { primary: '#069A8E' } }}
                    //placeholder = "Enter Email"
                    onChangeText={(email) => setEmail(email)}
                />

                <TextInput
                    style={styles.inputStyle}
                    placeholder="Mobile"
                    onChangeText={(mobile) => setMob(mobile)}
                />

                <TextInput
                    style={styles.inputStyle}
                    placeholder="Professional Title"
                    onChangeText={(ptitle) => setMob(ptitle)}
                />

                <Dropdown
                    placeholder="Select State"
                    onChangeText={(state) => setSt(state)}
                    style={styles.inputStyle}
                />

                <Dropdown
                    placeholder="Select City"
                    onChangeText={(city) => setCt(city)}
                    style={styles.inputStyle}
                />

                <Dropdown
                    placeholder="Select Category"
                    onChangeText={(cat) => setCat(cat)}
                    style={styles.inputStyle}
                />

                <TextInput
                    style={styles.inputStyle}
                    placeholder="Subcatgory"
                    onChangeText={(sub) => setSub(sub)}
                />

                <Dropdown
                    placeholder="Gender"
                    onChangeText={(gen) => setGen(gen)}
                    style={styles.inputStyle}
                />

                <Dropdown
                    placeholder="Work Type"
                    onChangeText={(wt) => setWt(wt)}
                    style={styles.inputStyle}
                />

                <TextInput
                    style={styles.inputStyle}
                    placeholder="Primary Skills"
                    onChangeText={(pskills) => setPSkill(pskills)}
                />

                <TextInput
                    style={styles.inputStyle}
                    placeholder="Experience"
                    onChangeText={(exp) => setExp(exp)}
                />

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

                <DateTimePickerModal                   
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

                {/*<Text style={styles.inputStyle}>Start Date: </Text>*/}


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

                </View>

                {/*<Text style={styles.inputStyle}>End Date: </Text>*/}


                {/*<Button title="Login" 
          onPress={LoginHandle}/>*/}
                <View style={styles.btnHolder}>
                    <Buttons text="Submit" 
                    //onPress={() => onSubmit()} 

                    onPress={Validate}
                    />
                    <Buttons text="Cancel" />
                </View>

            </ScrollView>

        </View>

    )


}

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

export default FPostForm;