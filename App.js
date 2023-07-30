import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
} from "react-native";
import axios from "axios";
export default function App() {
  const [list, setList] = useState([]);
  const [visible, setVisible] = useState(false);

  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [skill, setSkill] = useState("");
  const [hobby, setHobby] = useState("");
  const [hideId, setHideId] = useState(null);

  useEffect(() => {
    getList();
  }, []);

  const getList = () => {
    axios({
      url: "https://rest-api-freelancer.vercel.app/getAll",
      method: "GET",
    }).then((res) => {
      setList(res.data);
    });
  };

  const handleDelete = (item) => {
    axios({
      url: `https://rest-api-freelancer.vercel.app/delete/${item._id}`, 
      method: "DELETE",
    }).then((res) => {
      getList();
    });
  };

  const handleSave = () => {
    if (hideId == null) {
      var data = {
        username: username,
        email: email,
        phone_number: phone,
        skillsets: skill,
        hobby: hobby,
      };
      axios({
        url: "https://rest-api-freelancer.vercel.app/post",
        method: "POST",
        data: data,
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        getList();

        setUserName("");
        setEmail("");
        setPhone("");
        setSkill("");
        setHobby("");
        setVisible(false);
      });
    } else {
      var data = {
        hideId: hideId,
        username: username,
        email: email,
        phone_number: phone,
        skillsets: skill,
        hobby: hobby,
      };
      axios({
        url: `https://rest-api-freelancer.vercel.app/update/${hideId}`,
        method: "PATCH",
        data: data,
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        getList();

        setUserName("");
        setEmail("");
        setPhone("");
        setSkill("");
        setHobby("");
        setVisible(false);
      });
    }
  };

  const handleEdit = (item) => {
    setVisible(true);
    setHideId(item._id);
    setUserName(item.username);
    setEmail(item.email);
    setPhone(item.phone_number);
    setSkill(item.skillsets);
    setHobby(item.hobby);
  };

  const handleVisibleModal = () => {
    setVisible(!visible);
    setHideId("");
    setUserName("");
    setEmail("");
    setPhone("");
    setSkill("");
    setHideId(null);
  };

  const onChangeUsername = (value) => {
    setUserName(value);
  };

  const onChangeEmail = (value) => {
    setEmail(value);
  };

  const onChangePhone = (value) => {
    setPhone(value);
  };

  const onChangeSkill = (value) => {
    setSkill(value);
  };

  const onChangeHobby = (value) => {
    setHobby(value);
  };

  return (
    <SafeAreaView>
      <View style={styles.header_container}>
        <Text style={styles.txt_main}>Freelancer Application</Text>
        <TouchableOpacity
          onPress={handleVisibleModal}
          style={styles.btnNewContainer}
        >
          <Text style={styles.textButton}>Add Freelancer</Text>
        </TouchableOpacity>
      </View>
      <Modal animationType="slide" visible={visible}>
        <SafeAreaView>
          <View style={styles.form}>
            <TouchableOpacity onPress={handleVisibleModal}>
              <Text style={styles.txtClose}>Close</Text>
            </TouchableOpacity>
            <TextInput
              value={username}
              style={styles.text_input}
              placeholder="Username"
              onChangeText={onChangeUsername}
            />
            <TextInput
              value={email}
              style={styles.text_input}
              placeholder="Email"
              onChangeText={onChangeEmail}
            />
            <TextInput
              value={phone}
              style={styles.text_input}
              placeholder="Phone Number"
              onChangeText={onChangePhone}
            />
            <TextInput
              value={skill}
              style={styles.text_input}
              placeholder="Skillsets"
              onChangeText={onChangeSkill}
            />
            <TextInput
              value={hobby}
              style={styles.text_input}
              placeholder="Hobby"
              onChangeText={onChangeHobby}
            />
            <TouchableOpacity onPress={handleSave} style={styles.btnContainer}>
              <Text style={styles.textButton}>
                {hideId == null ? "Add" : "Update"}
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
      <View style={{padding: 10}}>
      <ScrollView>
        {list.map((item, index) => {
          return (
            <View style={styles.item_freelancer} key={index}>
              <View style={styles.item_details}>
                <Text style={styles.txt_name}>
                  {index + 1}. {item.username}
                </Text>
                <Text style={styles.txt_item}>{item.email}</Text>
                <Text style={styles.txt_item}>{item.phone_number}</Text>
                <Text style={styles.txt_item}>{item.skillsets}</Text>
                <Text style={styles.txt_item}>{item.hobby}</Text>
              </View>
              <View>
                <TouchableOpacity onPress={() => handleDelete(item)}>
                  <Text style={styles.txt_del}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleEdit(item)}>
                  <Text style={styles.txt_edit}>Edit</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  form: {
    padding: 15,
    // backgroundColor : "#e3e3e3",
    marginTop: 10,
  },

  txtClose: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "right",
  },
  text_input: {
    padding: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    marginTop: 10,
  },
  header_container: {
    paddingTop: 40,
    paddingRight: 10,
    paddingLeft: 10,
    paddingBottom: 5,
    backgroundColor: "#eeeeee",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  txt_main: {
    fontSize: 22,
    fontWeight: "bold",
  },
  item_freelancer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e2e2",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center", // Align items vertically within the view
  },

  item_details: {
    flex: 1,
  },

  txt_name: {
    fontSize: 18,
    marginTop: 5,
    fontWeight: "bold",
  },
  txt_item: {
    fontSize: 14,
    marginTop: 5,
  },
  txt_del: {
    fontSize: 14,
    marginTop: 5,
    color: "red",
    fontWeight: "bold",
  },
  txt_edit: {
    fontSize: 14,
    marginTop: 5,
    color: "blue",
    fontWeight: "bold",
  },
  btnContainer: {
    display: "flex",
    padding: 15,
    backgroundColor: "#000",
    marginTop: 20,
  },
  btnNewContainer: {
    padding: 10,
    backgroundColor: "#000",
    borderRadius: 7,
  },
  textButton: {
    borderRadius: 40,
    textAlign: "center",
    color: "#FFF",
  },
});
