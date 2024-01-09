import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  PixelRatio,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { connect } from "react-redux";
import { ImageEditor } from "expo-image-editor";
import VideoPlayer from "expo-video-player";
import { ResizeMode } from "expo-av";
import * as DocumentPicker from "expo-document-picker";
import AudioSlider from "../../audio/AudioSlider";
import * as FileSystem from "expo-file-system";
let images = [];

const REditImage = ({ User, navigation, route, Token }) => {
  const {id} = route.params;
  console.log(id);
  const [image, setImage] = useState([]);
  const [uploadShow, setUpload] = useState([]);
  const [load, setLoading] = useState(false);
  const [internal, setInternal] = useState([]);
  const [click, setClick] = useState(true);
  const [editorVisible, setEditorVisible] = useState(false);
  const [imageUri, setImageUri] = useState("");
  const [ei, setEi] = useState(-1);

  useEffect(() => {
    setTimeout(() => {
      getImages();
    }, 200);
  }, []);

  var getImages = () => {
   
    fetch("https://reclancer.com/reclancerapi/redit_image.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + Token,
      },
      body: JSON.stringify({
        id: id,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson[0]);
        var imagess = [];
        var images22 = [];
        imagess = responseJson[0].image_path.split(",");
        imagess.forEach((e, i) => {
          images22.push({
            name: "https://reclancer.com/reclancerapi/" + e.trim(),
            id: i + 1,
          });
        });
        setTimeout(() => {
          setInternal(images22);
          //console.log("dfdfdfdfdfd", internal);
        }, 200);
      })
      .catch((error) => {
        //console.error(error);
        Alert.alert("Error!Please try again");
      });
  };

  var pickImage = async () => {
    setUpload([]);
    setClick(true);
    let response = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!response.canceled) {
      setClick(false);
      let im22 = [];
      images = response.assets;
      images.every(async (e, i) => {
        const fileInfo = await FileSystem.getInfoAsync(e.uri);
        if (fileInfo.size < 4000000 && e.type == "image") {
          im22.push({
            name: e.uri,
            id: i + 1,
            type: e.type,
          });
        } else if (fileInfo.size < 10000000 && e.type == "video") {
          im22.push({
            name: e.uri,
            id: i + 1,
            type: e.type,
          });
        } else {
          Alert.alert(
            "Please select photo less then 4Mb and video lessthen 10Mb "
          );
        }
      });
      setTimeout(() => {
        setInternal([...internal, ...im22]);
      }, 200);
    }
  };

  var UpdateImageToServer = async () => {
    setTimeout(() => {
      setLoading(true);
      let formData = new FormData();
      formData.append("id", User);
      formData.append("ad_id", id);
      internal.forEach((item, i) => {
        if (item.type == "video") {
          formData.append("attachPhoto1[]", {
            uri: item.uri ? item.uri : item.name,
            type: "video/mp4",
            name: item.uri
              ? item.uri
              : item.name.substring(
                item.uri ? item.uri : item.name.lastIndexOf("/") + 1,
                item.uri ? item.uri : item.name.length
              ),
          });
        } else if (item.type == "image") {
          formData.append("attachPhoto1[]", {
            uri: item.uri ? item.uri : item.name,
            type: "image/jpeg",
            name: item.uri
              ? item.uri
              : item.name.substring(
                item.uri ? item.uri : item.name.lastIndexOf("/") + 1,
                item.uri ? item.uri : item.name.length
              ),
          });
        } else {
          formData.append("attachPhoto1[]", {
            uri: item.uri ? item.uri : item.name,
            type: "audio/mp3",
            name: item.uri
              ? item.uri
              : item.name.substring(
                item.uri ? item.uri : item.name.lastIndexOf("/") + 1,
                item.uri ? item.uri : item.name.length
              ),
          });
        }
      });
     console.log("Editdata", formData);
      fetch("https://reclancer.com/reclancerapi/update_rimages.php", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      })
        .then(async (result) => {
          let res = await result.json();
          images = [];
          setUpload(res);
          setImage([]);
          setLoading(false);
          setInternal([]);
          setClick(true);
          Alert.alert("Edited successfully");
         // navigation.navigate("Freelancer Details", { adid: adid });
        })
        .catch((err) => {
         // console.log("Error", err);
         Alert.alert("Error");
          images = [];
          setImage([]);
          setLoading(false);
          setInternal([]);
          setClick(false);
        });
    }, 500);
  };

  const launchEditor = (urisss) => {
    setClick(false);
    setImageUri(urisss);
    setEditorVisible(true);
  };

  const deleteImage = (indx) => {
    if (indx !== -1) {
      internal.splice(indx, 1);
      setInternal([...internal]);
      setClick(false);
    }
  };

  var pickAudio = async () => {
    let result = await DocumentPicker.getDocumentAsync({ type: "audio/mpeg" });
    if (result.type != "cancel") {
      const fileInfo = await FileSystem.getInfoAsync(result.uri);
      if (fileInfo.size < 4000000) {
        var obj = {
          // uri: result.uri,
          // type: result.mimeType,
          name: result.uri,
        };
        internal.push(obj);
        setTimeout(() => {
          setInternal([...internal]);
        }, 200);
      } else {
        Alert.alert("Please select audio file lessthen 4Mb");
      }
    }
  };

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            backgroundColor: "white",
            width: "100%",
            height: "100%",
            paddingBottom: 20,
          }}
        >

          {internal && internal.length > 0 && (
            <FlatList
              data={internal}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <>
                  {item.name.includes("mp4") ? (
                    <>
                      <VideoPlayer
                        style={{
                          height: 300,
                          width: 300,
                          videoBackgroundColor: "black",
                        }}
                        videoProps={{
                          shouldPlay: false,
                          resizeMode: ResizeMode.CONTAIN,
                          videoStyle: { width: 300, marginHorizontal: 10 },
                          source: {
                            uri: item.name ? item.name : item.uri,
                          },
                        }}
                      />
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => {
                          setEi(index);
                          deleteImage(ei);
                        }}
                        style={{
                          justifyContent: "center",
                          elevation: 3,
                          height: 35,
                          width: 35,
                          borderRadius: 18,
                          backgroundColor: "lightblue",
                          top: -50,
                          right: 40,
                          alignSelf: "flex-end",
                        }}
                      >
                        <Image
                          source={require("../../assets/bin.png")}
                          style={{ height: 18, width: 18, alignSelf: "center" }}
                        />
                      </TouchableOpacity>
                    </>
                  ) : null}
                  {item.name.includes("jpeg") ||
                    item.name.includes("jpg") ||
                    item.name.includes("png") ? (
                    <View>
                      <Image
                        source={{
                          uri: item.name ? item.name : item.uri,
                        }}
                        style={{
                          borderRadius: 12,
                          margin: 6,
                          width: 400,
                          height: 200,
                          justifyContent: "center",
                          alignSelf: "center",
                          resizeMode: "cover",
                        }}
                      />
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => {
                          setEi(index);
                          deleteImage(ei);
                        }}
                        style={{
                          justifyContent: "center",
                          elevation: 3,
                          height: 35,
                          width: 35,
                          borderRadius: 18,
                          backgroundColor: "lightblue",
                          top: -50,
                          right: 16,
                          alignSelf: "flex-end",
                        }}
                      >
                        <Image
                          source={require("../../assets/bin.png")}
                          style={{ height: 18, width: 18, alignSelf: "center" }}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => {
                          launchEditor(item.name);
                          setEi(index);
                        }}
                        style={{
                          justifyContent: "center",
                          elevation: 3,
                          height: 35,
                          width: 35,
                          borderRadius: 18,
                          backgroundColor: "lightblue",
                          position: "absolute",
                          top: 15,
                          right: 16,
                        }}
                      >
                        <Image
                          source={require("../../assets/pencil.png")}
                          style={{ height: 18, width: 18, alignSelf: "center" }}
                        />
                      </TouchableOpacity>
                    </View>
                  ) : null}

                  {item.name.includes("mp3") ? (
                    <>
                      <AudioSlider audio={item.name ? item.name : item.uri} />
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => {
                          setEi(index);
                          deleteImage(ei);
                        }}
                        style={{
                          justifyContent: "center",
                          elevation: 3,
                          height: 35,
                          width: 35,
                          borderRadius: 18,
                          backgroundColor: "lightblue",
                          top: -10,
                          right: 40,
                          alignSelf: "flex-end",
                        }}
                      >
                        <Image
                          source={require("../../assets/bin.png")}
                          style={{ height: 18, width: 18, alignSelf: "center" }}
                        />
                      </TouchableOpacity>
                    </>
                  ) : null}
                </>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          )}
          <TouchableOpacity disabled={!load ? false : true} onPress={pickImage}>
            <View style={styles.ImageContainer}>
              {image == "" ? <Text>Select a Photos</Text> : null}
            </View>
            <ImageEditor
              visible={editorVisible}
              onCloseEditor={() => setEditorVisible(false)}
              imageUri={imageUri}
              fixedCropAspectRatio={16 / 9}
              minimumCropDimensions={{
                width: 100,
                height: 100,
              }}
              onEditingComplete={(result) => {
                internal[ei] = {
                  name: result.uri,
                  id: ei + 1,
                };
                setInternal([...internal]);
                images = internal;
              }}
              mode="full"
            />
          </TouchableOpacity>

          <TouchableOpacity disabled={!load ? false : true} onPress={pickAudio}>
            <View style={[styles.ImageContainer, { marginTop: 20 }]}>
              {image == "" ? <Text>Select a Audio</Text> : null}
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            disabled={!click ? false : true}
            onPress={UpdateImageToServer}
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
    </View>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    userId: (id) => dispatch(actions.action_userid(id)),
    TokenId: (token) => dispatch(actions.action_token(token)),
  };
};

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    User: state.appstate.userid,
    Token: state.appstate.tokenid,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(REditImage);

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
  btnText:{
    color:'#FFFFFF',
    fontWeight:'bold',
    fontSize:16
  },
});
