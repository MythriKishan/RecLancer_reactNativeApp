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
const UploadImages = ({ User, navigation, route }) => {
  const { adid } = route.params;
  //console.log(adid);
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
      formData.append("ad_id", adid);
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
      //console.log("data", formData);
      fetch("https://reclancer.com/reclancerapi/multipleupload.php", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
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
          Alert.alert('Files Uploaded');
        })
        .catch((err) => {
         // console.log("Error", err);
          Alert.alert("Error");
          images = [];
          setImage([]);
          setLoading(false);
          setInternal([]);
          setClick(false);
          Alert.alert('Upload Failed');
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
    <ScrollView showsVerticalScrollIndicator={false}>
      <View
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: 4,
          paddingBottom: 20,
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
                          uri: item.name,
                        },
                      }}
                    />
                  </>
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
                        width: 400,
                        height: 200,
                        justifyContent: "center",
                        alignSelf: "center",
                        resizeMode: "cover",
                      }}
                    />
                  </TouchableOpacity>
                ) : null}
                {item.name.includes("mp3") ? (
                  <>
                    <AudioSlider audio={item.name} />
                  </>
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
                  <VideoPlayer
                    on
                    style={{
                      height: 300,
                      width: 300,
                      videoBackgroundColor: "black",
                    }}
                    videoProps={{
                      shouldPlay: false,
                      resizeMode: ResizeMode.CONTAIN,
                      videoStyle: { width: 300, marginHorizontal: 5 },
                      source: {
                        uri: item.uri,
                      },
                    }}
                  />
                ) : null}
                {item.type == "image" ? (
                  <Image
                    source={{
                      uri: item.uri,
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
                ) : null}
                {item.type == "audio/mpeg" ? (
                  <AudioSlider audio={item.uri} />
                ) : null}
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        )}

        <TouchableOpacity disabled={!load ? false : true} onPress={pickImage}>
          <View style={styles.ImageContainer}>
            {image == "" ? <Text>Select a Photo</Text> : null}
          </View>
        </TouchableOpacity>
        <TouchableOpacity disabled={!load ? false : true} onPress={pickAudio}>
          <View style={[styles.ImageContainer, { marginTop: 20 }]}>
            {image == "" ? <Text>Select a Audio</Text> : null}
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
            <Text style={styles.TextStyle}>Upload</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(UploadImages);

const styles = StyleSheet.create({
  ImageContainer: {
    borderRadius: 8,
    width: 250,
    height: 50,
    borderColor: "black",
    backgroundColor: "lightgreen",
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
  },
  button: {
    width: 250,
    backgroundColor: "lightgreen",
    borderRadius: 8,
    alignSelf: "center",
    marginTop: 20,
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
});
