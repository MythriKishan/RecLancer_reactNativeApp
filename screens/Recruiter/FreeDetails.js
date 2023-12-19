import React, { useEffect ,useState} from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import Header from "../../components/Header";
import {Colors} from 'react-native/Libraries/NewAppScreen';
import * as actions from '../actions';
import appstate from '../appreducers';
import { connect } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';
//import { ScrollView } from "react-native-gesture-handler";
import Card from '../../components/Card';

const FreeDetails = ({Token,User,route,navigation}) => {

    const {adid} = route.params;
    console.log(adid);
   
    const mealId = route.params.adid;
    console.log(mealId+"ad_id");
    //const selectedMeal = MEALS.find((meal) => meal.id === mealId);

    console.log(User+"RecDetails")
    console.log(Token+"RecDetails")

    const dispatch = useDispatch();
    //dispatch(actions.action_token(token)); 

    const[data,setData] = useState("")

    useEffect(()=>{
    fetch('https://reclancer.com/reclancerapi/app_fdetails.php',
   {
     method: 'POST',    
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
       'Authorization': 'Bearer ' + Token
     },    
     body: JSON.stringify({ 
       id : adid  

     })

    }).then((response) => response.json())
    .then((responseJson) => {
 
      console.log(responseJson);    
      setData(responseJson[0])    
          
         }).catch((error) => {
           console.error(error);
         });      
 
        
       },[])  

return(
<ScrollView style={styles.rootContainer}>
<>
<View>            
   
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <Card style={styles.card}>          
          <Text style={styles.sectionTitle}><Text style={styles.labelTitle}>Name:</Text>{data.name}</Text>
          <Text style={styles.sectionTitle}><Text style={styles.labelTitle}>Email:</Text>{data.email}</Text>
          <Text style={styles.sectionTitle}><Text style={styles.labelTitle}>Mobile:</Text>{data.mobilenumber}</Text>
        </Card>
        <Card style={styles.card}>
          <Text style={styles.sectionTitle}><Text style={styles.labelTitle}>Category:</Text>{data.category_name}</Text>
          <Text style={styles.sectionTitle}><Text style={styles.labelTitle}>Subcategory:</Text>{data.subcategory}</Text>
         
        </Card>
        <Card style={styles.card}>
        <Text style={styles.sectionTitle}><Text style={styles.labelTitle}>Primary Skills:</Text> {data.skills}</Text>
          <Text style={styles.sectionTitle}><Text style={styles.labelTitle}>Secondary Skills:</Text>{data.secskill}</Text>
          <Text style={styles.sectionTitle}><Text style={styles.labelTitle}>Experience:</Text>{data.experience}</Text>
          <Text style={styles.sectionTitle}><Text style={styles.labelTitle}>Project Rates/hour:</Text>{data.project_rates}</Text>

        </Card>
       
        <Card style={styles.card}>
          <Text style={styles.sectionTitle}><Text style={styles.labelTitle}>State:</Text>{data.Name}</Text>
          <Text style={styles.sectionTitle}><Text style={styles.labelTitle}>City:</Text>{data.city}</Text>
          
        </Card>
        <Card style={styles.card}>
        <Text style={styles.sectionTitle}><Text style={styles.labelTitle}>Project Start Date:</Text>{data.start_date}</Text>
          <Text style={styles.sectionTitle}><Text style={styles.labelTitle}>Project End Date:</Text>{data.end_date}</Text>
          
        </Card>

      </SafeAreaView>
    
    </View>

</>
{/*<View style={styles.screen}>    
    <View style={styles.headerStyle}>               
    <Text style={styles.headerTitle}>Freelancer Ad Details Page</Text>*/}


   

</ScrollView>
)
}

/**Redux **/
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
  )(FreeDetails)

//export default RecDetails;

const styles = StyleSheet.create({
screen:{
 flex:1
},

details: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  detailItem: {
    marginHorizontal: 4,
    fontSize: 12,
  },
  rootContainer: {
    marginBottom: 32,
  },
  image: {
    width: '100%',
    height: 350,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    margin: 8,
    textAlign: 'center',
    color: 'white',
  },
  detailText: {
    color: 'white',
  },
  listOuterContainer: {
    alignItems: 'center',
  },
  listContainer: {
    width: '80%',
  },
headerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:40

},
headerTitle: {
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily:'OpenSans-bold',
    fontSize:20,
    color:'white'
    
},
container: {
  flex: 1,
  margin: 10,
  alignItems: 'center', // Centered horizontally
},
sectionTitle: {
  fontSize: 14,
  fontWeight: '600',
  color: Colors.white,
},
card: {
  marginBottom:10,
  height:100,
  width: '100%',
  backgroundColor: '#f18484',
  //justifyContent: 'center', //Centered vertically
  //alignItems: 'center', // Centered horizontally
},
labelTitle: {
  fontSize:18,
  fontWeight:'700',
  color:'#5F264A'

}


});