import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  PixelRatio,
  TouchableOpacity,
  Image,
  Alert,
  FlatList,
  ScrollView,
  ActivityIndicator,
  SafeAreaView
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { connect } from "react-redux";
import VideoPlayer from "expo-video-player";
import { ResizeMode } from "expo-av";
import * as DocumentPicker from "expo-document-picker";
// import styles from '../Login/audio/styles';
//import AudioSlider from "../audio/AudioSlider";
import AudioSlider from "../../audio/AudioSlider";
import * as FileSystem from "expo-file-system";
let images = [];
const Fuploads = ({ User, Token ,navigation, route }) => {
  //const { adid } = route.params;
  //console.log(adid);
  const {id,name,email,mobile,prof,st,ct,sub,gen,wt,pskill,ex,sskill,pr,pre,s_date,e_date} = route.params;
  console.log(id);
  console.log(name);
  console.log(email);
  console.log(mobile);
  console.log(prof);
  console.log(st);
  console.log(ct);
  console.log(sub);
  console.log(gen);
  console.log(wt);
  console.log(pskill);
  console.log(ex);
  console.log(sskill); 
  console.log(pr);
  console.log(pre);
  console.log(s_date);
  console.log(e_date);
  const [image, setImage] = useState([]);
  const [uploadShow, setUpload] = useState([]);
  const [load, setLoading] = useState(false);
  const [internal, setInternal] = useState([]);
  const [click, setClick] = useState(true);

  //    const getFileInfo = async (fileURI) => {
  //     console.log("asasasasasasasasasasfgfgfgfgfgf",fileInfo)
  //  }

  const isLessThanTheMB = (fileSize, smallerThanSizeMB) => {
    const isOk = fileSize / 1024 / 1024 < smallerThanSizeMB;
    return isOk;
  };

  var pickImage = async () => {
    setUpload([]);
    setClick(true);
    let response = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      // allowsEditing: true,
      allowsMultipleSelection: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!response.canceled) {
      //console.log(response);
      setClick(false);
      images = response.assets;
      images.every(async (ele, idx) => {
        const fileInfo = await FileSystem.getInfoAsync(ele.uri);
        if (fileInfo.size < 4000000 && ele.type == "image") {
          internal.push(ele);
        } else if (fileInfo.size < 10000000 && ele.type == "video") {
          internal.push(ele);
        } else {
          Alert.alert(
            "Please select photo lessthen 4Mb and video lessthen 10Mb "
          );
        }
      });
      setTimeout(() => {
        setInternal([...internal]);
      }, 200);
    }
  };

  uploadImageToServer = async () => {
    setTimeout(() => {
      setLoading(true);
      let formData = new FormData();
      formData.append("id", User);
      //formData.append("ad_id", adid);
      formData.append("name",name);
      formData.append("email",email);
      formData.append("mobile",mobile);
      formData.append("prof",prof);
      formData.append("st",st);
      formData.append("ct",ct);
      formData.append("sub",sub);
      formData.append("gen",gen);
      formData.append("wt",wt);
      formData.append("pskill",pskill);
      formData.append("ex",ex);
      formData.append("sskill",sskill);
      formData.append("pr",pr);
      formData.append("pre",pre);
      formData.append("sdate",s_date);
      formData.append("edate",e_date);
      
      internal.forEach((item, i) => {
        if (item.type == "video") {
          formData.append("attachPhoto1[]", {
            uri: item.uri,
            type: "video/mp4",
            name: item.uri.substring(
              item.uri.lastIndexOf("/") + 1,
              item.uri.length
            ),
          });
        } else if (item.type == "image") {
          formData.append("attachPhoto1[]", {
            uri: item.uri,
            type: "image/jpeg",
            name: item.uri.substring(
              item.uri.lastIndexOf("/") + 1,
              item.uri.length
            ),
          });
        } else {
          formData.append("attachPhoto1[]", {
            uri: item.uri,
            type: "audio/mp3",
            name: item.uri.substring(
              item.uri.lastIndexOf("/") + 1,
              item.uri.length
            ),
          });
        }
      });
      console.log("data", formData);
      fetch("https://reclancer.com/reclancerapi/fuploads.php", {
        method: "POST",
        headers: {
          'Accept': "application/json",
          'ontent-Type': "multipart/form-data",
          'Authorization': 'Bearer ' + Token
        },
        body: formData,
      })
        .then(async (result) => {
          let res = await result.json();
          let final = [];
          res.map((o, i) => {
            let _a1 = o?.image_path.split(",");
            _a1.map((e, i) => {
              final.push({
                name: "https://reclancer.com/reclancerapi/" + e.trim(),
              });
            });
          });
          images = [];
          setUpload(final);
          setImage([]);
          setLoading(false);
          setInternal([]);
          setClick(true);
          //Alert.alert('Posted Successfully');
          navigation.navigate('Success Page',{
            id:User,
            wt : wt,
            pskill : pskill,
            ex : ex,
          });
        })
        .catch((err) => {
         // console.log("Error", err);
          Alert.alert("Error");
          images = [];
          setImage([]);
          setLoading(false);
          setInternal([]);
          setClick(false);
          Alert.alert('Posting Failed!!');
        });
    }, 500);
  };

  var pickAudio = async () => {
    let result = await DocumentPicker.getDocumentAsync({ type: "audio/mpeg" });
    if (result.type != "cancel") {
      const fileInfo = await FileSystem.getInfoAsync(result.uri);
      if (fileInfo.size < 4000000) {
        setUpload([]);
        var obj = {
          uri: result.uri,
          type: result.mimeType,
          name: result.name,
        };
        internal.push(obj);
        setTimeout(() => {
          setInternal([...internal]);
        }, 200);
      } else {
        Alert.alert(
          "Please select audio file lessthen 4Mb"
        );
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#C5DFF8F" }}>
    <ScrollView showsVerticalScrollIndicator={false}>
    <View
        style={{
        flex:1,
        marginTop:12
        }}
      >
        {uploadShow.length > 0 && !load ? (
          <FlatList
            data={uploadShow}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <>
                {item.name.includes("mp4") ? (
                  <View style={styles.videoContainer}>
                    <VideoPlayer
                      style={{
                        height: 180,
                        width: 200,
                        videoBackgroundColor: "white",
                      }}
                      videoProps={{
                        shouldPlay: false,
                        resizeMode: ResizeMode.CONTAIN,
                        videoStyle: { width: 200, marginHorizontal: 4 },
                        source: {
                          uri: item.name,
                        },
                      }}
                    />
                 </View>
                ) : null}
                {item.name.includes("jpeg") ||
                  item.name.includes("jpg") ||
                  item.name.includes("png") ? (
                  <TouchableOpacity activeOpacity={0.6}>
                    <Image
                      source={{
                        uri: item.name,
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
                ) : null}
                {item.name.includes("mp3") ? (
                  <View style={styles.audioContainer}>
                    <AudioSlider audio={item.name} />
                  </View>
                ) : null}
              </>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : null}
        {internal && internal.length > 0 && (
          <FlatList
            data={internal}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <View style={{ margin: 4 }}>
                {item.type == "video" ? (
                      <View style={styles.videoContainer}>
                  <VideoPlayer
                     style={{
                        height: 180,
                        width: 200,
                        videoBackgroundColor: "white",
                      }}
                    videoProps={{
                        shouldPlay: true,
                        resizeMode: ResizeMode.CONTAIN,
                        videoStyle: { width: 200, marginHorizontal: 4 },
                        source: {
                          uri: item.uri,
                        },
                    }}
                  />
               </View> ) : null}
                {item.type == "image" ? (
                  <Image
                    source={{
                      uri: item.uri,
                    }}
                    style={{
                      
                      borderRadius: 12,
                      margin: 6,
                      width: 200,
                      height: 200,
                      top:2,
                      justifyContent: "center",
                      alignSelf: "center",
                      resizeMode: "cover",
                    }}
                  />
                ) : null}
                {item.type == "audio/mpeg" ? (
                     <View style={styles.audioContainer}>
                  <AudioSlider audio={item.uri} />
               </View> ) : null}
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        )}

        <TouchableOpacity disabled={!load ? false : true} onPress={pickImage}>
          <View style={styles.ImageContainer}>
          {image == "" ? <Text style={{color:'#413C69',fontWeight:'600',fontSize:14}}>Select a Photo/Video</Text> : null}
          </View>
        </TouchableOpacity>
        <TouchableOpacity disabled={!load ? false : true} onPress={pickAudio}>
        <View style={[styles.ImageContainer, { marginTop: 20 }]}>
            {image == "" ? <Text style={{color:'#413C69',fontWeight:'600',fontSize:14}}>Select a Audio</Text> : null}
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          disabled={!click ? false : true}
          onPress={uploadImageToServer}
          activeOpacity={0.6}
          style={styles.button}
        >
          {load ? (
            <ActivityIndicator style={styles.load} size={"small"} />
          ) : (
            <Text style={styles.btnText}>Upload</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
    </SafeAreaView>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    userId: (id) => dispatch(actions.action_userid(id)),
    TokenId: (token) => dispatch(actions.action_token(token)),
  };
};

const mapStateToProps = (state) => {
  return {
    User: state.appstate.userid,
    Token: state.appstate.tokenid,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Fuploads);

const styles = StyleSheet.create({
  ImageContainer: {
    marginTop:8,
    borderRadius: 8,
    width: 250,
    height: 50,
    backgroundColor: "#EEEEEE",
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    elevation:3,
  shadowColor: 'black',
  shadowOpacity: 0.26,
  shadowOffset: { width: 0, height: 2 },
  shadowRadius: 8
  },
  /*button: {
    width: 250,
    backgroundColor: "lightgreen",
    borderRadius: 8,
    alignSelf: "center",
    marginTop: 20,
  },*/
  button: {
    marginTop: 30,
    width: '40%',
    padding: 20,
    alignSelf:'center',
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
  TextStyle: {
    color: "black",
    textAlign: "center",
    padding: 10,
  },
  load: {
    alignSelf: "center",
    marginVertical: 10,
  },
  videoContainer:{
    padding:8, 
    marginVertical:8,
    borderRadius:14, 
    marginHorizontal:6,
    backgroundColor:'white',
    height:"94%",
    shadowColor: 'black',
      shadowOpacity: 0.26,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 8,
      elevation: 3,
  },
  audioContainer:{
    padding:8,
    justifyContent:'center',
    marginVertical:8,
    borderRadius:14, 
    marginHorizontal:6,
    backgroundColor:'white', 
    height:"95%",
    shadowColor: 'black',
      shadowOpacity: 0.26,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 8,
      elevation: 3,
  },
  title:{
    fontSize:18,
    fontWeight:'bold',
    color:'#413C69',      
    fontStyle: 'italic',
    textAlign:'center'
},
btnText:{
  color:'#FFFFFF',
  fontWeight:'bold',
  fontSize:16
},
});
