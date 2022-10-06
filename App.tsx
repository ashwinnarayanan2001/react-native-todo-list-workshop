import React, {useState} from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Platform, Image } from 'react-native';
import Task from './components/Task/Task';

export default function App() {
  // Task keeps track of the current task being entered in the text input
  const [task, setTask] = useState<string>('');
  const [taskItems, setTaskItems] = useState<string[]>([]);

  // Adds task into taskItems, and sets input field empty
  const handleAddTask = () => {
    setTaskItems([...taskItems, task])
    setTask('');
  }

  // Removes the task by its index from the taskItems
  const completeTask = (index: number) => {
    let itemsCopy = [...taskItems];
    // Remove 1 item from array
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  }

  return (
    <View style={styles.container}>
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Today's tasks to do!</Text>
        <View style={styles.items}>
          {
            taskItems.map((item, index) => {
              return (
                // Displays each task, and deletes a task from the taskItems if selected
                <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                  <Task taskName={item} />
                </TouchableOpacity>
              )
            })
          }
        </View>
      </View>

      {/* Use this component for the keyboard to appear for the TextInput */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        {/* Input field for entering task name */}
        <TextInput style={styles.input} placeholder={'Write a task'} value={task} onChangeText={text => setTask(text)}/>
        <TouchableOpacity onPress={ () => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Image source={require('./assets/add.png')} style={styles.add}></Image>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  items: {
    marginTop: 25,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  add: {
    width: 20,
    height: 20,
  }
});
