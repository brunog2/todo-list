import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, StatusBar, Alert } from 'react-native';
import CheckBox from '@react-native-community/checkbox';

export default function App() {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [tasks, setTasks] = useState([{
    description: "Jogar Valorant",
    priority: "high",
    priorityColor: "#e76256",
    done: false,
  }]);
  const [taskDescription, setTaskDescription] = useState('');
  const [taskPriority, setTaskPriority] = useState('');
  const [bgPriorityBtColor, setBgPriorityBtColor] = useState({
    "low": "",
    "medium": "",
    "high": "",
  });
  const [textsPriorityBtColor, setTextsPriorityBtColor] = useState({
    "low": "#2eeca0",
    "medium": "#fdaf3d",
    "high": "#e76256",
  });
  const colors = {
    "low": "#2eeca0",
    "medium": "#fdaf3d",
    "high": "#e76256",
  };

  const handlePriorityBtPress = (colorPriority) => {
    var buttonsBgs = { ...bgPriorityBtColor };
    var textColors = { ...textsPriorityBtColor };

    for (var color in buttonsBgs) {
      buttonsBgs[color] = "#fff";
    }

    buttonsBgs[colorPriority] = colors[colorPriority];
    setBgPriorityBtColor(buttonsBgs);

    for (var color in textColors) {
      if (textColors[color] == "#fff" && buttonsBgs[color] == "#fff") {
        console.log("Entrou na função")
        textColors[color] = colors[color];
      }
    }

    textColors[colorPriority] = "#fff";
    setTextsPriorityBtColor(textColors);
    setTaskPriority(colorPriority);
  };

  const handleOnDescriptionChange = (description) => {
    setTaskDescription(description);
  };

  const handleOnAddTaskBtPress = () => {
    for (var task in tasks){
      console.log(task);
      if (tasks[task].description.toLowerCase() == taskDescription.toLowerCase()) {
        Alert.alert(
          "Aviso",
          "Tarefa já adicionada!",
          [
           { text: "OK"}
          ],
          { cancelable: false }
        );
        return;
      }
    };

    var newTasks = [...tasks];
    var newTask = {
      description: taskDescription,
      priority: taskPriority,
      priorityColor: colors[taskPriority],
      done: false,
    };
    newTasks.push(newTask);
    console.log(newTasks)
    setTaskDescription('');
    setTasks(newTasks);
    
  };

  return (

    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fdfdfd" />

      <View style={styles.header}>
        <Text style={styles.headerTitlePrimary}>ToDo</Text>

        <Text style={styles.headerTitleSecondary}>List</Text>
      </View>

      <View style={styles.borderBottomHeader}></View>

      <ScrollView style={styles.tasks}>
        {tasks.map((task, index) => (
          <View key={index} style={styles.task}>

            <View key={task} style={styles.containerTaskDescription}>
              <CheckBox key={[index, task.done]} disabled={false} value={toggleCheckBox} onValueChange={(newValue) => setToggleCheckBox(newValue)} style={styles.checkbox} />

              <Text key={task.description} style={styles.taskDescription}>{task.description}</Text>

            </View>
            <View key={[task.description, task.priorityColor]} style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: task.priorityColor }}></View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.containerPriority}>
        <View style={styles.borderButtonPriority}></View>

        <TouchableOpacity style={[styles.buttonPriority, { backgroundColor: bgPriorityBtColor.low }]} onPress={() => handlePriorityBtPress("low")}>
          <Text style={{ color: textsPriorityBtColor.low }}>Low</Text>
        </TouchableOpacity>

        <View style={styles.borderButtonPriority}></View>

        <TouchableOpacity style={[styles.buttonPriority, { backgroundColor: bgPriorityBtColor.medium }]} onPress={() => handlePriorityBtPress("medium")}>
          <Text style={{ color: textsPriorityBtColor.medium }}>Medium</Text>
        </TouchableOpacity>

        <View style={styles.borderButtonPriority}></View>
        <TouchableOpacity style={[styles.buttonPriority, { backgroundColor: bgPriorityBtColor.high }]} onPress={() => handlePriorityBtPress("high")}>
          <Text style={{ color: textsPriorityBtColor.high }}>High</Text>
        </TouchableOpacity>

        <View style={styles.borderButtonPriority}></View>
      </View>

      <View style={styles.containerNewTask}>
        <TextInput placeholder="New task" value={taskDescription} placeholderTextColor="#c9d7e1" style={styles.inputNewTask} onChange={(description) => handleOnDescriptionChange(description.nativeEvent.text)}>
        </TextInput>

        <TouchableOpacity style={styles.btNewTask} onPress={() => handleOnAddTaskBtPress()}>
          <Text style={styles.textBtNewTask}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdfdfd',
    alignItems: 'center',
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width: '100%',
    paddingBottom: 5,
    marginBottom: 2,
    marginTop: 5,
  },
  borderBottomHeader: {
    width: '90%',
    height: 1,
    backgroundColor: "#c9d7e1",
    marginBottom: 5,
  },
  headerTitlePrimary: {
    fontFamily: 'sans-serif-light',
    fontSize: 28,
    fontWeight: "bold",
    color: '#5d62fa',
  },
  headerTitleSecondary: {
    fontFamily: 'sans-serif-light',
    fontSize: 28,
    color: '#5d62fa',
    marginLeft: 6,
  },
  tasks: {
    flex: 1,
    width: "100%",
    marginBottom: 15,
  },
  task: {
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 6,
    marginTop: 6,
    backgroundColor: '#fff',
    height: 45,
    borderRadius: 5,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    flexDirection: "row",
    shadowColor: "#f0f0f0",
    shadowOffset: {
      width: 0,
      height: -2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  containerTaskDescription: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#f0f0f0",
    elevation: 10,
  },
  checkbox: {
    marginRight: 5,
  },
  taskDescription: {
    fontFamily: 'sans-serif-light',
  },
  containerPriority: {
    width: "90%",
    padding: 5,
    borderRadius: 10,
    height: 40,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    borderWidth: 1,
    borderColor: "#c9d7e1",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 15,
  },
  buttonPriority: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: '30%',
    borderRadius: 5,
  },
  borderButtonPriority: {
    borderWidth: 1,
    height: "70%",
    borderColor: "#c9d7e1",
  },
  containerNewTask: {
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 50,
    width: '90%',
    marginBottom: 15,
    borderColor: "#c9d7e1",
    borderWidth: 1,
    borderRadius: 25,
    padding: 15,
  },
  inputNewTask: {
    color: "black",
    fontFamily: 'sans-serif-light',
    width: "90%",
    height: 50,
  },
  textBtNewTask: {
    color: "#5ca8e0",
    fontFamily: 'sans-serif-light',
  },
});
