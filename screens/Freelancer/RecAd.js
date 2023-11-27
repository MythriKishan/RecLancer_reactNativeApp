import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Button,
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
  Alert
} from "react-native";

import { connect } from "react-redux";
import Carousel from "react-native-snap-carousel";
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Card from '../../components/Card';
import Header from "../../components/Header";
import * as actions from '../actions';
import appstate from '../appreducers';

import { useSelector, useDispatch } from 'react-redux';
import VideoPlayer from "expo-video-player";
import { ResizeMode } from "expo-av";
import AudioSlider from "../../audio/AudioSlider";
let im =[];
let vdo =[];


const RDetails = ({ User, Token, navigation, route }) => {
  const { adid } = route.params;
  console.log(adid);
  const [data, setData] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  //const [carouselItems, setCarouselItems] = useState(exampleItems);
  const [imageShow, setImageShow] = useState([]);
  const ref = useRef(null);

  useEffect(() => {
    fetch("https://reclancer.com/reclancerapi/app_rdetails.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + Token,
      },
      body: JSON.stringify({
        id: adid,
        user_id: User,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setData(responseJson[0]);
        var images = [];
        var images22 = [];
       console.log("cshdashjsgjshdgshdghsghdsd", responseJson);
        images = responseJson[0].imagelist.split(",");
        images.forEach((e, i) => {
          images22.push({ name: e.trim(), id: i + 1 });
        });
        setImageShow(images22);
       
      })
      .catch((error) => {
        //console.error(error);
        Alert("Error!Please try again");
      });
  }, []);

  const onPressFunction = (img) =>{
    //navigation.navigate('ImageZoom', { imgname: im })
    Alert.alert("Success");
   }

  const renderItem = useCallback(
    (item, index) => (
      <View
        style={{
          backgroundColor: "floralwhite",
          borderRadius: 5,
          height: 250,
          padding: 50,
          marginLeft: 25,
          marginRight: 25,
        }}
      >
        {/*<Text style={{ fontSize: 30 }}>{item.title}</Text>
      <Text>{item.text}</Text>*/}
      </View>
    ),
    []
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#E76161" }}>
        <ScrollView showsVerticalScrollIndicator={false}>
        <View
        style={{
          flex: 1,
        }}>      
        
            <Text
              style={{
                fontSize: 20,
                textAlign: "center",
                color: "#fff",
                fontWeight: "bold",
              }}
            >
            Project Details
            </Text>
          </View>
          <FlatList
            data={imageShow}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
                <View>
                {item.name.includes("mp4") ? (
                   <View onLayout={()=>{{let obj = {
                    id:index+1,
                    url:item.name
                    ? "https://bztran.com/User_project/" + item.name
                    : "https://bztran.com/User_project/" + item.uri
                  }
                  vdo.push(obj)
                  }}}>
                  <View style={styles.videoContainer}>
                  <Video
        style={{height:180,width:200}}
        videoStyle={{width:200,marginHorizontal:4}}
        source={{
          uri: item.name
            ? "https://bztran.com/User_project/" + item.name
            : "https://bztran.com/User_project/" + item.uri,
        }}
        useNativeControls
        onPlaybackStatusUpdate={(status)=>{setPlay(status.isPlaying)}}
        resizeMode={ResizeMode.CONTAIN}
        isLooping
      />
      {!play&&
      <TouchableOpacity onPress={onVideo}
      style={styles.videoIn}>
                        <Image
                          source={require("../../assets/enter.png")}
                          style={{tintColor:'#565e5e', height: 16, width: 16, alignSelf: "center" }}/>
      </TouchableOpacity>}
                  </View>
                </View>) : null}
                {item.name.includes("jpeg") ||
                  item.name.includes("jpg") ||
                  item.name.includes("png") ? (
                 <View onLayout={()=>{{let ob = {
                  id:index+1,
                  url:"https://reclancer.com/reclancerapi/"+item.name
                }
                im.push(ob)
                }}}>
                <TouchableOpacity onPress={()=>onPressFunction(im)}>
                  <Image
                    source={{
                      uri: "https://reclancer.com/reclancerapi/" + item.name,
                    }}
                    style={{
                      borderRadius: 12,
                      margin: 6,
                      width: 200,
                      height:200,
                      top:2,
                      justifyContent: "center",
                      alignSelf: "center",
                      backgroundColor:'white',
                      resizeMode:"stretch",
                    }}
                  />
                </TouchableOpacity>
                </View>
                ) : null}
               {item.name.includes("mp3") ? (
                  <View style={styles.audioContainer}>
                  <AudioSlider
                    audio={"https://reclancer.com/reclancerapi/" + item.name}
                  />
                </View>) : null}
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
          {/* <Image
                        source={{uri:"https://bztran.com/User_project/"+data.image_path}}
                        style={{ width: 400, height: 200, justifyContent: 'center', alignSelf: 'center',resizeMode:'cover' }}
                 />    */}

         {/* <View style={{ padding: 10, opacity: 0.5, margin: 10 }}>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontSize: 20 }}>Name:</Text>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                {data.user_name}
              </Text>
            </View>

            <View style={{ justifyContent: "flex-end", alignSelf: "flex-end" }}>
              <View style={{ flexDirection: "row" }}>
                <Text>DOB:</Text>
                <Text>{data.user_DOB}</Text>
              </View>

              <View style={{ flexDirection: "row" }}>
                <Text>Email:</Text>
                <Text>{data.email}</Text>
              </View>

              <View style={{ flexDirection: "row" }}>
                <Text>Mobile:</Text>
                <Text>{data.mobile}</Text>
              </View>

              <View style={{ flexDirection: "row" }}>
                <Text>Height:</Text>
                <Text>{data.user_height}</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text>Birth Location:</Text>
                <Text>{data.user_bloc}</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text>Religion:</Text>
                <Text>{data.user_rel}</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text>Caste:</Text>
                <Text>{data.user_caste}</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text>Subcaste:</Text>
                <Text>{data.sub_caste}</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text>Education:</Text>
                <Text>{data.user_edu}</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text>Profession:</Text>
                <Text>{data.user_prof}</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text>Martial Status:</Text>
                <Text>{data.user_mstatus}</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text>Gender:</Text>
                <Text>{data.user_gen}</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text>Birth Time:</Text>
                <Text>{data.user_tbirth}</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text>Father Name:</Text>
                <Text>{data.user_fathname}</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text>Father Occuption:</Text>
                <Text>{data.user_fathocc}</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text>Mother Name:</Text>
                <Text>{data.user_mothname}</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text>Mother Occuption:</Text>
                <Text>{data.user_mothocc}</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text>Home Address:</Text>
                <Text>{data.user_haddr}</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text>Office Address:</Text>
                <Text>{data.user_offaddr}</Text>
                </View>
            </View>
                </View>*/}

<View>            
  
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
     </Card>
     <Card style={styles.card}>
       <Text style={styles.sectionTitle}><Text style={styles.labelTitle}>Project Address:</Text>{data.project_address}</Text>
       <Text style={styles.sectionTitle}><Text style={styles.labelTitle}>Project Period:</Text>{data.project_period}</Text>
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

     <Card style={styles.card}>
       <Text style={styles.sectionTitle}><Text style={styles.labelTitle}>Company Email:</Text>{data.comp_email}</Text>
       <Text style={styles.sectionTitle}><Text style={styles.labelTitle}>Last Date to Apply:</Text>{data.last_date}</Text>
       
     </Card>

   </SafeAreaView>
 
 </View>


      
      
      </ScrollView>
    </SafeAreaView>
  );

  //})}
};

const mapDispatchToProps = (dispatch) => {
  return {
    userId: (id) => dispatch(actions.action_userid(id)),
    TokenId: (token) => dispatch(actions.action_token(token)),
  };
};

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    //GetGoalScore: state.appstate.GoalScore
    User: state.appstate.userid,
    Token: state.appstate.tokenid,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RDetails);

const styles = StyleSheet.create({
  textInputStyle: {
    color: "#000",
    borderWidth: 1,
    padding: 15,
    borderColor: "#4aa567",
    marginHorizontal: 20,
    borderRadius: 10,
  },
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
     fontSize:16,
     fontWeight:'700',
     color:'black'
   
   }
});